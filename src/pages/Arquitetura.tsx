import React, { useState } from 'react';
import { Network, Edit, Eye, Info, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  route: string;
  category: 'left' | 'right';
}

const systemModules: ModuleInfo[] = [
  {
    id: 'mipag-cobrancas',
    title: 'MiPag - Cobranças e Pagamentos',
    description: 'Cadastro de clientes e planos. Envio automático de cobranças via WhatsApp/Email. Integração com Mercado Pago para PIX, cartões e recorrências. Gestão completa do ciclo de faturamento e cobrança.',
    route: '/cobrancas',
    category: 'left'
  },
  {
    id: 'folha-pagamento',
    title: 'Folha de Pagamento',
    description: 'Gestão completa de funcionários, cálculo de salários, benefícios, descontos e encargos. Geração automática de holerites, guias INSS/FGTS e relatórios trabalhistas.',
    route: '/folha-pagamento',
    category: 'left'
  },
  {
    id: 'contabilidade-digital',
    title: 'Contabilidade Digital',
    description: 'Escrituração digital, balancetes, DRE, balanços patrimoniais. Integração com SPED e demais obrigações acessórias. Gestão de plano de contas e lançamentos contábeis.',
    route: '/contabilidade-digital',
    category: 'left'
  },
  {
    id: 'simples-nacional',
    title: 'Simples Nacional',
    description: 'Cálculo e geração automática de DAS (Documento de Arrecadação do Simples Nacional). Acompanhamento de limites de faturamento e alíquotas. Relatórios de apuração mensal.',
    route: '/simples-nacional',
    category: 'right'
  },
  {
    id: 'demandas',
    title: 'Gerenciamento de Demandas',
    description: 'Sistema Kanban para organização de tarefas e demandas dos clientes. Controle de prazos, prioridades e responsáveis. Comunicação integrada e histórico de atividades.',
    route: '/demandas',
    category: 'right'
  },
  {
    id: 'automacao-fiscal',
    title: 'Automação Fiscal (NF-e/CT-e via SEFAZ)',
    description: 'Emissão automática de notas fiscais eletrônicas. Integração direta com SEFAZ. Gestão de produtos, serviços e impostos. Controle de estoque e vendas.',
    route: '/automacao-fiscal',
    category: 'right'
  }
];

export default function Arquitetura() {
  const [selectedModule, setSelectedModule] = useState<ModuleInfo | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleModuleClick = (module: ModuleInfo) => {
    setSelectedModule(module);
  };

  const handleEditDiagram = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setIsEditDialogOpen(false);
    toast({
      title: "Diagrama Atualizado",
      description: "Configuração do diagrama foi salva com sucesso (simulado)",
    });
  };

  const leftModules = systemModules.filter(m => m.category === 'left');
  const rightModules = systemModules.filter(m => m.category === 'right');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Arquitetura do Sistema</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral dos módulos integrados do sistema de contabilidade
          </p>
        </div>
        {user?.role === 'office' && (
          <Button onClick={handleEditDiagram} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Personalizar Diagrama
          </Button>
        )}
      </div>

      {/* Architecture Diagram */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Network className="w-6 h-6 mr-2 text-primary" />
            Arquitetura de Módulos do Sistema de Contabilidade
          </CardTitle>
          <CardDescription>
            Estrutura modular integrada para gestão completa de contabilidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {leftModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => handleModuleClick(module)}
                  className="group p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/40 hover:from-primary/15 hover:to-primary/10"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {module.description.substring(0, 80)}...
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {rightModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => handleModuleClick(module)}
                  className="group p-4 bg-gradient-to-l from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:border-secondary/40 hover:from-secondary/15 hover:to-secondary/10"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                      {module.title}
                    </h3>
                    <Eye className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {module.description.substring(0, 80)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Flow */}
          <div className="mt-8 p-4 bg-muted/20 rounded-lg">
            <div className="text-center">
              <Info className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="text-sm text-muted-foreground">
                <strong>Integração Sistêmica:</strong> Este diagrama representa a estrutura modular do sistema, 
                permitindo gerenciamento integrado de contabilidade. Todos os módulos compartilham dados e 
                processos para uma gestão unificada e eficiente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Details Dialog */}
      <Dialog open={!!selectedModule} onOpenChange={() => setSelectedModule(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Network className="w-5 h-5 mr-2 text-primary" />
              {selectedModule?.title}
            </DialogTitle>
            <DialogDescription>
              Detalhes e funcionalidades do módulo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Descrição Completa:</h4>
              <p className="text-muted-foreground">
                {selectedModule?.description}
              </p>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={() => {
                  window.location.href = selectedModule?.route || '/';
                }}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                Acessar Módulo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedModule(null)}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personalizar Diagrama</DialogTitle>
            <DialogDescription>
              Configure a visualização do diagrama de arquitetura
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Funcionalidade de personalização disponível apenas para demonstração.
              Em um sistema real, aqui seria possível reordenar módulos, 
              alterar cores e configurar exibição.
            </p>
            
            <div className="flex space-x-2">
              <Button onClick={handleSaveEdit} className="flex-1">
                Salvar Alterações
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="text-center py-4 border-t">
        <p className="text-sm text-muted-foreground">
          MiPag © 2025 - Sistema WEB de Contabilidade Integrado
        </p>
      </div>
    </div>
  );
}