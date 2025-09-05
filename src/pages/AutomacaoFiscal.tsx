import React, { useState } from 'react';
import { 
  Zap, 
  Upload, 
  Download, 
  Send, 
  Eye,
  FileText,
  Search,
  Folder,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Mail,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/components/common/DataTable';
import { StatCard } from '@/components/common/StatCard';
import { mockClients, mockDocuments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function AutomacaoFiscal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClient, setSelectedClient] = useState('');
  const [showCertificateUpload, setShowCertificateUpload] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [automationProgress, setAutomationProgress] = useState(0);
  const [isRunningAutomation, setIsRunningAutomation] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const isOffice = user?.role === 'office';
  const userDocuments = isOffice ? mockDocuments : mockDocuments.filter(doc => doc.clientId === user?.companyId);

  const fiscalDocuments = [
    { id: 1, type: 'NF-e', number: '000123', date: '2024-08-30', issuer: 'Empresa ABC Ltda', amount: 1250.00, status: 'processed' },
    { id: 2, type: 'NF-e', number: '000124', date: '2024-08-29', issuer: 'Tech Solutions S.A.', amount: 3400.00, status: 'transmitted' },
    { id: 3, type: 'CT-e', number: '000045', date: '2024-08-28', issuer: 'Logística Express', amount: 450.00, status: 'pending' },
    { id: 4, type: 'NF-e', number: '000125', date: '2024-08-27', issuer: 'Fornecedor XYZ', amount: 2100.00, status: 'processed' },
    { id: 5, type: 'NF-e', number: '000126', date: '2024-08-26', issuer: 'Distribuidor ABC', amount: 5600.00, status: 'error' },
  ];

  const automationAlerts = [
    { id: 1, type: 'success', message: 'Nova NF-e recebida: #000127 de Fornecedor Beta', time: '10 min atrás', clientId: 'client-1' },
    { id: 2, type: 'warning', message: 'Falha na transmissão da CT-e #000046', time: '2 horas atrás', clientId: 'client-2' },
    { id: 3, type: 'info', message: 'Processamento em lote concluído - 15 documentos', time: '4 horas atrás', clientId: 'client-1' },
    { id: 4, type: 'error', message: 'Erro na consulta SEFAZ - Certificado expirado', time: '1 dia atrás', clientId: 'client-3' },
  ];

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
      key: 'documentCount' as const,
      title: 'Documentos',
      render: () => Math.floor(Math.random() * 50) + 10
    },
    {
      key: 'lastUpdate' as const,
      title: 'Última Atualização', 
      render: () => new Date().toLocaleDateString('pt-BR')
    },
    {
      key: 'status' as const,
      title: 'Status SEFAZ',
      render: () => (
        <Badge variant="success">
          <CheckCircle className="w-3 h-3 mr-1" />
          Conectado
        </Badge>
      )
    },
    {
      key: 'actions' as const,
      title: 'Ações',
      render: (value: any, record: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleViewDocuments(record.id)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleSendDocuments(record.id)}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleCertificateUpload = () => {
    toast({
      title: "Certificado Enviado",
      description: "Certificado digital enviado com sucesso (simulado)",
    });
    setShowCertificateUpload(false);
  };

  const handleConnectSEFAZ = () => {
    toast({
      title: "SEFAZ Conectado",
      description: "Conexão com SEFAZ estabelecida com sucesso (simulado)",
    });
  };

  const handleRunAutomation = (type: string) => {
    setIsRunningAutomation(true);
    setAutomationProgress(0);
    
    const interval = setInterval(() => {
      setAutomationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningAutomation(false);
          toast({
            title: "Automação Concluída",
            description: `${type} executado com sucesso (simulado)`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleViewDocuments = (clientId: string) => {
    setSelectedClient(clientId);
    setActiveTab('organization');
  };

  const handleSendDocuments = (clientId: string) => {
    toast({
      title: "Documentos Enviados",
      description: `Documentos enviados para cliente ${clientId} (simulado)`,
    });
  };

  const handleDocumentPreview = (doc: any) => {
    setSelectedDocument(doc);
    setShowDocumentPreview(true);
  };

  const handleSendViaWhatsApp = () => {
    toast({
      title: "Enviado via WhatsApp",
      description: "Documentos enviados automaticamente via WhatsApp (simulado)",
    });
  };

  const handleSendViaEmail = () => {
    toast({
      title: "Enviado via Email", 
      description: "Documentos enviados automaticamente via Email (simulado)",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Automação Fiscal</h1>
          <p className="text-muted-foreground mt-1">
            {isOffice ? 'Automatize processos fiscais e documentos' : 'Seus documentos fiscais'}
          </p>
        </div>
        {isOffice && (
          <Button onClick={() => setActiveTab('integration')} variant="gradient">
            <Settings className="w-4 h-4 mr-2" />
            Configurar SEFAZ
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Documentos Processados"
          value="1,247"
          description="Este mês"
          icon={FileText}
          variant="success"
        />
        <StatCard
          title="Automações Ativas"
          value="8"
          description="Consultas automáticas"
          icon={Zap}
          variant="default"
        />
        <StatCard
          title="Transmissões"
          value="234"
          description="Enviadas ao SEFAZ"
          icon={Send}
          variant="default"
        />
        <StatCard
          title="Alertas Pendentes"
          value="3"
          description="Requerem atenção"
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="organization">Organização</TabsTrigger>
          <TabsTrigger value="sending">Envio</TabsTrigger>
          <TabsTrigger value="integration">Integração</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {isOffice ? (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Clientes - Status Fiscal</CardTitle>
                <CardDescription>Monitore o status fiscal de todos os clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={mockClients}
                  columns={clientColumns}
                  searchPlaceholder="Pesquisar clientes..."
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Meus Documentos Fiscais</CardTitle>
                  <CardDescription>Documentos fiscais da sua empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {fiscalDocuments.slice(0, 6).map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium text-sm">{doc.type} #{doc.number}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.issuer} - R$ {doc.amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            doc.status === 'processed' ? 'success' :
                            doc.status === 'transmitted' ? 'default' :
                            doc.status === 'error' ? 'destructive' : 'warning'
                          }>
                            {doc.status === 'processed' ? 'Processado' :
                             doc.status === 'transmitted' ? 'Transmitido' :
                             doc.status === 'error' ? 'Erro' : 'Pendente'}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleDocumentPreview(doc)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Alertas Automáticos</CardTitle>
                  <CardDescription>Notificações dos processos fiscais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {automationAlerts.filter(alert => 
                      !isOffice ? alert.clientId === user?.companyId : true
                    ).slice(0, 4).map(alert => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === 'success' ? 'bg-success' :
                          alert.type === 'warning' ? 'bg-warning' :
                          alert.type === 'error' ? 'bg-destructive' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span>Consultar</span>
                </CardTitle>
                <CardDescription>Consulte documentos no SEFAZ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Período</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleRunAutomation('Consulta')}
                  disabled={isRunningAutomation}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Consultar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-primary" />
                  <span>Download</span>
                </CardTitle>
                <CardDescription>Baixar documentos em lote</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Documento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nfe">NF-e</SelectItem>
                      <SelectItem value="cte">CT-e</SelectItem>
                      <SelectItem value="nfce">NFC-e</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Formato</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xml">XML</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="both">XML + PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleRunAutomation('Download')}
                  disabled={isRunningAutomation}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Documentos
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5 text-primary" />
                  <span>Transmitir</span>
                </CardTitle>
                <CardDescription>Transmitir para SEFAZ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Documentos Pendentes</Label>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-sm text-muted-foreground">Aguardando transmissão</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Prioridade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Normal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleRunAutomation('Transmissão')}
                  disabled={isRunningAutomation}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Transmitir Agora
                </Button>
              </CardContent>
            </Card>
          </div>

          {isRunningAutomation && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Processando Automação</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={automationProgress} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Processando documentos...</span>
                    <span>{automationProgress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="organization" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="shadow-soft lg:col-span-1">
              <CardHeader>
                <CardTitle>Estrutura de Pastas</CardTitle>
                <CardDescription>Organize documentos por cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockClients.slice(0, 5).map(client => (
                    <div 
                      key={client.id}
                      className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-muted/50 ${
                        selectedClient === client.id ? 'bg-primary/10 border border-primary/20' : ''
                      }`}
                      onClick={() => setSelectedClient(client.id)}
                    >
                      <Folder className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{client.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Documentos do Cliente</CardTitle>
                    <CardDescription>
                      {selectedClient ? `Documentos organizados` : 'Selecione um cliente'}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Pesquisar..." className="pl-8 w-48" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedClient ? (
                  <div className="space-y-4">
                    {/* Folder Structure */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['NF-e', 'CT-e', 'Relatórios', 'Histórico'].map(folder => (
                        <div key={folder} className="p-4 border rounded-lg text-center hover:bg-muted/50 cursor-pointer">
                          <Folder className="w-8 h-8 mx-auto text-primary mb-2" />
                          <p className="text-sm font-medium">{folder}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 20) + 5} arquivos
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Recent Documents */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Documentos Recentes</h4>
                      {fiscalDocuments.slice(0, 4).map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-primary" />
                            <div>
                              <p className="text-sm font-medium">{doc.type} #{doc.number}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(doc.date).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentPreview(doc)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Folder className="w-12 h-12 mx-auto mb-4" />
                    <p>Selecione um cliente para visualizar os documentos</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sending" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Seleção de Documentos</CardTitle>
                <CardDescription>Escolha documentos para envio automático</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Documentos Selecionados</Label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {fiscalDocuments.slice(0, 3).map(doc => (
                      <div key={doc.id} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{doc.type} #{doc.number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Formato de Envio</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="PDF + XML" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">Apenas PDF</SelectItem>
                      <SelectItem value="xml">Apenas XML</SelectItem>
                      <SelectItem value="both">PDF + XML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Envio Automático</CardTitle>
                <CardDescription>Configure o método de envio preferido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={handleSendViaWhatsApp}
                  >
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <span>WhatsApp</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={handleSendViaEmail}
                  >
                    <Mail className="w-6 h-6 text-blue-600" />
                    <span>Email</span>
                  </Button>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Prévia do Envio</h4>
                  <div className="text-sm space-y-1">
                    <p>• 3 documentos selecionados</p>
                    <p>• Formato: PDF + XML</p>
                    <p>• Destinatário: contato@empresaabc.com</p>
                    <p>• Envio programado para: Imediatamente</p>
                  </div>
                </div>

                <Button className="w-full" variant="gradient">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Documentos
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          {isOffice && (
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Certificado Digital</CardTitle>
                  <CardDescription>Configure o certificado para SEFAZ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Certificado A1 (.p12)</p>
                    <p className="text-xs text-muted-foreground">Arquivo de certificado digital</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => setShowCertificateUpload(true)}
                    >
                      Enviar Certificado
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certPassword">Senha do Certificado</Label>
                    <Input id="certPassword" type="password" placeholder="Digite a senha" />
                  </div>

                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Certificado válido até 15/12/2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Conexão SEFAZ</CardTitle>
                  <CardDescription>Status da integração com SEFAZ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ambiente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Produção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prod">Produção</SelectItem>
                        <SelectItem value="homolog">Homologação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Frequência de Consulta Automática</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Diário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">A cada hora</SelectItem>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={handleConnectSEFAZ}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Testar Conexão
                  </Button>

                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Conectado com SEFAZ-SP</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Última sincronização: há 2 minutos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Certificate Upload Dialog */}
      <Dialog open={showCertificateUpload} onOpenChange={setShowCertificateUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Certificado Digital</DialogTitle>
            <DialogDescription>
              Selecione o arquivo de certificado A1 (.p12)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm">Clique para selecionar o arquivo</p>
              <input type="file" accept=".p12,.pfx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCertificateUpload(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCertificateUpload}>
                Enviar Certificado
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentPreview} onOpenChange={setShowDocumentPreview}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedDocument.type} #{selectedDocument.number}
              </DialogTitle>
              <DialogDescription>
                Prévia do documento fiscal
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border rounded-lg p-6 bg-muted/20">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold">NOTA FISCAL ELETRÔNICA</h3>
                  <p className="text-sm text-muted-foreground">Série 1 - Número {selectedDocument.number}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">EMITENTE</h4>
                    <p>{selectedDocument.issuer}</p>
                    <p>CNPJ: 12.345.678/0001-90</p>
                    <p>Rua das Empresas, 123</p>
                    <p>São Paulo - SP</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">DESTINATÁRIO</h4>
                    <p>Sua Empresa Ltda</p>
                    <p>CNPJ: 98.765.432/0001-10</p>
                    <p>Av. Principal, 456</p>
                    <p>São Paulo - SP</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data de Emissão:</span>
                    <span className="font-medium">{new Date(selectedDocument.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Valor Total:</span>
                    <span className="font-bold text-lg">R$ {selectedDocument.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar XML
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}