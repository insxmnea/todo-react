export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export enum ViewModes {
  All,
  Active,
  Completed,
}

export type TodoListStore = {
  tasks: Task[];
  viewMode: ViewModes;
  updateViewMode: (mode: ViewModes) => void;
  addTask: (title: string) => void;
  markTask: (id: string) => void;
  clearCompletedTasks: () => void;
  getActiveTasksCount: () => number;
  getActiveTasks: () => Task[];
  getCompletedTasks: () => Task[];
};
