import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardFilters, useFilters } from "@/components/dashboard/DashboardFilters";
import { KPICard } from "@/components/dashboard/KPICard";
import {
  AreaChartCard,
  BarChartCard,
  PieChartCard,
  HorizontalBarChart,
  LineChartCard,
  MunicipalRankingCard,
} from "@/components/dashboard/charts";
import { kpisData } from "@/data/mockData";
import {
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  MapPin,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const kpiIcons = [Building2, TrendingUp, Users, DollarSign, Activity, MapPin];
const kpiColors = [
  { icon: "text-primary", bg: "bg-primary/10" },
  { icon: "text-success", bg: "bg-success/10" },
  { icon: "text-info", bg: "bg-info/10" },
  { icon: "text-accent", bg: "bg-accent/10" },
  { icon: "text-chart-4", bg: "bg-purple-500/10" },
  { icon: "text-warning", bg: "bg-warning/10" },
];

export default function DashboardExecutivo() {
  const { filters, setFilters } = useFilters();

  return (
    <AppLayout title="Dashboard Executivo">
      <div className="space-y-6 animate-fade-in">
        {/* Header com filtros */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Panorama Empresarial do Piauí
            </h1>
            <p className="text-muted-foreground mt-1">
              Indicadores e análises do ecossistema de negócios
            </p>
          </div>
          <DashboardFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* KPIs Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpisData.map((kpi, index) => (
            <KPICard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              previousValue={kpi.previousValue}
              format={kpi.format}
              icon={kpiIcons[index]}
              iconColor={kpiColors[index].icon}
              iconBgColor={kpiColors[index].bg}
            />
          ))}
        </div>

        {/* Main Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="temporal">Análise Temporal</TabsTrigger>
            <TabsTrigger value="setorial">Análise Setorial</TabsTrigger>
            <TabsTrigger value="geografica">Análise Geográfica</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <BarChartCard
                title="Movimentação Empresarial"
                description="Aberturas vs. fechamentos por mês"
              />
              <PieChartCard
                title="Distribuição por Porte"
                description="Percentual de empresas por classificação"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <HorizontalBarChart
                  title="Top Setores Econômicos"
                  description="Quantidade de empresas por setor"
                />
              </div>
              <MunicipalRankingCard
                title="Ranking Municipal"
                description="Top municípios por empresas e PIB"
              />
            </div>
          </TabsContent>

          {/* Temporal Analysis Tab */}
          <TabsContent value="temporal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <AreaChartCard
                title="Aberturas de Empresas"
                description="Novos registros mensais"
                dataKey="aberturas"
                color="hsl(var(--chart-1))"
                gradientId="areaAberturas"
              />
              <AreaChartCard
                title="Fechamentos"
                description="Baixas mensais"
                dataKey="fechamentos"
                color="hsl(var(--chart-6))"
                gradientId="areaFechamentos"
              />
              <AreaChartCard
                title="Saldo Líquido"
                description="Diferença entre aberturas e fechamentos"
                dataKey="saldoLiquido"
                color="hsl(var(--chart-3))"
                gradientId="areaSaldo"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <LineChartCard
                title="Evolução por Porte"
                description="Crescimento trimestral por categoria"
              />
              <BarChartCard
                title="Comparativo Mensal"
                description="Aberturas e fechamentos detalhados"
              />
            </div>
          </TabsContent>

          {/* Setorial Analysis Tab */}
          <TabsContent value="setorial" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <HorizontalBarChart
                title="Empresas por Setor"
                description="Distribuição setorial completa"
              />
              <PieChartCard
                title="Participação Setorial"
                description="Proporção por porte empresarial"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <AreaChartCard
                title="Tendência - Comércio"
                dataKey="aberturas"
                color="hsl(var(--chart-1))"
                gradientId="areaComercio"
              />
              <AreaChartCard
                title="Tendência - Serviços"
                dataKey="saldoLiquido"
                color="hsl(var(--chart-2))"
                gradientId="areaServicos"
              />
              <AreaChartCard
                title="Tendência - Tecnologia"
                dataKey="aberturas"
                color="hsl(var(--chart-3))"
                gradientId="areaTech"
              />
            </div>
          </TabsContent>

          {/* Geographic Analysis Tab */}
          <TabsContent value="geografica" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="h-[400px] bg-card rounded-xl border flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Mapa Interativo
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Visualização geográfica será implementada na Sprint 4
                    </p>
                  </div>
                </div>
              </div>
              <MunicipalRankingCard
                title="Ranking por Empresas"
                description="Municípios com mais empresas ativas"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <BarChartCard
                title="Concentração por Região"
                description="Distribuição geográfica das empresas"
              />
              <LineChartCard
                title="Evolução Regional"
                description="Crescimento trimestral por região"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
