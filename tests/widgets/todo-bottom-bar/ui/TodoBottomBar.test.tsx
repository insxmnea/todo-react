import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TodoBottomBar } from "src/widgets/todo-bottom-bar";
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

describe("TodoBottomBar Component", () => {
  it("should render correctly with initial values", () => {
    mockUseTodoListStore.mockReturnValue({
      getActiveTasksCount: () => 2,
      clearCompletedTasks: vi.fn(),
      updateViewMode: vi.fn(),
      viewMode: ViewModes.All,
    });

    render(<TodoBottomBar />);

    expect(screen.getByText("2 items left")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });

  it("should call updateViewMode when clicking filter buttons", () => {
    const updateViewModeMock = vi.fn();
    mockUseTodoListStore.mockReturnValue({
      getActiveTasksCount: () => 2,
      clearCompletedTasks: vi.fn(),
      updateViewMode: updateViewModeMock,
      viewMode: ViewModes.All,
    });

    render(<TodoBottomBar />);

    fireEvent.click(screen.getByText("Active"));
    expect(updateViewModeMock).toHaveBeenCalledWith(ViewModes.Active);

    fireEvent.click(screen.getByText("Completed"));
    expect(updateViewModeMock).toHaveBeenCalledWith(ViewModes.Completed);
  });

  it("should call clearCompletedTasks when clicking 'Clear completed' button", () => {
    const clearCompletedTasksMock = vi.fn();
    mockUseTodoListStore.mockReturnValue({
      getActiveTasksCount: () => 2,
      clearCompletedTasks: clearCompletedTasksMock,
      updateViewMode: vi.fn(),
      viewMode: ViewModes.All,
    });

    render(<TodoBottomBar />);

    fireEvent.click(screen.getByText("Clear completed"));
    expect(clearCompletedTasksMock).toHaveBeenCalled();
  });
});
