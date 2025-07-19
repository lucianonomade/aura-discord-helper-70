import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

const logs = [
  {
    id: 1,
    type: "info",
    event: "Bot Iniciado",
    description: "Bot conectado ao Discord com sucesso",
    timestamp: "2024-01-19 10:30:15",
    user: "Sistema",
    details: "Versão 1.0.0"
  },
  {
    id: 2,
    type: "success",
    event: "Comando Executado",
    description: "Usuário executou comando /rank",
    timestamp: "2024-01-19 10:29:45",
    user: "PlayerOne",
    details: "Comando: /rank @PlayerOne"
  },
  {
    id: 3,
    type: "warning",
    event: "Rate Limit",
    description: "Usuário atingiu limite de comandos",
    timestamp: "2024-01-19 10:28:30",
    user: "SpamUser",
    details: "5 comandos em 10 segundos"
  },
  {
    id: 4,
    type: "error",
    event: "Erro de Conexão",
    description: "Falha ao conectar com a API do Discord",
    timestamp: "2024-01-19 10:27:12",
    user: "Sistema",
    details: "Timeout após 30 segundos"
  },
  {
    id: 5,
    type: "info",
    event: "Membro Entrou",
    description: "Novo membro se juntou ao servidor",
    timestamp: "2024-01-19 10:25:00",
    user: "NewUser123",
    details: "ID: 789123456789"
  }
];

const Logs = () => {
  const getLogIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogBadgeVariant = (type: string) => {
    switch (type) {
      case "success": return "default";
      case "warning": return "secondary";
      case "error": return "destructive";
      default: return "outline";
    }
  };

  const getLogTypeLabel = (type: string) => {
    switch (type) {
      case "success": return "Sucesso";
      case "warning": return "Aviso";
      case "error": return "Erro";
      case "info": return "Info";
      default: return type;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Logs</h1>
            <p className="text-muted-foreground">
              Acompanhe eventos e atividades do sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="warning">Aviso</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Exportar Logs
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Logs</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Erros</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                -5 desde ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avisos</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +12 esta hora
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">
                Últimos 30 dias
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Logs Recentes</CardTitle>
            <CardDescription>
              Últimos eventos registrados pelo sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getLogIcon(log.type)}
                        <Badge variant={getLogBadgeVariant(log.type)}>
                          {getLogTypeLabel(log.type)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{log.event}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{log.description}</div>
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell className="text-sm">{log.timestamp}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm text-muted-foreground truncate">
                        {log.details}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Ver Mais
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

export default Logs;