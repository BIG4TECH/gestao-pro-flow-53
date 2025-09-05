import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast({
      title: "Perfil Atualizado",
      description: "Suas informações foram salvas com sucesso (simulado)",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais</p>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Dados da sua conta</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <Badge variant={user?.role === 'office' ? 'default' : 'secondary'}>
                  {user?.role === 'office' ? 'Administrador' : 'Cliente'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input 
                  defaultValue={user?.name} 
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  defaultValue={user?.email} 
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input 
                defaultValue="(11) 99999-9999" 
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <Button onClick={handleSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
            <CardDescription>Mantenha sua conta segura</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Senha Atual</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Nova Senha</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Confirmar Nova Senha</Label>
              <Input type="password" />
            </div>
            <Button variant="outline" className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}