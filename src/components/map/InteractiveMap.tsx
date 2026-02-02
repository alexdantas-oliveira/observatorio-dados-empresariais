import { useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Polygon } from "react-leaflet";
import L from "leaflet";
import piauiGeoJson from "@/data/piaui.json";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { municipiosPI, getDensityColor, getPibColor, getIdhmColor, getInactiveDensityColor, getEmploymentColor, MunicipioData } from "@/data/municipiosPI";
import { MapControls, DataLayerType } from "./MapControls";
import { MapLegend } from "./MapLegend";
import { MunicipalityPopup } from "./MunicipalityPopup";

// Create the mask polygon (World - Piaui)
const worldPolygon = [
  [90, -180],
  [90, 180],
  [-90, 180],
  [-90, -180],
];

// Extract coordinates from Piaui feature
const piauiCoords = (piauiGeoJson as any).features[0].geometry.coordinates[0];

// In Leaflet, a polygon with holes is defined as [OuterRing, Hole1, Hole2...]
// Note: Leaflet expects [lat, lng], but GeoJSON is [lng, lat]. We need to map it.
// GeoJSON coords are [lon, lat], Leaflet wants [lat, lon]
const piauiLatLang = piauiCoords.map((coord: number[]) => [coord[1], coord[0]]);

const maskPolygonData = [worldPolygon, piauiLatLang];

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatBR(n: number) {
  return n.toLocaleString("pt-BR");
}

function formatBRL(n: number) {
  return `R$ ${n.toLocaleString("pt-BR")}`;
}

function getClusterPopupHtml(m: MunicipioData) {
  // NOTE: This popup is used only for the cluster layer (pure Leaflet markers).
  // The non-cluster markers still render <MunicipalityPopup /> via React-Leaflet.
  const title = escapeHtml(m.nome);
  const meso = escapeHtml(m.mesorregiao);
  const setor = escapeHtml(m.setorPredominante);

  return `
  <div style="min-width:240px;padding:4px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,.12);padding-bottom:8px;margin-bottom:10px;gap:8px;">
      <div style="font-weight:700;font-size:14px;color:#111827;">${title}</div>
      <span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:999px;background:#334155;color:#fff;white-space:nowrap;">${meso}</span>
    </div>

    <div style="display:flex;flex-direction:column;gap:8px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <span style="font-size:12px;color:#4b5563;">Empresas Ativas</span>
        <span style="font-size:12px;font-weight:700;color:#065f46;">${formatBR(m.empresasAtivas)}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <span style="font-size:12px;color:#4b5563;">Empresas Inativas</span>
        <span style="font-size:12px;font-weight:700;color:#b91c1c;">${formatBR(m.empresasInativas)}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <span style="font-size:12px;color:#4b5563;">Empregos Formais</span>
        <span style="font-size:12px;font-weight:700;color:#1d4ed8;">${formatBR(m.empregos)}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <span style="font-size:12px;color:#4b5563;">PIB per Capita</span>
        <span style="font-size:12px;font-weight:700;color:#6d28d9;">${formatBRL(m.pibPerCapita)}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <span style="font-size:12px;color:#4b5563;">IDHM</span>
        <span style="font-size:12px;font-weight:700;color:#92400e;">${m.idhm.toFixed(3)}</span>
      </div>

      <div style="border-top:1px solid rgba(0,0,0,.12);padding-top:8px;margin-top:4px;display:flex;flex-direction:column;gap:6px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <span style="font-size:11px;color:#6b7280;">Setor Predominante</span>
          <span style="font-size:11px;font-weight:600;background:rgba(15,118,110,.12);color:#0f766e;padding:2px 6px;border-radius:6px;">${setor}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <span style="font-size:11px;color:#6b7280;">População</span>
          <span style="font-size:11px;font-weight:600;color:#374151;">${formatBR(m.populacao)} hab.</span>
        </div>
      </div>
    </div>
  </div>`;
}

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
    let cancelled = false;

    if (!showClusters) {
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current = null;
      }
      return;
    }

    // Load markercluster only when needed.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        await import("leaflet.markercluster");
        if (cancelled) return;

        // Create cluster group
        const clusterGroup = L.markerClusterGroup({
          chunkedLoading: true,
          maxClusterRadius: 80,
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          iconCreateFunction: (cluster) => {
            const childCount = cluster.getChildCount();
            let sizeClass = "w-10 h-10 text-sm";

            if (childCount >= 10) {
              sizeClass = "w-14 h-14 text-base";
            } else if (childCount >= 5) {
              sizeClass = "w-12 h-12 text-sm";
            }

            return L.divIcon({
              html: `<div class="flex items-center justify-center ${sizeClass} rounded-full bg-red-600 text-white font-bold shadow-lg border-2 border-background">${childCount}</div>`,
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

          // IMPORTANT: Avoid react-dom/server (renderToString) in the client bundle.
          // Using a plain HTML popup here prevents React internals/context crashes.
          const popupHtml = getClusterPopupHtml(municipio);
          marker.bindPopup(popupHtml, { maxWidth: 320 });

          clusterGroup.addLayer(marker);
        });

        map.addLayer(clusterGroup);
        clusterGroupRef.current = clusterGroup;
      } catch (e) {
        console.error("Failed to load leaflet.markercluster", e);
      }
    })();

    return () => {
      cancelled = true;
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

  const getColor = useMemo(() => {
    return (m: MunicipioData) => {
      switch (activeLayer) {
        case "empresas":
          return getDensityColor(m.empresasAtivas);
        case "empresas_inativas":
          return getInactiveDensityColor(m.empresasInativas);
        case "pib":
          return getPibColor(m.pibPerCapita);
        case "idhm":
          return getIdhmColor(m.idhm);
        case "empregos":
          return getEmploymentColor(m.empregos);
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
        case "empresas_inativas":
          return Math.min(Math.max(m.empresasInativas / 500, 8), 35);
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
          { color: "#991b1b", label: "> 30.000 empresas" },
          { color: "#b91c1c", label: "10.000 - 30.000" },
          { color: "#dc2626", label: "5.000 - 10.000" },
          { color: "#ef4444", label: "2.000 - 5.000" },
          { color: "#f87171", label: "1.000 - 2.000" },
          { color: "#fca5a5", label: "< 1.000 empresas" },
        ];
      case "empresas_inativas":
        return [
          { color: "#1f2937", label: "> 5.000 inativas" },
          { color: "#374151", label: "1.000 - 5.000" },
          { color: "#4b5563", label: "500 - 1.000" },
          { color: "#6b7280", label: "200 - 500" },
          { color: "#9ca3af", label: "100 - 200" },
          { color: "#d1d5db", label: "< 100 inativas" },
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
          { color: "#064e3b", label: "> 100.000 empregos" },
          { color: "#065f46", label: "50.000 - 100.000" },
          { color: "#047857", label: "20.000 - 50.000" },
          { color: "#059669", label: "10.000 - 20.000" },
          { color: "#10b981", label: "5.000 - 10.000" },
          { color: "#6ee7b7", label: "< 5.000 empregos" },
        ];
      default:
        return [];
    }
  }, [activeLayer]);

  const legendTitle = useMemo(() => {
    switch (activeLayer) {
      case "empresas":
        return "Empresas Ativas";
      case "empresas_inativas":
        return "Empresas Inativas";
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Mask Layer to focus on Piauí */}
        <Polygon
          positions={maskPolygonData as any}
          pathOptions={{
            color: "transparent",
            fillColor: "#ffffff", // White mask
            fillOpacity: 0.65,     // Adjust opacity for "blur/focus" effect
            stroke: false,
          }}
        />

        {/* Highlight Piauí Border */}
        <Polygon
          positions={piauiLatLang}
          pathOptions={{
            color: "#3b82f6", // Primary blue border
            weight: 2,
            fill: false,
          }}
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
            </CircleMarker>
          ))}
      </MapContainer>

      <MapControls
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
        showClusters={showClusters}
        onToggleClusters={setShowClusters}
      />

      <MapLegend title={legendTitle} items={legendItems} />
    </div>
  );
}
