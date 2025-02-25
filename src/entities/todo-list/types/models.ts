type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TodoListStore = {
  tasks: Task[];
  addTask: (title: string) => void;
  markTask: (id: string) => void;
  clearCompletedTasks: () => void;
};

export type { TodoListStore, Task };
