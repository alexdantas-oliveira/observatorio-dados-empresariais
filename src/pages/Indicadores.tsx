import { AppLayout } from "@/components/layout/AppLayout";
import { IndicatorsPanel } from "@/components/reports/IndicatorsPanel";
import { TrendingUp } from "lucide-react";

export default function Indicadores() {
  return (
    <AppLayout title="Indicadores">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Painel de Indicadores
            </h1>
          </div>
          <p className="text-muted-foreground">
            Acompanhe os principais indicadores empresariais do Piauí em tempo real
          </p>
        </div>

        {/* Indicators Content */}
        <IndicatorsPanel />
      </div>
    </AppLayout>
  );
}
