import { FC } from "react";
import { useTodoListStore, ViewModes } from "src/entities/todo-list";
import styles from "./TodoBottomBar.module.scss";

export const TodoBottomBar: FC = () => {
  const { getActiveTasksCount, clearCompletedTasks, updateViewMode, viewMode } =
    useTodoListStore();

  const setButtonClassNameByMode = (mode: ViewModes) => {
    return viewMode === mode ? styles.activeButton : styles.button;
  };

  return (
    <div className={styles.wrapper}>
      <span>{getActiveTasksCount()} items left</span>

      <div className={styles.buttonGroup}>
        <button
          className={setButtonClassNameByMode(ViewModes.All)}
          onClick={() => updateViewMode(ViewModes.All)}
        >
          All
        </button>
        <button
          className={setButtonClassNameByMode(ViewModes.Active)}
          onClick={() => updateViewMode(ViewModes.Active)}
        >
          Active
        </button>
        <button
          className={setButtonClassNameByMode(ViewModes.Completed)}
          onClick={() => updateViewMode(ViewModes.Completed)}
        >
          Completed
        </button>
      </div>

      <button onClick={clearCompletedTasks}>Clear completed</button>
    </div>
  );
};
