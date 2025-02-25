import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TodoListStore } from "../types/models";

export const useTodoListStore = create<TodoListStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: `task-${new Date()}`, title, isCompleted: false },
          ],
        })),
      clearCompletedTasks: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.isCompleted !== true),
        })),
      markTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              return {
                id: task.id,
                title: task.title,
                isCompleted: !task.isCompleted,
              };
            }

            return task;
          }),
        })),
    }),
    {
      name: "todo-tasks",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
