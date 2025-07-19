import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save, Key, Hash, Users, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ConfigurationPage() {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    token: "",
    prefix: "bdf!",
    logChannelId: "",
    welcomeChannelId: "",
    authorizedRoleIds: "",
    welcomeMessage: "Bem-vindo(a) ao servidor, {user}! 🎉",
    farewellMessage: "{user} saiu do servidor. Até mais! 👋",
    levelUpMessage: "Parabéns {user}! Você subiu para o nível {level}! 🎉",
    enableXpSystem: true,
    enableWelcomeMessages: true,
    enableFarewellMessages: true,
    enableModerationLogs: true
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "As configurações do bot foram atualizadas com sucesso.",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">Configure seu bot Discord</p>
      </div>

      <Alert className="border-discord-warning/20 bg-discord-warning/10">
        <AlertTriangle className="h-4 w-4 text-discord-warning" />
        <AlertDescription className="text-discord-warning">
          <strong>Importante:</strong> Para funcionamento completo, conecte este dashboard ao Supabase para armazenar configurações sensíveis como TOKEN.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="features">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Key className="w-5 h-5 text-primary" />
                Configurações Básicas
              </CardTitle>
              <CardDescription>Configure o token e prefixo do bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token" className="text-foreground">Token do Bot</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Cole aqui o token do bot Discord"
                  value={config.token}
                  onChange={(e) => handleInputChange("token", e.target.value)}
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Mantenha o token sempre seguro. Em produção, use Supabase Secrets.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prefix" className="text-foreground">Prefixo dos Comandos</Label>
                <Input
                  id="prefix"
                  placeholder="ex: bdf!"
                  value={config.prefix}
                  onChange={(e) => handleInputChange("prefix", e.target.value)}
                  className="bg-background border-border"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Hash className="w-5 h-5 text-discord-secondary" />
                IDs dos Canais
              </CardTitle>
              <CardDescription>Configure os canais específicos do bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logChannel" className="text-foreground">Canal de Logs</Label>
                <Input
                  id="logChannel"
                  placeholder="ID do canal de logs"
                  value={config.logChannelId}
                  onChange={(e) => handleInputChange("logChannelId", e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeChannel" className="text-foreground">Canal de Boas-vindas</Label>
                <Input
                  id="welcomeChannel"
                  placeholder="ID do canal de boas-vindas"
                  value={config.welcomeChannelId}
                  onChange={(e) => handleInputChange("welcomeChannelId", e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorizedRoles" className="text-foreground">IDs dos Cargos Autorizados</Label>
                <Input
                  id="authorizedRoles"
                  placeholder="IDs separados por vírgula"
                  value={config.authorizedRoleIds}
                  onChange={(e) => handleInputChange("authorizedRoleIds", e.target.value)}
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Separe múltiplos IDs com vírgulas: 123456789,987654321
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-5 h-5 text-discord-success" />
                Mensagens Personalizadas
              </CardTitle>
              <CardDescription>Configure as mensagens automáticas do bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcomeMsg" className="text-foreground">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="welcomeMsg"
                  placeholder="Mensagem quando alguém entra no servidor"
                  value={config.welcomeMessage}
                  onChange={(e) => handleInputChange("welcomeMessage", e.target.value)}
                  className="bg-background border-border"
                />
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{"{user}"}</Badge>
                  <Badge variant="secondary">{"{server}"}</Badge>
                  <Badge variant="secondary">{"{memberCount}"}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farewellMsg" className="text-foreground">Mensagem de Despedida</Label>
                <Textarea
                  id="farewellMsg"
                  placeholder="Mensagem quando alguém sai do servidor"
                  value={config.farewellMessage}
                  onChange={(e) => handleInputChange("farewellMessage", e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="levelUpMsg" className="text-foreground">Mensagem de Level Up</Label>
                <Textarea
                  id="levelUpMsg"
                  placeholder="Mensagem quando alguém sobe de nível"
                  value={config.levelUpMessage}
                  onChange={(e) => handleInputChange("levelUpMessage", e.target.value)}
                  className="bg-background border-border"
                />
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{"{user}"}</Badge>
                  <Badge variant="secondary">{"{level}"}</Badge>
                  <Badge variant="secondary">{"{xp}"}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-discord-success" />
                Recursos do Bot
              </CardTitle>
              <CardDescription>Ative ou desative funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Sistema de XP</Label>
                  <p className="text-sm text-muted-foreground">Permite que usuários ganhem XP por mensagens</p>
                </div>
                <Switch
                  checked={config.enableXpSystem}
                  onCheckedChange={(checked) => handleInputChange("enableXpSystem", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Mensagens de Boas-vindas</Label>
                  <p className="text-sm text-muted-foreground">Envia mensagem quando novos membros entram</p>
                </div>
                <Switch
                  checked={config.enableWelcomeMessages}
                  onCheckedChange={(checked) => handleInputChange("enableWelcomeMessages", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Mensagens de Despedida</Label>
                  <p className="text-sm text-muted-foreground">Envia mensagem quando membros saem</p>
                </div>
                <Switch
                  checked={config.enableFarewellMessages}
                  onCheckedChange={(checked) => handleInputChange("enableFarewellMessages", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground">Logs de Moderação</Label>
                  <p className="text-sm text-muted-foreground">Registra ações de moderação no canal de logs</p>
                </div>
                <Switch
                  checked={config.enableModerationLogs}
                  onCheckedChange={(checked) => handleInputChange("enableModerationLogs", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-discord">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}