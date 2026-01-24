import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { municipios, setores } from "@/data/mockData";

export interface FilterState {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  municipio: string;
  setor: string;
  periodo: string;
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const periodos = [
  { value: "3m", label: "Últimos 3 meses" },
  { value: "6m", label: "Últimos 6 meses" },
  { value: "12m", label: "Últimos 12 meses" },
  { value: "ytd", label: "Ano atual" },
  { value: "custom", label: "Personalizado" },
];

export function DashboardFilters({ filters, onFiltersChange }: DashboardFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount = [
    filters.municipio !== "todos",
    filters.setor !== "todos",
    filters.periodo !== "12m",
  ].filter(Boolean).length;

  const handleReset = () => {
    onFiltersChange({
      dateRange: { from: undefined, to: undefined },
      municipio: "todos",
      setor: "todos",
      periodo: "12m",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Período */}
      <Select
        value={filters.periodo}
        onValueChange={(value) => onFiltersChange({ ...filters, periodo: value })}
      >
        <SelectTrigger className="w-[180px] bg-card">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          {periodos.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date Range (shown when custom period) */}
      {filters.periodo === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal bg-card",
                !filters.dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "dd/MM/yyyy")} -{" "}
                    {format(filters.dateRange.to, "dd/MM/yyyy")}
                  </>
                ) : (
                  format(filters.dateRange.from, "dd/MM/yyyy")
                )
              ) : (
                "Selecione o período"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange.from}
              selected={{
                from: filters.dateRange.from,
                to: filters.dateRange.to,
              }}
              onSelect={(range) =>
                onFiltersChange({
                  ...filters,
                  dateRange: { from: range?.from, to: range?.to },
                })
              }
              numberOfMonths={2}
              locale={ptBR}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}

      {/* Município */}
      <Select
        value={filters.municipio}
        onValueChange={(value) => onFiltersChange({ ...filters, municipio: value })}
      >
        <SelectTrigger className="w-[180px] bg-card">
          <SelectValue placeholder="Município" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os municípios</SelectItem>
          {municipios.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Setor */}
      <Select
        value={filters.setor}
        onValueChange={(value) => onFiltersChange({ ...filters, setor: value })}
      >
        <SelectTrigger className="w-[180px] bg-card">
          <SelectValue placeholder="Setor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os setores</SelectItem>
          {setores.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active filters badge */}
      {activeFiltersCount > 0 && (
        <Badge variant="secondary" className="gap-1">
          <Filter className="w-3 h-3" />
          {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""}
        </Badge>
      )}

      {/* Reset button */}
      {activeFiltersCount > 0 && (
        <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 px-2">
          <X className="w-4 h-4 mr-1" />
          Limpar
        </Button>
      )}
    </div>
  );
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: undefined, to: undefined },
    municipio: "todos",
    setor: "todos",
    periodo: "12m",
  });

  return { filters, setFilters };
}
