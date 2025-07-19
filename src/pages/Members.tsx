import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Crown, Shield } from "lucide-react";

const members = [
  {
    id: 1,
    username: "AdminMaster",
    displayName: "Admin Master",
    level: 50,
    xp: 125000,
    role: "Admin",
    joinDate: "2023-01-15",
    lastActive: "Online",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    username: "ModeradorPro",
    displayName: "Moderador Pro",
    level: 45,
    xp: 98500,
    role: "Moderador",
    joinDate: "2023-03-22",
    lastActive: "2 horas atrás",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    username: "PlayerVIP",
    displayName: "Player VIP",
    level: 35,
    xp: 67890,
    role: "VIP",
    joinDate: "2023-06-10",
    lastActive: "1 dia atrás",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    username: "NewbieFriend",
    displayName: "Newbie Friend",
    level: 8,
    xp: 2450,
    role: "Membro",
    joinDate: "2024-01-18",
    lastActive: "30 min atrás",
    avatar: "/placeholder.svg"
  }
];

const Members = () => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "destructive";
      case "Moderador": return "secondary";
      case "VIP": return "default";
      default: return "outline";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin": return <Crown className="h-3 w-3" />;
      case "Moderador": return <Shield className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Membros</h1>
            <p className="text-muted-foreground">
              Gerencie membros do servidor e suas permissões
            </p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Convidar Membro
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +45 este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membros Online</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">
                37% dos membros
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Hoje</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +3 desde ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membros VIP</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                7.2% dos membros
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Membros</CardTitle>
            <CardDescription>
              Membros registrados no servidor com suas informações e estatísticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membro</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>XP</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Entrou em</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.displayName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.displayName}</div>
                          <div className="text-sm text-muted-foreground">@{member.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{member.level}</TableCell>
                    <TableCell>{member.xp.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(member.role)} className="flex items-center gap-1">
                        {getRoleIcon(member.role)}
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>
                      <span className={member.lastActive === "Online" ? "text-green-600" : "text-muted-foreground"}>
                        {member.lastActive}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Gerenciar
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

export default Members;