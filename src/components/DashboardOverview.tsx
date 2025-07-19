import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Trophy, Shield, TrendingUp, Activity } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";

export function DashboardOverview() {
  const stats = [
    {
      title: "Membros Total",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "discord-primary"
    },
    {
      title: "Mensagens Hoje",
      value: "3,891",
      change: "+8%",
      icon: MessageSquare,
      color: "discord-secondary"
    },
    {
      title: "Usuários Ativos",
      value: "156",
      change: "+23%",
      icon: Activity,
      color: "discord-success"
    },
    {
      title: "Comandos Executados",
      value: "892",
      change: "+15%",
      icon: Shield,
      color: "discord-warning"
    }
  ];

  const recentActivity = [
    { user: "João#1234", action: "Subiu para nível 15", time: "há 2 min", type: "level" },
    { user: "Maria#5678", action: "Entrou no servidor", time: "há 5 min", type: "join" },
    { user: "Pedro#9012", action: "Comando /ban executado", time: "há 8 min", type: "moderation" },
    { user: "Ana#3456", action: "Ganhou 50 XP", time: "há 12 min", type: "xp" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "level": return <Trophy className="w-4 h-4 text-discord-warning" />;
      case "join": return <Users className="w-4 h-4 text-discord-success" />;
      case "moderation": return <Shield className="w-4 h-4 text-discord-danger" />;
      case "xp": return <TrendingUp className="w-4 h-4 text-discord-primary" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu bot Discord</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card border-border shadow-card hover:shadow-discord transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 text-${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="secondary" className="text-xs bg-discord-success/20 text-discord-success border-0">
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">vs. mês passado</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Atividade Recente</CardTitle>
            <CardDescription>Últimas ações no servidor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
            <CardDescription>Comandos mais utilizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground block">Moderar</span>
              </button>
              <button className="p-4 rounded-lg bg-discord-secondary/10 hover:bg-discord-secondary/20 border border-discord-secondary/20 transition-colors">
                <Trophy className="w-6 h-6 text-discord-secondary mb-2" />
                <span className="text-sm font-medium text-foreground block">Ranking</span>
              </button>
              <button className="p-4 rounded-lg bg-discord-success/10 hover:bg-discord-success/20 border border-discord-success/20 transition-colors">
                <Users className="w-6 h-6 text-discord-success mb-2" />
                <span className="text-sm font-medium text-foreground block">Membros</span>
              </button>
              <button className="p-4 rounded-lg bg-discord-warning/10 hover:bg-discord-warning/20 border border-discord-warning/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-discord-warning mb-2" />
                <span className="text-sm font-medium text-foreground block">Mensagens</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}