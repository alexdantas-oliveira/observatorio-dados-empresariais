import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Search, Shield, Loader2, UserCog } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { AppRole } from "@/types/auth";

interface UserWithProfile {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  profile: {
    full_name: string | null;
    organization: string | null;
  } | null;
  role: AppRole;
}

const roleLabels: Record<AppRole, string> = {
  admin: "Administrador",
  gestor_publico: "Gestor Público",
  tecnico_sebrae: "Técnico SEBRAE",
  analista: "Analista",
  publico: "Público",
};

const roleColors: Record<AppRole, string> = {
  admin: "bg-red-500/10 text-red-500 border-red-500/20",
  gestor_publico: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  tecnico_sebrae: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  analista: "bg-green-500/10 text-green-500 border-green-500/20",
  publico: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export function UsersManagement() {
  const { user: currentUser, role: currentUserRole } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<AppRole>("publico");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // Fetch roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      // Map of known test user emails based on full_name
      const testUserEmails: Record<string, string> = {
        "Administrador Sistema": "admin@teste.com",
        "Maria Gestora": "gestor@teste.com",
        "João Técnico": "tecnico@teste.com",
        "Ana Analista": "analista@teste.com",
        "Carlos Público": "publico@teste.com",
      };

      // Combine data
      const usersData: UserWithProfile[] = profiles.map((profile) => {
        const userRole = roles.find((r) => r.user_id === profile.user_id);
        const email = profile.full_name && testUserEmails[profile.full_name]
          ? testUserEmails[profile.full_name]
          : `${profile.full_name?.toLowerCase().replace(/\s+/g, ".")}@email.com`;
        
        return {
          id: profile.user_id,
          email,
          created_at: profile.created_at,
          last_sign_in_at: profile.updated_at,
          profile: {
            full_name: profile.full_name,
            organization: profile.organization,
          },
          role: (userRole?.role as AppRole) || "publico",
        };
      });

      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRole = async () => {
    if (!selectedUser || currentUserRole !== "admin") return;

    setIsUpdating(true);
    try {
      // Update role
      const { error: updateError } = await supabase
        .from("user_roles")
        .update({ role: newRole, assigned_by: currentUser?.id })
        .eq("user_id", selectedUser.id);

      if (updateError) throw updateError;

      // Log audit
      await supabase.from("audit_logs").insert({
        user_id: currentUser?.id,
        action: "role_change",
        details: {
          target_user_id: selectedUser.id,
          old_role: selectedUser.role,
          new_role: newRole,
        },
      });

      toast({
        title: "Permissão atualizada",
        description: `O usuário agora tem a permissão de ${roleLabels[newRole]}.`,
      });

      // Refresh users
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u))
      );
      setIsRoleDialogOpen(false);
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a permissão.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const openRoleDialog = (user: UserWithProfile) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsRoleDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Gestão de Usuários
        </CardTitle>
        <CardDescription>
          Gerencie usuários e suas permissões de acesso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os perfis</SelectItem>
              {Object.entries(roleLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum usuário encontrado</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Organização</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {user.profile?.full_name || "Sem nome"}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.profile?.organization || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={roleColors[user.role]}>
                        <Shield className="h-3 w-3 mr-1" />
                        {roleLabels[user.role]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(user.created_at), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openRoleDialog(user)}
                        disabled={user.id === currentUser?.id || currentUserRole !== "admin"}
                      >
                        <UserCog className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <span>Total: {users.length} usuários</span>
          <span>•</span>
          <span>Admins: {users.filter((u) => u.role === "admin").length}</span>
          <span>•</span>
          <span>Ativos: {users.length}</span>
        </div>
      </CardContent>

      {/* Role Change Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Alterar Permissão
            </DialogTitle>
            <DialogDescription>
              Altere o perfil de acesso de {selectedUser?.profile?.full_name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Perfil atual</label>
              <Badge variant="outline" className={roleColors[selectedUser?.role || "publico"]}>
                {roleLabels[selectedUser?.role || "publico"]}
              </Badge>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Novo perfil</label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleChangeRole} disabled={isUpdating || newRole === selectedUser?.role}>
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alteração"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
