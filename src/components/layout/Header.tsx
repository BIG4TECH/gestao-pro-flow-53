import React, { useState } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockNotifications } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onSidebarToggle: () => void;
}

export function Header({ onSidebarToggle }: HeaderProps) {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const userNotifications = mockNotifications.filter(n => n.userId === user?.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleRoleSwitch = () => {
    const newRole = user?.role === 'office' ? 'client' : 'office';
    switchRole(newRole);
    toast({
      title: "Perfil Alterado",
      description: `Agora você está como ${newRole === 'office' ? 'Administrador' : 'Cliente'}`,
    });
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  return (
    <header className="h-16 bg-card border-b border-border px-4 flex items-center justify-between shadow-soft">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="lg:hidden"
        >
          <Menu className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MP</span>
          </div>
          <h1 className="text-xl font-bold text-foreground hidden sm:block">
            Sistema de Contabilidade
          </h1>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Pesquisar clientes, tarefas, documentos, módulos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotificationClick}
          className="relative"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'office' ? 'Administrador' : 'Cliente'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleRoleSwitch}>
              <User className="mr-2 h-4 w-4" />
              Alternar para {user?.role === 'office' ? 'Cliente' : 'Administrador'}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
              <User className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <User className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}