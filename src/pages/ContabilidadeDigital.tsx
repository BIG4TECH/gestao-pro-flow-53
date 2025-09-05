import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  Eye,
  Plus,
  CheckCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Calendar,
  User,
  Building,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/components/common/DataTable';
import { StatCard } from '@/components/common/StatCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mockClients, mockDocuments, mockTasks } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ContabilidadeDigital() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const isOffice = user?.role === 'office';
  const userDocuments = isOffice ? mockDocuments : mockDocuments.filter(doc => doc.clientId === user?.companyId);
  const userTasks = isOffice ? mockTasks : mockTasks.filter(task => task.clientId === user?.companyId);

  const obligationsData = [
    { title: 'DAS - Simples Nacional', dueDate: '2024-09-20', status: 'pending', description: 'Pagamento mensal obrigatório' },
    { title: 'DEFIS - Declaração', dueDate: '2024-03-31', status: 'completed', description: 'Declaração anual enviada' },
    { title: 'Escrituração Fiscal', dueDate: '2024-09-30', status: 'pending', description: 'Livros fiscais do período' },
    { title: 'Balancete Mensal', dueDate: '2024-09-05', status: 'overdue', description: 'Demonstrativo contábil' },
  ];

  const reportsData = [
    { id: 1, type: 'Balancete', date: '2024-08-31', status: 'ready', description: 'Balancete de verificação - Agosto/2024' },
    { id: 2, type: 'DRE', date: '2024-08-31', status: 'ready', description: 'Demonstração do Resultado - Agosto/2024' },
    { id: 3, type: 'Fluxo de Caixa', date: '2024-08-31', status: 'processing', description: 'Relatório de fluxo de caixa' },
    { id: 4, type: 'Análise Financeira', date: '2024-08-31', status: 'ready', description: 'Indicadores financeiros do período' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const mockUploads = files.map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      status: 'uploaded'
    }));
    
    setUploadedFiles(prev => [...prev, ...mockUploads]);
    toast({
      title: "Arquivos Enviados",
      description: `${files.length} arquivo(s) enviado(s) com sucesso (simulado)`,
    });
  };

  const handleNextStep = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      toast({
        title: "Onboarding Concluído",
        description: "Bem-vindo à Contabilidade Digital! (simulado)",
      });
      setShowOnboarding(false);
      setOnboardingStep(1);
    }
  };

  const handleDownloadReport = (reportId: number) => {
    toast({
      title: "Download Iniciado",
      description: `Relatório ${reportId} baixado com sucesso (simulado)`,
    });
  };

  const clientColumns = [
    {
      key: 'name' as const,
      title: 'Cliente',
      sortable: true,
      render: (value: string, record: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{record.cnpj}</div>
        </div>
      )
    },
    {
      key: 'status' as const,
      title: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value === 'active' ? 'Ativo' : 'Pendente'}
        </Badge>
      )
    },
    {
      key: 'lastActivity' as const,
      title: 'Última Atividade',
      render: () => new Date().toLocaleDateString('pt-BR')
    },
    {
      key: 'actions' as const,
      title: 'Ações',
      render: (value: any, record: any) => (
        <Button size="sm" variant="outline" onClick={() => handleViewClient(record.id)}>
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalhes
        </Button>
      )
    }
  ];

  const handleViewClient = (clientId: string) => {
    toast({
      title: "Visualizar Cliente",
      description: `Abrindo perfil do cliente ${clientId} (simulado)`,
    });
  };

  // Mock chart data
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    revenue: [45000, 52000, 48000, 61000, 58000, 65000],
    expenses: [32000, 38000, 35000, 42000, 40000, 45000],
    profit: [13000, 14000, 13000, 19000, 18000, 20000]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contabilidade Digital</h1>
          <p className="text-muted-foreground mt-1">
            {isOffice ? 'Gerencie a contabilidade dos clientes' : 'Sua contabilidade 100% online'}
          </p>
        </div>
        <div className="flex space-x-2">
          {!isOffice && (
            <Button onClick={() => setShowOnboarding(true)} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Novo Onboarding
            </Button>
          )}
          <Button variant="gradient">
            <Upload className="w-4 h-4 mr-2" />
            Enviar Documentos
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">
            {isOffice ? 'Visão Geral' : 'Minha Área'}
          </TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="obligations">Obrigações</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {isOffice ? (
            <>
              {/* Office Dashboard */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Clientes Ativos"
                  value="47"
                  description="Contabilidade online"
                  icon={Building}
                  variant="success"
                />
                <StatCard
                  title="Documentos Processados"
                  value="1,234"
                  description="Este mês"
                  icon={FileText}
                  variant="default"
                />
                <StatCard
                  title="Relatórios Gerados"
                  value="89"
                  description="Último período"
                  icon={BarChart3}
                  variant="default"
                />
                <StatCard
                  title="Obrigações Pendentes"
                  value="12"
                  description="Requerem atenção"
                  icon={AlertCircle}
                  variant="warning"
                />
              </div>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Clientes - Contabilidade Digital</CardTitle>
                  <CardDescription>Gerencie todos os clientes do serviço online</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={mockClients}
                    columns={clientColumns}
                    searchPlaceholder="Pesquisar clientes..."
                  />
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* Client Dashboard */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Documentos Enviados"
                  value="23"
                  description="Este mês"
                  icon={Upload}
                  variant="success"
                />
                <StatCard
                  title="Relatórios Disponíveis"
                  value="4"
                  description="Prontos para download"
                  icon={FileText}
                  variant="default"
                />
                <StatCard
                  title="Obrigações Pendentes"
                  value="2"
                  description="Precisam de atenção"
                  icon={AlertCircle}
                  variant="warning"
                />
                <StatCard
                  title="Status da Conta"
                  value="Ativa"
                  description="Plano Pro"
                  icon={CheckCircle}
                  variant="success"
                />
              </div>

              {/* Financial Chart */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Demonstrativo Financeiro</span>
                  </CardTitle>
                  <CardDescription>Evolução financeira dos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end space-x-2 h-48">
                      {chartData.labels.map((month, index) => (
                        <div key={month} className="flex-1 flex flex-col items-center space-y-1">
                          <div className="flex flex-col items-center space-y-1 w-full relative">
                            {/* Revenue bar */}
                            <div 
                              className="w-full bg-primary rounded-t"
                              style={{ 
                                height: `${(chartData.revenue[index] / 70000) * 140}px`,
                                minHeight: '20px'
                              }}
                              title={`Receita: R$ ${chartData.revenue[index].toLocaleString()}`}
                            />
                            {/* Expenses bar */}
                            <div 
                              className="w-full bg-destructive rounded-t"
                              style={{ 
                                height: `${(chartData.expenses[index] / 70000) * 140}px`,
                                minHeight: '15px'
                              }}
                              title={`Despesas: R$ ${chartData.expenses[index].toLocaleString()}`}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{month}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded" />
                        <span>Receita</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-destructive rounded" />
                        <span>Despesas</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tasks */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Minhas Tarefas</CardTitle>
                  <CardDescription>Tarefas relacionadas à sua empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userTasks.slice(0, 3).map(task => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.dueDate ? `Vence em ${new Date(task.dueDate).toLocaleDateString('pt-BR')}` : 'Sem prazo definido'}
                          </p>
                        </div>
                        <Badge variant={
                          task.status === 'done' ? 'success' :
                          task.status === 'inprogress' ? 'warning' : 'secondary'
                        }>
                          {task.status === 'done' ? 'Concluído' :
                           task.status === 'inprogress' ? 'Em Andamento' : 'Pendente'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Upload de Documentos</CardTitle>
                <CardDescription>
                  Envie contratos sociais, certidões, notas fiscais e outros documentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <h4 className="font-medium">Arraste arquivos ou clique para enviar</h4>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOC, XLS até 10MB cada
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Arquivos Enviados</Label>
                      {uploadedFiles.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-2 bg-success/10 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-success" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Badge variant="success">Enviado</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Meus Documentos</CardTitle>
                <CardDescription>Documentos processados e organizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {userDocuments.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          doc.status === 'processed' ? 'success' :
                          doc.status === 'sent' ? 'default' : 'warning'
                        }>
                          {doc.status === 'processed' ? 'Processado' :
                           doc.status === 'sent' ? 'Enviado' : 'Pendente'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Relatórios Contábeis</CardTitle>
              <CardDescription>
                Relatórios gerados automaticamente pela equipe contábil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {reportsData.map(report => (
                  <div key={report.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{report.type}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <Badge variant={
                        report.status === 'ready' ? 'success' :
                        report.status === 'processing' ? 'warning' : 'secondary'
                      }>
                        {report.status === 'ready' ? 'Pronto' :
                         report.status === 'processing' ? 'Processando' : 'Pendente'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
                      {report.status === 'ready' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Baixar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="obligations" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Obrigações Fiscais</CardTitle>
              <CardDescription>
                Acompanhe suas obrigações fiscais e contábeis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {obligationsData.map((obligation, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="text-left">
                          <div className="font-medium">{obligation.title}</div>
                          <div className="text-sm text-muted-foreground">
                            Vencimento: {new Date(obligation.dueDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <Badge variant={
                          obligation.status === 'completed' ? 'success' :
                          obligation.status === 'overdue' ? 'destructive' : 'warning'
                        }>
                          {obligation.status === 'completed' ? 'Cumprido' :
                           obligation.status === 'overdue' ? 'Em Atraso' : 'Pendente'}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {obligation.description}
                        </p>
                        {obligation.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                            <Button size="sm">
                              Marcar como Cumprido
                            </Button>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Onboarding Dialog */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contabilidade 100% Online</DialogTitle>
            <DialogDescription>
              Configure sua empresa em poucos passos
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Passo {onboardingStep} de 3</span>
                <span>{Math.round((onboardingStep / 3) * 100)}%</span>
              </div>
              <Progress value={(onboardingStep / 3) * 100} />
            </div>

            {/* Step Content */}
            {onboardingStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados da Empresa</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Razão Social</Label>
                    <Input id="companyName" placeholder="Sua Empresa Ltda" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" placeholder="00.000.000/0000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contato@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input id="address" placeholder="Rua, número, bairro, cidade, CEP" />
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documentos Obrigatórios</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Contrato Social</p>
                    <p className="text-xs text-muted-foreground">PDF até 5MB</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Certidões de Regularidade</p>
                    <p className="text-xs text-muted-foreground">PDF até 5MB cada</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Últimas Notas Fiscais</p>
                    <p className="text-xs text-muted-foreground">XML ou PDF</p>
                  </div>
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Revisão e Confirmação</h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm">Dados da empresa preenchidos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm">Documentos enviados</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    <span className="text-sm">Aguardando análise da equipe contábil</span>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Próximos Passos</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Nossa equipe analisará seus documentos em até 2 dias úteis</li>
                    <li>• Você receberá um email com o status da análise</li>
                    <li>• Após aprovação, sua contabilidade estará 100% online</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setOnboardingStep(Math.max(1, onboardingStep - 1))}
                disabled={onboardingStep === 1}
              >
                Voltar
              </Button>
              <Button onClick={handleNextStep}>
                {onboardingStep === 3 ? 'Finalizar' : 'Próximo'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}