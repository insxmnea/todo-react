import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import styles from "./InputBar.module.scss";
import { useTodoListStore } from "src/entities/todo-list";

export const InputBar: FC = () => {
  const [input, setInput] = useState("");
  const { addTask } = useTodoListStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.trim() !== "") {
      addTask(input);
      setInput("");
    }
  };

  const handleButtonClick = () => {
    if (input.trim() !== "") {
      addTask(input);
      setInput("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="What needs to be done?"
        id="todo-input"
        onChange={handleInputChange}
        value={input}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <button className={styles.button} onClick={handleButtonClick}>
        →
      </button>
    </div>
  );
};
