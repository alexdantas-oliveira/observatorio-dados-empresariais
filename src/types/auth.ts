import type { User, Session } from "@supabase/supabase-js";

export type AppRole = "admin" | "gestor_publico" | "tecnico_sebrae" | "analista" | "publico";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  organization: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  assigned_at: string;
  assigned_by: string | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: AppRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Role hierarchy - lower number = higher privilege
export const ROLE_HIERARCHY: Record<AppRole, number> = {
  admin: 1,
  gestor_publico: 2,
  tecnico_sebrae: 3,
  analista: 4,
  publico: 5,
};

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Administrador",
  gestor_publico: "Gestor Público",
  tecnico_sebrae: "Técnico SEBRAE",
  analista: "Analista",
  publico: "Público",
};

export const ROLE_DESCRIPTIONS: Record<AppRole, string> = {
  admin: "Acesso total ao sistema",
  gestor_publico: "Acesso completo aos dados",
  tecnico_sebrae: "Acesso estratégico",
  analista: "Acesso avançado",
  publico: "Apenas dados agregados",
};

// Helper to check if a role has at least the required level
export function hasRoleLevel(userRole: AppRole | null, requiredRole: AppRole): boolean {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] <= ROLE_HIERARCHY[requiredRole];
}
