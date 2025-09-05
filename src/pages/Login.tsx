import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Calculator, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Bem-vindo ao MiPag!",
          description: "Login realizado com sucesso. Novo módulo atualizado!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Email ou senha incorretos. Tente office@demo.com ou client@demo.com com senha: demo123",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoCredentials = (role: 'office' | 'client') => {
    setEmail(role === 'office' ? 'office@demo.com' : 'client@demo.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-medium animate-bounce-in">
            <span className="text-white font-bold text-lg">MP</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              MiPag - Sistema de Contabilidade
            </h1>
            <p className="text-muted-foreground mt-2">
              Sistema WEB de Contabilidade Integrado
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-medium animate-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                variant="gradient"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="space-y-3 pt-4 border-t">
              <p className="text-sm text-muted-foreground text-center">
                Credenciais de demonstração:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDemoCredentials('office')}
                  className="text-xs"
                >
                  👨‍💼 Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDemoCredentials('client')}
                  className="text-xs"
                >
                  🏢 Cliente
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Senha: demo123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>MiPag © 2025 - Sistema WEB de Contabilidade Integrado</p>
          <p className="mt-1">Todos os dados são simulados para demonstração</p>
        </div>
      </div>
    </div>
  );
}