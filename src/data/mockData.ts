// Mock data for the Observatório de Dados Empresariais
// Sprint 2: Dashboard Executivo

export interface Empresa {
  id: string;
  razaoSocial: string;
  cnpj: string;
  setor: string;
  porte: "MEI" | "ME" | "EPP" | "Médio" | "Grande";
  municipio: string;
  dataAbertura: string;
  status: "Ativa" | "Inativa" | "Suspensa";
  empregados: number;
}

export interface KPIData {
  label: string;
  value: number;
  previousValue: number;
  unit?: string;
  format?: "number" | "currency" | "percent";
}

export interface TimeSeriesData {
  period: string;
  aberturas: number;
  fechamentos: number;
  saldoLiquido: number;
}

export interface SetorData {
  setor: string;
  quantidade: number;
  percentual: number;
  crescimento: number;
}

export interface MunicipioData {
  municipio: string;
  empresas: number;
  empregos: number;
  pib: number;
}

export interface PorteData {
  porte: string;
  quantidade: number;
  percentual: number;
  cor: string;
}

// Municípios do Piauí
export const municipios = [
  "Teresina",
  "Parnaíba",
  "Picos",
  "Piripiri",
  "Floriano",
  "Campo Maior",
  "Barras",
  "União",
  "Altos",
  "Esperantina",
  "Pedro II",
  "Oeiras",
  "José de Freitas",
  "Corrente",
  "São Raimundo Nonato",
];

// Setores econômicos
export const setores = [
  "Comércio",
  "Serviços",
  "Indústria",
  "Agronegócio",
  "Construção Civil",
  "Tecnologia",
  "Saúde",
  "Educação",
  "Alimentação",
  "Transporte",
  "Turismo",
  "Finanças",
];

// KPIs principais
export const kpisData: KPIData[] = [
  {
    label: "Empresas Ativas",
    value: 52847,
    previousValue: 48923,
    format: "number",
  },
  {
    label: "Novos Registros (Mês)",
    value: 1234,
    previousValue: 1089,
    format: "number",
  },
  {
    label: "Empregos Formais",
    value: 189432,
    previousValue: 178654,
    format: "number",
  },
  {
    label: "Faturamento Estimado",
    value: 2450000000,
    previousValue: 2180000000,
    format: "currency",
  },
  {
    label: "Taxa de Sobrevivência",
    value: 78.5,
    previousValue: 75.2,
    format: "percent",
    unit: "%",
  },
  {
    label: "Municípios Ativos",
    value: 87,
    previousValue: 87,
    format: "number",
  },
];

// Série temporal - últimos 12 meses
export const timeSeriesData: TimeSeriesData[] = [
  { period: "Jan/25", aberturas: 892, fechamentos: 234, saldoLiquido: 658 },
  { period: "Fev/25", aberturas: 756, fechamentos: 198, saldoLiquido: 558 },
  { period: "Mar/25", aberturas: 1023, fechamentos: 287, saldoLiquido: 736 },
  { period: "Abr/25", aberturas: 934, fechamentos: 312, saldoLiquido: 622 },
  { period: "Mai/25", aberturas: 1156, fechamentos: 256, saldoLiquido: 900 },
  { period: "Jun/25", aberturas: 1087, fechamentos: 298, saldoLiquido: 789 },
  { period: "Jul/25", aberturas: 978, fechamentos: 267, saldoLiquido: 711 },
  { period: "Ago/25", aberturas: 1234, fechamentos: 312, saldoLiquido: 922 },
  { period: "Set/25", aberturas: 1145, fechamentos: 289, saldoLiquido: 856 },
  { period: "Out/25", aberturas: 1298, fechamentos: 345, saldoLiquido: 953 },
  { period: "Nov/25", aberturas: 1187, fechamentos: 298, saldoLiquido: 889 },
  { period: "Dez/25", aberturas: 1345, fechamentos: 356, saldoLiquido: 989 },
];

// Dados por setor
export const setorData: SetorData[] = [
  { setor: "Comércio", quantidade: 18234, percentual: 34.5, crescimento: 8.2 },
  { setor: "Serviços", quantidade: 15678, percentual: 29.7, crescimento: 12.4 },
  { setor: "Indústria", quantidade: 4532, percentual: 8.6, crescimento: 3.1 },
  { setor: "Agronegócio", quantidade: 3890, percentual: 7.4, crescimento: 15.8 },
  { setor: "Construção Civil", quantidade: 3245, percentual: 6.1, crescimento: 5.7 },
  { setor: "Tecnologia", quantidade: 2156, percentual: 4.1, crescimento: 28.3 },
  { setor: "Saúde", quantidade: 1987, percentual: 3.8, crescimento: 9.4 },
  { setor: "Alimentação", quantidade: 1654, percentual: 3.1, crescimento: 7.6 },
  { setor: "Outros", quantidade: 1471, percentual: 2.7, crescimento: 4.2 },
];

// Dados por município (top 10)
export const municipioData: MunicipioData[] = [
  { municipio: "Teresina", empresas: 28456, empregos: 98234, pib: 18500 },
  { municipio: "Parnaíba", empresas: 4567, empregos: 15678, pib: 2800 },
  { municipio: "Picos", empresas: 3234, empregos: 11234, pib: 1950 },
  { municipio: "Piripiri", empresas: 1876, empregos: 6543, pib: 980 },
  { municipio: "Floriano", empresas: 1654, empregos: 5876, pib: 890 },
  { municipio: "Campo Maior", empresas: 1432, empregos: 4987, pib: 720 },
  { municipio: "Barras", empresas: 987, empregos: 3456, pib: 450 },
  { municipio: "União", empresas: 876, empregos: 2987, pib: 380 },
  { municipio: "Altos", empresas: 765, empregos: 2654, pib: 320 },
  { municipio: "Esperantina", empresas: 654, empregos: 2345, pib: 280 },
];

// Dados por porte
export const porteData: PorteData[] = [
  { porte: "MEI", quantidade: 28934, percentual: 54.8, cor: "hsl(var(--chart-1))" },
  { porte: "ME", quantidade: 15678, percentual: 29.7, cor: "hsl(var(--chart-2))" },
  { porte: "EPP", quantidade: 5432, percentual: 10.3, cor: "hsl(var(--chart-3))" },
  { porte: "Médio", quantidade: 2156, percentual: 4.1, cor: "hsl(var(--chart-4))" },
  { porte: "Grande", quantidade: 647, percentual: 1.1, cor: "hsl(var(--chart-5))" },
];

// Dados de evolução trimestral
export const evolutionData = [
  { trimestre: "Q1 2024", mei: 24500, me: 13200, epp: 4800, medio: 1900, grande: 580 },
  { trimestre: "Q2 2024", mei: 25800, me: 13800, epp: 4950, medio: 1980, grande: 595 },
  { trimestre: "Q3 2024", mei: 27200, me: 14500, epp: 5100, medio: 2050, grande: 615 },
  { trimestre: "Q4 2024", mei: 28100, me: 15100, epp: 5280, medio: 2100, grande: 635 },
  { trimestre: "Q1 2025", mei: 28934, me: 15678, epp: 5432, medio: 2156, grande: 647 },
];

// Atividades recentes
export const recentActivities = [
  {
    id: "1",
    text: "1.234 novas empresas registradas em janeiro",
    type: "success" as const,
    time: "Há 2 horas",
  },
  {
    id: "2",
    text: "Relatório mensal de Teresina disponível",
    type: "info" as const,
    time: "Há 4 horas",
  },
  {
    id: "3",
    text: "Setor de Tecnologia cresceu 28.3% no trimestre",
    type: "success" as const,
    time: "Há 6 horas",
  },
  {
    id: "4",
    text: "Atualização de dados do CAGED importada",
    type: "info" as const,
    time: "Há 8 horas",
  },
  {
    id: "5",
    text: "356 empresas encerraram atividades em dezembro",
    type: "warning" as const,
    time: "Há 12 horas",
  },
];

// Função para filtrar dados por período
export function filterByPeriod(data: TimeSeriesData[], months: number): TimeSeriesData[] {
  return data.slice(-months);
}

// Função para calcular variação percentual
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Função para formatar valores
export function formatValue(value: number, format: "number" | "currency" | "percent" = "number"): string {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value);
    case "percent":
      return `${value.toFixed(1)}%`;
    default:
      return new Intl.NumberFormat("pt-BR").format(value);
  }
}
