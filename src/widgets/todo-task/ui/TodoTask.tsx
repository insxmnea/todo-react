import { FC } from "react";
import { Task } from "src/entities/todo-list";

export const TodoTask: FC<Task> = (props) => {
  const handleCheckboxChange = () => {};
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.isCompleted}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={props.id}>{props.title}</label>
    </div>
  );
};
