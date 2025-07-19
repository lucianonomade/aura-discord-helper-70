import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Ban, MessageSquare, User } from "lucide-react";

const moderationActions = [
  {
    id: 1,
    type: "Ban",
    user: "User123",
    reason: "Spam",
    moderator: "ModeradorBot",
    timestamp: "2024-01-19 10:30",
    severity: "high"
  },
  {
    id: 2,
    type: "Warn",
    user: "Player456",
    reason: "Linguagem inadequada",
    moderator: "ModeradorBot",
    timestamp: "2024-01-19 09:15",
    severity: "medium"
  },
  {
    id: 3,
    type: "Timeout",
    user: "Member789",
    reason: "Flood de mensagens",
    moderator: "ModeradorBot",
    timestamp: "2024-01-19 08:45",
    severity: "low"
  }
];

const Moderation = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Moderação</h1>
          <p className="text-muted-foreground">
            Gerencie ações de moderação e monitore o comportamento dos usuários
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bans Ativos</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                +2 desde ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avisos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +12 esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Timeouts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                -5% desde última semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Monitorados</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Em observação
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ações Recentes</CardTitle>
            <CardDescription>
              Histórico das últimas ações de moderação executadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Moderador</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moderationActions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      <Badge variant={getSeverityColor(action.severity)}>
                        {action.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{action.user}</TableCell>
                    <TableCell>{action.reason}</TableCell>
                    <TableCell>{action.moderator}</TableCell>
                    <TableCell>{action.timestamp}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Moderation;