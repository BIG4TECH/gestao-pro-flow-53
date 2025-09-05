// System Types
export type UserRole = "office" | "client";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  plan: "Basic" | "Pro" | "Enterprise";
  status: "active" | "inactive" | "pending";
  lastPayment?: Date;
  nextDueDate?: Date;
  monthlyRecurrence: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

// Payment Types
export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  method: "PIX" | "Credit Card" | "Bank Transfer";
  status: "paid" | "pending" | "overdue";
  date: Date;
  dueDate: Date;
  description: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  dueDate: Date;
  status: "generated" | "sent" | "paid";
  pixQrCode?: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Employee Types
export interface Employee {
  id: string;
  clientId: string;
  name: string;
  position: string;
  salary: number;
  benefits: string[];
  inss: boolean;
  fgts: boolean;
  status: "active" | "inactive";
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  benefits: number;
}

// Task Management Types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  priority: "low" | "medium" | "high";
  assignedTo: string;
  clientId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  comments: TaskComment[];
  attachments: TaskAttachment[];
}

export interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  createdAt: Date;
}

// DAS Types
export interface DASCalculation {
  id: string;
  clientId: string;
  month: number;
  year: number;
  revenue: number;
  dasAmount: number;
  dueDate: Date;
  status: "calculated" | "generated" | "paid";
  paymentDate?: Date;
}

// Document Types
export interface Document {
  id: string;
  clientId: string;
  type: "NF-e" | "CT-e" | "Contract" | "Certificate" | "Report";
  name: string;
  fileUrl: string;
  uploadedAt: Date;
  status: "pending" | "processed" | "sent";
  tags: string[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Dashboard Types
export interface DashboardMetrics {
  pendingPayments: number;
  upcomingDueDates: number;
  openTasks: number;
  totalClients: number;
  monthlyRevenue: number;
  completedTasks: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}