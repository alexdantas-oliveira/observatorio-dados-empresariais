import { z } from "zod";

// Schema for search validation
export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .max(100, "A busca deve ter no máximo 100 caracteres")
    .optional(),
  searchType: z.enum(["all", "cnpj", "razaoSocial", "nomeFantasia"]).default("all"),
});

// Schema for advanced filters
export const filtersSchema = z.object({
  municipios: z.array(z.string()).default([]),
  setores: z.array(z.string()).default([]),
  portes: z.array(z.string()).default([]),
  situacoes: z.array(z.string()).default([]),
  dataAberturaInicio: z.date().optional(),
  dataAberturaFim: z.date().optional(),
  capitalSocialMin: z.number().min(0).optional(),
  capitalSocialMax: z.number().min(0).optional(),
  empregadosMin: z.number().min(0).optional(),
  empregadosMax: z.number().min(0).optional(),
  optanteSimplesNacional: z.boolean().optional(),
  optanteMei: z.boolean().optional(),
});

export type SearchInput = z.infer<typeof searchSchema>;
export type FiltersInput = z.infer<typeof filtersSchema>;

// CNPJ validation helper
export function isValidCNPJFormat(cnpj: string): boolean {
  // Remove non-numeric characters
  const cleanCnpj = cnpj.replace(/\D/g, "");
  return cleanCnpj.length === 14 || (cleanCnpj.length >= 3 && cleanCnpj.length <= 14);
}

// Format CNPJ for display
export function formatCNPJ(cnpj: string): string {
  const clean = cnpj.replace(/\D/g, "");
  if (clean.length !== 14) return cnpj;
  return clean.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

// Clean CNPJ for search
export function cleanCNPJ(cnpj: string): string {
  return cnpj.replace(/\D/g, "");
}
