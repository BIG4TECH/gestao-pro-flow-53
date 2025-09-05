import React from 'react';
import { 
  DollarSign, 
  Calendar, 
  CheckSquare, 
  Users, 
  TrendingUp, 
  AlertCircle,
  FileText,
  CreditCard,
  Activity
} from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockDashboardMetrics, mockNotifications, mockClients, mockPayments } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isOffice = user?.role === 'office';

  // Mock chart data for demonstration
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    received: [4500, 5200, 4800, 6100, 5800, 6500],
    pending: [1200, 800, 1500, 900, 1100, 600],
  };

  const recentActivities = [
    { type: 'payment', message: 'Pagamento recebido - Empresa ABC', time: '2 min atrás', status: 'success' },
    { type: 'task', message: 'Nova tarefa: Processar folha', time: '15 min atrás', status: 'info' },
    { type: 'alert', message: 'DAS vencendo em 3 dias', time: '1 hora atrás', status: 'warning' },
    { type: 'document', message: 'Documento processado - Tech Solutions', time: '2 horas atrás', status: 'success' },
  ];

  const upcomingTasks = [
    { title: 'Processar folha - Empresa ABC', due: '2024-09-15', priority: 'high' },
    { title: 'Calcular DAS - Tech Solutions', due: '2024-09-20', priority: 'medium' },
    { title: 'Revisar documentos - Comércio XYZ', due: '2024-09-18', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {isOffice 
              ? 'Aqui está um resumo das atividades do escritório' 
              : 'Aqui está um resumo da sua conta'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isOffice ? (
          <>
            <StatCard
              title="Pagamentos Pendentes"
              value={mockDashboardMetrics.pendingPayments}
              description="Faturas em aberto"
              icon={CreditCard}
              variant="warning"
              trend={{ value: -12, label: "vs mês anterior" }}
            />
            <StatCard
              title="Vencimentos Próximos"
              value={mockDashboardMetrics.upcomingDueDates}
              description="Próximos 7 dias"
              icon={Calendar}
              variant="destructive"
            />
            <StatCard
              title="Tarefas Abertas"
              value={mockDashboardMetrics.openTasks}
              description="Pendentes de conclusão"
              icon={CheckSquare}
              variant="default"
            />
            <StatCard
              title="Total de Clientes"
              value={mockDashboardMetrics.totalClients}
              description="Clientes ativos"
              icon={Users}
              variant="success"
              trend={{ value: 15, label: "crescimento" }}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Próximo Pagamento"
              value="R$ 1.200"
              description="Vence em 10 dias"
              icon={DollarSign}
              variant="warning"
            />
            <StatCard
              title="Documentos Pendentes"
              value="3"
              description="Aguardando processamento"
              icon={FileText}
              variant="default"
            />
            <StatCard
              title="Tarefas Atribuídas"
              value="2"
              description="Para sua empresa"
              icon={CheckSquare}
              variant="default"
            />
            <StatCard
              title="Status da Conta"
              value="Ativa"
              description="Plano Pro"
              icon={Activity}
              variant="success"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Faturamento vs Pendências</span>
            </CardTitle>
            <CardDescription>
              Comparativo dos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simple chart representation */}
              <div className="flex items-end space-x-2 h-40">
                {chartData.labels.map((month, index) => (
                  <div key={month} className="flex-1 flex flex-col items-center space-y-1">
                    <div className="flex flex-col items-center space-y-1 w-full">
                      <div 
                        className="w-full bg-primary rounded-t"
                        style={{ 
                          height: `${(chartData.received[index] / 7000) * 120}px`,
                          minHeight: '20px'
                        }}
                      />
                      <div 
                        className="w-full bg-warning rounded-t"
                        style={{ 
                          height: `${(chartData.pending[index] / 7000) * 120}px`,
                          minHeight: '10px'
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded" />
                  <span>Recebido</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded" />
                  <span>Pendente</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Atividades Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas atualizações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'warning' ? 'bg-warning' :
                    activity.status === 'error' ? 'bg-destructive' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse as funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {isOffice ? (
                <>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/cobrancas')}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Cobranças</div>
                      <div className="text-xs text-muted-foreground">Gerenciar faturas</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/demandas')}
                  >
                    <CheckSquare className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Demandas</div>
                      <div className="text-xs text-muted-foreground">Gerenciar tarefas</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/simples-nacional')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">DAS</div>
                      <div className="text-xs text-muted-foreground">Simples Nacional</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/folha-pagamento')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Folha</div>
                      <div className="text-xs text-muted-foreground">Pagamentos</div>
                    </div>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/contabilidade-digital')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Documentos</div>
                      <div className="text-xs text-muted-foreground">Meus arquivos</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={() => navigate('/demandas')}
                  >
                    <CheckSquare className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Tarefas</div>
                      <div className="text-xs text-muted-foreground">Minhas demandas</div>
                    </div>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks/Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              <span>{isOffice ? 'Próximas Tarefas' : 'Alertas Importantes'}</span>
            </CardTitle>
            <CardDescription>
              {isOffice ? 'Tarefas com prazo próximo' : 'Notificações para sua conta'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isOffice ? (
                upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Vence em {new Date(task.due).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'warning' : 'secondary'
                    }>
                      {task.priority === 'high' ? 'Alta' :
                       task.priority === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                ))
              ) : (
                mockNotifications
                  .filter(n => n.userId === user?.id)
                  .slice(0, 3)
                  .map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-success' :
                        notification.type === 'warning' ? 'bg-warning' :
                        notification.type === 'error' ? 'bg-destructive' : 'bg-primary'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
