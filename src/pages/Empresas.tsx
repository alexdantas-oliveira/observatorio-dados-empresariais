import { useState, useMemo, useCallback } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SearchBar } from "@/components/search/SearchBar";
import { AdvancedFilters } from "@/components/search/AdvancedFilters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Download,
  FileSpreadsheet,
  FileJson,
  Eye,
  Building2,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { empresasMock, type EmpresaCompleta } from "@/data/empresasMock";
import { type SearchInput, type FiltersInput, cleanCNPJ } from "@/lib/searchValidation";
import { exportData, type ExportFormat } from "@/lib/exportData";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SortField = "razaoSocial" | "municipio" | "setor" | "porte" | "dataAbertura" | "empregados";
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 15;

export default function Empresas() {
  const [search, setSearch] = useState<SearchInput>({ query: "", searchType: "all" });
  const [filters, setFilters] = useState<FiltersInput>({
    municipios: [],
    setores: [],
    portes: [],
    situacoes: [],
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("razaoSocial");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaCompleta | null>(null);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.municipios.length > 0) count++;
    if (filters.setores.length > 0) count++;
    if (filters.portes.length > 0) count++;
    if (filters.situacoes.length > 0) count++;
    if (filters.dataAberturaInicio) count++;
    if (filters.dataAberturaFim) count++;
    if (filters.capitalSocialMin !== undefined) count++;
    if (filters.capitalSocialMax !== undefined) count++;
    if (filters.empregadosMin !== undefined) count++;
    if (filters.empregadosMax !== undefined) count++;
    if (filters.optanteSimplesNacional !== undefined) count++;
    if (filters.optanteMei !== undefined) count++;
    return count;
  }, [filters]);

  // Filter and search empresas
  const filteredEmpresas = useMemo(() => {
    let result = [...empresasMock];

    // Apply search
    if (search.query) {
      const query = search.query.toLowerCase();
      const cleanQuery = cleanCNPJ(search.query);

      result = result.filter((emp) => {
        switch (search.searchType) {
          case "cnpj":
            return cleanCNPJ(emp.cnpj).includes(cleanQuery);
          case "razaoSocial":
            return emp.razaoSocial.toLowerCase().includes(query);
          case "nomeFantasia":
            return emp.nomeFantasia.toLowerCase().includes(query);
          default:
            return (
              cleanCNPJ(emp.cnpj).includes(cleanQuery) ||
              emp.razaoSocial.toLowerCase().includes(query) ||
              emp.nomeFantasia.toLowerCase().includes(query)
            );
        }
      });
    }

    // Apply filters
    if (filters.situacoes.length > 0) {
      result = result.filter((emp) => filters.situacoes.includes(emp.situacao));
    }
    if (filters.portes.length > 0) {
      result = result.filter((emp) => filters.portes.includes(emp.porte));
    }
    if (filters.setores.length > 0) {
      result = result.filter((emp) => filters.setores.includes(emp.setor));
    }
    if (filters.municipios.length > 0) {
      result = result.filter((emp) => filters.municipios.includes(emp.municipio));
    }
    if (filters.dataAberturaInicio) {
      result = result.filter(
        (emp) => new Date(emp.dataAbertura) >= filters.dataAberturaInicio!
      );
    }
    if (filters.dataAberturaFim) {
      result = result.filter(
        (emp) => new Date(emp.dataAbertura) <= filters.dataAberturaFim!
      );
    }
    if (filters.capitalSocialMin !== undefined) {
      result = result.filter((emp) => emp.capitalSocial >= filters.capitalSocialMin!);
    }
    if (filters.capitalSocialMax !== undefined) {
      result = result.filter((emp) => emp.capitalSocial <= filters.capitalSocialMax!);
    }
    if (filters.empregadosMin !== undefined) {
      result = result.filter((emp) => emp.empregados >= filters.empregadosMin!);
    }
    if (filters.empregadosMax !== undefined) {
      result = result.filter((emp) => emp.empregados <= filters.empregadosMax!);
    }
    if (filters.optanteSimplesNacional === true) {
      result = result.filter((emp) => emp.optanteSimplesNacional);
    }
    if (filters.optanteMei === true) {
      result = result.filter((emp) => emp.optanteMei);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "razaoSocial":
          comparison = a.razaoSocial.localeCompare(b.razaoSocial);
          break;
        case "municipio":
          comparison = a.municipio.localeCompare(b.municipio);
          break;
        case "setor":
          comparison = a.setor.localeCompare(b.setor);
          break;
        case "porte": {
          const porteOrder = { MEI: 1, ME: 2, EPP: 3, Médio: 4, Grande: 5 };
          comparison = porteOrder[a.porte] - porteOrder[b.porte];
          break;
        }
        case "dataAbertura":
          comparison = new Date(a.dataAbertura).getTime() - new Date(b.dataAbertura).getTime();
          break;
        case "empregados":
          comparison = a.empregados - b.empregados;
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [search, filters, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredEmpresas.length / ITEMS_PER_PAGE);
  const paginatedEmpresas = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmpresas.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmpresas, currentPage]);

  // Reset page when filters change
  const handleSearch = useCallback((newSearch: SearchInput) => {
    setSearch(newSearch);
    setCurrentPage(1);
  }, []);

  const handleFiltersChange = useCallback((newFilters: FiltersInput) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  // Export
  const handleExport = (format: ExportFormat) => {
    exportData({
      data: filteredEmpresas,
      format,
      filename: "empresas_piaui",
    });
  };

  // Status badge colors
  const situacaoColors: Record<string, string> = {
    Ativa: "bg-success/10 text-success border-success/20",
    Inativa: "bg-muted text-muted-foreground border-muted",
    Suspensa: "bg-warning/10 text-warning border-warning/20",
    Baixada: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <AppLayout title="Empresas">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Consulta de Empresas
            </h1>
            <p className="text-muted-foreground mt-1">
              Pesquise e filtre empresas do Piauí
            </p>
          </div>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exportar CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("xlsx")}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exportar Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("json")}>
                <FileJson className="w-4 h-4 mr-2" />
                Exportar JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onToggleFilters={() => setFiltersOpen(!filtersOpen)}
          filtersOpen={filtersOpen}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Advanced Filters */}
        {filtersOpen && (
          <AdvancedFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClose={() => setFiltersOpen(false)}
          />
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredEmpresas.length.toLocaleString("pt-BR")}
            </span>{" "}
            empresas encontradas
          </p>
          {(search.query || activeFiltersCount > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch({ query: "", searchType: "all" });
                setFilters({
                  municipios: [],
                  setores: [],
                  portes: [],
                  situacoes: [],
                });
              }}
            >
              Limpar busca e filtros
            </Button>
          )}
        </div>

        {/* Results Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[150px]">CNPJ</TableHead>
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => handleSort("razaoSocial")}
                  >
                    <div className="flex items-center">
                      Razão Social
                      <SortIcon field="razaoSocial" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => handleSort("municipio")}
                  >
                    <div className="flex items-center">
                      Município
                      <SortIcon field="municipio" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => handleSort("setor")}
                  >
                    <div className="flex items-center">
                      Setor
                      <SortIcon field="setor" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none"
                    onClick={() => handleSort("porte")}
                  >
                    <div className="flex items-center">
                      Porte
                      <SortIcon field="porte" />
                    </div>
                  </TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmpresas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Building2 className="w-10 h-10 text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                          Nenhuma empresa encontrada
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmpresas.map((empresa) => (
                    <TableRow key={empresa.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs">
                        {empresa.cnpj}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground truncate max-w-[250px]">
                            {empresa.razaoSocial}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {empresa.nomeFantasia}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{empresa.municipio}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {empresa.setor}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            empresa.porte === "MEI" && "bg-chart-1/10 text-chart-1",
                            empresa.porte === "ME" && "bg-chart-2/10 text-chart-2",
                            empresa.porte === "EPP" && "bg-chart-3/10 text-chart-3",
                            empresa.porte === "Médio" && "bg-chart-4/10 text-chart-4",
                            empresa.porte === "Grande" && "bg-chart-5/10 text-chart-5"
                          )}
                        >
                          {empresa.porte}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("text-xs", situacaoColors[empresa.situacao])}
                        >
                          {empresa.situacao}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedEmpresa(empresa)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber: number;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={cn(
                    currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Company Details Dialog */}
        <Dialog open={!!selectedEmpresa} onOpenChange={() => setSelectedEmpresa(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Detalhes da Empresa
              </DialogTitle>
            </DialogHeader>
            {selectedEmpresa && (
              <div className="space-y-6">
                {/* Header info */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-bold text-lg">{selectedEmpresa.razaoSocial}</h3>
                  <p className="text-muted-foreground">{selectedEmpresa.nomeFantasia}</p>
                  <p className="font-mono text-sm mt-1">{selectedEmpresa.cnpj}</p>
                </div>

                {/* Status badges */}
                <div className="flex gap-2 flex-wrap">
                  <Badge className={situacaoColors[selectedEmpresa.situacao]}>
                    {selectedEmpresa.situacao}
                  </Badge>
                  <Badge variant="secondary">{selectedEmpresa.porte}</Badge>
                  {selectedEmpresa.optanteSimplesNacional && (
                    <Badge variant="outline">Simples Nacional</Badge>
                  )}
                  {selectedEmpresa.optanteMei && (
                    <Badge variant="outline">MEI</Badge>
                  )}
                </div>

                {/* Details grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Setor</p>
                      <p className="font-medium">{selectedEmpresa.setor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">CNAE</p>
                      <p className="font-medium">{selectedEmpresa.cnae}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEmpresa.cnaeDescricao}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">
                        Natureza Jurídica
                      </p>
                      <p className="font-medium">{selectedEmpresa.naturezaJuridica}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">
                        Data de Abertura
                      </p>
                      <p className="font-medium">
                        {new Date(selectedEmpresa.dataAbertura).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Endereço</p>
                      <p className="font-medium">{selectedEmpresa.endereco}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEmpresa.bairro}, {selectedEmpresa.municipio} - PI
                      </p>
                      <p className="text-sm text-muted-foreground">
                        CEP: {selectedEmpresa.cep}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Contato</p>
                      <p className="font-medium">{selectedEmpresa.telefone}</p>
                      <p className="text-sm text-primary">{selectedEmpresa.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">
                        Capital Social
                      </p>
                      <p className="font-medium">
                        {selectedEmpresa.capitalSocial.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Empregados</p>
                      <p className="font-medium">{selectedEmpresa.empregados}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
