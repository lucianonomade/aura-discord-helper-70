-- Criação das tabelas principais para o bot

-- Tabela de servidores
CREATE TABLE public.servers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon_url TEXT,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de canais
CREATE TABLE public.channels (
  id TEXT PRIMARY KEY,
  server_id TEXT REFERENCES public.servers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de membros
CREATE TABLE public.members (
  id TEXT PRIMARY KEY,
  server_id TEXT REFERENCES public.servers(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  roles TEXT[],
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_bot BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'offline'
);

-- Tabela de mensagens
CREATE TABLE public.messages (
  id TEXT PRIMARY KEY,
  channel_id TEXT REFERENCES public.channels(id) ON DELETE CASCADE,
  author_id TEXT REFERENCES public.members(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  edited_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  attachments JSONB DEFAULT '[]'::jsonb
);

-- Tabela de XP e níveis
CREATE TABLE public.member_xp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT REFERENCES public.members(id) ON DELETE CASCADE,
  server_id TEXT REFERENCES public.servers(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  messages_count INTEGER DEFAULT 0,
  last_xp_gain TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(member_id, server_id)
);

-- Tabela de ações de moderação
CREATE TABLE public.moderation_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id TEXT REFERENCES public.servers(id) ON DELETE CASCADE,
  target_id TEXT REFERENCES public.members(id) ON DELETE CASCADE,
  moderator_id TEXT REFERENCES public.members(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  reason TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- Tabela de logs do bot
CREATE TABLE public.bot_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id TEXT REFERENCES public.servers(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações do servidor
CREATE TABLE public.server_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id TEXT REFERENCES public.servers(id) ON DELETE CASCADE UNIQUE,
  prefix TEXT DEFAULT '!',
  auto_role TEXT,
  moderation_channel TEXT,
  logs_channel TEXT,
  welcome_channel TEXT,
  welcome_message TEXT,
  xp_enabled BOOLEAN DEFAULT TRUE,
  xp_rate INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_config ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permitir acesso público para desenvolvimento)
CREATE POLICY "Enable read access for all users" ON public.servers FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.servers FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON public.channels FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.channels FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON public.members FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.members FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.messages FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON public.member_xp FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.member_xp FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON public.moderation_actions FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.moderation_actions FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON public.bot_logs FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.bot_logs FOR ALL USING (true);

CREATE POLICY "Enable read access for all users" ON public.server_config FOR SELECT USING (true);
CREATE POLICY "Enable all access for all users" ON public.server_config FOR ALL USING (true);

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER update_servers_updated_at
  BEFORE UPDATE ON public.servers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_server_config_updated_at
  BEFORE UPDATE ON public.server_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_messages_channel_id ON public.messages(channel_id);
CREATE INDEX idx_messages_author_id ON public.messages(author_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_member_xp_server_id ON public.member_xp(server_id);
CREATE INDEX idx_moderation_actions_server_id ON public.moderation_actions(server_id);
CREATE INDEX idx_bot_logs_server_id ON public.bot_logs(server_id);
CREATE INDEX idx_bot_logs_created_at ON public.bot_logs(created_at);