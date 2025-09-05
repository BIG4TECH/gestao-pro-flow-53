import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  FileText, 
  Users, 
  Kanban, 
  Calculator, 
  Zap, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Network,
  HelpCircle,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: Home,
    allowedRoles: ['office', 'client']
  },
  { 
    name: 'Cobranças e Pagamentos', 
    href: '/cobrancas', 
    icon: DollarSign,
    allowedRoles: ['office']
  },
  { 
    name: 'Simples Nacional', 
    href: '/simples-nacional', 
    icon: Calculator,
    allowedRoles: ['office']
  },
  { 
    name: 'Folha de Pagamento', 
    href: '/folha-pagamento', 
    icon: Users,
    allowedRoles: ['office']
  },
  { 
    name: 'Gerenciamento de Demandas', 
    href: '/demandas', 
    icon: Kanban,
    allowedRoles: ['office', 'client']
  },
  { 
    name: 'Contabilidade Digital', 
    href: '/contabilidade-digital', 
    icon: FileText,
    allowedRoles: ['office', 'client']
  },
  { 
    name: 'Automação Fiscal', 
    href: '/automacao-fiscal', 
    icon: Zap,
    allowedRoles: ['office', 'client']
  },
  { 
    name: 'Arquitetura do Sistema', 
    href: '/arquitetura', 
    icon: Network,
    allowedRoles: ['office', 'client']
  },
  { 
    name: 'Ajuda e Sobre', 
    href: '/ajuda', 
    icon: HelpCircle,
    allowedRoles: ['office', 'client']
  },
  { 
    name: 'Configurações', 
    href: '/configuracoes', 
    icon: Settings,
    allowedRoles: ['office']
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const filteredItems = navigationItems.filter(item => 
    item.allowedRoles.includes(user?.role || 'client')
  );

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="w-4 h-4 text-sidebar-primary-foreground font-bold text-xs">MP</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">
              Sistema
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground"
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
              {!collapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-2">
        {!collapsed && user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-xs font-medium text-sidebar-foreground/60">
              {user.role === 'office' ? 'Administrador' : 'Cliente'}
            </p>
            <p className="text-sm text-sidebar-foreground truncate">
              {user.name}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className={cn("w-4 h-4", !collapsed && "mr-3")} />
          {!collapsed && "Sair"}
        </Button>
      </div>
    </div>
  );
}