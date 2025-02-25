import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { useTodoListStore } from "src/entities/todo-list";
import { TodoTask } from "src/widgets/todo-task";

export const TodoList: FC = () => {
  const [input, setInput] = useState("");
  const { tasks, addTask } = useTodoListStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask(input);
      setInput("");
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <input
        type="text"
        placeholder="Add task"
        id="todo-input"
        onChange={handleInputChange}
        value={input}
        onKeyDown={(event) => handleKeyDown(event)}
      />

      {tasks && tasks.map((task) => <TodoTask key={task.id} {...task} />)}
    </div>
  );
};
