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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ScrollText,
  Search,
  Loader2,
  LogIn,
  LogOut,
  UserCog,
  FileText,
  Shield,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  details: unknown;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const actionConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  login: { label: "Login", icon: LogIn, color: "text-green-500" },
  logout: { label: "Logout", icon: LogOut, color: "text-orange-500" },
  role_change: { label: "Alteração de Permissão", icon: Shield, color: "text-purple-500" },
  report_generated: { label: "Relatório Gerado", icon: FileText, color: "text-blue-500" },
  data_export: { label: "Exportação de Dados", icon: Download, color: "text-cyan-500" },
  profile_update: { label: "Atualização de Perfil", icon: UserCog, color: "text-yellow-500" },
  data_view: { label: "Visualização de Dados", icon: Eye, color: "text-gray-500" },
};

export function AuditLogsViewer() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [limit, setLimit] = useState(50);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (actionFilter !== "all") {
        query = query.eq("action", actionFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setLogs(data || []);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os logs de auditoria.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, limit]);

  const filteredLogs = logs.filter((log) => {
    const detailsString = JSON.stringify(log.details || {}).toLowerCase();
    return (
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      detailsString.includes(searchTerm.toLowerCase()) ||
      log.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getActionConfig = (action: string) => {
    return actionConfig[action] || { label: action, icon: ScrollText, color: "text-gray-500" };
  };

  const formatDetails = (details: Record<string, unknown> | null) => {
    if (!details || Object.keys(details).length === 0) return "-";
    return Object.entries(details)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Logs de Auditoria
            </CardTitle>
            <CardDescription>
              Histórico de ações realizadas no sistema
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchLogs}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar nos logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtrar por ação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as ações</SelectItem>
              {Object.entries(actionConfig).map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={limit.toString()} onValueChange={(v) => setLimit(Number(v))}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25 logs</SelectItem>
              <SelectItem value="50">50 logs</SelectItem>
              <SelectItem value="100">100 logs</SelectItem>
              <SelectItem value="200">200 logs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ScrollText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum log encontrado</p>
          </div>
        ) : (
          <div className="rounded-md border max-h-[500px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-[180px]">Data/Hora</TableHead>
                  <TableHead className="w-[180px]">Ação</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead className="w-[280px]">ID do Usuário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const config = getActionConfig(log.action);
                  const ActionIcon = config.icon;

                  return (
                    <TableRow key={log.id}>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(log.created_at), "dd/MM/yyyy HH:mm:ss", {
                          locale: ptBR,
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1.5">
                          <ActionIcon className={`h-3 w-3 ${config.color}`} />
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                        {formatDetails(log.details as Record<string, unknown> | null)}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.user_id ? log.user_id.substring(0, 8) + "..." : "Sistema"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <span>Exibindo: {filteredLogs.length} logs</span>
          <span>•</span>
          <span>Logins: {logs.filter((l) => l.action === "login").length}</span>
          <span>•</span>
          <span>Alterações: {logs.filter((l) => l.action === "role_change").length}</span>
        </div>
      </CardContent>
    </Card>
  );
}
