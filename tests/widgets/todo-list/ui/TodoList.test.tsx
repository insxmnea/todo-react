import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TodoList } from "src/widgets/todo-list";
import { ViewModes } from "src/entities/todo-list";

const mockUseTodoListStore = vi.fn();

vi.mock("src/entities/todo-list", async () => {
  const actual = await vi.importActual<typeof import("src/entities/todo-list")>(
    "src/entities/todo-list"
  );

  return {
    ...actual,
    useTodoListStore: () => mockUseTodoListStore(),
    ViewModes: {
      All: "all",
      Active: "active",
      Completed: "completed",
    },
  };
});

describe("TodoList Component", () => {
  it("should render correctly with initial tasks", () => {
    mockUseTodoListStore.mockReturnValue({
      tasks: [
        { id: "1", title: "Task 1", isCompleted: false },
        { id: "2", title: "Task 2", isCompleted: true },
      ],
      viewMode: ViewModes.All,
      getActiveTasks: () => [{ id: "1", title: "Task 1", isCompleted: false }],
      getActiveTasksCount: () => 1,
      getCompletedTasks: () => [
        { id: "2", title: "Task 2", isCompleted: true },
      ],
    });

    render(<TodoList />);

    expect(screen.getByText("todos")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("should render only active tasks when viewMode is Active", () => {
    mockUseTodoListStore.mockReturnValue({
      tasks: [],
      viewMode: ViewModes.Active,
      getActiveTasks: () => [
        { id: "1", title: "Active Task", isCompleted: false },
      ],
      getActiveTasksCount: () => 1,
      getCompletedTasks: () => [],
    });

    render(<TodoList />);

    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  it("should render only completed tasks when viewMode is Completed", () => {
    mockUseTodoListStore.mockReturnValue({
      tasks: [],
      viewMode: ViewModes.Completed,
      getActiveTasks: () => [],
      getActiveTasksCount: () => 0,
      getCompletedTasks: () => [
        { id: "2", title: "Completed Task", isCompleted: true },
      ],
    });

    render(<TodoList />);

    expect(screen.getByText("Completed Task")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });

  it("should render the InputBar and TodoBottomBar", () => {
    mockUseTodoListStore.mockReturnValue({
      tasks: [],
      viewMode: ViewModes.All,
      getActiveTasks: () => [],
      getActiveTasksCount: () => 0,
      getCompletedTasks: () => [],
    });

    render(<TodoList />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });
});
