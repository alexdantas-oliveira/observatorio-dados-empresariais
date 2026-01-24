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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, Trash2, Loader2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ScheduledReport {
  id: string;
  name: string;
  schedule_type: string;
  schedule_config: unknown;
  is_active: boolean;
  next_run_at: string | null;
  last_run_at: string | null;
  created_at: string;
}

const scheduleLabels: Record<string, string> = {
  daily: "Diário",
  weekly: "Semanal",
  monthly: "Mensal",
};

export function ScheduledReportsTable({ onRefresh }: { onRefresh?: () => void }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<ScheduledReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("scheduled_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReports(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  const toggleActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from("scheduled_reports")
      .update({ is_active: !currentState })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o agendamento.",
        variant: "destructive",
      });
    } else {
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_active: !currentState } : r))
      );
    }
  };

  const deleteReport = async (id: string) => {
    const { error } = await supabase
      .from("scheduled_reports")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o agendamento.",
        variant: "destructive",
      });
    } else {
      setReports((prev) => prev.filter((r) => r.id !== id));
      toast({
        title: "Excluído",
        description: "Agendamento removido com sucesso.",
      });
      onRefresh?.();
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Relatórios Agendados
        </CardTitle>
        <CardDescription>
          Gerencie seus relatórios automáticos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum agendamento configurado</p>
            <p className="text-sm">Clique no ícone de calendário de um template para agendar</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Próxima Execução</TableHead>
                <TableHead>Última Execução</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead className="w-[80px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {scheduleLabels[report.schedule_type] || report.schedule_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {report.next_run_at
                      ? format(new Date(report.next_run_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {report.last_run_at
                      ? format(new Date(report.last_run_at), "dd/MM/yyyy HH:mm", { locale: ptBR })
                      : "Nunca"}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={report.is_active}
                      onCheckedChange={() => toggleActive(report.id, report.is_active)}
                    />
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir agendamento?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. O relatório não será mais gerado automaticamente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteReport(report.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
