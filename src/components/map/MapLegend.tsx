import { Card } from "@/components/ui/card";

interface LegendItem {
  color: string;
  label: string;
}

interface MapLegendProps {
  title: string;
  items: LegendItem[];
}

export function MapLegend({ title, items }: MapLegendProps) {
  return (
    <Card className="absolute bottom-4 right-4 z-[1000] p-4 bg-background/95 backdrop-blur-sm border-border/50">
      <h4 className="font-semibold text-sm mb-3 text-foreground">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-sm border border-border/30"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
