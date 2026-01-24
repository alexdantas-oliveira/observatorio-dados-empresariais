import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Check, X } from "lucide-react";
import type { AppRole } from "@/types/auth";

interface Permission {
  id: string;
  label: string;
  description: string;
}

const permissions: Permission[] = [
  { id: "view_dashboard", label: "Visualizar Dashboard", description: "Acesso ao painel principal" },
  { id: "view_executive", label: "Dashboard Executivo", description: "Acesso a indicadores avançados" },
  { id: "view_companies", label: "Consultar Empresas", description: "Busca e filtros de empresas" },
  { id: "view_map", label: "Mapa Interativo", description: "Visualização geográfica" },
  { id: "generate_reports", label: "Gerar Relatórios", description: "Criação de relatórios PDF" },
  { id: "schedule_reports", label: "Agendar Relatórios", description: "Agendamento automático" },
  { id: "export_data", label: "Exportar Dados", description: "Download em CSV/Excel" },
  { id: "manage_users", label: "Gerenciar Usuários", description: "Administrar contas" },
  { id: "change_permissions", label: "Alterar Permissões", description: "Modificar perfis de acesso" },
  { id: "view_audit_logs", label: "Ver Logs de Auditoria", description: "Histórico de ações" },
  { id: "system_settings", label: "Configurações do Sistema", description: "Parâmetros globais" },
];

const rolePermissions: Record<AppRole, string[]> = {
  admin: permissions.map((p) => p.id),
  gestor_publico: [
    "view_dashboard",
    "view_executive",
    "view_companies",
    "view_map",
    "generate_reports",
    "schedule_reports",
    "export_data",
    "view_audit_logs",
  ],
  tecnico_sebrae: [
    "view_dashboard",
    "view_executive",
    "view_companies",
    "view_map",
    "generate_reports",
    "schedule_reports",
    "export_data",
  ],
  analista: [
    "view_dashboard",
    "view_executive",
    "view_companies",
    "view_map",
    "generate_reports",
    "export_data",
  ],
  publico: [
    "view_dashboard",
    "view_map",
  ],
};

const roleLabels: Record<AppRole, string> = {
  admin: "Administrador",
  gestor_publico: "Gestor Público",
  tecnico_sebrae: "Técnico SEBRAE",
  analista: "Analista",
  publico: "Público",
};

const roleColors: Record<AppRole, string> = {
  admin: "bg-red-500",
  gestor_publico: "bg-purple-500",
  tecnico_sebrae: "bg-blue-500",
  analista: "bg-green-500",
  publico: "bg-gray-500",
};

export function PermissionsMatrix() {
  const roles: AppRole[] = ["admin", "gestor_publico", "tecnico_sebrae", "analista", "publico"];

  const hasPermission = (role: AppRole, permissionId: string) => {
    return rolePermissions[role].includes(permissionId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Matriz de Permissões
        </CardTitle>
        <CardDescription>
          Visualize as permissões de cada perfil de usuário
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Permissão</th>
                {roles.map((role) => (
                  <th key={role} className="text-center py-3 px-2">
                    <Badge
                      variant="outline"
                      className={`${roleColors[role]} text-white border-0`}
                    >
                      {roleLabels[role]}
                    </Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-2">
                    <div>
                      <p className="font-medium text-foreground">{permission.label}</p>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </td>
                  {roles.map((role) => (
                    <td key={`${permission.id}-${role}`} className="text-center py-3 px-2">
                      {hasPermission(role, permission.id) ? (
                        <div className="flex justify-center">
                          <div className="p-1 rounded-full bg-green-500/10">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="p-1 rounded-full bg-red-500/10">
                            <X className="h-4 w-4 text-red-400" />
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm font-medium mb-3">Legenda dos Perfis:</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {roles.map((role) => (
              <div key={role} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${roleColors[role]}`} />
                <span className="text-sm text-muted-foreground">{roleLabels[role]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
