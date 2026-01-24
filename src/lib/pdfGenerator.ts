import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EmpresaCompleta } from "@/data/empresasMock";
import { kpisData, porteData, setorData, municipioData } from "@/data/mockData";

// Extend jsPDF type for autoTable
declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export interface ReportConfig {
  title: string;
  subtitle?: string;
  type: "empresas" | "indicadores" | "geografico" | "setorial" | "consolidado";
  filters?: Record<string, string>;
  data?: EmpresaCompleta[];
}

const COLORS = {
  primary: [14, 165, 233] as [number, number, number], // sky-500
  secondary: [100, 116, 139] as [number, number, number], // slate-500
  success: [34, 197, 94] as [number, number, number], // green-500
  warning: [245, 158, 11] as [number, number, number], // amber-500
  danger: [239, 68, 68] as [number, number, number], // red-500
  dark: [30, 41, 59] as [number, number, number], // slate-800
  light: [241, 245, 249] as [number, number, number], // slate-100
};

function addHeader(doc: jsPDF, title: string, subtitle?: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header background
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, pageWidth, 40, "F");
  
  // Logo/Brand
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("SEBRAE-PI", 14, 18);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Sistema de Inteligência de Mercado", 14, 26);
  
  // Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, 55);
  
  if (subtitle) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.secondary);
    doc.text(subtitle, 14, 62);
  }
  
  // Date
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.secondary);
  const date = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.text(`Gerado em: ${date}`, pageWidth - 14, 55, { align: "right" });
  
  return 70;
}

function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.secondary);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    doc.text(
      "SEBRAE-PI - Documento Confidencial",
      14,
      pageHeight - 10
    );
  }
}

function addFiltersSection(doc: jsPDF, filters: Record<string, string>, startY: number): number {
  if (Object.keys(filters).length === 0) return startY;
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Filtros Aplicados:", 14, startY);
  
  let y = startY + 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      doc.setTextColor(...COLORS.secondary);
      doc.text(`${key}: `, 14, y);
      doc.setTextColor(...COLORS.dark);
      doc.text(value, 50, y);
      y += 6;
    }
  });
  
  return y + 5;
}

export function generateEmpresasReport(config: ReportConfig): jsPDF {
  const doc = new jsPDF();
  let y = addHeader(doc, config.title, config.subtitle);
  
  if (config.filters) {
    y = addFiltersSection(doc, config.filters, y);
  }
  
  const empresas = config.data || [];
  
  // Summary
  doc.setFillColor(...COLORS.light);
  doc.roundedRect(14, y, 182, 25, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Resumo", 20, y + 8);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Total de empresas: ${empresas.length}`, 20, y + 16);
  doc.text(`Ativas: ${empresas.filter(e => e.situacao === "Ativa").length}`, 80, y + 16);
  doc.text(`Inativas: ${empresas.filter(e => e.situacao !== "Ativa").length}`, 130, y + 16);
  
  y += 35;
  
  // Table
  const tableData = empresas.slice(0, 100).map((empresa) => [
    empresa.cnpj,
    empresa.razaoSocial.substring(0, 30),
    empresa.situacao,
    empresa.porte,
    empresa.municipio,
    `R$ ${empresa.capitalSocial.toLocaleString("pt-BR")}`,
  ]);
  
  autoTable(doc, {
    startY: y,
    head: [["CNPJ", "Razão Social", "Situação", "Porte", "Município", "Capital Social"]],
    body: tableData,
    headStyles: {
      fillColor: COLORS.dark,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7,
      textColor: COLORS.dark,
    },
    alternateRowStyles: {
      fillColor: COLORS.light,
    },
    margin: { left: 14, right: 14 },
    styles: {
      cellPadding: 3,
      overflow: "linebreak",
    },
    columnStyles: {
      0: { cellWidth: 32 },
      1: { cellWidth: 50 },
      2: { cellWidth: 20 },
      3: { cellWidth: 25 },
      4: { cellWidth: 28 },
      5: { cellWidth: 27 },
    },
  });
  
  addFooter(doc);
  return doc;
}

export function generateIndicadoresReport(config: ReportConfig): jsPDF {
  const doc = new jsPDF();
  let y = addHeader(doc, config.title, config.subtitle);
  
  if (config.filters) {
    y = addFiltersSection(doc, config.filters, y);
  }
  
  // KPIs Grid
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Indicadores Principais", 14, y);
  y += 10;
  
  const kpis = kpisData;
  const kpiWidth = 42;
  const kpiHeight = 30;
  
  kpis.forEach((kpi, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const x = 14 + col * (kpiWidth + 4);
    const kpiY = y + row * (kpiHeight + 4);
    
    doc.setFillColor(...COLORS.light);
    doc.roundedRect(x, kpiY, kpiWidth, kpiHeight, 2, 2, "F");
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.secondary);
    doc.text(kpi.label, x + 3, kpiY + 8);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.dark);
    doc.text(kpi.value.toLocaleString("pt-BR"), x + 3, kpiY + 18);
    
    const change = ((kpi.value - kpi.previousValue) / kpi.previousValue) * 100;
    const changeColor = change >= 0 ? COLORS.success : COLORS.danger;
    doc.setFontSize(8);
    doc.setTextColor(...changeColor);
    doc.text(`${change >= 0 ? "+" : ""}${change.toFixed(1)}%`, x + 3, kpiY + 26);
  });
  
  y += Math.ceil(kpis.length / 4) * (kpiHeight + 4) + 15;
  
  // Setor Distribution Table
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Distribuição por Setor", 14, y);
  y += 8;
  
  const setorTableData = setorData.map((s) => [
    s.setor,
    s.quantidade.toLocaleString("pt-BR"),
    `${s.percentual.toFixed(1)}%`,
  ]);
  
  autoTable(doc, {
    startY: y,
    head: [["Setor", "Empresas", "Participação"]],
    body: setorTableData,
    headStyles: {
      fillColor: COLORS.primary,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.dark,
    },
    margin: { left: 14, right: 14 },
  });
  
  addFooter(doc);
  return doc;
}

export function generateGeograficoReport(config: ReportConfig): jsPDF {
  const doc = new jsPDF();
  let y = addHeader(doc, config.title, config.subtitle);
  
  if (config.filters) {
    y = addFiltersSection(doc, config.filters, y);
  }
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Distribuição por Município", 14, y);
  y += 8;
  
  const municipioTableData = municipioData.map((m) => [
    m.municipio,
    m.empresas.toLocaleString("pt-BR"),
    m.empregos.toLocaleString("pt-BR"),
    `R$ ${m.pib.toLocaleString("pt-BR")}`,
  ]);
  
  autoTable(doc, {
    startY: y,
    head: [["Município", "Empresas", "Empregos", "PIB (milhões)"]],
    body: municipioTableData,
    headStyles: {
      fillColor: COLORS.dark,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.dark,
    },
    alternateRowStyles: {
      fillColor: COLORS.light,
    },
    margin: { left: 14, right: 14 },
  });
  
  addFooter(doc);
  return doc;
}

export function generateSetorialReport(config: ReportConfig): jsPDF {
  const doc = new jsPDF();
  let y = addHeader(doc, config.title, config.subtitle);
  
  if (config.filters) {
    y = addFiltersSection(doc, config.filters, y);
  }
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Análise por Setor Econômico", 14, y);
  y += 8;
  
  const total = setorData.reduce((a, b) => a + b.quantidade, 0);
  
  const setorTableData = setorData.map((s) => [
    s.setor,
    s.quantidade.toLocaleString("pt-BR"),
    `${s.percentual.toFixed(1)}%`,
  ]);
  
  autoTable(doc, {
    startY: y,
    head: [["Setor", "Quantidade", "Participação"]],
    body: setorTableData,
    headStyles: {
      fillColor: COLORS.primary,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 10,
      textColor: COLORS.dark,
    },
    margin: { left: 14, right: 14 },
  });
  
  y = doc.lastAutoTable.finalY + 15;
  
  // Porte Distribution
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Distribuição por Porte", 14, y);
  y += 8;
  
  const porteTotal = porteData.reduce((a, b) => a + b.quantidade, 0);
  const porteTableData = porteData.map((p) => [
    p.porte,
    p.quantidade.toLocaleString("pt-BR"),
    `${p.percentual.toFixed(1)}%`,
  ]);
  
  autoTable(doc, {
    startY: y,
    head: [["Porte", "Quantidade", "Participação"]],
    body: porteTableData,
    headStyles: {
      fillColor: COLORS.success,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 10,
      textColor: COLORS.dark,
    },
    margin: { left: 14, right: 14 },
  });
  
  addFooter(doc);
  return doc;
}

export function generateConsolidadoReport(config: ReportConfig): jsPDF {
  const doc = new jsPDF();
  let y = addHeader(doc, config.title, config.subtitle);
  
  if (config.filters) {
    y = addFiltersSection(doc, config.filters, y);
  }
  
  // Executive Summary
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(14, y, 182, 35, 3, 3, "F");
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Sumário Executivo", 20, y + 10);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Este relatório apresenta uma visão consolidada dos principais indicadores",
    20,
    y + 20
  );
  doc.text(
    "econômicos e empresariais do estado do Piauí para o período selecionado.",
    20,
    y + 28
  );
  
  y += 45;
  
  // KPIs
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Indicadores-Chave de Desempenho (KPIs)", 14, y);
  y += 8;
  
  const kpiTableData = kpisData.map((kpi) => {
    const change = ((kpi.value - kpi.previousValue) / kpi.previousValue) * 100;
    return [
      kpi.label,
      kpi.value.toLocaleString("pt-BR"),
      `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
      change >= 0 ? "↑" : "↓",
    ];
  });
  
  autoTable(doc, {
    startY: y,
    head: [["Indicador", "Valor", "Variação", "Tendência"]],
    body: kpiTableData,
    headStyles: {
      fillColor: COLORS.dark,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.dark,
    },
    margin: { left: 14, right: 14 },
    columnStyles: {
      3: { halign: "center" },
    },
  });
  
  y = doc.lastAutoTable.finalY + 15;
  
  // Setorial
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Distribuição Setorial", 14, y);
  y += 8;
  
  const total = setorData.reduce((a, b) => a + b.quantidade, 0);
  const setorTableData = setorData.slice(0, 6).map((s) => [
    s.setor,
    s.quantidade.toLocaleString("pt-BR"),
    `${s.percentual.toFixed(1)}%`,
  ]);
  
  autoTable(doc, {
    startY: y,
    head: [["Setor", "Empresas", "%"]],
    body: setorTableData,
    headStyles: {
      fillColor: COLORS.primary,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.dark,
    },
    margin: { left: 14, right: 100 },
  });
  
  // Municipal Top 5
  const municipioTableData = municipioData.slice(0, 5).map((m) => [
    m.municipio,
    m.empresas.toLocaleString("pt-BR"),
  ]);
  
  autoTable(doc, {
    startY: y,
    head: [["Top 5 Municípios", "Empresas"]],
    body: municipioTableData,
    headStyles: {
      fillColor: COLORS.success,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.dark,
    },
    margin: { left: 110, right: 14 },
  });
  
  addFooter(doc);
  return doc;
}

export function generateReport(config: ReportConfig): jsPDF {
  switch (config.type) {
    case "empresas":
      return generateEmpresasReport(config);
    case "indicadores":
      return generateIndicadoresReport(config);
    case "geografico":
      return generateGeograficoReport(config);
    case "setorial":
      return generateSetorialReport(config);
    case "consolidado":
      return generateConsolidadoReport(config);
    default:
      return generateConsolidadoReport(config);
  }
}

export function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(`${filename}_${new Date().toISOString().split("T")[0]}.pdf`);
}
