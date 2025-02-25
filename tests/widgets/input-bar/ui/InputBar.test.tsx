import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { InputBar } from "src/widgets/input-bar";
import styles from "src/widgets/input-bar/ui/InputBar.module.scss";
import { useTodoListStore } from "src/entities/todo-list";

vi.mock("src/entities/todo-list", () => ({
  useTodoListStore: vi.fn(() => ({
    addTask: vi.fn(),
  })),
}));

describe("InputBar Component", () => {
  const mockAddTask = vi.fn();

  beforeEach(() => {
    vi.mocked(useTodoListStore).mockImplementation(() => ({
      addTask: mockAddTask,
    }));
    mockAddTask.mockClear();
  });

  it("should render correctly", () => {
    render(<InputBar />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
  });

  it("updates the input value when entering text", async () => {
    render(<InputBar />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    await userEvent.type(input, "New task");

    expect(input.value).toBe("New task");
  });

  it("adds a task when pressing Enter with non-empty text", async () => {
    render(<InputBar />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "New task{enter}");

    expect(mockAddTask).toHaveBeenCalledWith("New task");
    expect(input).toHaveValue("");
  });

  it("does not add a task when pressing Enter with empty text", async () => {
    render(<InputBar />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "   {enter}");

    expect(mockAddTask).not.toHaveBeenCalled();
  });

  it("adds a task when clicking on a button with non-empty text", async () => {
    render(<InputBar />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await userEvent.type(input, "New task");
    await userEvent.click(button);

    expect(mockAddTask).toHaveBeenCalledWith("New task");
    expect(input).toHaveValue("");
  });

  it("It does not add a task when clicking on a button with an empty text.", async () => {
    render(<InputBar />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(mockAddTask).not.toHaveBeenCalled();
  });

  it("it has correct CSS classes", () => {
    render(<InputBar />);

    const wrapper = screen.getByRole("textbox").parentElement;
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(wrapper).toHaveClass(styles.wrapper);
    expect(input).toHaveClass(styles.input);
    expect(button).toHaveClass(styles.button);
  });
});
