import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  MapPin,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
} from "recharts";

// Mock data for analysis
const growthAnalysisData = [
  { month: "Jan", crescimento: 12.4, meta: 10, empresasNovas: 892 },
  { month: "Fev", crescimento: 8.7, meta: 10, empresasNovas: 756 },
  { month: "Mar", crescimento: 15.2, meta: 10, empresasNovas: 1023 },
  { month: "Abr", crescimento: 11.8, meta: 10, empresasNovas: 934 },
  { month: "Mai", crescimento: 18.3, meta: 10, empresasNovas: 1156 },
  { month: "Jun", crescimento: 14.5, meta: 10, empresasNovas: 1087 },
];

const sectorComparisonData = [
  { setor: "Comércio", atual: 18234, anterior: 16890, crescimento: 7.9 },
  { setor: "Serviços", atual: 15678, anterior: 13950, crescimento: 12.4 },
  { setor: "Tecnologia", atual: 2156, anterior: 1680, crescimento: 28.3 },
  { setor: "Indústria", atual: 4532, anterior: 4395, crescimento: 3.1 },
  { setor: "Agronegócio", atual: 3890, anterior: 3358, crescimento: 15.8 },
  { setor: "Saúde", atual: 1987, anterior: 1817, crescimento: 9.4 },
];

const regionalPerformanceData = [
  { subject: "Teresina", A: 95, fullMark: 100 },
  { subject: "Parnaíba", A: 72, fullMark: 100 },
  { subject: "Picos", A: 68, fullMark: 100 },
  { subject: "Piripiri", A: 55, fullMark: 100 },
  { subject: "Floriano", A: 52, fullMark: 100 },
  { subject: "Campo Maior", A: 48, fullMark: 100 },
];

const survivalRateData = [
  { ano: "1 ano", taxa: 82, empresas: 4520 },
  { ano: "2 anos", taxa: 68, empresas: 3740 },
  { ano: "3 anos", taxa: 55, empresas: 3025 },
  { ano: "5 anos", taxa: 42, empresas: 2310 },
  { ano: "10 anos", taxa: 28, empresas: 1540 },
];

const employmentTrendData = [
  { periodo: "Q1 2024", formais: 165000, informais: 45000 },
  { periodo: "Q2 2024", formais: 172000, informais: 43000 },
  { periodo: "Q3 2024", formais: 178000, informais: 42000 },
  { periodo: "Q4 2024", formais: 185000, informais: 40000 },
  { periodo: "Q1 2025", formais: 189432, informais: 38500 },
];

const porteDistributionData = [
  { name: "MEI", value: 54.8, count: 28934, color: "hsl(var(--chart-1))" },
  { name: "ME", value: 29.7, count: 15678, color: "hsl(var(--chart-2))" },
  { name: "EPP", value: 10.3, count: 5432, color: "hsl(var(--chart-3))" },
  { name: "Médio", value: 4.1, count: 2156, color: "hsl(var(--chart-4))" },
  { name: "Grande", value: 1.1, count: 647, color: "hsl(var(--chart-5))" },
];

const topInsights = [
  {
    title: "Setor em Alta",
    description: "Tecnologia lidera crescimento com +28.3%",
    icon: Zap,
    trend: "up",
    value: "+28.3%",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Região Destaque",
    description: "Teresina concentra 53.8% das empresas",
    icon: MapPin,
    trend: "neutral",
    value: "53.8%",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Empregos Criados",
    description: "24.432 novos postos em 12 meses",
    icon: Users,
    trend: "up",
    value: "+24.4k",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    title: "Taxa de Mortalidade",
    description: "Redução de 3.2 pontos percentuais",
    icon: Target,
    trend: "down",
    value: "-3.2pp",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const comparativeMetrics = [
  { metric: "Crescimento Empresarial", piauí: 12.8, nordeste: 9.4, brasil: 8.2 },
  { metric: "Taxa de Formalização", piauí: 68.5, nordeste: 62.3, brasil: 71.8 },
  { metric: "Empregos por Empresa", piauí: 3.6, nordeste: 3.2, brasil: 4.1 },
  { metric: "Sobrevivência 5 anos", piauí: 42.0, nordeste: 38.5, brasil: 45.2 },
];

export default function Analises() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Análises Avançadas</h1>
          <p className="text-muted-foreground">
            Insights e tendências do cenário empresarial do Piauí
          </p>
        </div>

        {/* Top Insights Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {topInsights.map((insight, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${insight.bgColor}`}>
                    <insight.icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${insight.trend === 'up' ? 'text-emerald-600 bg-emerald-100' : insight.trend === 'down' ? 'text-amber-600 bg-amber-100' : 'text-blue-600 bg-blue-100'}`}
                  >
                    {insight.value}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-foreground">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analysis Tabs */}
        <Tabs defaultValue="crescimento" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="crescimento" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Crescimento</span>
            </TabsTrigger>
            <TabsTrigger value="setorial" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Setorial</span>
            </TabsTrigger>
            <TabsTrigger value="emprego" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Emprego</span>
            </TabsTrigger>
            <TabsTrigger value="comparativo" className="gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Comparativo</span>
            </TabsTrigger>
          </TabsList>

          {/* Crescimento Tab */}
          <TabsContent value="crescimento" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Crescimento vs Meta Mensal</CardTitle>
                  <CardDescription>Comparativo de crescimento real com metas estabelecidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={growthAnalysisData}>
                        <defs>
                          <linearGradient id="crescimentoGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`${value}%`, ""]}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="crescimento"
                          stroke="hsl(var(--chart-1))"
                          fill="url(#crescimentoGradient)"
                          strokeWidth={2}
                          name="Crescimento Real"
                        />
                        <Line
                          type="monotone"
                          dataKey="meta"
                          stroke="hsl(var(--chart-2))"
                          strokeDasharray="5 5"
                          strokeWidth={2}
                          dot={false}
                          name="Meta"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Taxa de Sobrevivência</CardTitle>
                  <CardDescription>Percentual de empresas ativas por tempo de existência</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={survivalRateData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                        <YAxis type="category" dataKey="ano" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={60} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          formatter={(value: number, name: string, props: any) => [
                            `${value}% (${props.payload.empresas.toLocaleString('pt-BR')} empresas)`,
                            "Taxa"
                          ]}
                        />
                        <Bar dataKey="taxa" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Regional Performance Radar */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Performance Regional</CardTitle>
                <CardDescription>Índice de desempenho empresarial por município (0-100)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={regionalPerformanceData}>
                      <PolarGrid className="stroke-muted" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar
                        name="Performance"
                        dataKey="A"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Setorial Tab */}
          <TabsContent value="setorial" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Comparativo Setorial</CardTitle>
                  <CardDescription>Evolução do número de empresas por setor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sectorComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="setor" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [value.toLocaleString('pt-BR'), ""]}
                        />
                        <Legend />
                        <Bar dataKey="anterior" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} name="Ano Anterior" />
                        <Bar dataKey="atual" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Atual" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Distribuição por Porte</CardTitle>
                  <CardDescription>Participação percentual por tamanho de empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={porteDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {porteDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} className="stroke-card stroke-2" />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          formatter={(value: number, name: string, props: any) => [
                            `${value}% (${props.payload.count.toLocaleString('pt-BR')} empresas)`,
                            name
                          ]}
                        />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sector Growth Rankings */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Ranking de Crescimento por Setor</CardTitle>
                <CardDescription>Taxa de crescimento anual comparada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorComparisonData
                    .sort((a, b) => b.crescimento - a.crescimento)
                    .map((sector, index) => (
                      <div key={sector.setor} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? "bg-yellow-500/20 text-yellow-600" :
                            index === 1 ? "bg-gray-300/30 text-gray-600" :
                              index === 2 ? "bg-orange-400/20 text-orange-600" :
                                "bg-muted text-muted-foreground"
                          }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{sector.setor}</span>
                            <span className={`text-sm font-semibold ${sector.crescimento > 10 ? 'text-emerald-600' : 'text-foreground'}`}>
                              +{sector.crescimento}%
                            </span>
                          </div>
                          <Progress value={sector.crescimento * 3} className="h-2" />
                        </div>
                        <div className="text-right min-w-[80px]">
                          <p className="text-sm text-muted-foreground">{sector.atual.toLocaleString('pt-BR')}</p>
                          <p className="text-xs text-muted-foreground">empresas</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emprego Tab */}
          <TabsContent value="emprego" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10">
                      <Users className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Empregos Formais</p>
                      <p className="text-2xl font-bold">189.432</p>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm">
                        <ArrowUpRight className="w-4 h-4" />
                        +6.1% vs ano anterior
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-amber-500/10">
                      <Building2 className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Média por Empresa</p>
                      <p className="text-2xl font-bold">3.58</p>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm">
                        <ArrowUpRight className="w-4 h-4" />
                        +0.3 vs ano anterior
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <TrendingUp className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Saldo 12 meses</p>
                      <p className="text-2xl font-bold">+24.432</p>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm">
                        <ArrowUpRight className="w-4 h-4" />
                        Admissões - Demissões
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Evolução do Emprego Formal vs Informal</CardTitle>
                <CardDescription>Tendência de formalização no mercado de trabalho</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={employmentTrendData}>
                      <defs>
                        <linearGradient id="formaisGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="informaisGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="periodo" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [value.toLocaleString('pt-BR'), ""]}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="formais"
                        stroke="hsl(var(--chart-1))"
                        fill="url(#formaisGradient)"
                        strokeWidth={2}
                        name="Empregos Formais"
                      />
                      <Area
                        type="monotone"
                        dataKey="informais"
                        stroke="hsl(var(--chart-4))"
                        fill="url(#informaisGradient)"
                        strokeWidth={2}
                        name="Empregos Informais"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comparativo Tab */}
          <TabsContent value="comparativo" className="space-y-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Piauí vs Nordeste vs Brasil</CardTitle>
                <CardDescription>Comparativo de indicadores econômicos empresariais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparativeMetrics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="metric" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={150} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="piauí" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} barSize={16} name="Piauí" />
                      <Bar dataKey="nordeste" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} barSize={16} name="Nordeste" />
                      <Bar dataKey="brasil" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} barSize={16} name="Brasil" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Table */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-lg">Detalhamento Comparativo</CardTitle>
                <CardDescription>Análise detalhada dos indicadores por região</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Indicador</th>
                        <th className="text-center py-3 px-4 font-semibold">Piauí</th>
                        <th className="text-center py-3 px-4 font-semibold">Nordeste</th>
                        <th className="text-center py-3 px-4 font-semibold">Brasil</th>
                        <th className="text-center py-3 px-4 font-semibold">Status PI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparativeMetrics.map((row, index) => {
                        const isBetter = row.piauí > row.nordeste;
                        const isBest = row.piauí >= row.brasil;
                        return (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{row.metric}</td>
                            <td className="text-center py-3 px-4 font-semibold text-primary">{row.piauí}%</td>
                            <td className="text-center py-3 px-4 text-muted-foreground">{row.nordeste}%</td>
                            <td className="text-center py-3 px-4 text-muted-foreground">{row.brasil}%</td>
                            <td className="text-center py-3 px-4">
                              <Badge variant={isBest ? "default" : isBetter ? "secondary" : "outline"}>
                                {isBest ? "Acima do Brasil" : isBetter ? "Acima NE" : "Abaixo"}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
