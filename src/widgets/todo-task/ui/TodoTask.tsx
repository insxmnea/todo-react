import { FC } from "react";
import { Task, useTodoListStore } from "src/entities/todo-list";
import styles from "./TodoTask.module.scss";

export const TodoTask: FC<Task> = (props) => {
  const { markTask } = useTodoListStore();
  const handleCheckboxChange = () => {
    markTask(props.id);
  };

  return (
    <li className={styles.wrapper}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.isCompleted}
        onChange={handleCheckboxChange}
      />
      <label className={styles.text} htmlFor={props.id}>
        {props.title}
      </label>
    </li>
  );
};
