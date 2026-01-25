import { Card } from "@/components/ui/card";
import { municipiosPI, mesorregiaoStats } from "@/data/municipiosPI";
import { Building2, Users, MapPin, TrendingUp, Award, Landmark } from "lucide-react";

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
      value: municipiosPI.length.toString(),
      icon: MapPin,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Empresas Ativas",
      value: totals.empresas.toLocaleString('pt-BR'),
      icon: Building2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Empregos Formais",
      value: totals.empregos.toLocaleString('pt-BR'),
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "PIB/Capita Médio",
      value: `R$ ${avgPib.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "IDHM Médio",
      value: avgIdhm.toFixed(3),
      icon: Award,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "População Total",
      value: totals.populacao.toLocaleString('pt-BR'),
      icon: Landmark,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-border/50">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
              <p className="text-lg font-bold truncate">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
