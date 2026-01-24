// Dados geográficos dos municípios do Piauí com coordenadas e estatísticas

export interface MunicipioData {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  populacao: number;
  empresasAtivas: number;
  empresasInativas: number;
  empregos: number;
  pibPerCapita: number;
  setorPredominante: string;
  idhm: number;
}

export const municipiosPI: MunicipioData[] = [
  {
    id: "PI001",
    nome: "Teresina",
    latitude: -5.0892,
    longitude: -42.8016,
    populacao: 868075,
    empresasAtivas: 45230,
    empresasInativas: 12540,
    empregos: 185420,
    pibPerCapita: 24850,
    setorPredominante: "Serviços",
    idhm: 0.751
  },
  {
    id: "PI002",
    nome: "Parnaíba",
    latitude: -2.9055,
    longitude: -41.7732,
    populacao: 153078,
    empresasAtivas: 8920,
    empresasInativas: 2340,
    empregos: 28450,
    pibPerCapita: 15420,
    setorPredominante: "Turismo",
    idhm: 0.687
  },
  {
    id: "PI003",
    nome: "Picos",
    latitude: -7.0769,
    longitude: -41.4668,
    populacao: 78222,
    empresasAtivas: 5840,
    empresasInativas: 1560,
    empregos: 18920,
    pibPerCapita: 18340,
    setorPredominante: "Comércio",
    idhm: 0.698
  },
  {
    id: "PI004",
    nome: "Piripiri",
    latitude: -4.2724,
    longitude: -41.7768,
    populacao: 63752,
    empresasAtivas: 3420,
    empresasInativas: 890,
    empregos: 12340,
    pibPerCapita: 12890,
    setorPredominante: "Agropecuária",
    idhm: 0.652
  },
  {
    id: "PI005",
    nome: "Floriano",
    latitude: -6.7669,
    longitude: -43.0226,
    populacao: 59335,
    empresasAtivas: 4120,
    empresasInativas: 1120,
    empregos: 15670,
    pibPerCapita: 16780,
    setorPredominante: "Educação",
    idhm: 0.7
  },
  {
    id: "PI006",
    nome: "Campo Maior",
    latitude: -4.8277,
    longitude: -42.1687,
    populacao: 46833,
    empresasAtivas: 2890,
    empresasInativas: 780,
    empregos: 9840,
    pibPerCapita: 14560,
    setorPredominante: "Indústria",
    idhm: 0.656
  },
  {
    id: "PI007",
    nome: "Barras",
    latitude: -4.2446,
    longitude: -42.2929,
    populacao: 45786,
    empresasAtivas: 1890,
    empresasInativas: 520,
    empregos: 6780,
    pibPerCapita: 9870,
    setorPredominante: "Agropecuária",
    idhm: 0.598
  },
  {
    id: "PI008",
    nome: "Altos",
    latitude: -5.0388,
    longitude: -42.4606,
    populacao: 40759,
    empresasAtivas: 1560,
    empresasInativas: 420,
    empregos: 5230,
    pibPerCapita: 8920,
    setorPredominante: "Agropecuária",
    idhm: 0.614
  },
  {
    id: "PI009",
    nome: "José de Freitas",
    latitude: -4.7554,
    longitude: -42.5754,
    populacao: 39251,
    empresasAtivas: 1420,
    empresasInativas: 380,
    empregos: 4890,
    pibPerCapita: 8450,
    setorPredominante: "Agropecuária",
    idhm: 0.607
  },
  {
    id: "PI010",
    nome: "Pedro II",
    latitude: -4.4245,
    longitude: -41.4586,
    populacao: 38287,
    empresasAtivas: 1680,
    empresasInativas: 450,
    empregos: 5670,
    pibPerCapita: 10230,
    setorPredominante: "Mineração",
    idhm: 0.597
  },
  {
    id: "PI011",
    nome: "Oeiras",
    latitude: -6.9740,
    longitude: -42.1316,
    populacao: 36123,
    empresasAtivas: 2340,
    empresasInativas: 620,
    empregos: 8450,
    pibPerCapita: 13450,
    setorPredominante: "Serviços",
    idhm: 0.634
  },
  {
    id: "PI012",
    nome: "Esperantina",
    latitude: -3.9019,
    longitude: -42.2347,
    populacao: 39124,
    empresasAtivas: 1890,
    empresasInativas: 510,
    empregos: 6120,
    pibPerCapita: 9120,
    setorPredominante: "Agropecuária",
    idhm: 0.581
  },
  {
    id: "PI013",
    nome: "Corrente",
    latitude: -10.4397,
    longitude: -45.1619,
    populacao: 27048,
    empresasAtivas: 1450,
    empresasInativas: 390,
    empregos: 5230,
    pibPerCapita: 11890,
    setorPredominante: "Agropecuária",
    idhm: 0.642
  },
  {
    id: "PI014",
    nome: "Bom Jesus",
    latitude: -9.0744,
    longitude: -44.3586,
    populacao: 24060,
    empresasAtivas: 1890,
    empresasInativas: 480,
    empregos: 7890,
    pibPerCapita: 18920,
    setorPredominante: "Agronegócio",
    idhm: 0.668
  },
  {
    id: "PI015",
    nome: "Uruçuí",
    latitude: -7.2395,
    longitude: -44.5564,
    populacao: 22084,
    empresasAtivas: 2120,
    empresasInativas: 540,
    empregos: 9450,
    pibPerCapita: 42560,
    setorPredominante: "Agronegócio",
    idhm: 0.631
  },
  {
    id: "PI016",
    nome: "São Raimundo Nonato",
    latitude: -9.0152,
    longitude: -42.6989,
    populacao: 34702,
    empresasAtivas: 1780,
    empresasInativas: 460,
    empregos: 6780,
    pibPerCapita: 12340,
    setorPredominante: "Turismo",
    idhm: 0.612
  },
  {
    id: "PI017",
    nome: "Valença do Piauí",
    latitude: -6.4040,
    longitude: -41.7462,
    populacao: 20326,
    empresasAtivas: 1120,
    empresasInativas: 290,
    empregos: 4120,
    pibPerCapita: 11230,
    setorPredominante: "Comércio",
    idhm: 0.639
  },
  {
    id: "PI018",
    nome: "União",
    latitude: -4.5869,
    longitude: -42.8636,
    populacao: 44099,
    empresasAtivas: 1670,
    empresasInativas: 440,
    empregos: 5890,
    pibPerCapita: 9450,
    setorPredominante: "Agropecuária",
    idhm: 0.604
  },
  {
    id: "PI019",
    nome: "Água Branca",
    latitude: -5.8884,
    longitude: -42.6380,
    populacao: 17298,
    empresasAtivas: 890,
    empresasInativas: 230,
    empregos: 3120,
    pibPerCapita: 10780,
    setorPredominante: "Comércio",
    idhm: 0.621
  },
  {
    id: "PI020",
    nome: "Luís Correia",
    latitude: -2.8796,
    longitude: -41.6689,
    populacao: 30456,
    empresasAtivas: 1890,
    empresasInativas: 490,
    empregos: 7230,
    pibPerCapita: 13670,
    setorPredominante: "Turismo",
    idhm: 0.608
  }
];

// Estatísticas agregadas por setor
export interface SetorStats {
  setor: string;
  empresas: number;
  empregos: number;
  percentual: number;
  cor: string;
}

export const setoresStats: SetorStats[] = [
  { setor: "Serviços", empresas: 32450, empregos: 89340, percentual: 35.2, cor: "#3B82F6" },
  { setor: "Comércio", empresas: 28920, empregos: 65780, percentual: 31.4, cor: "#10B981" },
  { setor: "Agropecuária", empresas: 15670, empregos: 42340, percentual: 17.0, cor: "#F59E0B" },
  { setor: "Indústria", empresas: 8450, empregos: 34560, percentual: 9.2, cor: "#EF4444" },
  { setor: "Turismo", empresas: 4230, empregos: 18920, percentual: 4.6, cor: "#8B5CF6" },
  { setor: "Agronegócio", empresas: 2340, empregos: 12450, percentual: 2.6, cor: "#06B6D4" }
];

// Função para obter cor baseada na densidade de empresas
export function getDensityColor(empresasAtivas: number): string {
  if (empresasAtivas > 30000) return "#166534"; // green-800
  if (empresasAtivas > 10000) return "#16a34a"; // green-600
  if (empresasAtivas > 5000) return "#22c55e";  // green-500
  if (empresasAtivas > 2000) return "#4ade80";  // green-400
  if (empresasAtivas > 1000) return "#86efac";  // green-300
  return "#bbf7d0"; // green-200
}

// Função para obter cor baseada no PIB per capita
export function getPibColor(pibPerCapita: number): string {
  if (pibPerCapita > 30000) return "#1e40af"; // blue-800
  if (pibPerCapita > 20000) return "#2563eb"; // blue-600
  if (pibPerCapita > 15000) return "#3b82f6"; // blue-500
  if (pibPerCapita > 10000) return "#60a5fa"; // blue-400
  if (pibPerCapita > 8000) return "#93c5fd";  // blue-300
  return "#bfdbfe"; // blue-200
}

// Função para obter cor baseada no IDHM
export function getIdhmColor(idhm: number): string {
  if (idhm >= 0.7) return "#7c3aed";   // violet-600
  if (idhm >= 0.65) return "#8b5cf6";  // violet-500
  if (idhm >= 0.6) return "#a78bfa";   // violet-400
  if (idhm >= 0.55) return "#c4b5fd";  // violet-300
  return "#ddd6fe"; // violet-200
}
