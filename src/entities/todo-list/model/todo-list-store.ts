import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TodoListStore, ViewModes } from "../types/models";

export const useTodoListStore = create<TodoListStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      viewMode: ViewModes.All,
      updateViewMode: (mode) => set({ viewMode: mode }),
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: `task-${Date.now()}`, title, isCompleted: false },
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
      getActiveTasksCount: () =>
        get().tasks.filter((task) => task.isCompleted !== true).length,
      getActiveTasks: () =>
        get().tasks.filter((task) => task.isCompleted !== true),
      getCompletedTasks: () =>
        get().tasks.filter((task) => task.isCompleted !== false),
    }),
    {
      name: "todo-tasks",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
