import { useState, useCallback } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { searchSchema, type SearchInput } from "@/lib/searchValidation";

interface SearchBarProps {
  onSearch: (search: SearchInput) => void;
  onToggleFilters: () => void;
  filtersOpen: boolean;
  activeFiltersCount: number;
  className?: string;
}

export function SearchBar({
  onSearch,
  onToggleFilters,
  filtersOpen,
  activeFiltersCount,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchInput["searchType"]>("all");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(() => {
    const result = searchSchema.safeParse({ query, searchType });
    
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Erro na busca");
      return;
    }

    setError(null);
    onSearch(result.data);
  }, [query, searchType, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    setError(null);
    onSearch({ query: "", searchType: "all" });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        {/* Search Type Selector */}
        <Select
          value={searchType}
          onValueChange={(value) => setSearchType(value as SearchInput["searchType"])}
        >
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os campos</SelectItem>
            <SelectItem value="cnpj">CNPJ</SelectItem>
            <SelectItem value="razaoSocial">Razão Social</SelectItem>
            <SelectItem value="nomeFantasia">Nome Fantasia</SelectItem>
          </SelectContent>
        </Select>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={
              searchType === "cnpj"
                ? "Digite o CNPJ (com ou sem pontuação)"
                : searchType === "razaoSocial"
                ? "Digite a razão social..."
                : searchType === "nomeFantasia"
                ? "Digite o nome fantasia..."
                : "Buscar por CNPJ, razão social ou nome fantasia..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "pl-10 pr-10 bg-card",
              error && "border-destructive focus-visible:ring-destructive"
            )}
            maxLength={100}
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="gradient-primary text-white">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>

        {/* Filters Toggle */}
        <Button
          variant={filtersOpen ? "secondary" : "outline"}
          onClick={onToggleFilters}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
