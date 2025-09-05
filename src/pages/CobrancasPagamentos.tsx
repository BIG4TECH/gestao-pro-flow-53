import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Send, 
  Eye,
  Edit,
  CreditCard,
  QrCode,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/common/DataTable';
import { StatCard } from '@/components/common/StatCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { mockClients, mockPayments, mockInvoices } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function CobrancasPagamentos() {
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
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
      key: 'plan' as const,
      title: 'Plano',
      sortable: true,
      render: (value: string) => (
        <Badge variant={
          value === 'Enterprise' ? 'default' :
          value === 'Pro' ? 'secondary' : 'outline'
        }>
          {value}
        </Badge>
      )
    },
    {
      key: 'lastPayment' as const,
      title: 'Último Pagamento',
      sortable: true,
      render: (value: Date) => value ? new Date(value).toLocaleDateString('pt-BR') : '-'
    },
    {
      key: 'status' as const,
      title: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={
          value === 'active' ? 'success' :
          value === 'pending' ? 'warning' : 'destructive'
        }>
          {value === 'active' ? 'Ativo' :
           value === 'pending' ? 'Pendente' : 'Inativo'}
        </Badge>
      )
    },
    {
      key: 'actions' as const,
      title: 'Ações',
      render: (value: any, record: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleViewClient(record.id)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleEditClient(record.id)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const paymentColumns = [
    {
      key: 'clientName' as const,
      title: 'Cliente',
      sortable: true,
      render: (value: any, record: any) => {
        const client = mockClients.find(c => c.id === record.clientId);
        return client?.name || 'Cliente não encontrado';
      }
    },
    {
      key: 'amount' as const,
      title: 'Valor',
      sortable: true,
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    {
      key: 'method' as const,
      title: 'Método',
      sortable: true,
      render: (value: string) => (
        <Badge variant="outline">
          {value}
        </Badge>
      )
    },
    {
      key: 'status' as const,
      title: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={
          value === 'paid' ? 'success' :
          value === 'pending' ? 'warning' : 'destructive'
        }>
          {value === 'paid' ? 'Pago' :
           value === 'pending' ? 'Pendente' : 'Vencido'}
        </Badge>
      )
    },
    {
      key: 'dueDate' as const,
      title: 'Vencimento',
      sortable: true,
      render: (value: Date) => new Date(value).toLocaleDateString('pt-BR')
    }
  ];

  const handleAddClient = () => {
    toast({
      title: "Cliente Adicionado",
      description: "Cliente adicionado com sucesso (simulado)",
    });
  };

  const handleViewClient = (id: string) => {
    toast({
      title: "Visualizar Cliente",
      description: `Abrindo detalhes do cliente ${id} (simulado)`,
    });
  };

  const handleEditClient = (id: string) => {
    toast({
      title: "Editar Cliente",
      description: `Editando cliente ${id} (simulado)`,
    });
  };

  const handleGenerateInvoice = () => {
    toast({
      title: "Fatura Gerada",
      description: "Fatura gerada com sucesso (simulado)",
    });
  };

  const handleSendInvoice = () => {
    toast({
      title: "Fatura Enviada",
      description: "Fatura enviada por WhatsApp/Email (simulado)",
    });
  };

  const stats = {
    totalReceived: mockPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    totalPending: mockPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalOverdue: mockPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    totalClients: mockClients.length
  };

  return (
    <div className="space-y-6">
      {/* MiPag Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">MP</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground">Powered by MiPag</h3>
                <p className="text-muted-foreground">
                  Módulo de cobranças e pagamentos integrado com Mercado Pago para PIX, cartões e recorrências.
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary text-primary">
              Integração Ativa
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">MiPag - Cobranças e Pagamentos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie clientes, faturas e pagamentos com integração Mercado Pago
          </p>
        </div>
        <Button onClick={handleAddClient} variant="gradient">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Recebido"
          value={`R$ ${stats.totalReceived.toFixed(2)}`}
          description="Pagamentos confirmados"
          icon={DollarSign}
          variant="success"
        />
        <StatCard
          title="Total Pendente"
          value={`R$ ${stats.totalPending.toFixed(2)}`}
          description="Aguardando pagamento"
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="Total Vencido"
          value={`R$ ${stats.totalOverdue.toFixed(2)}`}
          description="Pagamentos em atraso"
          icon={Calendar}
          variant="destructive"
        />
        <StatCard
          title="Total de Clientes"
          value={stats.totalClients}
          description="Clientes cadastrados"
          icon={CreditCard}
          variant="default"
        />
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Clientes</CardTitle>
                  <CardDescription>Gerencie seus clientes e planos</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={mockClients}
                columns={clientColumns}
                searchPlaceholder="Pesquisar clientes..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Gerar Fatura</CardTitle>
                <CardDescription>Crie novas faturas para clientes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
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
                  <Label htmlFor="amount">Valor</Label>
                  <Input id="amount" type="number" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Data de Vencimento</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <Button onClick={handleGenerateInvoice} className="w-full">
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar Fatura com PIX
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Enviar Faturas</CardTitle>
                <CardDescription>Envie faturas por WhatsApp ou Email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Faturas Pendentes</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {mockInvoices.map(invoice => {
                      const client = mockClients.find(c => c.id === invoice.clientId);
                      return (
                        <div key={invoice.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                          <div className="text-sm">
                            <div className="font-medium">{client?.name}</div>
                            <div className="text-muted-foreground">R$ {invoice.amount.toFixed(2)}</div>
                          </div>
                          <Badge variant="outline">{invoice.status}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleSendInvoice}>
                    <Send className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" onClick={handleSendInvoice}>
                    <Send className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>Visualize todos os pagamentos e pendências</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={mockPayments}
                columns={paymentColumns}
                searchPlaceholder="Pesquisar pagamentos..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Relatório de Recebimentos</CardTitle>
                <CardDescription>Pagamentos recebidos vs pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Recebidos</span>
                    <span className="font-bold text-success">R$ {stats.totalReceived.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pendentes</span>
                    <span className="font-bold text-warning">R$ {stats.totalPending.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vencidos</span>
                    <span className="font-bold text-destructive">R$ {stats.totalOverdue.toFixed(2)}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Relatório (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Configuração de Integração</CardTitle>
                <CardDescription>Configurar Mercado Pago API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key do Mercado Pago</Label>
                  <Input 
                    id="apiKey" 
                    type="password" 
                    placeholder="Sua chave de API"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  Testar Conexão (Simulado)
                </Button>
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-success">✓ Integração configurada (simulada)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center py-4 border-t">
        <p className="text-sm text-muted-foreground">
          MiPag © 2025 - Sistema WEB de Contabilidade Integrado
        </p>
      </div>
    </div>
  );
}