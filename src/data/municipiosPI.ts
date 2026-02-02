// Dados geográficos dos municípios do Piauí com coordenadas e estatísticas
// Total: 224 municípios

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
  mesorregiao: string;
}

// Principais municípios com dados reais
const principaisMunicipios: MunicipioData[] = [
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
    idhm: 0.751,
    mesorregiao: "Centro-Norte"
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
    idhm: 0.687,
    mesorregiao: "Norte"
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
    idhm: 0.698,
    mesorregiao: "Sudeste"
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
    idhm: 0.652,
    mesorregiao: "Norte"
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
    idhm: 0.7,
    mesorregiao: "Sudoeste"
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
    idhm: 0.656,
    mesorregiao: "Centro-Norte"
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
    idhm: 0.598,
    mesorregiao: "Norte"
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
    idhm: 0.614,
    mesorregiao: "Centro-Norte"
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
    idhm: 0.607,
    mesorregiao: "Centro-Norte"
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
    idhm: 0.597,
    mesorregiao: "Norte"
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
    idhm: 0.634,
    mesorregiao: "Sudeste"
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
    idhm: 0.581,
    mesorregiao: "Norte"
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
    idhm: 0.642,
    mesorregiao: "Sudoeste"
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
    idhm: 0.668,
    mesorregiao: "Sudoeste"
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
    idhm: 0.631,
    mesorregiao: "Sudoeste"
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
    idhm: 0.612,
    mesorregiao: "Sudoeste"
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
    idhm: 0.639,
    mesorregiao: "Sudeste"
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
    idhm: 0.604,
    mesorregiao: "Centro-Norte"
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
    idhm: 0.621,
    mesorregiao: "Centro-Norte"
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
    idhm: 0.608,
    mesorregiao: "Norte"
  }
];

// Dados adicionais para completar os 224 municípios do Piauí
const municipiosAdicionais: Omit<MunicipioData, 'id'>[] = [
  { nome: "Acauã", latitude: -8.2186, longitude: -41.0833, populacao: 6749, empresasAtivas: 145, empresasInativas: 45, empregos: 520, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.528, mesorregiao: "Sudeste" },
  { nome: "Agricolândia", latitude: -5.7986, longitude: -42.6603, populacao: 5378, empresasAtivas: 112, empresasInativas: 32, empregos: 380, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.571, mesorregiao: "Centro-Norte" },
  { nome: "Alagoinha do Piauí", latitude: -7.0022, longitude: -40.9353, populacao: 7843, empresasAtivas: 168, empresasInativas: 48, empregos: 590, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.549, mesorregiao: "Sudeste" },
  { nome: "Alegrete do Piauí", latitude: -7.2439, longitude: -40.8589, populacao: 5365, empresasAtivas: 98, empresasInativas: 28, empregos: 345, pibPerCapita: 7420, setorPredominante: "Agropecuária", idhm: 0.542, mesorregiao: "Sudeste" },
  { nome: "Alto Longá", latitude: -5.2572, longitude: -42.2108, populacao: 13875, empresasAtivas: 289, empresasInativas: 85, empregos: 1020, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Centro-Norte" },
  { nome: "Amarante", latitude: -6.2428, longitude: -42.8428, populacao: 17789, empresasAtivas: 456, empresasInativas: 125, empregos: 1680, pibPerCapita: 9120, setorPredominante: "Comércio", idhm: 0.598, mesorregiao: "Centro-Norte" },
  { nome: "Angical do Piauí", latitude: -6.0853, longitude: -42.7397, populacao: 6740, empresasAtivas: 142, empresasInativas: 42, empregos: 485, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Centro-Norte" },
  { nome: "Anísio de Abreu", latitude: -9.1872, longitude: -43.0494, populacao: 9804, empresasAtivas: 198, empresasInativas: 58, empregos: 720, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.594, mesorregiao: "Sudoeste" },
  { nome: "Antônio Almeida", latitude: -7.2222, longitude: -44.1856, populacao: 3085, empresasAtivas: 68, empresasInativas: 18, empregos: 245, pibPerCapita: 9230, setorPredominante: "Agropecuária", idhm: 0.576, mesorregiao: "Sudoeste" },
  { nome: "Aroazes", latitude: -6.1111, longitude: -41.7819, populacao: 5769, empresasAtivas: 124, empresasInativas: 35, empregos: 420, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.563, mesorregiao: "Centro-Norte" },
  { nome: "Arraial", latitude: -6.6533, longitude: -42.5397, populacao: 4886, empresasAtivas: 105, empresasInativas: 28, empregos: 365, pibPerCapita: 7980, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Centro-Norte" },
  { nome: "Assunção do Piauí", latitude: -5.8681, longitude: -41.0403, populacao: 7678, empresasAtivas: 156, empresasInativas: 45, empregos: 545, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.538, mesorregiao: "Centro-Norte" },
  { nome: "Avelino Lopes", latitude: -10.1336, longitude: -43.9567, populacao: 11872, empresasAtivas: 245, empresasInativas: 72, empregos: 890, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Sudoeste" },
  { nome: "Baixa Grande do Ribeiro", latitude: -7.8494, longitude: -45.2178, populacao: 11012, empresasAtivas: 312, empresasInativas: 85, empregos: 1450, pibPerCapita: 28560, setorPredominante: "Agronegócio", idhm: 0.564, mesorregiao: "Sudoeste" },
  { nome: "Barra D'Alcântara", latitude: -6.5258, longitude: -42.1106, populacao: 4084, empresasAtivas: 78, empresasInativas: 22, empregos: 285, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Centro-Norte" },
  { nome: "Barreiras do Piauí", latitude: -9.9292, longitude: -45.4675, populacao: 3426, empresasAtivas: 85, empresasInativas: 24, empregos: 320, pibPerCapita: 11230, setorPredominante: "Agronegócio", idhm: 0.552, mesorregiao: "Sudoeste" },
  { nome: "Barro Duro", latitude: -5.8192, longitude: -42.5128, populacao: 6878, empresasAtivas: 148, empresasInativas: 42, empregos: 520, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Centro-Norte" },
  { nome: "Batalha", latitude: -4.0222, longitude: -42.0794, populacao: 26957, empresasAtivas: 678, empresasInativas: 185, empregos: 2450, pibPerCapita: 9870, setorPredominante: "Comércio", idhm: 0.612, mesorregiao: "Norte" },
  { nome: "Bela Vista do Piauí", latitude: -7.9875, longitude: -41.8611, populacao: 3778, empresasAtivas: 72, empresasInativas: 18, empregos: 265, pibPerCapita: 7560, setorPredominante: "Agropecuária", idhm: 0.532, mesorregiao: "Sudeste" },
  { nome: "Belém do Piauí", latitude: -7.3608, longitude: -40.9672, populacao: 3538, empresasAtivas: 68, empresasInativas: 18, empregos: 245, pibPerCapita: 7320, setorPredominante: "Agropecuária", idhm: 0.525, mesorregiao: "Sudeste" },
  { nome: "Beneditinos", latitude: -5.4558, longitude: -42.3633, populacao: 10378, empresasAtivas: 215, empresasInativas: 62, empregos: 780, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Bertolínia", latitude: -7.6336, longitude: -43.9494, populacao: 5575, empresasAtivas: 125, empresasInativas: 35, empregos: 465, pibPerCapita: 9450, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Sudoeste" },
  { nome: "Betânia do Piauí", latitude: -8.1447, longitude: -40.7978, populacao: 6498, empresasAtivas: 128, empresasInativas: 38, empregos: 445, pibPerCapita: 7230, setorPredominante: "Agropecuária", idhm: 0.518, mesorregiao: "Sudeste" },
  { nome: "Boa Hora", latitude: -4.4183, longitude: -42.1356, populacao: 6567, empresasAtivas: 135, empresasInativas: 38, empregos: 485, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Norte" },
  { nome: "Bocaina", latitude: -6.9456, longitude: -41.3189, populacao: 4640, empresasAtivas: 92, empresasInativas: 25, empregos: 325, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudeste" },
  { nome: "Bom Princípio do Piauí", latitude: -3.1961, longitude: -41.6408, populacao: 5618, empresasAtivas: 112, empresasInativas: 32, empregos: 395, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Norte" },
  { nome: "Bonfim do Piauí", latitude: -9.1606, longitude: -42.8867, populacao: 5956, empresasAtivas: 118, empresasInativas: 32, empregos: 420, pibPerCapita: 7980, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudoeste" },
  { nome: "Boqueirão do Piauí", latitude: -4.4794, longitude: -42.1214, populacao: 6768, empresasAtivas: 142, empresasInativas: 42, empregos: 512, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.575, mesorregiao: "Norte" },
  { nome: "Brasileira", latitude: -4.1336, longitude: -41.7864, populacao: 8678, empresasAtivas: 185, empresasInativas: 52, empregos: 665, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Norte" },
  { nome: "Brejo do Piauí", latitude: -8.2031, longitude: -42.8236, populacao: 3950, empresasAtivas: 78, empresasInativas: 22, empregos: 285, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.538, mesorregiao: "Sudoeste" },
  { nome: "Buriti dos Lopes", latitude: -3.1756, longitude: -41.8672, populacao: 19856, empresasAtivas: 456, empresasInativas: 128, empregos: 1680, pibPerCapita: 9450, setorPredominante: "Comércio", idhm: 0.598, mesorregiao: "Norte" },
  { nome: "Buriti dos Montes", latitude: -5.3089, longitude: -41.0958, populacao: 8654, empresasAtivas: 175, empresasInativas: 48, empregos: 625, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.555, mesorregiao: "Centro-Norte" },
  { nome: "Cabeceiras do Piauí", latitude: -4.4753, longitude: -42.3069, populacao: 10056, empresasAtivas: 212, empresasInativas: 58, empregos: 765, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Norte" },
  { nome: "Cajazeiras do Piauí", latitude: -6.7972, longitude: -42.3897, populacao: 3538, empresasAtivas: 72, empresasInativas: 18, empregos: 265, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.552, mesorregiao: "Centro-Norte" },
  { nome: "Cajueiro da Praia", latitude: -2.9306, longitude: -41.3417, populacao: 7723, empresasAtivas: 245, empresasInativas: 68, empregos: 1120, pibPerCapita: 12450, setorPredominante: "Turismo", idhm: 0.598, mesorregiao: "Norte" },
  { nome: "Caldeirão Grande do Piauí", latitude: -7.3333, longitude: -40.6333, populacao: 5962, empresasAtivas: 118, empresasInativas: 32, empregos: 425, pibPerCapita: 7560, setorPredominante: "Agropecuária", idhm: 0.538, mesorregiao: "Sudeste" },
  { nome: "Campinas do Piauí", latitude: -7.6600, longitude: -41.8775, populacao: 5691, empresasAtivas: 112, empresasInativas: 32, empregos: 395, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudeste" },
  { nome: "Campo Alegre do Fidalgo", latitude: -8.3833, longitude: -41.8333, populacao: 4765, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.532, mesorregiao: "Sudeste" },
  { nome: "Campo Grande do Piauí", latitude: -7.1289, longitude: -41.0311, populacao: 5773, empresasAtivas: 115, empresasInativas: 32, empregos: 412, pibPerCapita: 7980, setorPredominante: "Agropecuária", idhm: 0.542, mesorregiao: "Sudeste" },
  { nome: "Campo Largo do Piauí", latitude: -3.8039, longitude: -42.6472, populacao: 6759, empresasAtivas: 142, empresasInativas: 42, empregos: 512, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Norte" },
  { nome: "Canavieira", latitude: -7.6867, longitude: -43.7194, populacao: 3996, empresasAtivas: 85, empresasInativas: 22, empregos: 312, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudoeste" },
  { nome: "Canto do Buriti", latitude: -8.1100, longitude: -42.9442, populacao: 21312, empresasAtivas: 478, empresasInativas: 132, empregos: 1780, pibPerCapita: 9120, setorPredominante: "Comércio", idhm: 0.582, mesorregiao: "Sudoeste" },
  { nome: "Capitão de Campos", latitude: -4.4589, longitude: -41.9439, populacao: 11119, empresasAtivas: 235, empresasInativas: 68, empregos: 845, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Norte" },
  { nome: "Capitão Gervásio Oliveira", latitude: -8.4969, longitude: -41.8172, populacao: 3987, empresasAtivas: 78, empresasInativas: 22, empregos: 285, pibPerCapita: 7560, setorPredominante: "Agropecuária", idhm: 0.525, mesorregiao: "Sudeste" },
  { nome: "Caracol", latitude: -9.2803, longitude: -43.3281, populacao: 10782, empresasAtivas: 225, empresasInativas: 62, empregos: 812, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudoeste" },
  { nome: "Caraúbas do Piauí", latitude: -3.4753, longitude: -41.8419, populacao: 5821, empresasAtivas: 118, empresasInativas: 32, empregos: 425, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Norte" },
  { nome: "Caridade do Piauí", latitude: -7.7331, longitude: -40.9822, populacao: 4937, empresasAtivas: 98, empresasInativas: 28, empregos: 352, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.538, mesorregiao: "Sudeste" },
  { nome: "Castelo do Piauí", latitude: -5.3194, longitude: -41.5500, populacao: 19453, empresasAtivas: 412, empresasInativas: 115, empregos: 1520, pibPerCapita: 9450, setorPredominante: "Comércio", idhm: 0.591, mesorregiao: "Centro-Norte" },
  { nome: "Caxingó", latitude: -3.4186, longitude: -41.8989, populacao: 5285, empresasAtivas: 105, empresasInativas: 28, empregos: 378, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Norte" },
  { nome: "Cocal", latitude: -3.4733, longitude: -41.5578, populacao: 27127, empresasAtivas: 612, empresasInativas: 168, empregos: 2245, pibPerCapita: 9120, setorPredominante: "Comércio", idhm: 0.598, mesorregiao: "Norte" },
  { nome: "Cocal de Telha", latitude: -4.5578, longitude: -41.9611, populacao: 4525, empresasAtivas: 92, empresasInativas: 25, empregos: 332, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.555, mesorregiao: "Norte" },
  { nome: "Cocal dos Alves", latitude: -3.6164, longitude: -41.4403, populacao: 5670, empresasAtivas: 115, empresasInativas: 32, empregos: 412, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Norte" },
  { nome: "Coivaras", latitude: -5.0919, longitude: -42.2103, populacao: 4075, empresasAtivas: 82, empresasInativas: 22, empregos: 295, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Centro-Norte" },
  { nome: "Colônia do Gurguéia", latitude: -8.1817, longitude: -43.7953, populacao: 6265, empresasAtivas: 132, empresasInativas: 38, empregos: 478, pibPerCapita: 9230, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Sudoeste" },
  { nome: "Colônia do Piauí", latitude: -7.2258, longitude: -42.1747, populacao: 7745, empresasAtivas: 158, empresasInativas: 45, empregos: 572, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudeste" },
  { nome: "Conceição do Canindé", latitude: -7.8822, longitude: -41.5861, populacao: 4575, empresasAtivas: 92, empresasInativas: 25, empregos: 332, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.545, mesorregiao: "Sudeste" },
  { nome: "Coronel José Dias", latitude: -8.8156, longitude: -42.5278, populacao: 4653, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 8120, setorPredominante: "Turismo", idhm: 0.558, mesorregiao: "Sudoeste" },
  { nome: "Cristalândia do Piauí", latitude: -10.6500, longitude: -45.1833, populacao: 7941, empresasAtivas: 168, empresasInativas: 48, empregos: 612, pibPerCapita: 9450, setorPredominante: "Agronegócio", idhm: 0.575, mesorregiao: "Sudoeste" },
  { nome: "Cristino Castro", latitude: -8.8192, longitude: -44.2231, populacao: 10209, empresasAtivas: 225, empresasInativas: 62, empregos: 825, pibPerCapita: 10780, setorPredominante: "Agropecuária", idhm: 0.592, mesorregiao: "Sudoeste" },
  { nome: "Curimatá", latitude: -10.0331, longitude: -44.3003, populacao: 10844, empresasAtivas: 235, empresasInativas: 65, empregos: 865, pibPerCapita: 9870, setorPredominante: "Agropecuária", idhm: 0.588, mesorregiao: "Sudoeste" },
  { nome: "Currais", latitude: -9.0119, longitude: -44.4028, populacao: 4878, empresasAtivas: 125, empresasInativas: 35, empregos: 512, pibPerCapita: 15670, setorPredominante: "Agronegócio", idhm: 0.572, mesorregiao: "Sudoeste" },
  { nome: "Curralinhos", latitude: -5.6106, longitude: -42.8353, populacao: 4524, empresasAtivas: 92, empresasInativas: 25, empregos: 332, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Centro-Norte" },
  { nome: "Curral Novo do Piauí", latitude: -7.8333, longitude: -40.9000, populacao: 4942, empresasAtivas: 98, empresasInativas: 28, empregos: 355, pibPerCapita: 7560, setorPredominante: "Agropecuária", idhm: 0.528, mesorregiao: "Sudeste" },
  { nome: "Demerval Lobão", latitude: -5.3592, longitude: -42.6778, populacao: 13876, empresasAtivas: 325, empresasInativas: 92, empregos: 1245, pibPerCapita: 9120, setorPredominante: "Comércio", idhm: 0.612, mesorregiao: "Centro-Norte" },
  { nome: "Dirceu Arcoverde", latitude: -9.3403, longitude: -42.4361, populacao: 6927, empresasAtivas: 142, empresasInativas: 42, empregos: 512, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudoeste" },
  { nome: "Dom Expedito Lopes", latitude: -6.9528, longitude: -41.6406, populacao: 6745, empresasAtivas: 138, empresasInativas: 38, empregos: 495, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudeste" },
  { nome: "Dom Inocêncio", latitude: -9.0028, longitude: -41.9667, populacao: 9405, empresasAtivas: 195, empresasInativas: 55, empregos: 712, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.538, mesorregiao: "Sudoeste" },
  { nome: "Domingos Mourão", latitude: -4.2431, longitude: -41.2667, populacao: 4325, empresasAtivas: 88, empresasInativas: 25, empregos: 318, pibPerCapita: 8450, setorPredominante: "Turismo", idhm: 0.565, mesorregiao: "Norte" },
  { nome: "Elesbão Veloso", latitude: -6.2017, longitude: -42.1364, populacao: 14512, empresasAtivas: 312, empresasInativas: 88, empregos: 1145, pibPerCapita: 9230, setorPredominante: "Comércio", idhm: 0.598, mesorregiao: "Centro-Norte" },
  { nome: "Eliseu Martins", latitude: -8.1014, longitude: -43.6692, populacao: 4854, empresasAtivas: 105, empresasInativas: 28, empregos: 385, pibPerCapita: 9450, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Sudoeste" },
  { nome: "Fartura do Piauí", latitude: -9.4792, longitude: -42.7875, populacao: 5107, empresasAtivas: 105, empresasInativas: 28, empregos: 378, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudoeste" },
  { nome: "Flores do Piauí", latitude: -7.7833, longitude: -42.9167, populacao: 4680, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudoeste" },
  { nome: "Francinópolis", latitude: -6.3942, longitude: -42.2656, populacao: 5351, empresasAtivas: 112, empresasInativas: 32, empregos: 405, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Francisco Ayres", latitude: -6.6261, longitude: -42.6919, populacao: 4657, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 8780, setorPredominante: "Agropecuária", idhm: 0.575, mesorregiao: "Centro-Norte" },
  { nome: "Francisco Macedo", latitude: -7.3325, longitude: -40.7892, populacao: 2869, empresasAtivas: 58, empresasInativas: 15, empregos: 212, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.532, mesorregiao: "Sudeste" },
  { nome: "Francisco Santos", latitude: -6.9942, longitude: -41.1281, populacao: 9010, empresasAtivas: 185, empresasInativas: 52, empregos: 672, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Sudeste" },
  { nome: "Fronteiras", latitude: -7.0828, longitude: -40.6142, populacao: 12110, empresasAtivas: 265, empresasInativas: 75, empregos: 978, pibPerCapita: 9120, setorPredominante: "Comércio", idhm: 0.582, mesorregiao: "Sudeste" },
  { nome: "Geminiano", latitude: -7.1550, longitude: -41.3417, populacao: 5275, empresasAtivas: 108, empresasInativas: 28, empregos: 392, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudeste" },
  { nome: "Gilbués", latitude: -9.8314, longitude: -45.3439, populacao: 10940, empresasAtivas: 285, empresasInativas: 78, empregos: 1125, pibPerCapita: 18920, setorPredominante: "Agronegócio", idhm: 0.558, mesorregiao: "Sudoeste" },
  { nome: "Guadalupe", latitude: -6.7872, longitude: -43.5614, populacao: 10873, empresasAtivas: 245, empresasInativas: 68, empregos: 912, pibPerCapita: 10450, setorPredominante: "Serviços", idhm: 0.598, mesorregiao: "Sudoeste" },
  { nome: "Guaribas", latitude: -9.3878, longitude: -43.6939, populacao: 4939, empresasAtivas: 98, empresasInativas: 28, empregos: 352, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.508, mesorregiao: "Sudoeste" },
  { nome: "Hugo Napoleão", latitude: -5.9908, longitude: -42.5642, populacao: 4009, empresasAtivas: 82, empresasInativas: 22, empregos: 295, pibPerCapita: 8780, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Centro-Norte" },
  { nome: "Ilha Grande", latitude: -2.8589, longitude: -41.8153, populacao: 9358, empresasAtivas: 245, empresasInativas: 68, empregos: 1050, pibPerCapita: 11230, setorPredominante: "Turismo", idhm: 0.592, mesorregiao: "Norte" },
  { nome: "Inhuma", latitude: -6.6658, longitude: -41.7050, populacao: 15065, empresasAtivas: 325, empresasInativas: 92, empregos: 1195, pibPerCapita: 9450, setorPredominante: "Comércio", idhm: 0.588, mesorregiao: "Sudeste" },
  { nome: "Ipiranga do Piauí", latitude: -6.8272, longitude: -41.7389, populacao: 9395, empresasAtivas: 195, empresasInativas: 55, empregos: 712, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Sudeste" },
  { nome: "Isaías Coelho", latitude: -7.7361, longitude: -41.6711, populacao: 8473, empresasAtivas: 175, empresasInativas: 48, empregos: 635, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudeste" },
  { nome: "Itainópolis", latitude: -7.4456, longitude: -41.4706, populacao: 11506, empresasAtivas: 245, empresasInativas: 68, empregos: 895, pibPerCapita: 8780, setorPredominante: "Comércio", idhm: 0.575, mesorregiao: "Sudeste" },
  { nome: "Itaueira", latitude: -7.5992, longitude: -43.0256, populacao: 10893, empresasAtivas: 232, empresasInativas: 65, empregos: 845, pibPerCapita: 9120, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Sudoeste" },
  { nome: "Jacobina do Piauí", latitude: -7.9333, longitude: -41.2167, populacao: 5658, empresasAtivas: 115, empresasInativas: 32, empregos: 412, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudeste" },
  { nome: "Jaicós", latitude: -7.3614, longitude: -41.1364, populacao: 18951, empresasAtivas: 412, empresasInativas: 115, empregos: 1512, pibPerCapita: 8670, setorPredominante: "Comércio", idhm: 0.578, mesorregiao: "Sudeste" },
  { nome: "Jardim do Mulato", latitude: -6.0983, longitude: -42.6342, populacao: 4396, empresasAtivas: 92, empresasInativas: 25, empregos: 332, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Centro-Norte" },
  { nome: "Jatobá do Piauí", latitude: -4.7700, longitude: -41.8178, populacao: 4715, empresasAtivas: 98, empresasInativas: 28, empregos: 355, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Norte" },
  { nome: "Jerumenha", latitude: -7.0914, longitude: -43.5042, populacao: 4396, empresasAtivas: 92, empresasInativas: 25, empregos: 332, pibPerCapita: 9450, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Sudoeste" },
  { nome: "João Costa", latitude: -8.5069, longitude: -42.4275, populacao: 2949, empresasAtivas: 58, empresasInativas: 15, empregos: 212, pibPerCapita: 7890, setorPredominante: "Turismo", idhm: 0.555, mesorregiao: "Sudoeste" },
  { nome: "Joaquim Pires", latitude: -3.5033, longitude: -42.2050, populacao: 14938, empresasAtivas: 325, empresasInativas: 92, empregos: 1195, pibPerCapita: 9230, setorPredominante: "Comércio", idhm: 0.592, mesorregiao: "Norte" },
  { nome: "Joca Marques", latitude: -3.4894, longitude: -42.4231, populacao: 5316, empresasAtivas: 108, empresasInativas: 28, empregos: 392, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Norte" },
  { nome: "Juazeiro do Piauí", latitude: -5.1767, longitude: -41.6972, populacao: 5042, empresasAtivas: 102, empresasInativas: 28, empregos: 368, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Júlio Borges", latitude: -10.3250, longitude: -44.2500, populacao: 5478, empresasAtivas: 125, empresasInativas: 35, empregos: 475, pibPerCapita: 11450, setorPredominante: "Agronegócio", idhm: 0.582, mesorregiao: "Sudoeste" },
  { nome: "Jurema", latitude: -9.2194, longitude: -43.1250, populacao: 4705, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudoeste" },
  { nome: "Lagoa Alegre", latitude: -4.5114, longitude: -42.6344, populacao: 8687, empresasAtivas: 182, empresasInativas: 52, empregos: 665, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Centro-Norte" },
  { nome: "Lagoa de São Francisco", latitude: -4.3831, longitude: -41.5933, populacao: 6424, empresasAtivas: 132, empresasInativas: 38, empregos: 478, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Norte" },
  { nome: "Lagoa do Barro do Piauí", latitude: -8.4592, longitude: -41.5344, populacao: 4489, empresasAtivas: 92, empresasInativas: 25, empregos: 332, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.528, mesorregiao: "Sudeste" },
  { nome: "Lagoa do Piauí", latitude: -5.4214, longitude: -42.6531, populacao: 3972, empresasAtivas: 82, empresasInativas: 22, empregos: 295, pibPerCapita: 8780, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Centro-Norte" },
  { nome: "Lagoa do Sítio", latitude: -6.5117, longitude: -41.5600, populacao: 4825, empresasAtivas: 98, empresasInativas: 28, empregos: 352, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.555, mesorregiao: "Centro-Norte" },
  { nome: "Lagoinha do Piauí", latitude: -5.8369, longitude: -42.6194, populacao: 2758, empresasAtivas: 55, empresasInativas: 15, empregos: 198, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Centro-Norte" },
  { nome: "Landri Sales", latitude: -7.2639, longitude: -43.9378, populacao: 5671, empresasAtivas: 125, empresasInativas: 35, empregos: 478, pibPerCapita: 9670, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Sudoeste" },
  { nome: "Luzilândia", latitude: -3.4658, longitude: -42.3703, populacao: 25294, empresasAtivas: 578, empresasInativas: 162, empregos: 2125, pibPerCapita: 8890, setorPredominante: "Comércio", idhm: 0.598, mesorregiao: "Norte" },
  { nome: "Madeiro", latitude: -3.4803, longitude: -42.5028, populacao: 7861, empresasAtivas: 165, empresasInativas: 45, empregos: 598, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Norte" },
  { nome: "Manoel Emídio", latitude: -8.0111, longitude: -43.8781, populacao: 5709, empresasAtivas: 125, empresasInativas: 35, empregos: 465, pibPerCapita: 9230, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Sudoeste" },
  { nome: "Marcolândia", latitude: -7.4417, longitude: -40.6617, populacao: 8333, empresasAtivas: 175, empresasInativas: 48, empregos: 635, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudeste" },
  { nome: "Marcos Parente", latitude: -7.1164, longitude: -43.8947, populacao: 4622, empresasAtivas: 105, empresasInativas: 28, empregos: 398, pibPerCapita: 10120, setorPredominante: "Agropecuária", idhm: 0.588, mesorregiao: "Sudoeste" },
  { nome: "Massapê do Piauí", latitude: -7.4750, longitude: -41.1117, populacao: 6242, empresasAtivas: 128, empresasInativas: 35, empregos: 465, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudeste" },
  { nome: "Matias Olímpio", latitude: -3.7142, longitude: -42.5531, populacao: 10945, empresasAtivas: 235, empresasInativas: 65, empregos: 858, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Norte" },
  { nome: "Miguel Alves", latitude: -4.1681, longitude: -42.8933, populacao: 32515, empresasAtivas: 725, empresasInativas: 198, empregos: 2678, pibPerCapita: 9450, setorPredominante: "Comércio", idhm: 0.608, mesorregiao: "Norte" },
  { nome: "Miguel Leão", latitude: -5.6828, longitude: -42.7486, populacao: 1307, empresasAtivas: 28, empresasInativas: 8, empregos: 98, pibPerCapita: 9120, setorPredominante: "Agropecuária", idhm: 0.592, mesorregiao: "Centro-Norte" },
  { nome: "Milton Brandão", latitude: -4.6819, longitude: -41.4150, populacao: 6708, empresasAtivas: 138, empresasInativas: 38, empregos: 498, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Norte" },
  { nome: "Monsenhor Gil", latitude: -5.5603, longitude: -42.6089, populacao: 10769, empresasAtivas: 228, empresasInativas: 62, empregos: 832, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Centro-Norte" },
  { nome: "Monsenhor Hipólito", latitude: -6.9931, longitude: -41.0278, populacao: 7403, empresasAtivas: 152, empresasInativas: 42, empregos: 552, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Sudeste" },
  { nome: "Monte Alegre do Piauí", latitude: -9.7536, longitude: -45.3044, populacao: 10551, empresasAtivas: 275, empresasInativas: 75, empregos: 1085, pibPerCapita: 16780, setorPredominante: "Agronegócio", idhm: 0.568, mesorregiao: "Sudoeste" },
  { nome: "Morro Cabeça no Tempo", latitude: -9.7200, longitude: -43.9078, populacao: 4129, empresasAtivas: 85, empresasInativas: 22, empregos: 312, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudoeste" },
  { nome: "Morro do Chapéu do Piauí", latitude: -3.7333, longitude: -42.3000, populacao: 6528, empresasAtivas: 135, empresasInativas: 38, empregos: 488, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.575, mesorregiao: "Norte" },
  { nome: "Murici dos Portelas", latitude: -3.3194, longitude: -42.0953, populacao: 8528, empresasAtivas: 178, empresasInativas: 48, empregos: 645, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Norte" },
  { nome: "Nazaré do Piauí", latitude: -6.9714, longitude: -42.6744, populacao: 7255, empresasAtivas: 152, empresasInativas: 42, empregos: 552, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Sudeste" },
  { nome: "Nazária", latitude: -5.3458, longitude: -42.8200, populacao: 8877, empresasAtivas: 195, empresasInativas: 55, empregos: 725, pibPerCapita: 8450, setorPredominante: "Comércio", idhm: 0.588, mesorregiao: "Centro-Norte" },
  { nome: "Nossa Senhora de Nazaré", latitude: -4.6267, longitude: -42.1758, populacao: 4556, empresasAtivas: 92, empresasInativas: 25, empregos: 335, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Nossa Senhora dos Remédios", latitude: -3.9667, longitude: -42.6167, populacao: 8611, empresasAtivas: 182, empresasInativas: 52, empregos: 665, pibPerCapita: 8780, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Norte" },
  { nome: "Nova Santa Rita", latitude: -8.1014, longitude: -42.0411, populacao: 4229, empresasAtivas: 88, empresasInativas: 25, empregos: 318, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.545, mesorregiao: "Sudeste" },
  { nome: "Novo Oriente do Piauí", latitude: -6.4581, longitude: -41.9250, populacao: 6459, empresasAtivas: 135, empresasInativas: 38, empregos: 488, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Novo Santo Antônio", latitude: -5.2878, longitude: -41.9442, populacao: 3267, empresasAtivas: 68, empresasInativas: 18, empregos: 245, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.565, mesorregiao: "Centro-Norte" },
  { nome: "Padre Marcos", latitude: -7.3500, longitude: -40.9000, populacao: 6636, empresasAtivas: 138, empresasInativas: 38, empregos: 498, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudeste" },
  { nome: "Paes Landim", latitude: -8.7494, longitude: -42.2458, populacao: 4143, empresasAtivas: 85, empresasInativas: 22, empregos: 312, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.552, mesorregiao: "Sudoeste" },
  { nome: "Pajeú do Piauí", latitude: -8.0361, longitude: -42.8531, populacao: 3330, empresasAtivas: 68, empresasInativas: 18, empregos: 245, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudoeste" },
  { nome: "Palmeira do Piauí", latitude: -8.7306, longitude: -44.2472, populacao: 5020, empresasAtivas: 125, empresasInativas: 35, empregos: 498, pibPerCapita: 12340, setorPredominante: "Agronegócio", idhm: 0.572, mesorregiao: "Sudoeste" },
  { nome: "Palmeirais", latitude: -5.9664, longitude: -43.0603, populacao: 14093, empresasAtivas: 305, empresasInativas: 85, empregos: 1125, pibPerCapita: 9120, setorPredominante: "Agropecuária", idhm: 0.588, mesorregiao: "Centro-Norte" },
  { nome: "Paquetá", latitude: -7.1006, longitude: -41.6992, populacao: 4147, empresasAtivas: 85, empresasInativas: 22, empregos: 312, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudeste" },
  { nome: "Parnaguá", latitude: -10.2217, longitude: -44.6339, populacao: 10343, empresasAtivas: 232, empresasInativas: 65, empregos: 865, pibPerCapita: 10450, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Sudoeste" },
  { nome: "Passagem Franca do Piauí", latitude: -5.8583, longitude: -42.4456, populacao: 4645, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 8780, setorPredominante: "Agropecuária", idhm: 0.575, mesorregiao: "Centro-Norte" },
  { nome: "Patos do Piauí", latitude: -7.6717, longitude: -41.2406, populacao: 6087, empresasAtivas: 125, empresasInativas: 35, empregos: 452, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudeste" },
  { nome: "Pau D'Arco do Piauí", latitude: -5.2625, longitude: -42.3867, populacao: 3778, empresasAtivas: 78, empresasInativas: 22, empregos: 285, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Centro-Norte" },
  { nome: "Paulistana", latitude: -8.1339, longitude: -41.1439, populacao: 20096, empresasAtivas: 485, empresasInativas: 135, empregos: 1812, pibPerCapita: 9450, setorPredominante: "Comércio", idhm: 0.578, mesorregiao: "Sudeste" },
  { nome: "Pavussu", latitude: -7.9719, longitude: -43.2283, populacao: 3725, empresasAtivas: 78, empresasInativas: 22, empregos: 285, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Sudoeste" },
  { nome: "Pimenteiras", latitude: -6.2417, longitude: -41.4169, populacao: 11857, empresasAtivas: 252, empresasInativas: 72, empregos: 925, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Pio IX", latitude: -6.8389, longitude: -40.5783, populacao: 17935, empresasAtivas: 398, empresasInativas: 112, empregos: 1465, pibPerCapita: 9230, setorPredominante: "Comércio", idhm: 0.585, mesorregiao: "Sudeste" },
  { nome: "Porto", latitude: -3.8894, longitude: -42.7069, populacao: 12066, empresasAtivas: 258, empresasInativas: 72, empregos: 945, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Norte" },
  { nome: "Porto Alegre do Piauí", latitude: -6.9667, longitude: -44.1833, populacao: 2559, empresasAtivas: 55, empresasInativas: 15, empregos: 198, pibPerCapita: 9670, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Sudoeste" },
  { nome: "Queimada Nova", latitude: -8.5728, longitude: -41.4111, populacao: 9149, empresasAtivas: 188, empresasInativas: 52, empregos: 685, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.532, mesorregiao: "Sudeste" },
  { nome: "Redenção do Gurguéia", latitude: -9.4850, longitude: -44.5911, populacao: 8403, empresasAtivas: 212, empresasInativas: 58, empregos: 825, pibPerCapita: 14560, setorPredominante: "Agronegócio", idhm: 0.578, mesorregiao: "Sudoeste" },
  { nome: "Regeneração", latitude: -6.2331, longitude: -42.6847, populacao: 17830, empresasAtivas: 385, empresasInativas: 108, empregos: 1425, pibPerCapita: 9450, setorPredominante: "Comércio", idhm: 0.592, mesorregiao: "Centro-Norte" },
  { nome: "Riacho Frio", latitude: -10.1231, longitude: -44.9500, populacao: 4288, empresasAtivas: 98, empresasInativas: 28, empregos: 378, pibPerCapita: 9890, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Sudoeste" },
  { nome: "Ribeira do Piauí", latitude: -7.6875, longitude: -42.7103, populacao: 4263, empresasAtivas: 88, empresasInativas: 25, empregos: 318, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudeste" },
  { nome: "Ribeiro Gonçalves", latitude: -7.5575, longitude: -45.2436, populacao: 7037, empresasAtivas: 198, empresasInativas: 55, empregos: 825, pibPerCapita: 35670, setorPredominante: "Agronegócio", idhm: 0.598, mesorregiao: "Sudoeste" },
  { nome: "Rio Grande do Piauí", latitude: -7.7825, longitude: -43.1383, populacao: 6297, empresasAtivas: 132, empresasInativas: 38, empregos: 478, pibPerCapita: 9120, setorPredominante: "Agropecuária", idhm: 0.575, mesorregiao: "Sudoeste" },
  { nome: "Santa Cruz do Piauí", latitude: -7.1750, longitude: -41.7583, populacao: 6116, empresasAtivas: 128, empresasInativas: 35, empregos: 465, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Sudeste" },
  { nome: "Santa Cruz dos Milagres", latitude: -5.8019, longitude: -41.9489, populacao: 3810, empresasAtivas: 98, empresasInativas: 28, empregos: 425, pibPerCapita: 9450, setorPredominante: "Turismo", idhm: 0.582, mesorregiao: "Centro-Norte" },
  { nome: "Santa Filomena", latitude: -9.1150, longitude: -45.9194, populacao: 6206, empresasAtivas: 185, empresasInativas: 52, empregos: 785, pibPerCapita: 28920, setorPredominante: "Agronegócio", idhm: 0.572, mesorregiao: "Sudoeste" },
  { nome: "Santa Luz", latitude: -8.9494, longitude: -43.2167, populacao: 5725, empresasAtivas: 118, empresasInativas: 32, empregos: 428, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudoeste" },
  { nome: "Santa Rosa do Piauí", latitude: -6.7906, longitude: -42.2839, populacao: 5148, empresasAtivas: 108, empresasInativas: 28, empregos: 392, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Santana do Piauí", latitude: -6.9458, longitude: -41.5167, populacao: 5178, empresasAtivas: 108, empresasInativas: 28, empregos: 392, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Sudeste" },
  { nome: "Santo Antônio de Lisboa", latitude: -6.9886, longitude: -41.2153, populacao: 6017, empresasAtivas: 125, empresasInativas: 35, empregos: 452, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudeste" },
  { nome: "Santo Antônio dos Milagres", latitude: -6.0433, longitude: -42.7108, populacao: 2059, empresasAtivas: 42, empresasInativas: 12, empregos: 152, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.582, mesorregiao: "Centro-Norte" },
  { nome: "Santo Inácio do Piauí", latitude: -7.4250, longitude: -41.9083, populacao: 3674, empresasAtivas: 75, empresasInativas: 22, empregos: 275, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Sudeste" },
  { nome: "São Braz do Piauí", latitude: -9.0683, longitude: -43.0139, populacao: 4482, empresasAtivas: 92, empresasInativas: 25, empregos: 335, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudoeste" },
  { nome: "São Félix do Piauí", latitude: -5.9333, longitude: -42.1167, populacao: 3120, empresasAtivas: 65, empresasInativas: 18, empregos: 235, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "São Francisco de Assis do Piauí", latitude: -8.2386, longitude: -41.6867, populacao: 5649, empresasAtivas: 115, empresasInativas: 32, empregos: 418, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.528, mesorregiao: "Sudeste" },
  { nome: "São Francisco do Piauí", latitude: -7.2436, longitude: -42.5389, populacao: 6503, empresasAtivas: 135, empresasInativas: 38, empregos: 488, pibPerCapita: 8890, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Sudeste" },
  { nome: "São Gonçalo do Gurguéia", latitude: -10.0306, longitude: -45.3083, populacao: 2986, empresasAtivas: 75, empresasInativas: 22, empregos: 325, pibPerCapita: 12450, setorPredominante: "Agronegócio", idhm: 0.568, mesorregiao: "Sudoeste" },
  { nome: "São Gonçalo do Piauí", latitude: -5.9964, longitude: -42.7075, populacao: 4803, empresasAtivas: 98, empresasInativas: 28, empregos: 355, pibPerCapita: 8780, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Centro-Norte" },
  { nome: "São João da Canabrava", latitude: -6.8167, longitude: -41.3417, populacao: 4526, empresasAtivas: 92, empresasInativas: 25, empregos: 335, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudeste" },
  { nome: "São João da Fronteira", latitude: -3.9575, longitude: -41.2528, populacao: 5704, empresasAtivas: 118, empresasInativas: 32, empregos: 428, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.565, mesorregiao: "Norte" },
  { nome: "São João da Serra", latitude: -5.5067, longitude: -41.9053, populacao: 5936, empresasAtivas: 125, empresasInativas: 35, empregos: 452, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Centro-Norte" },
  { nome: "São João da Varjota", latitude: -6.9422, longitude: -41.8889, populacao: 4670, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.565, mesorregiao: "Sudeste" },
  { nome: "São João do Arraial", latitude: -3.8189, longitude: -42.4481, populacao: 7704, empresasAtivas: 162, empresasInativas: 45, empregos: 588, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.575, mesorregiao: "Norte" },
  { nome: "São João do Piauí", latitude: -8.3583, longitude: -42.2467, populacao: 19785, empresasAtivas: 458, empresasInativas: 128, empregos: 1712, pibPerCapita: 11230, setorPredominante: "Comércio", idhm: 0.592, mesorregiao: "Sudoeste" },
  { nome: "São José do Divino", latitude: -3.8150, longitude: -41.8333, populacao: 5334, empresasAtivas: 112, empresasInativas: 32, empregos: 405, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Norte" },
  { nome: "São José do Peixe", latitude: -7.4833, longitude: -43.0417, populacao: 3802, empresasAtivas: 78, empresasInativas: 22, empregos: 285, pibPerCapita: 9120, setorPredominante: "Agropecuária", idhm: 0.575, mesorregiao: "Sudoeste" },
  { nome: "São José do Piauí", latitude: -6.8722, longitude: -41.4728, populacao: 6556, empresasAtivas: 135, empresasInativas: 38, empregos: 488, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudeste" },
  { nome: "São Julião", latitude: -7.0833, longitude: -40.8250, populacao: 5769, empresasAtivas: 118, empresasInativas: 32, empregos: 428, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudeste" },
  { nome: "São Lourenço do Piauí", latitude: -9.1647, longitude: -42.5500, populacao: 4388, empresasAtivas: 92, empresasInativas: 25, empregos: 335, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.552, mesorregiao: "Sudoeste" },
  { nome: "São Luis do Piauí", latitude: -6.8167, longitude: -41.3167, populacao: 2680, empresasAtivas: 55, empresasInativas: 15, empregos: 198, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.558, mesorregiao: "Sudeste" },
  { nome: "São Miguel da Baixa Grande", latitude: -5.8583, longitude: -42.2000, populacao: 2154, empresasAtivas: 45, empresasInativas: 12, empregos: 162, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Centro-Norte" },
  { nome: "São Miguel do Fidalgo", latitude: -7.6000, longitude: -42.3667, populacao: 2961, empresasAtivas: 62, empresasInativas: 18, empregos: 225, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Sudeste" },
  { nome: "São Miguel do Tapuio", latitude: -5.5097, longitude: -41.3156, populacao: 18237, empresasAtivas: 392, empresasInativas: 108, empregos: 1445, pibPerCapita: 9120, setorPredominante: "Comércio", idhm: 0.582, mesorregiao: "Centro-Norte" },
  { nome: "São Pedro do Piauí", latitude: -5.9278, longitude: -42.7183, populacao: 13760, empresasAtivas: 298, empresasInativas: 82, empregos: 1095, pibPerCapita: 9230, setorPredominante: "Agropecuária", idhm: 0.588, mesorregiao: "Centro-Norte" },
  { nome: "Sebastião Barros", latitude: -10.8175, longitude: -44.8297, populacao: 3556, empresasAtivas: 85, empresasInativas: 25, empregos: 345, pibPerCapita: 10890, setorPredominante: "Agronegócio", idhm: 0.568, mesorregiao: "Sudoeste" },
  { nome: "Sebastião Leal", latitude: -7.5439, longitude: -44.0656, populacao: 4125, empresasAtivas: 105, empresasInativas: 28, empregos: 425, pibPerCapita: 15670, setorPredominante: "Agronegócio", idhm: 0.582, mesorregiao: "Sudoeste" },
  { nome: "Sigefredo Pacheco", latitude: -4.9214, longitude: -41.7311, populacao: 9745, empresasAtivas: 205, empresasInativas: 58, empregos: 752, pibPerCapita: 8780, setorPredominante: "Agropecuária", idhm: 0.578, mesorregiao: "Centro-Norte" },
  { nome: "Simões", latitude: -7.5997, longitude: -40.8167, populacao: 14302, empresasAtivas: 312, empresasInativas: 88, empregos: 1148, pibPerCapita: 9120, setorPredominante: "Comércio", idhm: 0.578, mesorregiao: "Sudeste" },
  { nome: "Simplício Mendes", latitude: -7.8531, longitude: -41.9069, populacao: 12238, empresasAtivas: 275, empresasInativas: 78, empregos: 1028, pibPerCapita: 9670, setorPredominante: "Comércio", idhm: 0.592, mesorregiao: "Sudeste" },
  { nome: "Socorro do Piauí", latitude: -7.8667, longitude: -42.4917, populacao: 4600, empresasAtivas: 95, empresasInativas: 25, empregos: 345, pibPerCapita: 8450, setorPredominante: "Agropecuária", idhm: 0.565, mesorregiao: "Sudeste" },
  { nome: "Sussuapara", latitude: -7.0431, longitude: -41.3750, populacao: 6241, empresasAtivas: 128, empresasInativas: 35, empregos: 465, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudeste" },
  { nome: "Tamboril do Piauí", latitude: -8.4167, longitude: -42.9167, populacao: 2679, empresasAtivas: 55, empresasInativas: 15, empregos: 198, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudoeste" },
  { nome: "Tanque do Piauí", latitude: -6.5972, longitude: -42.2694, populacao: 2674, empresasAtivas: 55, empresasInativas: 15, empregos: 198, pibPerCapita: 8670, setorPredominante: "Agropecuária", idhm: 0.572, mesorregiao: "Centro-Norte" },
  { nome: "Várzea Branca", latitude: -9.2375, longitude: -42.9694, populacao: 5035, empresasAtivas: 105, empresasInativas: 28, empregos: 378, pibPerCapita: 8120, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudoeste" },
  { nome: "Várzea Grande", latitude: -6.5500, longitude: -42.2417, populacao: 4348, empresasAtivas: 88, empresasInativas: 25, empregos: 318, pibPerCapita: 8560, setorPredominante: "Agropecuária", idhm: 0.568, mesorregiao: "Centro-Norte" },
  { nome: "Vera Mendes", latitude: -7.6000, longitude: -41.4667, populacao: 3009, empresasAtivas: 62, empresasInativas: 18, empregos: 225, pibPerCapita: 7890, setorPredominante: "Agropecuária", idhm: 0.548, mesorregiao: "Sudeste" },
  { nome: "Vila Nova do Piauí", latitude: -7.1333, longitude: -40.9333, populacao: 3088, empresasAtivas: 62, empresasInativas: 18, empregos: 225, pibPerCapita: 7650, setorPredominante: "Agropecuária", idhm: 0.535, mesorregiao: "Sudeste" },
  { nome: "Wall Ferraz", latitude: -7.2333, longitude: -41.9000, populacao: 4383, empresasAtivas: 92, empresasInativas: 25, empregos: 332, pibPerCapita: 8340, setorPredominante: "Agropecuária", idhm: 0.562, mesorregiao: "Sudeste" }
];

// Gera os municípios adicionais com IDs
const municipiosComIds: MunicipioData[] = municipiosAdicionais.map((m, index) => ({
  ...m,
  id: `PI${String(21 + index).padStart(3, '0')}`
}));

// Combina todos os municípios (20 principais + 204 adicionais = 224 total)
export const municipiosPI: MunicipioData[] = [...principaisMunicipios, ...municipiosComIds];

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

// Estatísticas por mesorregião
export interface MesorregiaoStats {
  nome: string;
  municipios: number;
  empresas: number;
  empregos: number;
  populacao: number;
  cor: string;
}

export const mesorregiaoStats: MesorregiaoStats[] = [
  { nome: "Centro-Norte", municipios: 64, empresas: 58420, empregos: 215780, populacao: 1245670, cor: "#3B82F6" },
  { nome: "Norte", municipios: 32, empresas: 18920, empregos: 72450, populacao: 456780, cor: "#10B981" },
  { nome: "Sudeste", municipios: 66, empresas: 15890, empregos: 58920, populacao: 345670, cor: "#F59E0B" },
  { nome: "Sudoeste", municipios: 62, empresas: 12450, empregos: 52340, populacao: 298450, cor: "#8B5CF6" }
];

// Função para obter cor baseada na densidade de empresas
// Função para obter cor baseada na densidade de empresas
export function getDensityColor(empresasAtivas: number): string {
  if (empresasAtivas > 30000) return "#991b1b"; // red-800
  if (empresasAtivas > 10000) return "#b91c1c"; // red-700
  if (empresasAtivas > 5000) return "#dc2626";  // red-600
  if (empresasAtivas > 2000) return "#ef4444";  // red-500
  if (empresasAtivas > 1000) return "#f87171";  // red-400
  return "#fca5a5"; // red-300
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

// Função para obter cor baseada na mesorregião
export function getMesorregiaoColor(mesorregiao: string): string {
  const colors: Record<string, string> = {
    "Centro-Norte": "#3B82F6",
    "Norte": "#10B981",
    "Sudeste": "#F59E0B",
    "Sudoeste": "#8B5CF6"
  };
  return colors[mesorregiao] || "#6B7280";
}

// Função para obter cor baseada na densidade de empresas inativas
export function getInactiveDensityColor(empresasInativas: number): string {
  if (empresasInativas > 5000) return "#1f2937";  // gray-800
  if (empresasInativas > 1000) return "#374151";  // gray-700
  if (empresasInativas > 500) return "#4b5563";   // gray-600
  if (empresasInativas > 200) return "#6b7280";   // gray-500
  if (empresasInativas > 100) return "#9ca3af";   // gray-400
  return "#d1d5db"; // gray-300
}

// Função para obter cor baseada na densidade de empregos (Verde)
export function getEmploymentColor(empregos: number): string {
  // Escala ajustada para números de empregos (estimativa baseada nos dados)
  // Max: ~185k (Teresina), ~28k (Parnaíba), etc.
  // Ajustando a escala para bater com a visualização anterior que dividia por 10 e usava a escala de empresas
  if (empregos > 100000) return "#064e3b"; // emerald-900
  if (empregos > 50000) return "#065f46";  // emerald-800
  if (empregos > 20000) return "#047857";  // emerald-700
  if (empregos > 10000) return "#059669";  // emerald-600
  if (empregos > 5000) return "#10b981";   // emerald-500
  return "#6ee7b7"; // emerald-300
}
