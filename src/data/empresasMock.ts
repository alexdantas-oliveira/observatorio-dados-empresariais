// Extended mock data for companies listing
// Sprint 3: Pesquisa e Filtros Avançados

export interface EmpresaCompleta {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  setor: string;
  cnae: string;
  cnaeDescricao: string;
  porte: "MEI" | "ME" | "EPP" | "Médio" | "Grande";
  naturezaJuridica: string;
  municipio: string;
  bairro: string;
  endereco: string;
  cep: string;
  telefone: string;
  email: string;
  dataAbertura: string;
  dataSituacao: string;
  situacao: "Ativa" | "Inativa" | "Suspensa" | "Baixada";
  capitalSocial: number;
  empregados: number;
  optanteSimplesNacional: boolean;
  optanteMei: boolean;
}

// Generate a valid CNPJ format (not validated, just formatted)
function generateCNPJ(): string {
  const random = (n: number) => Math.floor(Math.random() * n);
  const n = Array(8).fill(0).map(() => random(10));
  const branch = [0, 0, 0, 1];
  return `${n.slice(0, 2).join("")}.${n.slice(2, 5).join("")}.${n.slice(5, 8).join("")}/${branch.join("")}-${random(10)}${random(10)}`;
}

// Generate mock companies
const nomesPrefixos = [
  "Comercial", "Distribuidora", "Serviços", "Consultoria", "Indústria",
  "Agropecuária", "Transportadora", "Construtora", "Clínica", "Escola",
  "Restaurante", "Padaria", "Farmácia", "Auto Peças", "Eletrônica",
  "Móveis", "Confecções", "Materiais", "Supermercado", "Posto"
];

const nomesSufixos = [
  "Brasil", "Piauí", "Nordeste", "Premium", "Express", "Plus", "Master",
  "Central", "União", "Real", "Continental", "Nacional", "Regional", "Prime"
];

const sobrenomes = [
  "Silva", "Santos", "Oliveira", "Souza", "Lima", "Pereira", "Costa",
  "Rodrigues", "Almeida", "Nascimento", "Carvalho", "Araújo", "Ribeiro"
];

const bairros = [
  "Centro", "Zona Norte", "Zona Sul", "Zona Leste", "Jóquei", "Fátima",
  "Primavera", "Satélite", "Dirceu", "Mocambinho", "Piçarra", "Vermelha"
];

const cnaes = [
  { codigo: "4711-3/02", descricao: "Comércio varejista de mercadorias em geral" },
  { codigo: "6201-5/01", descricao: "Desenvolvimento de software" },
  { codigo: "4723-7/00", descricao: "Comércio varejista de bebidas" },
  { codigo: "5611-2/01", descricao: "Restaurantes e similares" },
  { codigo: "4771-7/01", descricao: "Comércio varejista de produtos farmacêuticos" },
  { codigo: "4781-4/00", descricao: "Comércio varejista de artigos do vestuário" },
  { codigo: "4930-2/02", descricao: "Transporte rodoviário de carga" },
  { codigo: "4120-4/00", descricao: "Construção de edifícios" },
  { codigo: "8630-5/01", descricao: "Atividade médica ambulatorial" },
  { codigo: "0111-3/01", descricao: "Cultivo de arroz" },
];

const setoresMap: Record<string, string> = {
  "4711-3/02": "Comércio",
  "6201-5/01": "Tecnologia",
  "4723-7/00": "Comércio",
  "5611-2/01": "Alimentação",
  "4771-7/01": "Saúde",
  "4781-4/00": "Comércio",
  "4930-2/02": "Transporte",
  "4120-4/00": "Construção Civil",
  "8630-5/01": "Saúde",
  "0111-3/01": "Agronegócio",
};

const municipiosList = [
  "Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano",
  "Campo Maior", "Barras", "União", "Altos", "Esperantina",
  "Pedro II", "Oeiras", "José de Freitas", "Corrente", "São Raimundo Nonato"
];

const naturezasJuridicas = [
  "Empresário Individual",
  "Sociedade Limitada",
  "Sociedade Anônima",
  "EIRELI",
  "Microempreendedor Individual",
];

function generateRandomDate(startYear: number, endYear: number): string {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

function generateEmpresa(index: number): EmpresaCompleta {
  const cnae = cnaes[Math.floor(Math.random() * cnaes.length)];
  const municipio = municipiosList[Math.floor(Math.random() * municipiosList.length)];
  const porte = (["MEI", "ME", "EPP", "Médio", "Grande"] as const)[
    Math.floor(Math.random() * 5)
  ];
  const situacoes = (["Ativa", "Ativa", "Ativa", "Ativa", "Inativa", "Suspensa", "Baixada"] as const);
  const situacao = situacoes[Math.floor(Math.random() * situacoes.length)];

  const prefixo = nomesPrefixos[Math.floor(Math.random() * nomesPrefixos.length)];
  const sufixo = nomesSufixos[Math.floor(Math.random() * nomesSufixos.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

  const nomeFantasia = `${prefixo} ${sufixo}`;
  const razaoSocial = `${nomeFantasia} ${sobrenome} ${porte === "MEI" ? "" : "LTDA"}`.trim();

  const capitalBase = {
    MEI: 5000,
    ME: 50000,
    EPP: 500000,
    Médio: 2000000,
    Grande: 10000000,
  };

  const empregadosBase = {
    MEI: 0,
    ME: Math.floor(Math.random() * 10) + 1,
    EPP: Math.floor(Math.random() * 50) + 10,
    Médio: Math.floor(Math.random() * 200) + 50,
    Grande: Math.floor(Math.random() * 1000) + 200,
  };

  return {
    id: `emp-${String(index).padStart(6, "0")}`,
    cnpj: generateCNPJ(),
    razaoSocial,
    nomeFantasia,
    setor: setoresMap[cnae.codigo] || "Outros",
    cnae: cnae.codigo,
    cnaeDescricao: cnae.descricao,
    porte,
    naturezaJuridica: naturezasJuridicas[Math.floor(Math.random() * naturezasJuridicas.length)],
    municipio,
    bairro: bairros[Math.floor(Math.random() * bairros.length)],
    endereco: `Rua ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}, ${Math.floor(Math.random() * 2000) + 1}`,
    cep: `64${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
    telefone: `(86) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
    email: `contato@${nomeFantasia.toLowerCase().replace(/\s+/g, "")}.com.br`,
    dataAbertura: generateRandomDate(2010, 2025),
    dataSituacao: generateRandomDate(2020, 2025),
    situacao,
    capitalSocial: capitalBase[porte] * (Math.random() * 2 + 0.5),
    empregados: empregadosBase[porte],
    optanteSimplesNacional: porte !== "Grande" && Math.random() > 0.3,
    optanteMei: porte === "MEI",
  };
}

// Generate 500 mock companies
export const empresasMock: EmpresaCompleta[] = Array.from(
  { length: 500 },
  (_, i) => generateEmpresa(i + 1)
);

// Filter options
export const porteOptions = [
  { value: "MEI", label: "MEI - Microempreendedor Individual" },
  { value: "ME", label: "ME - Microempresa" },
  { value: "EPP", label: "EPP - Empresa de Pequeno Porte" },
  { value: "Médio", label: "Médio Porte" },
  { value: "Grande", label: "Grande Porte" },
];

export const situacaoOptions = [
  { value: "Ativa", label: "Ativa" },
  { value: "Inativa", label: "Inativa" },
  { value: "Suspensa", label: "Suspensa" },
  { value: "Baixada", label: "Baixada" },
];

export const setorOptions = [
  { value: "Comércio", label: "Comércio" },
  { value: "Serviços", label: "Serviços" },
  { value: "Tecnologia", label: "Tecnologia" },
  { value: "Saúde", label: "Saúde" },
  { value: "Alimentação", label: "Alimentação" },
  { value: "Transporte", label: "Transporte" },
  { value: "Construção Civil", label: "Construção Civil" },
  { value: "Agronegócio", label: "Agronegócio" },
  { value: "Outros", label: "Outros" },
];

export const municipioOptions = municipiosList.map((m) => ({ value: m, label: m }));
