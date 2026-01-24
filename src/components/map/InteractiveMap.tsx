import { useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

import { municipiosPI, getDensityColor, getPibColor, getIdhmColor, MunicipioData } from "@/data/municipiosPI";
import { MapControls, DataLayerType } from "./MapControls";
import { MapLegend } from "./MapLegend";
import { MunicipalityPopup } from "./MunicipalityPopup";
import { renderToString } from "react-dom/server";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Piauí center coordinates
const PI_CENTER: [number, number] = [-7.0, -42.5];
const PI_ZOOM = 7;

interface ClusterLayerProps {
  municipios: MunicipioData[];
  getColor: (m: MunicipioData) => string;
  getRadius: (m: MunicipioData) => number;
  showClusters: boolean;
}

function ClusterLayer({ municipios, getColor, getRadius, showClusters }: ClusterLayerProps) {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!showClusters) {
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current = null;
      }
      return;
    }

    // Create cluster group
    const clusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (cluster) => {
        const childCount = cluster.getChildCount();
        let size = "small";
        let sizeClass = "w-10 h-10 text-sm";
        
        if (childCount >= 10) {
          size = "large";
          sizeClass = "w-14 h-14 text-base";
        } else if (childCount >= 5) {
          size = "medium";
          sizeClass = "w-12 h-12 text-sm";
        }

        return L.divIcon({
          html: `<div class="flex items-center justify-center ${sizeClass} rounded-full bg-primary text-primary-foreground font-bold shadow-lg border-2 border-background">
            ${childCount}
          </div>`,
          className: "custom-cluster-icon",
          iconSize: L.point(40, 40),
        });
      },
    });

    // Add markers to cluster
    municipios.forEach((municipio) => {
      const color = getColor(municipio);
      const radius = getRadius(municipio);
      
      const marker = L.circleMarker([municipio.latitude, municipio.longitude], {
        radius: radius,
        fillColor: color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });

      const popupContent = renderToString(<MunicipalityPopup municipio={municipio} />);
      marker.bindPopup(popupContent, { maxWidth: 300 });
      
      clusterGroup.addLayer(marker);
    });

    map.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;

    return () => {
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
      }
    };
  }, [map, municipios, getColor, getRadius, showClusters]);

  return null;
}

export function InteractiveMap() {
  const [activeLayer, setActiveLayer] = useState<DataLayerType>("empresas");
  const [showClusters, setShowClusters] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const getColor = useMemo(() => {
    return (m: MunicipioData) => {
      switch (activeLayer) {
        case "empresas":
          return getDensityColor(m.empresasAtivas);
        case "pib":
          return getPibColor(m.pibPerCapita);
        case "idhm":
          return getIdhmColor(m.idhm);
        case "empregos":
          return getDensityColor(m.empregos / 10);
        default:
          return getDensityColor(m.empresasAtivas);
      }
    };
  }, [activeLayer]);

  const getRadius = useMemo(() => {
    return (m: MunicipioData) => {
      switch (activeLayer) {
        case "empresas":
          return Math.min(Math.max(m.empresasAtivas / 2000, 8), 35);
        case "pib":
          return Math.min(Math.max(m.pibPerCapita / 2000, 8), 30);
        case "idhm":
          return Math.min(Math.max(m.idhm * 30, 10), 25);
        case "empregos":
          return Math.min(Math.max(m.empregos / 10000, 8), 35);
        default:
          return 12;
      }
    };
  }, [activeLayer]);

  const legendItems = useMemo(() => {
    switch (activeLayer) {
      case "empresas":
        return [
          { color: "#166534", label: "> 30.000 empresas" },
          { color: "#16a34a", label: "10.000 - 30.000" },
          { color: "#22c55e", label: "5.000 - 10.000" },
          { color: "#4ade80", label: "2.000 - 5.000" },
          { color: "#86efac", label: "1.000 - 2.000" },
          { color: "#bbf7d0", label: "< 1.000 empresas" },
        ];
      case "pib":
        return [
          { color: "#1e40af", label: "> R$ 30.000" },
          { color: "#2563eb", label: "R$ 20.000 - 30.000" },
          { color: "#3b82f6", label: "R$ 15.000 - 20.000" },
          { color: "#60a5fa", label: "R$ 10.000 - 15.000" },
          { color: "#93c5fd", label: "R$ 8.000 - 10.000" },
          { color: "#bfdbfe", label: "< R$ 8.000" },
        ];
      case "idhm":
        return [
          { color: "#7c3aed", label: "≥ 0.700 (Alto)" },
          { color: "#8b5cf6", label: "0.650 - 0.699" },
          { color: "#a78bfa", label: "0.600 - 0.649" },
          { color: "#c4b5fd", label: "0.550 - 0.599" },
          { color: "#ddd6fe", label: "< 0.550 (Baixo)" },
        ];
      case "empregos":
        return [
          { color: "#166534", label: "> 100.000 empregos" },
          { color: "#16a34a", label: "50.000 - 100.000" },
          { color: "#22c55e", label: "20.000 - 50.000" },
          { color: "#4ade80", label: "10.000 - 20.000" },
          { color: "#86efac", label: "5.000 - 10.000" },
          { color: "#bbf7d0", label: "< 5.000 empregos" },
        ];
      default:
        return [];
    }
  }, [activeLayer]);

  const legendTitle = useMemo(() => {
    switch (activeLayer) {
      case "empresas":
        return "Empresas Ativas";
      case "pib":
        return "PIB per Capita";
      case "idhm":
        return "IDHM";
      case "empregos":
        return "Total de Empregos";
      default:
        return "";
    }
  }, [activeLayer]);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={PI_CENTER}
        zoom={PI_ZOOM}
        className="w-full h-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Cluster layer when enabled */}
        {showClusters && (
          <ClusterLayer
            municipios={municipiosPI}
            getColor={getColor}
            getRadius={getRadius}
            showClusters={showClusters}
          />
        )}

        {/* Regular markers when clusters disabled */}
        {!showClusters &&
          municipiosPI.map((municipio) => (
            <CircleMarker
              key={municipio.id}
              center={[municipio.latitude, municipio.longitude]}
              radius={getRadius(municipio)}
              pathOptions={{
                fillColor: getColor(municipio),
                color: "#ffffff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8,
              }}
            >
              <Popup maxWidth={300}>
                <MunicipalityPopup municipio={municipio} />
              </Popup>
              {showLabels && (
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -10]}
                  className="!bg-transparent !border-0 !shadow-none !p-0"
                >
                  <span className="text-[10px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {municipio.nome}
                  </span>
                </Tooltip>
              )}
            </CircleMarker>
          ))}
      </MapContainer>

      <MapControls
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
        showClusters={showClusters}
        onToggleClusters={setShowClusters}
        showLabels={showLabels}
        onToggleLabels={setShowLabels}
      />

      <MapLegend title={legendTitle} items={legendItems} />
    </div>
  );
}
