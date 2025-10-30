export type InitiativeStatus = 'planned' | 'in progress' | 'completed' | 'on hold';
export type TaskStatus = 'not started' | 'in progress' | 'completed' | 'delayed';

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  weight: number;
  percentCompleted: number;
}

export interface Initiative {
  id: string;
  processNumber: string;
  name: string;
  description: string;
  status: InitiativeStatus;
  completenessRate: number;
  startDate: string;
  completionDate: string;
  tasks: Task[];
}
