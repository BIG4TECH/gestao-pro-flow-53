import React, { useState } from 'react';
import { 
  Calculator, 
  Calendar, 
  FileText, 
  Download, 
  Eye,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/common/DataTable';
import { StatCard } from '@/components/common/StatCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockClients, mockDASCalculations } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function SimplesNacional() {
  const [activeTab, setActiveTab] = useState('clients');
  const [selectedClient, setSelectedClient] = useState('');
  const [revenue, setRevenue] = useState('');
  const [calculatedDAS, setCalculatedDAS] = useState<number | null>(null);
  const { toast } = useToast();

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
      key: 'lastDAS' as const,
      title: 'Último DAS',
      sortable: true,
      render: (value: any, record: any) => {
        const das = mockDASCalculations.find(d => d.clientId === record.id);
        return das ? `${das.month}/${das.year}` : '-';
      }
    },
    {
      key: 'dueDate' as const,
      title: 'Próximo Vencimento',
      sortable: true,
      render: (value: any, record: any) => {
        const das = mockDASCalculations.find(d => d.clientId === record.id);
        return das ? new Date(das.dueDate).toLocaleDateString('pt-BR') : '-';
      }
    },
    {
      key: 'amount' as const,
      title: 'Valor DAS',
      sortable: true,
      render: (value: any, record: any) => {
        const das = mockDASCalculations.find(d => d.clientId === record.id);
        return das ? `R$ ${das.dasAmount.toFixed(2)}` : '-';
      }
    },
    {
      key: 'status' as const,
      title: 'Status',
      sortable: true,
      render: (value: any, record: any) => {
        const das = mockDASCalculations.find(d => d.clientId === record.id);
        if (!das) return <Badge variant="outline">Não calculado</Badge>;
        
        return (
          <Badge variant={
            das.status === 'paid' ? 'success' :
            das.status === 'generated' ? 'warning' : 'secondary'
          }>
            {das.status === 'paid' ? 'Pago' :
             das.status === 'generated' ? 'Gerado' : 'Calculado'}
          </Badge>
        );
      }
    }
  ];

  const handleCalculateDAS = () => {
    if (!selectedClient || !revenue) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um cliente e informe a receita",
      });
      return;
    }

    // Mock DAS calculation (simplified)
    const revenueNum = parseFloat(revenue);
    const dasAmount = revenueNum * 0.05; // 5% simplified rate
    setCalculatedDAS(dasAmount);

    toast({
      title: "DAS Calculado",
      description: `Valor calculado: R$ ${dasAmount.toFixed(2)} (simulado)`,
    });
  };

  const handleGenerateDAS = () => {
    toast({
      title: "DAS Gerado",
      description: "Documento DAS gerado com sucesso (simulado)",
    });
  };

  const handleDownloadDAS = () => {
    toast({
      title: "Download Iniciado",
      description: "Download do DAS iniciado (simulado)",
    });
  };

  const upcomingDueDates = [
    { client: 'Empresa ABC Ltda', date: '2024-09-20', amount: 2500.00, status: 'pending' },
    { client: 'Tech Solutions S.A.', date: '2024-09-20', amount: 7200.00, status: 'generated' },
    { client: 'Comércio XYZ ME', date: '2024-09-20', amount: 1250.00, status: 'pending' },
  ];

  const stats = {
    totalDAS: mockDASCalculations.reduce((sum, das) => sum + das.dasAmount, 0),
    pendingCount: mockDASCalculations.filter(das => das.status !== 'paid').length,
    paidCount: mockDASCalculations.filter(das => das.status === 'paid').length,
    overdueCount: mockDASCalculations.filter(das => 
      das.status !== 'paid' && new Date(das.dueDate) < new Date()
    ).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Simples Nacional</h1>
          <p className="text-muted-foreground mt-1">
            Calcule e gerencie o DAS dos seus clientes
          </p>
        </div>
        <Button variant="gradient">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cálculo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total DAS Mês"
          value={`R$ ${stats.totalDAS.toFixed(2)}`}
          description="Valor total calculado"
          icon={Calculator}
          variant="default"
        />
        <StatCard
          title="Pendentes"
          value={stats.pendingCount}
          description="DAS não pagos"
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Pagos"
          value={stats.paidCount}
          description="DAS quitados"
          icon={CheckCircle}
          variant="success"
        />
        <StatCard
          title="Em Atraso"
          value={stats.overdueCount}
          description="Vencimentos perdidos"
          icon={AlertTriangle}
          variant="destructive"
        />
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="calculate">Calcular DAS</TabsTrigger>
          <TabsTrigger value="calendar">Agenda</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Status DAS dos Clientes</CardTitle>
              <CardDescription>Acompanhe o status do DAS de cada cliente</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={mockClients}
                columns={clientColumns}
                searchPlaceholder="Pesquisar por CNPJ ou nome..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculate" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Calcular DAS</CardTitle>
                <CardDescription>Informe os dados para calcular o DAS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} - {client.cnpj}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenue">Receita Bruta (R$)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="0,00"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Período de Apuração</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08/2024">Agosto/2024</SelectItem>
                      <SelectItem value="07/2024">Julho/2024</SelectItem>
                      <SelectItem value="06/2024">Junho/2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleCalculateDAS} className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular DAS
                </Button>

                {calculatedDAS && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <h4 className="font-semibold text-success mb-2">DAS Calculado</h4>
                    <p className="text-2xl font-bold text-success">
                      R$ {calculatedDAS.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Vencimento: 20/09/2024
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Gerar Documento</CardTitle>
                <CardDescription>Gere e baixe o documento DAS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h4 className="font-medium mb-2">Prévia do DAS</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    O documento será gerado após o cálculo
                  </p>
                  {calculatedDAS && (
                    <div className="space-y-2">
                      <Button onClick={handleGenerateDAS} variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Gerar DAS
                      </Button>
                      <Button onClick={handleDownloadDAS} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Informações do DAS</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Código de Receita:</span>
                      <span className="font-mono">20017</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Período de Apuração:</span>
                      <span>08/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data de Vencimento:</span>
                      <span>20/09/2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Agenda de Vencimentos</CardTitle>
                <CardDescription>Visualize os vencimentos no calendário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <ReactCalendar
                    className="border-none shadow-none"
                    tileClassName={({ date }) => {
                      const day = date.getDate();
                      if (day === 20) return 'bg-destructive/20 text-destructive font-bold';
                      return '';
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Próximos Vencimentos</CardTitle>
                <CardDescription>DAS com vencimento próximo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDueDates.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.client}</p>
                        <p className="text-xs text-muted-foreground">
                          Vence em {new Date(item.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">R$ {item.amount.toFixed(2)}</p>
                        <Badge variant={item.status === 'paid' ? 'success' : 'warning'} className="text-xs">
                          {item.status === 'paid' ? 'Pago' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-warning">Atenção!</p>
                      <p className="text-muted-foreground">
                        DAS da Tech Solutions vence em 3 dias
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>Histórico de DAS por cliente</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockClients.map(client => {
                  const clientDAS = mockDASCalculations.filter(das => das.clientId === client.id);
                  if (clientDAS.length === 0) return null;

                  return (
                    <div key={client.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{client.name}</h4>
                          <p className="text-sm text-muted-foreground">{client.cnpj}</p>
                        </div>
                        <Badge variant="outline">
                          {clientDAS.length} DAS
                        </Badge>
                      </div>
                      
                      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                        {clientDAS.map(das => (
                          <div key={das.id} className="p-3 bg-muted/20 rounded">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-medium">
                                {das.month}/{das.year}
                              </span>
                              <Badge variant={
                                das.status === 'paid' ? 'success' :
                                das.status === 'generated' ? 'warning' : 'secondary'
                              } className="text-xs">
                                {das.status === 'paid' ? 'Pago' :
                                 das.status === 'generated' ? 'Gerado' : 'Calculado'}
                              </Badge>
                            </div>
                            <p className="text-sm font-bold">R$ {das.dasAmount.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              Venc: {new Date(das.dueDate).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}