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
import { Download, FileText, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ReportHistoryItem {
  id: string;
  report_name: string;
  report_type: string;
  status: string;
  file_url: string | null;
  file_size: number | null;
  generated_at: string;
  error_message: string | null;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  pending: { label: "Pendente", variant: "secondary", icon: Clock },
  generating: { label: "Gerando", variant: "outline", icon: Loader2 },
  completed: { label: "Concluído", variant: "default", icon: CheckCircle2 },
  failed: { label: "Falhou", variant: "destructive", icon: XCircle },
};

export function ReportHistoryTable() {
  const { user } = useAuth();
  const [history, setHistory] = useState<ReportHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("report_history")
        .select("*")
        .eq("user_id", user.id)
        .order("generated_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setHistory(data);
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [user]);

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
          <FileText className="h-5 w-5" />
          Histórico de Relatórios
        </CardTitle>
        <CardDescription>
          Últimos 20 relatórios gerados
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum relatório gerado ainda</p>
            <p className="text-sm">Os relatórios gerados aparecerão aqui</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Relatório</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-[80px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => {
                const status = statusConfig[item.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.report_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {item.report_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="gap-1">
                        <StatusIcon className={`h-3 w-3 ${item.status === 'generating' ? 'animate-spin' : ''}`} />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatFileSize(item.file_size)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(item.generated_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {item.status === "completed" && item.file_url && (
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                        >
                          <a href={item.file_url} download>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
