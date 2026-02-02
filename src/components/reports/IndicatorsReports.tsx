import { FileText, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IndicatorsReportsProps {
    onGenerate: (templateId: string, type: string) => void;
}

export function IndicatorsReports({ onGenerate }: IndicatorsReportsProps) {
    const indicatorTemplates = [
        {
            id: "indicators-monthly",
            name: "Resumo Mensal de Indicadores",
            description: "Visão consolidada dos principais KPIs e variações do mês.",
            icon: BarChart3,
        },
        {
            id: "indicators-growth",
            name: "Relatório de Crescimento",
            description: "Análise detalhada de crescimento por setor e município.",
            icon: TrendingUp,
        },
        {
            id: "indicators-full",
            name: "Panorama Completo",
            description: "Exportação completa de todos os indicadores disponíveis.",
            icon: FileText,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {indicatorTemplates.map((template) => (
                <Card key={template.id} className="card-hover">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <template.icon className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full"
                            onClick={() => onGenerate(template.id, 'indicators')}
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Gerar Relatório
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
