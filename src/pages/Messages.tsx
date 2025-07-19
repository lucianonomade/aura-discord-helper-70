import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Hash, AlertTriangle, Trash2 } from "lucide-react";

const messages = [
  {
    id: 1,
    user: "PlayerOne",
    avatar: "/placeholder.svg",
    content: "Alguém sabe como completar a quest do dragão?",
    channel: "#geral",
    timestamp: "10:30",
    flags: [],
    reactions: 3
  },
  {
    id: 2,
    user: "GamerPro",
    avatar: "/placeholder.svg",
    content: "Essa mensagem contém linguagem inadequada",
    channel: "#gaming",
    timestamp: "10:25",
    flags: ["inappropriate"],
    reactions: 0
  },
  {
    id: 3,
    user: "HelperBot",
    avatar: "/placeholder.svg",
    content: "Bem-vindo ao servidor! Leia as regras em #regras",
    channel: "#welcome",
    timestamp: "10:20",
    flags: [],
    reactions: 5
  },
  {
    id: 4,
    user: "SpamUser",
    avatar: "/placeholder.svg",
    content: "VENDA VENDA VENDA!!! CLIQUE AQUI!!!",
    channel: "#geral",
    timestamp: "10:15",
    flags: ["spam", "suspicious"],
    reactions: 0
  }
];

const Messages = () => {
  const getFlagColor = (flag: string) => {
    switch (flag) {
      case "spam": return "destructive";
      case "inappropriate": return "secondary";
      case "suspicious": return "outline";
      default: return "outline";
    }
  };

  const getFlagLabel = (flag: string) => {
    switch (flag) {
      case "spam": return "Spam";
      case "inappropriate": return "Inapropriado";
      case "suspicious": return "Suspeito";
      default: return flag;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mensagens</h1>
          <p className="text-muted-foreground">
            Monitore e gerencie mensagens do servidor
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
              <CardTitle className="text-sm font-medium">Mensagens Flagadas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Requer revisão
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Deletadas</CardTitle>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                Últimas 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canal Mais Ativo</CardTitle>
              <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#geral</div>
              <p className="text-xs text-muted-foreground">
                1,245 mensagens
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mensagens Recentes</CardTitle>
            <CardDescription>
              Últimas mensagens enviadas no servidor com status de moderação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Mensagem</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reações</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback>{message.user.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{message.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{message.content}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{message.channel}</Badge>
                    </TableCell>
                    <TableCell>{message.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {message.flags.length === 0 ? (
                          <Badge variant="outline">Normal</Badge>
                        ) : (
                          message.flags.map((flag, index) => (
                            <Badge key={index} variant={getFlagColor(flag)}>
                              {getFlagLabel(flag)}
                            </Badge>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{message.reactions}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                        {message.flags.length > 0 && (
                          <Button variant="destructive" size="sm">
                            Deletar
                          </Button>
                        )}
                      </div>
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

export default Messages;