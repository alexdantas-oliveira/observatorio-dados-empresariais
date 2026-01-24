import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Building2, TrendingUp, Map, PieChart } from "lucide-react";

interface ReportTemplateCardProps {
  id: string;
  name: string;
  description: string;
  templateType: string;
  isDefault: boolean;
  onGenerate: (id: string, type: string) => void;
  onSchedule: (id: string) => void;
  isGenerating?: boolean;
}

const typeIcons: Record<string, React.ElementType> = {
  empresas: Building2,
  indicadores: TrendingUp,
  geografico: Map,
  setorial: PieChart,
  consolidado: FileText,
};

const typeColors: Record<string, string> = {
  empresas: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  indicadores: "bg-green-500/10 text-green-500 border-green-500/20",
  geografico: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  setorial: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  consolidado: "bg-primary/10 text-primary border-primary/20",
};

export function ReportTemplateCard({
  id,
  name,
  description,
  templateType,
  isDefault,
  onGenerate,
  onSchedule,
  isGenerating,
}: ReportTemplateCardProps) {
  const Icon = typeIcons[templateType] || FileText;
  const colorClass = typeColors[templateType] || typeColors.consolidado;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-2.5 rounded-lg ${colorClass} border`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex gap-1.5">
            {isDefault && (
              <Badge variant="secondary" className="text-xs">
                Padrão
              </Badge>
            )}
            <Badge variant="outline" className="text-xs capitalize">
              {templateType}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-base mt-3">{name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onGenerate(id, templateType)}
            disabled={isGenerating}
          >
            <Download className="h-4 w-4 mr-1.5" />
            {isGenerating ? "Gerando..." : "Gerar PDF"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSchedule(id)}
          >
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
