import React from 'react';
import { Bell, Check, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockNotifications } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Notifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const userNotifications = mockNotifications.filter(n => n.userId === user?.id);

  const handleMarkAsRead = (id: string) => {
    toast({
      title: "Notificação marcada como lida",
      description: "Status atualizado com sucesso (simulado)",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Central de Notificações</h1>
          <p className="text-muted-foreground mt-1">Todas as suas notificações em um só lugar</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Check className="w-4 h-4 mr-2" />
            Marcar Todas
          </Button>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Suas Notificações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userNotifications.map(notification => (
              <div key={notification.id} className={`p-4 rounded-lg border ${
                notification.read ? 'bg-muted/20' : 'bg-primary/5 border-primary/20'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      {!notification.read && (
                        <Badge variant="destructive" className="text-xs">Novo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}