import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  porteOptions,
  situacaoOptions,
  setorOptions,
  municipioOptions,
} from "@/data/empresasMock";
import type { FiltersInput } from "@/lib/searchValidation";

interface AdvancedFiltersProps {
  filters: FiltersInput;
  onFiltersChange: (filters: FiltersInput) => void;
  onClose: () => void;
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  onClose,
}: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FiltersInput>(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: FiltersInput = {
      municipios: [],
      setores: [],
      portes: [],
      situacoes: [],
      dataAberturaInicio: undefined,
      dataAberturaFim: undefined,
      capitalSocialMin: undefined,
      capitalSocialMax: undefined,
      empregadosMin: undefined,
      empregadosMax: undefined,
      optanteSimplesNacional: undefined,
      optanteMei: undefined,
    };
    setLocalFilters(emptyFilters);
  };

  const toggleArrayValue = (
    key: "municipios" | "setores" | "portes" | "situacoes",
    value: string
  ) => {
    const current = localFilters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setLocalFilters({ ...localFilters, [key]: updated });
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filtros Avançados</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Situação */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Situação Cadastral</Label>
          <div className="flex flex-wrap gap-2">
            {situacaoOptions.map((option) => (
              <Badge
                key={option.value}
                variant={
                  localFilters.situacoes?.includes(option.value)
                    ? "default"
                    : "outline"
                }
                className={cn(
                  "cursor-pointer transition-colors",
                  localFilters.situacoes?.includes(option.value)
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-muted"
                )}
                onClick={() => toggleArrayValue("situacoes", option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Porte */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Porte da Empresa</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {porteOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors",
                  localFilters.portes?.includes(option.value)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                )}
                onClick={() => toggleArrayValue("portes", option.value)}
              >
                <Checkbox
                  checked={localFilters.portes?.includes(option.value)}
                  className="pointer-events-none"
                />
                <span className="text-sm">{option.value}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Setor */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Setor Econômico</Label>
          <div className="flex flex-wrap gap-2">
            {setorOptions.map((option) => (
              <Badge
                key={option.value}
                variant={
                  localFilters.setores?.includes(option.value)
                    ? "default"
                    : "outline"
                }
                className={cn(
                  "cursor-pointer transition-colors",
                  localFilters.setores?.includes(option.value)
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-muted"
                )}
                onClick={() => toggleArrayValue("setores", option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Município */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Município</Label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-32 overflow-y-auto">
            {municipioOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors text-xs",
                  localFilters.municipios?.includes(option.value)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                )}
                onClick={() => toggleArrayValue("municipios", option.value)}
              >
                <Checkbox
                  checked={localFilters.municipios?.includes(option.value)}
                  className="pointer-events-none h-3 w-3"
                />
                <span className="truncate">{option.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Data de Abertura */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Data de Abertura</Label>
          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <Label className="text-xs text-muted-foreground">De</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !localFilters.dataAberturaInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {localFilters.dataAberturaInicio ? (
                      format(localFilters.dataAberturaInicio, "dd/MM/yyyy")
                    ) : (
                      "Selecione"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={localFilters.dataAberturaInicio}
                    onSelect={(date) =>
                      setLocalFilters({ ...localFilters, dataAberturaInicio: date })
                    }
                    locale={ptBR}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 space-y-1">
              <Label className="text-xs text-muted-foreground">Até</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !localFilters.dataAberturaFim && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {localFilters.dataAberturaFim ? (
                      format(localFilters.dataAberturaFim, "dd/MM/yyyy")
                    ) : (
                      "Selecione"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={localFilters.dataAberturaFim}
                    onSelect={(date) =>
                      setLocalFilters({ ...localFilters, dataAberturaFim: date })
                    }
                    locale={ptBR}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <Separator />

        {/* Capital Social & Empregados */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Capital Social (R$)</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Mínimo"
                value={localFilters.capitalSocialMin || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    capitalSocialMin: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="flex-1"
              />
              <span className="text-muted-foreground">a</span>
              <Input
                type="number"
                placeholder="Máximo"
                value={localFilters.capitalSocialMax || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    capitalSocialMax: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Nº de Empregados</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Mínimo"
                value={localFilters.empregadosMin || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    empregadosMin: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="flex-1"
              />
              <span className="text-muted-foreground">a</span>
              <Input
                type="number"
                placeholder="Máximo"
                value={localFilters.empregadosMax || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    empregadosMax: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Opções fiscais */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Opções Fiscais</Label>
          <div className="flex gap-4">
            <div
              className={cn(
                "flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors",
                localFilters.optanteSimplesNacional === true
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              )}
              onClick={() =>
                setLocalFilters({
                  ...localFilters,
                  optanteSimplesNacional:
                    localFilters.optanteSimplesNacional === true ? undefined : true,
                })
              }
            >
              <Checkbox
                checked={localFilters.optanteSimplesNacional === true}
                className="pointer-events-none"
              />
              <span className="text-sm">Optante Simples Nacional</span>
            </div>
            <div
              className={cn(
                "flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors",
                localFilters.optanteMei === true
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              )}
              onClick={() =>
                setLocalFilters({
                  ...localFilters,
                  optanteMei: localFilters.optanteMei === true ? undefined : true,
                })
              }
            >
              <Checkbox
                checked={localFilters.optanteMei === true}
                className="pointer-events-none"
              />
              <span className="text-sm">Optante MEI</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
          <Button onClick={handleApply} className="flex-1 gradient-primary text-white">
            Aplicar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
