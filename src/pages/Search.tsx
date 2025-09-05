import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, User, FileText, CreditCard, CheckSquare, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockClients, mockDocuments, mockPayments, mockTasks } from '@/data/mockData';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Architecture modules for search
  const architectureModules = [
    { id: 'cobrancas', title: 'Cobranças e Pagamentos', route: '/cobrancas' },
    { id: 'folha', title: 'Folha de Pagamento', route: '/folha-pagamento' },
    { id: 'contabilidade', title: 'Contabilidade Digital', route: '/contabilidade-digital' },
    { id: 'simples', title: 'Simples Nacional', route: '/simples-nacional' },
    { id: 'demandas', title: 'Gerenciamento de Demandas', route: '/demandas' },
    { id: 'automacao', title: 'Automação Fiscal', route: '/automacao-fiscal' },
    { id: 'arquitetura', title: 'Arquitetura do Sistema', route: '/arquitetura' }
  ];

  const searchResults = {
    clients: mockClients.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.cnpj.includes(query)
    ),
    documents: mockDocuments.filter(d => 
      d.name.toLowerCase().includes(query.toLowerCase())
    ),
    payments: mockPayments.filter(p => 
      p.description.toLowerCase().includes(query.toLowerCase())
    ),
    tasks: mockTasks.filter(t => 
      t.title.toLowerCase().includes(query.toLowerCase())
    ),
    modules: architectureModules.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase())
    )
  };

  const totalResults = Object.values(searchResults).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Resultados da Busca</h1>
        <p className="text-muted-foreground mt-1">
          {totalResults} resultado(s) encontrado(s) para "{query}"
        </p>
      </div>

      <div className="grid gap-6">
        {searchResults.modules.length > 0 && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5" />
                <span>Módulos do Sistema ({searchResults.modules.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {searchResults.modules.map(module => (
                  <div 
                    key={module.id} 
                    className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => window.location.href = module.route}
                  >
                    <h4 className="font-medium">{module.title}</h4>
                    <p className="text-sm text-muted-foreground">Clique para acessar o módulo</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {searchResults.clients.length > 0 && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Clientes ({searchResults.clients.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {searchResults.clients.map(client => (
                  <div key={client.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{client.name}</h4>
                    <p className="text-sm text-muted-foreground">{client.cnpj}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {searchResults.tasks.length > 0 && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5" />
                <span>Tarefas ({searchResults.tasks.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {searchResults.tasks.map(task => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {totalResults === 0 && (
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
              <p className="text-muted-foreground">
                Tente usar termos diferentes ou verifique a ortografia.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-4 border-t">
        <p className="text-sm text-muted-foreground">
          Sistema WEB de Contabilidade © 2025
        </p>
      </div>
    </div>
  );
}