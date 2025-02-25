import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HomePage } from "src/pages/homepage";
import styles from "src/pages/homepage/ui/HomePage.module.scss";

vi.mock("src/widgets/todo-list", () => ({
  TodoList: vi.fn(() => <div data-testid="todo-list" />),
}));

describe("HomePage Component", () => {
  it("should render correctly", () => {
    render(<HomePage />);

    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  it("it has correct CSS classes", () => {
    render(<HomePage />);

    const todoList = screen.getByTestId("todo-list");
    const wrapper = todoList.parentElement;

    expect(wrapper).toHaveClass(styles.wrapper);
  });
});
