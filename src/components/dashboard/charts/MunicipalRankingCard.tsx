import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, Users } from "lucide-react";
import { municipioData } from "@/data/mockData";

interface MunicipalRankingCardProps {
  title: string;
  description?: string;
}

export function MunicipalRankingCard({ title, description }: MunicipalRankingCardProps) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {municipioData.slice(0, 7).map((item, index) => (
            <div
              key={item.municipio}
              className="flex items-center gap-4 px-6 py-3 hover:bg-muted/50 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0
                    ? "bg-yellow-500/20 text-yellow-600"
                    : index === 1
                    ? "bg-gray-300/30 text-gray-600"
                    : index === 2
                    ? "bg-orange-400/20 text-orange-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {item.municipio}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building2 className="w-3 h-3" />
                    {item.empresas.toLocaleString("pt-BR")}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {item.empregos.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>

              <Badge variant="secondary" className="shrink-0">
                R$ {item.pib >= 1000 ? `${(item.pib / 1000).toFixed(1)}B` : `${item.pib}M`}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
