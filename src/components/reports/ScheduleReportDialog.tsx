import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, Mail } from "lucide-react";

interface ScheduleReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  templateName: string;
  onSuccess: () => void;
}

const weekDays = [
  { id: "1", label: "Segunda" },
  { id: "2", label: "Terça" },
  { id: "3", label: "Quarta" },
  { id: "4", label: "Quinta" },
  { id: "5", label: "Sexta" },
  { id: "6", label: "Sábado" },
  { id: "0", label: "Domingo" },
];

export function ScheduleReportDialog({
  open,
  onOpenChange,
  templateId,
  templateName,
  onSuccess,
}: ScheduleReportDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: `Agendamento - ${templateName}`,
    scheduleType: "weekly" as "daily" | "weekly" | "monthly",
    time: "08:00",
    dayOfWeek: "1",
    dayOfMonth: "1",
    recipients: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const scheduleConfig: Record<string, string | string[]> = {
        time: formData.time,
      };

      if (formData.scheduleType === "weekly") {
        scheduleConfig.dayOfWeek = formData.dayOfWeek;
      } else if (formData.scheduleType === "monthly") {
        scheduleConfig.dayOfMonth = formData.dayOfMonth;
      }

      const recipients = formData.recipients
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r);

      // Calculate next run date
      const now = new Date();
      const [hours, minutes] = formData.time.split(":").map(Number);
      let nextRun = new Date(now);
      nextRun.setHours(hours, minutes, 0, 0);

      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }

      const { error } = await supabase.from("scheduled_reports").insert({
        template_id: templateId,
        user_id: user.id,
        name: formData.name,
        schedule_type: formData.scheduleType,
        schedule_config: scheduleConfig,
        recipients,
        next_run_at: nextRun.toISOString(),
        is_active: true,
      });

      if (error) throw error;

      toast({
        title: "Agendamento criado!",
        description: "O relatório será gerado automaticamente conforme programado.",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error scheduling report:", error);
      toast({
        title: "Erro ao agendar",
        description: "Não foi possível criar o agendamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Agendar Relatório
          </DialogTitle>
          <DialogDescription>
            Configure a geração automática do relatório "{templateName}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Agendamento</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select
                value={formData.scheduleType}
                onValueChange={(v) =>
                  setFormData({ ...formData, scheduleType: v as typeof formData.scheduleType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Horário
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          {formData.scheduleType === "weekly" && (
            <div className="space-y-2">
              <Label>Dia da Semana</Label>
              <Select
                value={formData.dayOfWeek}
                onValueChange={(v) => setFormData({ ...formData, dayOfWeek: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weekDays.map((day) => (
                    <SelectItem key={day.id} value={day.id}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.scheduleType === "monthly" && (
            <div className="space-y-2">
              <Label>Dia do Mês</Label>
              <Select
                value={formData.dayOfMonth}
                onValueChange={(v) => setFormData({ ...formData, dayOfMonth: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      Dia {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="recipients" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Destinatários (opcional)
            </Label>
            <Input
              id="recipients"
              placeholder="email1@exemplo.com, email2@exemplo.com"
              value={formData.recipients}
              onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Separe os e-mails por vírgula
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Criar Agendamento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
