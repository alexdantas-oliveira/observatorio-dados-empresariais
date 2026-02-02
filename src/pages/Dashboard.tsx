import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { ROLE_LABELS, ROLE_DESCRIPTIONS } from "@/types/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  TrendingUp,
  Users,
  MapPin,
  BarChart3,
  FileText,
  Calendar,
  Bot,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AIChatOverlay } from "@/components/chat/AIChatOverlay";

// Mock data for demonstration
const mockStats = [
  {
    title: "Empresas Ativas",
    value: "52.847",
    change: "+12.5%",
    trend: "up" as "up" | "down" | "neutral",
    icon: Building2,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Novos Registros (Mês)",
    value: "1.234",
    change: "+8.2%",
    trend: "up" as "up" | "down" | "neutral",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Empregos Gerados",
    value: "189.432",
    change: "+5.7%",
    trend: "up" as "up" | "down" | "neutral",
    icon: Users,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "Municípios Atendidos",
    value: "87",
    change: "0%",
    trend: "neutral" as "up" | "down" | "neutral",
    icon: MapPin,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const quickActions = [
  {
    title: "Dashboard Executivo",
    description: "Visão geral dos principais indicadores",
    icon: BarChart3,
    href: "/dashboard",
    color: "gradient-primary",
  },
  {
    title: "Mapa Empresarial",
    description: "Distribuição geográfica das empresas",
    icon: MapPin,
    href: "/map",
    color: "gradient-accent",
  },
  {
    title: "Relatórios",
    description: "Gerar e visualizar relatórios",
    icon: FileText,
    href: "/reports",
    color: "gradient-dark",
  },
];

const recentActivities = [
  { text: "Nova empresa registrada em Teresina", time: "Há 5 minutos" },
  { text: "Relatório mensal gerado automaticamente", time: "Há 1 hora" },
  { text: "Atualização de dados do IBGE importada", time: "Há 3 horas" },
  { text: "512 empresas atualizaram cadastro", time: "Há 6 horas" },
];

export default function Dashboard() {
  const { profile, role } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const firstName = profile?.full_name?.split(" ")[0] || "Usuário";
  const greeting = getGreeting();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }

  return (
    <AppLayout title="Início">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {greeting}, {firstName}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              {role ? (
                <>
                  Você está logado como <strong>{ROLE_LABELS[role]}</strong> —{" "}
                  {ROLE_DESCRIPTIONS[role]}
                </>
              ) : (
                "Carregando permissões..."
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockStats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up"
                      ? "text-success"
                      : stat.trend === "down"
                        ? "text-destructive"
                        : "text-muted-foreground"
                      }`}
                  >
                    {stat.change}
                    {stat.trend === "up" && <ArrowUpRight className="w-4 h-4" />}
                    {stat.trend === "down" && <ArrowDownRight className="w-4 h-4" />}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions + Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Acesso Rápido</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Card className="card-hover h-full cursor-pointer group">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div
                        className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 flex-1">
                        {action.description}
                      </p>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        Acessar
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Atividade Recente</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <p className="text-sm text-foreground">{activity.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Banner */}
        <Card className="gradient-dark text-white overflow-hidden">
          <CardContent className="p-8 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">
                  Precisa de ajuda para analisar os dados?
                </h3>
                <p className="text-white/80 mt-1">
                  Acesse nossa Inteligência Artificial para auxiliar na interpretação dos indicadores.
                </p>
              </div>
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={() => setIsChatOpen(true)}
              >
                Conversa com IA
                <Bot className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <AIChatOverlay
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          userName={firstName}
        />
      </div>
    </AppLayout>
  );
}
