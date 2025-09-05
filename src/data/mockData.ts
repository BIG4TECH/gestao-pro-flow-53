import { 
  Client, 
  Payment, 
  Employee, 
  Task, 
  Board, 
  DASCalculation, 
  Document, 
  Notification,
  DashboardMetrics,
  Invoice,
  Payslip 
} from '@/types';

// Mock Clients
export const mockClients: Client[] = [
  {
    id: "client-1",
    name: "Empresa ABC Ltda",
    cnpj: "12.345.678/0001-90",
    email: "contato@empresaabc.com",
    phone: "(11) 98765-4321",
    plan: "Pro",
    status: "active",
    lastPayment: new Date("2024-08-15"),
    nextDueDate: new Date("2024-09-15"),
    monthlyRecurrence: true,
    address: {
      street: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    }
  },
  {
    id: "client-2", 
    name: "Tech Solutions S.A.",
    cnpj: "98.765.432/0001-10",
    email: "financeiro@techsolutions.com",
    phone: "(11) 91234-5678",
    plan: "Enterprise",
    status: "active",
    lastPayment: new Date("2024-08-20"),
    nextDueDate: new Date("2024-09-20"),
    monthlyRecurrence: true,
  },
  {
    id: "client-3",
    name: "Comércio XYZ ME",
    cnpj: "11.222.333/0001-44",
    email: "admin@comercioxyz.com", 
    phone: "(11) 95555-1234",
    plan: "Basic",
    status: "pending",
    nextDueDate: new Date("2024-09-10"),
    monthlyRecurrence: false,
  },
  {
    id: "client-4",
    name: "Indústria Nova Era",
    cnpj: "55.444.333/0001-22",
    email: "contabil@novaera.com",
    phone: "(11) 94444-9999",
    plan: "Pro",
    status: "active",
    lastPayment: new Date("2024-08-12"),
    nextDueDate: new Date("2024-09-12"),
    monthlyRecurrence: true,
  },
  {
    id: "client-5",
    name: "Serviços Premium Ltd",
    cnpj: "77.888.999/0001-55",
    email: "financas@premium.com",
    phone: "(21) 97777-8888",
    plan: "Enterprise",
    status: "inactive",
    lastPayment: new Date("2024-07-30"),
    monthlyRecurrence: false,
  }
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: "pay-1",
    clientId: "client-1",
    amount: 1200.00,
    method: "PIX",
    status: "paid",
    date: new Date("2024-08-15"),
    dueDate: new Date("2024-08-15"),
    description: "Mensalidade Plano Pro - Agosto/2024"
  },
  {
    id: "pay-2",
    clientId: "client-2", 
    amount: 2500.00,
    method: "Credit Card",
    status: "paid",
    date: new Date("2024-08-20"),
    dueDate: new Date("2024-08-20"),
    description: "Mensalidade Plano Enterprise - Agosto/2024"
  },
  {
    id: "pay-3",
    clientId: "client-3",
    amount: 800.00,
    method: "Bank Transfer",
    status: "pending",
    date: new Date("2024-09-10"),
    dueDate: new Date("2024-09-10"),
    description: "Mensalidade Plano Basic - Setembro/2024"
  },
  {
    id: "pay-4",
    clientId: "client-4",
    amount: 1200.00,
    method: "PIX",
    status: "overdue",
    date: new Date("2024-09-12"),
    dueDate: new Date("2024-09-05"),
    description: "Mensalidade Plano Pro - Setembro/2024"
  },
  {
    id: "pay-5",
    clientId: "client-1",
    amount: 1200.00,
    method: "PIX", 
    status: "pending",
    date: new Date("2024-09-15"),
    dueDate: new Date("2024-09-15"),
    description: "Mensalidade Plano Pro - Setembro/2024"
  }
];

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: "emp-1",
    clientId: "client-1",
    name: "João Silva",
    position: "Desenvolvedor",
    salary: 5000.00,
    benefits: ["Vale Transporte", "Vale Refeição"],
    inss: true,
    fgts: true,
    status: "active"
  },
  {
    id: "emp-2",
    clientId: "client-1",
    name: "Maria Santos",
    position: "Gerente",
    salary: 8000.00,
    benefits: ["Vale Transporte", "Vale Refeição", "Plano de Saúde"],
    inss: true,
    fgts: true,
    status: "active"
  },
  {
    id: "emp-3",
    clientId: "client-2",
    name: "Pedro Oliveira",
    position: "Analista",
    salary: 4500.00,
    benefits: ["Vale Transporte"],
    inss: true,
    fgts: true,
    status: "active"
  },
  {
    id: "emp-4",
    clientId: "client-2",
    name: "Ana Costa",
    position: "Coordenadora",
    salary: 6500.00,
    benefits: ["Vale Transporte", "Vale Refeição", "Plano de Saúde"],
    inss: true,
    fgts: true,
    status: "active"
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Processar folha de pagamento - Empresa ABC",
    description: "Calcular e gerar folha de pagamento do mês de setembro",
    status: "todo",
    priority: "high",
    assignedTo: "Admin Contabilidade",
    clientId: "client-1",
    dueDate: new Date("2024-09-25"),
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-01"),
    comments: [],
    attachments: []
  },
  {
    id: "task-2",
    title: "Calcular DAS - Tech Solutions",
    description: "Calcular valor do DAS baseado no faturamento de agosto",
    status: "inprogress",
    priority: "medium",
    assignedTo: "Admin Contabilidade",
    clientId: "client-2",
    dueDate: new Date("2024-09-20"),
    createdAt: new Date("2024-08-30"),
    updatedAt: new Date("2024-09-02"),
    comments: [
      {
        id: "comment-1",
        userId: "1",
        userName: "Admin Contabilidade",
        content: "Aguardando envio das notas fiscais do cliente",
        createdAt: new Date("2024-09-02")
      }
    ],
    attachments: []
  },
  {
    id: "task-3",
    title: "Enviar relatório mensal",
    description: "Preparar e enviar relatório contábil mensal para todos os clientes",
    status: "done",
    priority: "medium",
    assignedTo: "Admin Contabilidade",
    dueDate: new Date("2024-08-31"),
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-30"),
    comments: [],
    attachments: []
  },
  {
    id: "task-4",
    title: "Configurar integração SEFAZ",
    description: "Configurar certificado digital para integração com SEFAZ",
    status: "todo",
    priority: "high",
    assignedTo: "Admin Contabilidade",
    dueDate: new Date("2024-09-30"),
    createdAt: new Date("2024-09-03"),
    updatedAt: new Date("2024-09-03"),
    comments: [],
    attachments: []
  },
  {
    id: "task-5",
    title: "Revisar documentos fiscais - Comércio XYZ",
    description: "Revisar e validar documentos fiscais enviados pelo cliente",
    status: "inprogress",
    priority: "low",
    assignedTo: "Admin Contabilidade",
    clientId: "client-3",
    dueDate: new Date("2024-09-18"),
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-04"),
    comments: [],
    attachments: [
      {
        id: "att-1",
        fileName: "notas_fiscais_agosto.pdf",
        fileSize: 2048576,
        uploadedAt: new Date("2024-09-01"),
        uploadedBy: "client-3"
      }
    ]
  }
];

// Mock Boards
export const mockBoards: Board[] = [
  {
    id: "board-1",
    name: "Clientes",
    description: "Gerenciamento de demandas dos clientes",
    tasks: mockTasks.filter(task => task.clientId),
    createdAt: new Date("2024-08-01")
  },
  {
    id: "board-2",
    name: "Folha de Pagamento",
    description: "Tarefas relacionadas à folha de pagamento",
    tasks: mockTasks.filter(task => task.title.toLowerCase().includes("folha")),
    createdAt: new Date("2024-08-01")
  },
  {
    id: "board-3",
    name: "Fiscal",
    description: "Obrigações e documentos fiscais",
    tasks: mockTasks.filter(task => task.title.toLowerCase().includes("das") || task.title.toLowerCase().includes("fiscal")),
    createdAt: new Date("2024-08-01")
  }
];

// Mock DAS Calculations
export const mockDASCalculations: DASCalculation[] = [
  {
    id: "das-1",
    clientId: "client-1",
    month: 8,
    year: 2024,
    revenue: 50000.00,
    dasAmount: 2500.00,
    dueDate: new Date("2024-09-20"),
    status: "paid",
    paymentDate: new Date("2024-09-18")
  },
  {
    id: "das-2",
    clientId: "client-2",
    month: 8,
    year: 2024,
    revenue: 120000.00,
    dasAmount: 7200.00,
    dueDate: new Date("2024-09-20"),
    status: "generated"
  },
  {
    id: "das-3",
    clientId: "client-3",
    month: 8,
    year: 2024,
    revenue: 25000.00,
    dasAmount: 1250.00,
    dueDate: new Date("2024-09-20"),
    status: "calculated"
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    clientId: "client-1",
    type: "NF-e",
    name: "Nota Fiscal 001 - Agosto 2024",
    fileUrl: "/documents/nfe-001.pdf",
    uploadedAt: new Date("2024-08-15"),
    status: "processed",
    tags: ["agosto", "nfe", "vendas"]
  },
  {
    id: "doc-2",
    clientId: "client-1",
    type: "Contract",
    name: "Contrato Social Atualizado",
    fileUrl: "/documents/contrato-social.pdf",
    uploadedAt: new Date("2024-07-20"),
    status: "processed",
    tags: ["contrato", "juridico"]
  },
  {
    id: "doc-3",
    clientId: "client-2",
    type: "Certificate",
    name: "Certificado Digital A1",
    fileUrl: "/documents/certificado-a1.p12",
    uploadedAt: new Date("2024-08-01"),
    status: "processed",
    tags: ["certificado", "digital"]
  },
  {
    id: "doc-4",
    clientId: "client-2",
    type: "Report",
    name: "Balancete Agosto 2024",
    fileUrl: "/documents/balancete-agosto.pdf",
    uploadedAt: new Date("2024-08-31"),
    status: "sent",
    tags: ["balancete", "agosto", "contabil"]
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "1",
    title: "DAS Vencendo",
    message: "DAS da Tech Solutions vence em 3 dias",
    type: "warning",
    read: false,
    createdAt: new Date("2024-09-02"),
    actionUrl: "/simples-nacional"
  },
  {
    id: "notif-2",
    userId: "1",
    title: "Pagamento Recebido",
    message: "Pagamento da Empresa ABC foi processado com sucesso",
    type: "success",
    read: false,
    createdAt: new Date("2024-09-01"),
    actionUrl: "/cobrancas"
  },
  {
    id: "notif-3",
    userId: "1",  
    title: "Nova Tarefa",
    message: "Nova tarefa atribuída: Processar folha de pagamento",
    type: "info",
    read: true,
    createdAt: new Date("2024-08-30"),
    actionUrl: "/demandas"
  },
  {
    id: "notif-4",
    userId: "2",
    title: "Documento Processado",
    message: "Seu balancete mensal foi processado e está disponível",
    type: "success",
    read: false,
    createdAt: new Date("2024-08-31"),
    actionUrl: "/contabilidade-digital"
  }
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  pendingPayments: 3,
  upcomingDueDates: 5,
  openTasks: 7,
  totalClients: 5, 
  monthlyRevenue: 12500.00,
  completedTasks: 12
};

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    clientId: "client-1",
    amount: 1200.00,
    dueDate: new Date("2024-09-15"),
    status: "sent",
    pixQrCode: "00020126580014BR.GOV.BCB.PIX...",
    items: [
      {
        description: "Plano Pro - Setembro 2024",
        quantity: 1,
        unitPrice: 1200.00,
        total: 1200.00
      }
    ]
  },
  {
    id: "inv-2",
    clientId: "client-2",
    amount: 2500.00,
    dueDate: new Date("2024-09-20"),
    status: "generated",
    items: [
      {
        description: "Plano Enterprise - Setembro 2024", 
        quantity: 1,
        unitPrice: 2500.00,
        total: 2500.00
      }
    ]
  }
];

// Mock Payslips
export const mockPayslips: Payslip[] = [
  {
    id: "payslip-1",
    employeeId: "emp-1",
    month: 8,
    year: 2024,
    grossSalary: 5000.00,
    deductions: 1100.00,
    netSalary: 3900.00,
    benefits: 800.00
  },
  {
    id: "payslip-2", 
    employeeId: "emp-2",
    month: 8,
    year: 2024,
    grossSalary: 8000.00,
    deductions: 1760.00,
    netSalary: 6240.00,
    benefits: 1200.00
  }
];

// Helper functions
export const getClientById = (id: string) => mockClients.find(c => c.id === id);
export const getPaymentsByClientId = (clientId: string) => mockPayments.filter(p => p.clientId === clientId);
export const getEmployeesByClientId = (clientId: string) => mockEmployees.filter(e => e.clientId === clientId);
export const getTasksByClientId = (clientId: string) => mockTasks.filter(t => t.clientId === clientId);
export const getDocumentsByClientId = (clientId: string) => mockDocuments.filter(d => d.clientId === clientId);
export const getNotificationsByUserId = (userId: string) => mockNotifications.filter(n => n.userId === userId);