import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Crown, Star, TrendingUp } from "lucide-react";

export function RankingPage() {
  const topUsers = [
    {
      rank: 1,
      username: "João#1234",
      avatar: "/placeholder.svg",
      level: 28,
      xp: 45680,
      nextLevelXp: 50000,
      messages: 3420,
      voiceTime: "145h 32m"
    },
    {
      rank: 2,
      username: "Maria#5678",
      avatar: "/placeholder.svg",
      level: 25,
      xp: 38920,
      nextLevelXp: 40000,
      messages: 2890,
      voiceTime: "98h 15m"
    },
    {
      rank: 3,
      username: "Pedro#9012",
      avatar: "/placeholder.svg",
      level: 23,
      xp: 32450,
      nextLevelXp: 35000,
      messages: 2340,
      voiceTime: "76h 42m"
    },
    {
      rank: 4,
      username: "Ana#3456",
      avatar: "/placeholder.svg",
      level: 21,
      xp: 28790,
      nextLevelXp: 30000,
      messages: 2156,
      voiceTime: "65h 28m"
    },
    {
      rank: 5,
      username: "Carlos#7890",
      avatar: "/placeholder.svg",
      level: 20,
      xp: 25340,
      nextLevelXp: 28000,
      messages: 1987,
      voiceTime: "54h 17m"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-discord-warning" />;
      case 2:
        return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3:
        return <Trophy className="w-6 h-6 text-discord-warning" />;
      default:
        return <Star className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-discord-warning to-discord-warning/70";
      case 2:
        return "bg-gradient-to-r from-muted-foreground to-muted-foreground/70";
      case 3:
        return "bg-gradient-to-r from-discord-warning/70 to-discord-warning/50";
      default:
        return "bg-gradient-to-r from-primary to-primary/70";
    }
  };

  const getXpProgress = (currentXp: number, nextLevelXp: number) => {
    const currentLevelBase = Math.floor(currentXp / 1000) * 1000;
    const progress = ((currentXp - currentLevelBase) / (nextLevelXp - currentLevelBase)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Ranking de XP</h1>
        <p className="text-muted-foreground">Top 10 usuários com mais experiência</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {topUsers.slice(0, 3).map((user) => (
          <Card key={user.rank} className={`bg-gradient-card border-border shadow-card relative overflow-hidden ${user.rank === 1 ? 'md:order-2' : user.rank === 2 ? 'md:order-1' : 'md:order-3'}`}>
            <div className={`absolute top-0 left-0 right-0 h-1 ${getRankColor(user.rank)}`} />
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                {getRankIcon(user.rank)}
              </div>
              <div className="relative">
                <Avatar className="w-16 h-16 mx-auto mb-2 border-2 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user.username.split('#')[0].charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge className={`absolute -top-1 -right-8 ${getRankColor(user.rank)} text-white border-0`}>
                  #{user.rank}
                </Badge>
              </div>
              <CardTitle className="text-lg text-foreground">{user.username}</CardTitle>
              <CardDescription className="text-muted-foreground">Nível {user.level}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">XP:</span>
                  <span className="text-foreground font-medium">{user.xp.toLocaleString()}</span>
                </div>
                <Progress value={getXpProgress(user.xp, user.nextLevelXp)} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {user.xp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Ranking List */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            Ranking Completo
          </CardTitle>
          <CardDescription>Lista completa de usuários ordenados por XP</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <div key={user.rank} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">#{user.rank}</span>
                </div>
                
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user.username.split('#')[0].charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">{user.username}</h3>
                    <Badge variant="secondary" className="text-xs">Nível {user.level}</Badge>
                  </div>
                  <div className="space-y-1">
                    <Progress value={getXpProgress(user.xp, user.nextLevelXp)} className="h-1.5" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{user.xp.toLocaleString()} XP</span>
                      <span>{user.nextLevelXp.toLocaleString()} XP</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-sm text-foreground">{user.messages} mensagens</div>
                  <div className="text-xs text-muted-foreground">{user.voiceTime} em voz</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* XP System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total de XP Distribuído</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.2M XP</div>
            <p className="text-xs text-muted-foreground mt-1">+15% esta semana</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">156</div>
            <p className="text-xs text-muted-foreground mt-1">Ganharam XP hoje</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Nível Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12.4</div>
            <p className="text-xs text-muted-foreground mt-1">Entre todos os usuários</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}