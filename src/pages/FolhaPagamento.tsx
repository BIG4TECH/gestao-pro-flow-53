import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Download, 
  Calculator, 
  FileText,
  Eye,
  Edit,
  DollarSign,
  Calendar,
  UserCheck
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
import { Checkbox } from '@/components/ui/checkbox';
import { mockClients, mockEmployees, mockPayslips } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FolhaPagamento() {
  const [activeTab, setActiveTab] = useState('employees');
  const [selectedClient, setSelectedClient] = useState('');
  const { toast } = useToast();

  const employeeColumns = [
    {
      key: 'name' as const,
      title: 'Funcionário',
      sortable: true,
      render: (value: string, record: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{record.position}</div>
        </div>
      )
    },
    {
      key: 'salary' as const,
      title: 'Salário',
      sortable: true,
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    {
      key: 'benefits' as const,
      title: 'Benefícios',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map(benefit => (
            <Badge key={benefit} variant="outline" className="text-xs">
              {benefit}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'status' as const,
      title: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'destructive'}>
          {value === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    {
      key: 'actions' as const,
      title: 'Ações',
      render: (value: any, record: any) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleViewEmployee(record.id)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleEditEmployee(record.id)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleAddEmployee = () => {
    toast({
      title: "Funcionário Adicionado",
      description: "Funcionário adicionado com sucesso (simulado)",
    });
  };

  const handleViewEmployee = (id: string) => {
    toast({
      title: "Visualizar Funcionário",
      description: `Abrindo detalhes do funcionário ${id} (simulado)`,
    });
  };

  const handleEditEmployee = (id: string) => {
    toast({
      title: "Editar Funcionário",
      description: `Editando funcionário ${id} (simulado)`,
    });
  };

  const handleGeneratePayslip = () => {
    toast({
      title: "Holerite Gerado",
      description: "Holerite gerado com sucesso (simulado)",
    });
  };

  const handleBatchGenerate = () => {
    toast({
      title: "Lote Processado",
      description: "Folha de pagamento gerada para todos os funcionários (simulado)",
    });
  };

  const handleExportGuides = () => {
    toast({
      title: "Guias Exportadas",
      description: "Guias INSS/FGTS exportadas como PDF (simulado)",
    });
  };

  const filteredEmployees = selectedClient && selectedClient !== 'all'
    ? mockEmployees.filter(emp => emp.clientId === selectedClient)
    : mockEmployees;

  const stats = {
    totalEmployees: mockEmployees.length,
    activeEmployees: mockEmployees.filter(emp => emp.status === 'active').length,
    totalSalaries: mockEmployees.reduce((sum, emp) => sum + emp.salary, 0),
    averageSalary: mockEmployees.length > 0 
      ? mockEmployees.reduce((sum, emp) => sum + emp.salary, 0) / mockEmployees.length 
      : 0
  };

  const monthlyData = [
    { month: 'Janeiro', employees: 45, totalCost: 285000, inss: 28500, fgts: 22800 },
    { month: 'Fevereiro', employees: 47, totalCost: 295000, inss: 29500, fgts: 23600 },
    { month: 'Março', employees: 48, totalCost: 310000, inss: 31000, fgts: 24800 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Folha de Pagamento</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie funcionários e processos da folha de pagamento
          </p>
        </div>
        <Button onClick={handleAddEmployee} variant="gradient">
          <Plus className="w-4 h-4 mr-2" />
          Novo Funcionário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Funcionários"
          value={stats.totalEmployees}
          description="Cadastrados no sistema"
          icon={Users}
          variant="default"
        />
        <StatCard
          title="Funcionários Ativos"
          value={stats.activeEmployees}
          description="Com carteira assinada"
          icon={UserCheck}
          variant="success"
        />
        <StatCard
          title="Folha Total"
          value={`R$ ${stats.totalSalaries.toFixed(2)}`}
          description="Soma dos salários"
          icon={DollarSign}
          variant="default"
        />
        <StatCard
          title="Salário Médio"
          value={`R$ ${stats.averageSalary.toFixed(2)}`}
          description="Média salarial"
          icon={Calculator}
          variant="default"
        />
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">Funcionários</TabsTrigger>
          <TabsTrigger value="payslips">Holerites</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="integration">Integração</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Funcionários</CardTitle>
                  <CardDescription>Gerencie os funcionários de todos os clientes</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os clientes</SelectItem>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredEmployees}
                columns={employeeColumns}
                searchPlaceholder="Pesquisar funcionários..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payslips" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Gerar Holerites</CardTitle>
                <CardDescription>Processe holerites individuais ou em lote</CardDescription>
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
                  <Label htmlFor="month">Mês de Referência</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09/2024">Setembro/2024</SelectItem>
                      <SelectItem value="08/2024">Agosto/2024</SelectItem>
                      <SelectItem value="07/2024">Julho/2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee">Funcionário (Opcional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os funcionários" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredEmployees.map(employee => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={handleGeneratePayslip} variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Individual
                  </Button>
                  <Button onClick={handleBatchGenerate}>
                    <Calculator className="w-4 h-4 mr-2" />
                    Lote
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Prévia do Holerite</CardTitle>
                <CardDescription>Visualize o holerite antes de gerar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="text-center mb-4">
                    <h4 className="font-bold">DEMONSTRATIVO DE PAGAMENTO</h4>
                    <p className="text-sm text-muted-foreground">Setembro/2024</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Funcionário:</span>
                      <span className="font-medium">João Silva</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cargo:</span>
                      <span>Desenvolvedor</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Salário Bruto:</span>
                      <span>R$ 5.000,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>(-) INSS:</span>
                      <span>R$ 550,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>(-) IRRF:</span>
                      <span>R$ 350,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>(+) Benefícios:</span>
                      <span>R$ 800,00</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold">
                      <span>Salário Líquido:</span>
                      <span>R$ 4.900,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Relatórios Mensais</CardTitle>
                <CardDescription>Relatórios consolidados por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{month.month} 2024</h4>
                        <Badge variant="outline">{month.employees} funcionários</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Custo Total</p>
                          <p className="font-bold">R$ {month.totalCost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">INSS</p>
                          <p className="font-bold">R$ {month.inss.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">FGTS</p>
                          <p className="font-bold">R$ {month.fgts.toLocaleString()}</p>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Histórico de Folhas</CardTitle>
                <CardDescription>Histórico organizados por cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {mockClients.slice(0, 3).map((client) => {
                    const clientEmployees = mockEmployees.filter(emp => emp.clientId === client.id);
                    const totalSalary = clientEmployees.reduce((sum, emp) => sum + emp.salary, 0);
                    
                    return (
                      <AccordionItem key={client.id} value={client.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div className="text-left">
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {clientEmployees.length} funcionários
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">R$ {totalSalary.toFixed(2)}</div>
                              <div className="text-sm text-muted-foreground">Folha mensal</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            {clientEmployees.map(employee => {
                              const payslip = mockPayslips.find(p => p.employeeId === employee.id);
                              return (
                                <div key={employee.id} className="flex items-center justify-between p-3 bg-muted/20 rounded">
                                  <div>
                                    <p className="font-medium">{employee.name}</p>
                                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold">R$ {employee.salary.toFixed(2)}</p>
                                    {payslip && (
                                      <p className="text-sm text-muted-foreground">
                                        Líquido: R$ {payslip.netSalary.toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Configuração INSS/FGTS</CardTitle>
                <CardDescription>Configure as alíquotas e cálculos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inss-rate">Alíquota INSS (%)</Label>
                  <Input id="inss-rate" type="number" placeholder="11" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fgts-rate">Alíquota FGTS (%)</Label>
                  <Input id="fgts-rate" type="number" placeholder="8" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrf-base">Base IRRF (R$)</Label>
                  <Input id="irrf-base" type="number" placeholder="1908.00" />
                </div>

                <Button className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular Encargos (Simulado)
                </Button>

                <div className="p-3 bg-success/10 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">Resultado do Cálculo</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Total INSS:</span>
                      <span>R$ 15.420,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total FGTS:</span>
                      <span>R$ 11.200,00</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total Encargos:</span>
                      <span>R$ 26.620,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Exportar Guias</CardTitle>
                <CardDescription>Gere guias INSS, FGTS e outros</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Período de Referência</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09/2024">Setembro/2024</SelectItem>
                      <SelectItem value="08/2024">Agosto/2024</SelectItem>
                      <SelectItem value="07/2024">Julho/2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Tipos de Guia</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="grf" defaultChecked />
                      <Label htmlFor="grf">GRF - FGTS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gps" defaultChecked />
                      <Label htmlFor="gps">GPS - INSS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="darf" />
                      <Label htmlFor="darf">DARF - IRRF</Label>
                    </div>
                  </div>
                </div>

                <Button onClick={handleExportGuides} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Guias (PDF)
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>As guias serão geradas com os dados atuais</p>
                  <p>Verifique os valores antes de enviar</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}