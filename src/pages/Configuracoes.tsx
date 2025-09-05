import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Globe, 
  Moon, 
  Sun, 
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Zap,
  CreditCard,
  FileText,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/common/DataTable';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('general');
  const [showAddUser, setShowAddUser] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt');
  const { user } = useAuth();
  const { toast } = useToast();

  const isOffice = user?.role === 'office';

  const mockUsers = [
    { id: 1, name: 'Admin Contabilidade', email: 'admin@contabilidade.com', role: 'Admin', status: 'active', lastLogin: '2024-09-05' },
    { id: 2, name: 'Contador Principal', email: 'contador1@contabilidade.com', role: 'Contador', status: 'active', lastLogin: '2024-09-04' },
    { id: 3, name: 'Assistente Contábil', email: 'assistente@contabilidade.com', role: 'Assistente', status: 'inactive', lastLogin: '2024-08-30' },
    { id: 4, name: 'Estagiário', email: 'estagiario@contabilidade.com', role: 'Estagiário', status: 'active', lastLogin: '2024-09-03' },
  ];

  const integrations = [
    { 
      name: 'Mercado Pago', 
      description: 'Processamento de pagamentos', 
      status: 'connected', 
      icon: CreditCard,
      lastSync: '2024-09-05 14:30'
    },
    { 
      name: 'SEFAZ', 
      description: 'Integração fiscal e documentos', 
      status: 'connected', 
      icon: FileText,
      lastSync: '2024-09-05 15:00'
    },
    { 
      name: 'INSS/FGTS', 
      description: 'Cálculos previdenciários', 
      status: 'error', 
      icon: Shield,
      lastSync: '2024-09-04 09:15'
    },
    { 
      name: 'WhatsApp Business', 
      description: 'Envio de documentos', 
      status: 'disconnected', 
      icon: Zap,
      lastSync: 'Nunca'
    },
  ];

  const userColumns = [
    {
      key: 'name' as const,
      title: 'Nome',
      sortable: true,
      render: (value: string, record: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{record.email}</div>
        </div>
      )
    },
    {
      key: 'role' as const,
      title: 'Função',
      sortable: true,
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      )
    },
    {
      key: 'status' as const,
      title: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    {
      key: 'lastLogin' as const,
      title: 'Último Login',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    {
      key: 'actions' as const,
      title: 'Ações',
      render: (value: any, record: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleViewUser(record.id)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleEditUser(record.id)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleDeleteUser(record.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleAddUser = () => {
    toast({
      title: "Usuário Adicionado",
      description: "Novo usuário criado com sucesso (simulado)",
    });
    setShowAddUser(false);
  };

  const handleViewUser = (userId: number) => {
    toast({
      title: "Visualizar Usuário",
      description: `Abrindo detalhes do usuário ${userId} (simulado)`,
    });
  };

  const handleEditUser = (userId: number) => {
    toast({
      title: "Editar Usuário",
      description: `Editando usuário ${userId} (simulado)`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Usuário Removido",
      description: `Usuário ${userId} removido com sucesso (simulado)`,
    });
  };

  const handleTestIntegration = (integrationName: string) => {
    toast({
      title: "Teste de Integração",
      description: `Testando conexão com ${integrationName} (simulado)`,
    });
  };

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Configurações Salvas",
      description: "Configurações gerais salvas com sucesso (simulado)",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações do sistema
          </p>
        </div>
        <Button variant="gradient">
          <Settings className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className={`grid w-full ${isOffice ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <TabsTrigger value="general">Geral</TabsTrigger>
          {isOffice && <TabsTrigger value="users">Usuários</TabsTrigger>}
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>Personalize a aparência do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Alterar entre tema claro e escuro
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Idioma do Sistema</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">
                        <div className="flex items-center space-x-2">
                          <span>🇧🇷</span>
                          <span>Português (Brasil)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="en">
                        <div className="flex items-center space-x-2">
                          <span>🇺🇸</span>
                          <span>English (US)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fuso Horário</Label>
                  <Select defaultValue="america-sao_paulo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sao_paulo">América/São Paulo (UTC-3)</SelectItem>
                      <SelectItem value="america-new_york">América/Nova York (UTC-5)</SelectItem>
                      <SelectItem value="europe-london">Europa/Londres (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Configure como receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email de Notificações</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas por email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas no navegador
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Vencimento</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertas de datas importantes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Frequência de Resumos</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Nunca</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Backup e Segurança</CardTitle>
                <CardDescription>Configurações de segurança dos dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Backup diário dos dados
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de 2 Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Segurança adicional no login
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>Retenção de Logs</Label>
                  <Select defaultValue="90days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 dias</SelectItem>
                      <SelectItem value="90days">90 dias</SelectItem>
                      <SelectItem value="1year">1 ano</SelectItem>
                      <SelectItem value="forever">Permanente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Exportar Dados (LGPD)
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Empresa</CardTitle>
                <CardDescription>Informações da empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input defaultValue="Sistema de Contabilidade Ltda" />
                </div>

                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input defaultValue="12.345.678/0001-90" />
                </div>

                <div className="space-y-2">
                  <Label>Email Principal</Label>
                  <Input defaultValue="contato@contabilidadesistema.com" />
                </div>

                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="(11) 3456-7890" />
                </div>

                <Button onClick={handleSaveGeneralSettings} className="w-full">
                  Salvar Informações
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {isOffice && (
          <TabsContent value="users" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gerenciamento de Usuários</CardTitle>
                    <CardDescription>Gerencie a equipe do escritório</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddUser(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={mockUsers}
                  columns={userColumns}
                  searchPlaceholder="Pesquisar usuários..."
                />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-8 w-8 text-success" />
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Com 2FA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-8 w-8 text-warning" />
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">Online Agora</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        <TabsContent value="integrations" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Integrações Disponíveis</CardTitle>
              <CardDescription>Conecte com serviços externos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {integrations.map((integration, index) => {
                  const Icon = integration.icon;
                  return (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{integration.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {integration.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Última sincronização: {integration.lastSync}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant={
                            integration.status === 'connected' ? 'success' :
                            integration.status === 'error' ? 'destructive' : 'secondary'
                          }>
                            {integration.status === 'connected' ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Conectado
                              </>
                            ) : integration.status === 'error' ? (
                              <>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Erro
                              </>
                            ) : (
                              'Desconectado'
                            )}
                          </Badge>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTestIntegration(integration.name)}
                          >
                            {integration.status === 'connected' ? 'Testar' : 'Conectar'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Logs de Integração</CardTitle>
              <CardDescription>Histórico de sincronizações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '2024-09-05 15:00', service: 'SEFAZ', status: 'success', message: 'Sincronização de documentos concluída - 23 NF-e processadas' },
                  { time: '2024-09-05 14:30', service: 'Mercado Pago', status: 'success', message: 'Pagamentos sincronizados - 5 transações' },
                  { time: '2024-09-05 12:15', service: 'INSS/FGTS', status: 'error', message: 'Falha na conexão - Timeout após 30s' },
                  { time: '2024-09-05 09:00', service: 'WhatsApp Business', status: 'warning', message: 'Limite de mensagens próximo do máximo' },
                ].map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.status === 'success' ? 'bg-success' :
                      log.status === 'error' ? 'bg-destructive' : 'bg-warning'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{log.service}</span>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Crie uma conta para um novo membro da equipe
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" placeholder="João" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input id="lastName" placeholder="Silva" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="joao.silva@contabilidade.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="contador">Contador</SelectItem>
                  <SelectItem value="assistente">Assistente</SelectItem>
                  <SelectItem value="estagiario">Estagiário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha Temporária</Label>
              <Input id="password" type="password" placeholder="Senha que será alterada no primeiro login" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="send-email" defaultChecked />
              <Label htmlFor="send-email">Enviar email de boas-vindas</Label>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddUser}>
                Criar Usuário
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}