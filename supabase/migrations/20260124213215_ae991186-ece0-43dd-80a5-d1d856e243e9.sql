-- Tabela para templates de relatórios
CREATE TABLE public.report_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  template_type TEXT NOT NULL CHECK (template_type IN ('empresas', 'indicadores', 'geografico', 'setorial', 'consolidado')),
  config JSONB NOT NULL DEFAULT '{}',
  is_default BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para relatórios agendados
CREATE TABLE public.scheduled_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES public.report_templates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('daily', 'weekly', 'monthly')),
  schedule_config JSONB NOT NULL DEFAULT '{}',
  filters JSONB DEFAULT '{}',
  recipients TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_run_at TIMESTAMP WITH TIME ZONE,
  next_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para histórico de relatórios gerados
CREATE TABLE public.report_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheduled_report_id UUID REFERENCES public.scheduled_reports(id) ON DELETE SET NULL,
  template_id UUID REFERENCES public.report_templates(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL,
  file_url TEXT,
  file_size INTEGER,
  status TEXT NOT NULL CHECK (status IN ('pending', 'generating', 'completed', 'failed')),
  error_message TEXT,
  filters_applied JSONB DEFAULT '{}',
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for report_templates
CREATE POLICY "Templates padrão são visíveis para todos autenticados"
ON public.report_templates FOR SELECT
USING (is_default = true AND auth.uid() IS NOT NULL);

CREATE POLICY "Usuários podem ver seus próprios templates"
ON public.report_templates FOR SELECT
USING (auth.uid() = created_by);

CREATE POLICY "Usuários podem criar templates"
ON public.report_templates FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Usuários podem atualizar seus próprios templates"
ON public.report_templates FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Usuários podem deletar seus próprios templates"
ON public.report_templates FOR DELETE
USING (auth.uid() = created_by);

-- RLS Policies for scheduled_reports
CREATE POLICY "Usuários podem ver seus próprios agendamentos"
ON public.scheduled_reports FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar agendamentos"
ON public.scheduled_reports FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios agendamentos"
ON public.scheduled_reports FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios agendamentos"
ON public.scheduled_reports FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for report_history
CREATE POLICY "Usuários podem ver seu próprio histórico"
ON public.report_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar registros no histórico"
ON public.report_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Triggers para updated_at
CREATE TRIGGER update_report_templates_updated_at
BEFORE UPDATE ON public.report_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scheduled_reports_updated_at
BEFORE UPDATE ON public.scheduled_reports
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir templates padrão
INSERT INTO public.report_templates (name, description, template_type, is_default, config) VALUES
('Relatório de Empresas', 'Lista detalhada de empresas com filtros aplicados', 'empresas', true, '{"columns": ["cnpj", "razaoSocial", "situacao", "porte", "municipio", "setor", "capitalSocial", "empregados"]}'),
('Indicadores Econômicos', 'Consolidado de KPIs e métricas econômicas', 'indicadores', true, '{"metrics": ["empresasAtivas", "empregosGerados", "capitalTotal", "crescimento"]}'),
('Análise Geográfica', 'Distribuição por município e região', 'geografico', true, '{"groupBy": "municipio", "metrics": ["empresas", "empregos", "pib"]}'),
('Análise Setorial', 'Distribuição por setor econômico', 'setorial', true, '{"groupBy": "setor", "metrics": ["empresas", "empregos", "percentual"]}'),
('Relatório Consolidado', 'Visão completa com todos os indicadores', 'consolidado', true, '{"sections": ["kpis", "empresas", "setorial", "geografico"]}')