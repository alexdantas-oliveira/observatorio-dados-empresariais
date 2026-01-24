import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layers, Building2, TrendingUp, Users } from "lucide-react";

export type DataLayerType = "empresas" | "pib" | "idhm" | "empregos";

interface MapControlsProps {
  activeLayer: DataLayerType;
  onLayerChange: (layer: DataLayerType) => void;
  showClusters: boolean;
  onToggleClusters: (enabled: boolean) => void;
  showLabels: boolean;
  onToggleLabels: (enabled: boolean) => void;
}

export function MapControls({
  activeLayer,
  onLayerChange,
  showClusters,
  onToggleClusters,
  showLabels,
  onToggleLabels,
}: MapControlsProps) {
  const layers = [
    { value: "empresas", label: "Empresas Ativas", icon: Building2 },
    { value: "pib", label: "PIB per Capita", icon: TrendingUp },
    { value: "idhm", label: "IDHM", icon: Users },
    { value: "empregos", label: "Empregos", icon: Users },
  ] as const;

  return (
    <Card className="absolute top-4 left-4 z-[1000] p-4 bg-background/95 backdrop-blur-sm border-border/50 w-64">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-4 w-4 text-primary" />
        <h4 className="font-semibold text-sm text-foreground">Camadas de Dados</h4>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Visualização</Label>
          <Select value={activeLayer} onValueChange={(v) => onLayerChange(v as DataLayerType)}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {layers.map((layer) => (
                <SelectItem key={layer.value} value={layer.value}>
                  <div className="flex items-center gap-2">
                    <layer.icon className="h-4 w-4" />
                    <span>{layer.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Label htmlFor="clusters" className="text-xs text-muted-foreground">
              Agrupamento (Clusters)
            </Label>
            <Switch
              id="clusters"
              checked={showClusters}
              onCheckedChange={onToggleClusters}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="labels" className="text-xs text-muted-foreground">
              Rótulos dos Municípios
            </Label>
            <Switch
              id="labels"
              checked={showLabels}
              onCheckedChange={onToggleLabels}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
