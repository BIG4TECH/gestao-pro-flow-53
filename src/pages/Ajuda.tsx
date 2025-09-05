import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, Send, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

const helpSections = [
  {
    id: 'mipag-module',
    title: 'Módulo MiPag - Cobranças e Pagamentos',
    content: `O módulo MiPag oferece gestão completa de cobranças e pagamentos com:
    
    • Cadastro de clientes e planos de cobrança
    • Envio automático de cobranças via WhatsApp e Email
    • Integração nativa com Mercado Pago
    • Suporte a PIX, cartões de crédito/débito e recorrências
    • Dashboard com indicadores de performance
    • Relatórios de inadimplência e fluxo de caixa
    • Gestão de planos e assinaturas recorrentes`
  },
  {
    id: 'payroll-module',
    title: 'Módulo de Folha de Pagamento',
    content: `Sistema completo para gestão de recursos humanos:
    
    • Cadastro de funcionários e cargos
    • Cálculo automático de salários e benefícios
    • Geração de holerites individuais e em lote
    • Cálculo de encargos (INSS, FGTS, IRRF)
    • Geração de guias de recolhimento
    • Relatórios trabalhistas e previdenciários
    • Controle de férias e 13º salário`
  },
  {
    id: 'digital-accounting',
    title: 'Contabilidade Digital',
    content: `Módulo de escrituração e contabilidade digital:
    
    • Plano de contas customizável
    • Lançamentos contábeis automatizados
    • Balancetes e demonstrativos financeiros
    • DRE (Demonstração do Resultado do Exercício)
    • Balanço Patrimonial
    • Integração com SPED Contábil
    • Conciliação bancária automática`
  },
  {
    id: 'simples-nacional',
    title: 'Simples Nacional',
    content: `Gestão completa do regime tributário:
    
    • Cálculo automático do DAS
    • Acompanhamento de limites de faturamento
    • Tabelas de alíquotas atualizadas
    • Parcelamento de débitos
    • Relatórios de apuração mensal
    • Alertas de vencimento
    • Histórico de pagamentos`
  },
  {
    id: 'demands-management',
    title: 'Gerenciamento de Demandas',
    content: `Sistema Kanban para organização de tarefas:
    
    • Quadros personalizáveis por cliente ou projeto
    • Cartões com prazos e prioridades
    • Atribuição de responsáveis
    • Comentários e anexos
    • Notificações automáticas
    • Relatórios de produtividade
    • Integração com outros módulos`
  },
  {
    id: 'fiscal-automation',
    title: 'Automação Fiscal',
    content: `Emissão e gestão de documentos fiscais:
    
    • Emissão de NF-e e CT-e
    • Integração direta com SEFAZ
    • Cadastro de produtos e serviços
    • Cálculo automático de impostos
    • Controle de estoque
    • Relatórios fiscais
    • Backup automático de XMLs`
  }
];

export default function Ajuda() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate random success/error
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    if (isSuccess) {
      toast({
        title: "Mensagem Enviada",
        description: "Sua mensagem foi enviada com sucesso! Retornaremos em breve.",
      });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } else {
      toast({
        title: "Erro Simulado",
        description: "Falha no envio da mensagem. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ajuda e Sobre</h1>
          <p className="text-muted-foreground mt-1">
            Central de ajuda, documentação e informações do sistema
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Help Documentation */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                Documentação dos Módulos
              </CardTitle>
              <CardDescription>
                Guias detalhados de cada módulo do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {helpSections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="text-left">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="whitespace-pre-line text-sm text-muted-foreground">
                        {section.content}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Informações do Sistema</CardTitle>
              <CardDescription>Versão e dados técnicos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Versão:</p>
                  <p className="text-muted-foreground">1.0.0 - Setembro 2025</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Última Atualização:</p>
                  <p className="text-muted-foreground">05/09/2025</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Ambiente:</p>
                  <p className="text-muted-foreground">Produção</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Status:</p>
                  <p className="text-success font-medium">Operacional</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-foreground mb-2">Sobre o MiPag</h4>
                <p className="text-sm text-muted-foreground">
                  O MiPag é um sistema WEB de contabilidade integrado, desenvolvido para 
                  oferecer uma solução completa e moderna para escritórios contábeis e empresas. 
                  Com módulos especializados e integração nativa, simplifica a gestão contábil, 
                  fiscal e administrativa.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                Entre em Contato
              </CardTitle>
              <CardDescription>
                Envie suas dúvidas, sugestões ou relate problemas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Assunto da sua mensagem"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Descreva sua dúvida, sugestão ou problema..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Outras Formas de Contato</CardTitle>
              <CardDescription>Canais alternativos de suporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Email de Suporte</p>
                  <p className="text-sm text-muted-foreground">suporte@mipag.com.br</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">(11) 3000-0000</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Horário de atendimento: Segunda a Sexta, das 8h às 18h
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t">
        <p className="text-sm text-muted-foreground">
          MiPag © 2025 - Sistema WEB de Contabilidade Integrado
        </p>
      </div>
    </div>
  );
}