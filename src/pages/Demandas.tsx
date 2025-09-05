import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Eye, 
  MessageSquare, 
  Paperclip, 
  Calendar,
  User,
  MoreHorizontal,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { mockBoards, mockTasks, mockClients } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function Demandas() {
  const { boardId } = useParams();
  const [activeTab, setActiveTab] = useState(boardId ? 'board' : 'boards');
  const [selectedBoard, setSelectedBoard] = useState(boardId || '');
  const [tasks, setTasks] = useState(mockTasks);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isOffice = user?.role === 'office';
  const userTasks = isOffice ? tasks : tasks.filter(task => task.clientId === user?.companyId);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const taskIndex = newTasks.findIndex(task => task.id === result.draggableId);
    
    if (taskIndex !== -1) {
      newTasks[taskIndex] = {
        ...newTasks[taskIndex],
        status: result.destination.droppableId as 'todo' | 'inprogress' | 'done'
      };
      setTasks(newTasks);
      
      toast({
        title: "Tarefa Movida",
        description: "Status da tarefa atualizado com sucesso (simulado)",
      });
    }
  };

  const handleCreateBoard = () => {
    toast({
      title: "Quadro Criado",
      description: "Novo quadro criado com sucesso (simulado)",
    });
    setShowCreateBoard(false);
  };

  const handleCreateTask = () => {
    toast({
      title: "Tarefa Criada",
      description: "Nova tarefa criada com sucesso (simulado)",
    });
    setShowCreateTask(false);
  };

  const handleAddComment = () => {
    toast({
      title: "Comentário Adicionado",
      description: "Comentário adicionado com sucesso (simulado)",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusTasks = (status: string) => {
    return userTasks.filter(task => task.status === status);
  };

  const TaskCard = ({ task, index }: { task: any; index: number }) => {
    const client = mockClients.find(c => c.id === task.clientId);
    
    return (
      <Draggable draggableId={task.id} index={index} isDragDisabled={!isOffice}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-card border rounded-lg p-3 mb-3 shadow-soft hover:shadow-medium transition-shadow cursor-pointer ${
              snapshot.isDragging ? 'rotate-2 shadow-medium' : ''
            }`}
            onClick={() => setSelectedTask(task)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
              <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                {task.priority === 'high' ? 'Alta' :
                 task.priority === 'medium' ? 'Média' : 'Baixa'}
              </Badge>
            </div>
            
            {task.description && (
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {task.description}
              </p>
            )}
            
            {client && (
              <p className="text-xs text-primary font-medium mb-2">
                {client.name}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{task.comments.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Paperclip className="w-3 h-3" />
                  <span>{task.attachments.length}</span>
                </div>
              </div>
              
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {task.assignedTo}
              </span>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Demandas</h1>
          <p className="text-muted-foreground mt-1">
            {isOffice ? 'Gerencie tarefas e projetos' : 'Acompanhe suas demandas'}
          </p>
        </div>
        {isOffice && (
          <Button onClick={() => setShowCreateBoard(true)} variant="gradient">
            <Plus className="w-4 h-4 mr-2" />
            Novo Quadro
          </Button>
        )}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="boards">Quadros</TabsTrigger>
          <TabsTrigger value="board">Kanban</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="boards" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meus Quadros</CardTitle>
                  <CardDescription>Organize suas demandas por projeto</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Pesquisar quadros..." className="pl-8 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockBoards.map(board => (
                  <Card key={board.id} className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedBoard(board.id);
                          setActiveTab('board');
                          navigate(`/demandas/${board.id}`);
                        }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{board.name}</CardTitle>
                          <CardDescription className="text-sm mt-1">
                            {board.description}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{board.tasks.length} tarefas</span>
                        <span>{new Date(board.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          <span>{board.tasks.filter(t => t.status === 'todo').length} A fazer</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-warning rounded-full"></div>
                          <span>{board.tasks.filter(t => t.status === 'inprogress').length} Em andamento</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>{board.tasks.filter(t => t.status === 'done').length} Concluído</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Selecione um quadro" />
                </SelectTrigger>
                <SelectContent>
                  {mockBoards.map(board => (
                    <SelectItem key={board.id} value={board.id}>
                      {board.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Responsável
                </Button>
              </div>
            </div>
            
            {isOffice && (
              <Button onClick={() => setShowCreateTask(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Tarefa
              </Button>
            )}
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">A Fazer</h3>
                  <Badge variant="destructive">{getStatusTasks('todo').length}</Badge>
                </div>
                
                <Droppable droppableId="todo">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-96 p-3 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver ? 'border-destructive bg-destructive/5' : 'border-border'
                      }`}
                    >
                      {getStatusTasks('todo').map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* In Progress Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Em Andamento</h3>
                  <Badge variant="warning">{getStatusTasks('inprogress').length}</Badge>
                </div>
                
                <Droppable droppableId="inprogress">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-96 p-3 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver ? 'border-warning bg-warning/5' : 'border-border'
                      }`}
                    >
                      {getStatusTasks('inprogress').map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Done Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Concluído</h3>
                  <Badge variant="success">{getStatusTasks('done').length}</Badge>
                </div>
                
                <Droppable droppableId="done">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-96 p-3 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver ? 'border-success bg-success/5' : 'border-border'
                      }`}
                    >
                      {getStatusTasks('done').map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Notificações de Tarefas</CardTitle>
              <CardDescription>Alertas sobre prazos e atualizações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'warning', message: 'Tarefa "Processar folha de pagamento" vence em 2 dias', time: '2 horas atrás' },
                  { type: 'info', message: 'Nova tarefa atribuída: "Calcular DAS - Tech Solutions"', time: '4 horas atrás' },
                  { type: 'success', message: 'Tarefa "Enviar relatório mensal" foi concluída', time: '1 dia atrás' },
                  { type: 'warning', message: 'Tarefa "Revisar documentos fiscais" está atrasada', time: '2 dias atrás' },
                ].map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'warning' ? 'bg-warning' :
                      notification.type === 'success' ? 'bg-success' : 'bg-primary'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Marcar como lida
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Board Dialog */}
      <Dialog open={showCreateBoard} onOpenChange={setShowCreateBoard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Quadro</DialogTitle>
            <DialogDescription>
              Crie um novo quadro para organizar suas tarefas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="boardName">Nome do Quadro</Label>
              <Input id="boardName" placeholder="Ex: Folha de Pagamento" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="boardDesc">Descrição</Label>
              <Textarea id="boardDesc" placeholder="Descreva o propósito deste quadro..." />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateBoard(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateBoard}>
                Criar Quadro
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog */}
      <Dialog open={showCreateTask} onOpenChange={setShowCreateTask}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
            <DialogDescription>
              Adicione uma nova tarefa ao quadro
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taskTitle">Título</Label>
              <Input id="taskTitle" placeholder="Ex: Processar folha de pagamento" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taskDesc">Descrição</Label>
              <Textarea id="taskDesc" placeholder="Descreva a tarefa..." />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assignee">Responsável</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin Contabilidade</SelectItem>
                    <SelectItem value="accountant1">Contador 1</SelectItem>
                    <SelectItem value="accountant2">Contador 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input id="dueDate" type="date" />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateTask(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTask}>
                Criar Tarefa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
              <DialogDescription>
                Detalhes da tarefa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Badge variant={
                    selectedTask.status === 'done' ? 'success' :
                    selectedTask.status === 'inprogress' ? 'warning' : 'destructive'
                  }>
                    {selectedTask.status === 'done' ? 'Concluído' :
                     selectedTask.status === 'inprogress' ? 'Em Andamento' : 'A Fazer'}
                  </Badge>
                </div>
                <div>
                  <Label>Prioridade</Label>
                  <Badge variant={getPriorityColor(selectedTask.priority) as any}>
                    {selectedTask.priority === 'high' ? 'Alta' :
                     selectedTask.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label>Descrição</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedTask.description}
                </p>
              </div>
              
              <div>
                <Label>Anexos</Label>
                <div className="space-y-2 mt-2">
                  {selectedTask.attachments.map((attachment: any) => (
                    <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">{attachment.fileName}</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {isOffice && (
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Anexo
                    </Button>
                  )}
                </div>
              </div>
              
              <div>
                <Label>Comentários</Label>
                <div className="space-y-3 mt-2 max-h-40 overflow-y-auto">
                  {selectedTask.comments.map((comment: any) => (
                    <div key={comment.id} className="p-3 bg-muted/30 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{comment.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <Input placeholder="Adicionar comentário..." className="flex-1" />
                  <Button onClick={handleAddComment}>
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}