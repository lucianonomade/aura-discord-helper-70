import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Crown, Shield, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Member {
  id: string;
  server_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  roles: string[];
  joined_at: string;
  last_active: string;
  is_bot: boolean;
  status: string;
  member_xp?: {
    xp: number;
    level: number;
    messages_count: number;
  }[];
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    online: 0,
    newToday: 0,
    vip: 0
  });

  useEffect(() => {
    fetchMembers();
    fetchStats();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          member_xp(xp, level, messages_count)
        `)
        .order('last_active', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: total } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true });

      const { count: online } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'online');

      const today = new Date().toISOString().split('T')[0];
      const { count: newToday } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .gte('joined_at', today);

      setStats({
        total: total || 0,
        online: online || 0,
        newToday: newToday || 0,
        vip: 0
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const getRoleColor = (roles: string[]) => {
    if (roles.includes("Admin")) return "destructive";
    if (roles.includes("Moderador")) return "secondary";
    if (roles.includes("VIP")) return "default";
    return "outline";
  };

  const getRoleIcon = (roles: string[]) => {
    if (roles.includes("Admin")) return <Crown className="h-3 w-3" />;
    if (roles.includes("Moderador")) return <Shield className="h-3 w-3" />;
    return null;
  };

  const getPrimaryRole = (roles: string[]) => {
    if (roles.includes("Admin")) return "Admin";
    if (roles.includes("Moderador")) return "Moderador";
    if (roles.includes("VIP")) return "VIP";
    return "Membro";
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
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Total registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membros Online</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.online}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.online / stats.total) * 100) : 0}% dos membros
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Hoje</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newToday}</div>
              <p className="text-xs text-muted-foreground">
                Novos membros
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membros VIP</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.vip}</div>
              <p className="text-xs text-muted-foreground">
                Membros premium
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Carregando membros...
                    </TableCell>
                  </TableRow>
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Nenhum membro encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar_url || "/placeholder.svg"} />
                            <AvatarFallback>
                              {(member.display_name || member.username).slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.display_name || member.username}</div>
                            <div className="text-sm text-muted-foreground">@{member.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {member.member_xp?.[0]?.level || 1}
                      </TableCell>
                      <TableCell>
                        {member.member_xp?.[0]?.xp?.toLocaleString() || '0'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleColor(member.roles)} className="flex items-center gap-1">
                          {getRoleIcon(member.roles)}
                          {getPrimaryRole(member.roles)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(member.joined_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <span className={member.status === "online" ? "text-green-600" : "text-muted-foreground"}>
                          {member.status === "online" ? "Online" : new Date(member.last_active).toLocaleString('pt-BR')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Gerenciar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Members;