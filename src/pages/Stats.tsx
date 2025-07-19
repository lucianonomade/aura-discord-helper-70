import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Activity, MessageSquare, Users, TrendingUp } from "lucide-react";

const dailyActivity = [
  { name: "Seg", messages: 420, users: 89 },
  { name: "Ter", messages: 380, users: 95 },
  { name: "Qua", messages: 520, users: 102 },
  { name: "Qui", messages: 610, users: 115 },
  { name: "Sex", messages: 780, users: 128 },
  { name: "Sáb", messages: 450, users: 98 },
  { name: "Dom", messages: 320, users: 76 }
];

const xpProgress = [
  { name: "Jan", xp: 15000 },
  { name: "Fev", xp: 18500 },
  { name: "Mar", xp: 22000 },
  { name: "Abr", xp: 19800 },
  { name: "Mai", xp: 25600 },
  { name: "Jun", xp: 28900 },
];

const channelData = [
  { name: "Geral", value: 35, color: "hsl(var(--primary))" },
  { name: "Gaming", value: 25, color: "hsl(var(--secondary))" },
  { name: "Memes", value: 20, color: "hsl(var(--accent))" },
  { name: "Suporte", value: 12, color: "hsl(var(--muted))" },
  { name: "Outros", value: 8, color: "hsl(var(--border))" }
];

const Stats = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Estatísticas</h1>
          <p className="text-muted-foreground">
            Acompanhe métricas e dados do servidor em tempo real
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Hoje</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                +12% desde ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +8% esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">XP Distribuído</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28,900</div>
              <p className="text-xs text-muted-foreground">
                +15% este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime do Bot</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">
                Últimos 30 dias
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Semanal</CardTitle>
              <CardDescription>
                Mensagens e usuários ativos por dia da semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="messages" fill="hsl(var(--primary))" name="Mensagens" />
                  <Bar dataKey="users" fill="hsl(var(--secondary))" name="Usuários" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Canal</CardTitle>
              <CardDescription>
                Porcentagem de atividade por canal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progresso de XP</CardTitle>
            <CardDescription>
              XP total distribuído ao longo dos meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={xpProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="XP Total"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Stats;