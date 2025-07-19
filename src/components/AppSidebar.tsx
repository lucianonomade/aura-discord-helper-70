import { 
  Home, 
  Settings, 
  Users, 
  Trophy, 
  Shield, 
  MessageSquare, 
  BarChart3,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Configurações", url: "/config", icon: Settings },
  { title: "Ranking XP", url: "/ranking", icon: Trophy },
  { title: "Moderação", url: "/moderation", icon: Shield },
  { title: "Membros", url: "/members", icon: Users },
  { title: "Mensagens", url: "/messages", icon: MessageSquare },
  { title: "Estatísticas", url: "/stats", icon: BarChart3 },
  { title: "Logs", url: "/logs", icon: Zap },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavClass = (active: boolean) =>
    active 
      ? "bg-primary text-primary-foreground shadow-discord" 
      : "hover:bg-accent hover:text-accent-foreground transition-colors";

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Bot Manager</h2>
                <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(isActive(item.url))}
                      end
                    >
                      <item.icon className="w-4 h-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}