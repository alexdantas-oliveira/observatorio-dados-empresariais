import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ReportTemplateCard,
  ScheduleReportDialog,
  ReportHistoryTable,
  ScheduledReportsTable,
} from "@/components/reports";
import { generateReport, downloadPDF, ReportConfig } from "@/lib/pdfGenerator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FileText, Calendar, History, Loader2 } from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  description: string | null;
  template_type: string;
  is_default: boolean;
  config: unknown;
}

export default function Relatorios() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("report_templates")
        .select("*")
        .order("is_default", { ascending: false });

      if (!error && data) {
        setTemplates(data);
      }
      setIsLoading(false);
    };

    fetchTemplates();
  }, []);

  const handleGenerateReport = async (templateId: string, templateType: string) => {
    if (!user) return;

    setGeneratingId(templateId);
    const template = templates.find((t) => t.id === templateId);
    
    try {
      // Log to history
      const { error: historyError } = await supabase.from("report_history").insert({
        template_id: templateId,
        user_id: user.id,
        report_name: template?.name || "Relatório",
        report_type: templateType,
        status: "completed",
        file_size: 0, // Will be updated after generation
      });

      if (historyError) {
        console.error("Error logging report:", historyError);
      }

      // Generate PDF
      const config: ReportConfig = {
        title: template?.name || "Relatório",
        subtitle: `Gerado em ${new Date().toLocaleDateString("pt-BR")}`,
        type: templateType as ReportConfig["type"],
      };

      const doc = generateReport(config);
      downloadPDF(doc, template?.name.replace(/\s+/g, "_") || "relatorio");

      toast({
        title: "Relatório gerado!",
        description: "O download do PDF foi iniciado.",
      });

      setRefreshKey((k) => k + 1);
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Erro ao gerar",
        description: "Não foi possível gerar o relatório. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setGeneratingId(null);
    }
  };

  const handleScheduleReport = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate({ id: templateId, name: template.name });
      setScheduleDialogOpen(true);
    }
  };

  return (
    <AppLayout title="Relatórios">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                Central de Relatórios
              </h1>
            </div>
            <p className="text-muted-foreground">
              Gere relatórios em PDF, agende exportações automáticas e acompanhe o histórico
            </p>
          </div>
          <Badge variant="outline" className="w-fit">
            {templates.length} templates disponíveis
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="templates" className="gap-1.5">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="gap-1.5">
              <Calendar className="h-4 w-4" />
              Agendados
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1.5">
              <History className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <ReportTemplateCard
                    key={template.id}
                    id={template.id}
                    name={template.name}
                    description={template.description || ""}
                    templateType={template.template_type}
                    isDefault={template.is_default}
                    onGenerate={handleGenerateReport}
                    onSchedule={handleScheduleReport}
                    isGenerating={generatingId === template.id}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Scheduled */}
          <TabsContent value="scheduled">
            <ScheduledReportsTable
              key={refreshKey}
              onRefresh={() => setRefreshKey((k) => k + 1)}
            />
          </TabsContent>

          {/* History */}
          <TabsContent value="history">
            <ReportHistoryTable key={refreshKey} />
          </TabsContent>
        </Tabs>

        {/* Schedule Dialog */}
        {selectedTemplate && (
          <ScheduleReportDialog
            open={scheduleDialogOpen}
            onOpenChange={setScheduleDialogOpen}
            templateId={selectedTemplate.id}
            templateName={selectedTemplate.name}
            onSuccess={() => setRefreshKey((k) => k + 1)}
          />
        )}
      </div>
    </AppLayout>
  );
}
