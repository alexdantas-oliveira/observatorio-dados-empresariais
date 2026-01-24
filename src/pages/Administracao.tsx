import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  UsersManagement,
  AuditLogsViewer,
  PermissionsMatrix,
  AdminStats,
} from "@/components/admin";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, Users, Shield, ScrollText, AlertTriangle } from "lucide-react";

export default function Administracao() {
  const { role } = useAuth();

  // Only admin can access this page
  if (role !== "admin") {
    return (
      <AppLayout title="Administração">
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Acesso Negado</AlertTitle>
          <AlertDescription>
            Você não tem permissão para acessar esta página. Apenas administradores podem gerenciar o sistema.
          </AlertDescription>
        </Alert>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Administração">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                Painel de Administração
              </h1>
            </div>
            <p className="text-muted-foreground">
              Gerencie usuários, permissões e monitore a atividade do sistema
            </p>
          </div>
          <Badge variant="outline" className="w-fit bg-red-500/10 text-red-500 border-red-500/20">
            <Shield className="h-3 w-3 mr-1" />
            Acesso Administrativo
          </Badge>
        </div>

        {/* Stats Overview */}
        <AdminStats />

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="users" className="gap-1.5">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="permissions" className="gap-1.5">
              <Shield className="h-4 w-4" />
              Permissões
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-1.5">
              <ScrollText className="h-4 w-4" />
              Auditoria
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>

          <TabsContent value="permissions">
            <PermissionsMatrix />
          </TabsContent>

          <TabsContent value="logs">
            <AuditLogsViewer />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
