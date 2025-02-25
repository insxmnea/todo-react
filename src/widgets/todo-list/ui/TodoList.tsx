import { FC } from "react";
import { useTodoListStore, ViewModes } from "src/entities/todo-list";
import { TodoBottomBar } from "src/widgets/todo-bottom-bar";
import { TodoTask } from "src/widgets/todo-task";
import styles from "./TodoList.module.scss";
import { InputBar } from "src/widgets/input-bar";

export const TodoList: FC = () => {
  const { tasks, viewMode, getActiveTasks, getCompletedTasks } =
    useTodoListStore();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>todos</h1>

      <div className={styles.todo}>
        <InputBar />

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
    </div>
  );
};
