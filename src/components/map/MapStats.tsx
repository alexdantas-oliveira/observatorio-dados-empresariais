import { Card } from "@/components/ui/card";
import { municipiosPI } from "@/data/municipiosPI";
import { Building2, Users, MapPin, TrendingUp } from "lucide-react";

export function MapStats() {
  const totals = municipiosPI.reduce(
    (acc, m) => ({
      empresas: acc.empresas + m.empresasAtivas,
      empregos: acc.empregos + m.empregos,
      populacao: acc.populacao + m.populacao,
    }),
    { empresas: 0, empregos: 0, populacao: 0 }
  );

  const avgPib = municipiosPI.reduce((acc, m) => acc + m.pibPerCapita, 0) / municipiosPI.length;
  const avgIdhm = municipiosPI.reduce((acc, m) => acc + m.idhm, 0) / municipiosPI.length;

  const stats = [
    {
      label: "Municípios",
      value: municipiosPI.length,
      icon: MapPin,
      color: "text-primary",
    },
    {
      label: "Empresas Ativas",
      value: totals.empresas.toLocaleString('pt-BR'),
      icon: Building2,
      color: "text-green-500",
    },
    {
      label: "Empregos",
      value: totals.empregos.toLocaleString('pt-BR'),
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "PIB/Capita Médio",
      value: `R$ ${avgPib.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
