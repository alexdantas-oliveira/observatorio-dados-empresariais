import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, ShieldCheck, ScrollText, Activity } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  color: string;
}

function StatCard({ title, value, description, icon: Icon, color }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    recentLogs: 0,
    todayLogins: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user count
        const { count: userCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Fetch admin count
        const { count: adminCount } = await supabase
          .from("user_roles")
          .select("*", { count: "exact", head: true })
          .eq("role", "admin");

        // Fetch recent logs (last 24h)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        const { count: logCount } = await supabase
          .from("audit_logs")
          .select("*", { count: "exact", head: true })
          .gte("created_at", yesterday.toISOString());

        // Fetch today's logins
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { count: loginCount } = await supabase
          .from("audit_logs")
          .select("*", { count: "exact", head: true })
          .eq("action", "login")
          .gte("created_at", today.toISOString());

        setStats({
          totalUsers: userCount || 0,
          admins: adminCount || 0,
          recentLogs: logCount || 0,
          todayLogins: loginCount || 0,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-16 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total de Usuários"
        value={stats.totalUsers}
        description="Usuários cadastrados"
        icon={Users}
        color="bg-blue-500/10 text-blue-500"
      />
      <StatCard
        title="Administradores"
        value={stats.admins}
        description="Com acesso total"
        icon={ShieldCheck}
        color="bg-red-500/10 text-red-500"
      />
      <StatCard
        title="Atividade (24h)"
        value={stats.recentLogs}
        description="Ações registradas"
        icon={Activity}
        color="bg-green-500/10 text-green-500"
      />
      <StatCard
        title="Logins Hoje"
        value={stats.todayLogins}
        description="Sessões iniciadas"
        icon={ScrollText}
        color="bg-purple-500/10 text-purple-500"
      />
    </div>
  );
}
