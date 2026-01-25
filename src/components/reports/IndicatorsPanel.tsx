import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Briefcase,
  MapPin,
  Factory,
  ShoppingCart,
  Wrench,
  Leaf,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

// Mock data for indicators
const kpiIndicators = [
  {
    id: "empresas-ativas",
    title: "Empresas Ativas",
    value: 52847,
    previousValue: 48923,
    icon: Building2,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    id: "novos-registros",
    title: "Novos Registros (Mês)",
    value: 1234,
    previousValue: 1089,
    icon: Briefcase,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: "empregos-formais",
    title: "Empregos Formais",
    value: 189432,
    previousValue: 178654,
    icon: Users,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: "municipios-ativos",
    title: "Municípios Ativos",
    value: 224,
    previousValue: 220,
    icon: MapPin,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
];

const setorIndicators = [
  { setor: "Comércio", empresas: 18234, crescimento: 8.2, icon: ShoppingCart },
  { setor: "Serviços", empresas: 15678, crescimento: 12.4, icon: Wrench },
  { setor: "Indústria", empresas: 4532, crescimento: 3.1, icon: Factory },
  { setor: "Agronegócio", empresas: 3890, crescimento: 15.8, icon: Leaf },
];

const evolutionData = [
  { mes: "Jul", aberturas: 892, fechamentos: 234 },
  { mes: "Ago", aberturas: 1023, fechamentos: 287 },
  { mes: "Set", aberturas: 934, fechamentos: 312 },
  { mes: "Out", aberturas: 1156, fechamentos: 256 },
  { mes: "Nov", aberturas: 1087, fechamentos: 298 },
  { mes: "Dez", aberturas: 1234, fechamentos: 312 },
];

const porteData = [
  { name: "MEI", value: 28934, color: "hsl(var(--chart-1))" },
  { name: "ME", value: 15678, color: "hsl(var(--chart-2))" },
  { name: "EPP", value: 5432, color: "hsl(var(--chart-3))" },
  { name: "Médio", value: 2156, color: "hsl(var(--chart-4))" },
  { name: "Grande", value: 647, color: "hsl(var(--chart-5))" },
];

const topMunicipios = [
  { municipio: "Teresina", empresas: 28456, percentual: 53.8 },
  { municipio: "Parnaíba", empresas: 4567, percentual: 8.6 },
  { municipio: "Picos", empresas: 3234, percentual: 6.1 },
  { municipio: "Piripiri", empresas: 1876, percentual: 3.5 },
  { municipio: "Floriano", empresas: 1654, percentual: 3.1 },
];

function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function IndicatorsPanel() {
  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiIndicators.map((kpi) => {
          const change = calculateChange(kpi.value, kpi.previousValue);
          const isPositive = change > 0;
          const Icon = kpi.icon;

          return (
            <Card key={kpi.id} className="card-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${kpi.bgColor}`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      isPositive
                        ? "text-success bg-success/10 border-success/20"
                        : "text-destructive bg-destructive/10 border-destructive/20"
                    }
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(change).toFixed(1)}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{formatNumber(kpi.value)}</p>
                <p className="text-sm text-muted-foreground mt-1">{kpi.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Evolution Chart */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Evolução Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="colorAberturas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFechamentos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="aberturas"
                    name="Aberturas"
                    stroke="hsl(var(--chart-1))"
                    fill="url(#colorAberturas)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="fechamentos"
                    name="Fechamentos"
                    stroke="hsl(var(--chart-5))"
                    fill="url(#colorFechamentos)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Porte Distribution */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribuição por Porte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={porteData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {porteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatNumber(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 min-w-[120px]">
                {porteData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sectors and Municipalities */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Setores */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Indicadores por Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {setorIndicators.map((setor) => {
                const Icon = setor.icon;
                return (
                  <div
                    key={setor.setor}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{setor.setor}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(setor.empresas)} empresas
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-success bg-success/10 border-success/20"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {setor.crescimento}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Municípios */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top 5 Municípios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topMunicipios} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis
                    dataKey="municipio"
                    type="category"
                    width={80}
                    className="text-xs"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatNumber(value)}
                  />
                  <Bar
                    dataKey="empresas"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
