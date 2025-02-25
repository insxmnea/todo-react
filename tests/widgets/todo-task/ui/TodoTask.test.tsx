import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TodoTask } from "src/widgets/todo-task";

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

describe("TodoTask Component", () => {
  const mockMarkTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTodoListStore.mockReturnValue({ markTask: mockMarkTask });
  });

  it("should render task correctly", () => {
    render(<TodoTask id="1" title="Test Task" isCompleted={false} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("should mark task as completed when clicked", () => {
    render(<TodoTask id="1" title="Test Task" isCompleted={false} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(mockMarkTask).toHaveBeenCalledTimes(1);
    expect(mockMarkTask).toHaveBeenCalledWith("1");
  });
});
