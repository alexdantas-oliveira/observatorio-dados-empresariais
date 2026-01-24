import { type EmpresaCompleta } from "@/data/empresasMock";

export type ExportFormat = "csv" | "xlsx" | "json";

interface ExportOptions {
  data: EmpresaCompleta[];
  format: ExportFormat;
  filename?: string;
}

export function exportData({ data, format, filename = "empresas" }: ExportOptions): void {
  const timestamp = new Date().toISOString().split("T")[0];
  const fullFilename = `${filename}_${timestamp}`;

  switch (format) {
    case "csv":
      exportCSV(data, fullFilename);
      break;
    case "xlsx":
      exportXLSX(data, fullFilename);
      break;
    case "json":
      exportJSON(data, fullFilename);
      break;
  }
}

function exportCSV(data: EmpresaCompleta[], filename: string): void {
  const headers = [
    "CNPJ",
    "Razão Social",
    "Nome Fantasia",
    "Setor",
    "CNAE",
    "Porte",
    "Situação",
    "Município",
    "Bairro",
    "Endereço",
    "CEP",
    "Telefone",
    "Email",
    "Data Abertura",
    "Capital Social",
    "Empregados",
    "Simples Nacional",
    "MEI",
  ];

  const rows = data.map((emp) => [
    emp.cnpj,
    `"${emp.razaoSocial.replace(/"/g, '""')}"`,
    `"${emp.nomeFantasia.replace(/"/g, '""')}"`,
    emp.setor,
    emp.cnae,
    emp.porte,
    emp.situacao,
    emp.municipio,
    emp.bairro,
    `"${emp.endereco.replace(/"/g, '""')}"`,
    emp.cep,
    emp.telefone,
    emp.email,
    emp.dataAbertura,
    emp.capitalSocial.toFixed(2),
    emp.empregados,
    emp.optanteSimplesNacional ? "Sim" : "Não",
    emp.optanteMei ? "Sim" : "Não",
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map((row) => row.join(";")),
  ].join("\n");

  // Add BOM for Excel compatibility with UTF-8
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

function exportXLSX(data: EmpresaCompleta[], filename: string): void {
  // For XLSX, we'll create a CSV that Excel can open well
  // A proper XLSX would require a library like xlsx/exceljs
  // For now, export as CSV with Excel-friendly format
  exportCSV(data, filename);
}

function exportJSON(data: EmpresaCompleta[], filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  downloadBlob(blob, `${filename}.json`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
