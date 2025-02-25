import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { useTodoListStore, ViewModes } from "src/entities/todo-list";
import { TodoBottomBar } from "src/widgets/todo-bottom-bar";
import { TodoTask } from "src/widgets/todo-task";
import styles from "./TodoList.module.scss";

export const TodoList: FC = () => {
  const [input, setInput] = useState("");
  const { tasks, viewMode, addTask, getActiveTasks, getCompletedTasks } =
    useTodoListStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.trim() !== "") {
      addTask(input);
      setInput("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>todos</h1>

      <input
        className={styles.input}
        type="text"
        placeholder="Add task"
        id="todo-input"
        onChange={handleInputChange}
        value={input}
        onKeyDown={(event) => handleKeyDown(event)}
      />

      <ul>
        {viewMode === ViewModes.All &&
          tasks.map((task) => <TodoTask key={task.id} {...task} />).reverse()}

        {viewMode === ViewModes.Active &&
          getActiveTasks()
            .map((task) => <TodoTask key={task.id} {...task} />)
            .reverse()}

        {viewMode === ViewModes.Completed &&
          getCompletedTasks()
            .map((task) => <TodoTask key={task.id} {...task} />)
            .reverse()}
      </ul>

      <TodoBottomBar />
    </div>
  );
};
