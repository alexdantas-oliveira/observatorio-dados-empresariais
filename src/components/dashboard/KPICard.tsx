import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { calculateChange, formatValue } from "@/data/mockData";

interface KPICardProps {
  label: string;
  value: number;
  previousValue: number;
  format?: "number" | "currency" | "percent";
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

export function KPICard({
  label,
  value,
  previousValue,
  format = "number",
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  className,
}: KPICardProps) {
  const change = calculateChange(value, previousValue);
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <Card className={cn("card-hover overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {Icon && (
            <div className={cn("p-2.5 rounded-xl", iconBgColor)}>
              <Icon className={cn("w-5 h-5", iconColor)} />
            </div>
          )}
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full",
              isNeutral
                ? "text-muted-foreground bg-muted"
                : isPositive
                ? "text-success bg-success/10"
                : "text-destructive bg-destructive/10"
            )}
          >
            {isNeutral ? (
              <Minus className="w-3 h-3" />
            ) : isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(change).toFixed(1)}%
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-3xl font-bold tracking-tight">
            {formatValue(value, format)}
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Período anterior:{" "}
            <span className="font-medium text-foreground">
              {formatValue(previousValue, format)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
