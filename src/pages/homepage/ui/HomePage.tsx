import { FC } from "react";
import styles from "./HomePage.module.scss";
import { TodoList } from "src/widgets/todo-list";

export const HomePage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <TodoList />
    </div>
  );
};
