import { useContext, useState } from "react";
import { ReducerContext } from "../reducer/TodoReducer";
import { TYPES } from "../actions/TodoActions";
import CleanIcon from "../assets/icons/CleanIcon";
import ChevronDown from "../assets/icons/ChevronDown";

const CleanTasks = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const [cleanTasks, setCleanTasks] = useState(false);

  const deleteChekedTasks = (todo) => {
    dispatch({ type: TYPES.DELETE_CHECKED_TASKS, payload: { todo } });
    if (todo.tasks.every((task) => !task.checked)) {
      setCleanTasks(true);
    } else {
      setCleanTasks(false);
    }
  };

  const deleteAllTasks = (todo) => {
    dispatch({ type: TYPES.DELETE_ALL_TASKS, payload: { todo } });
    if (todo.tasks.length === 0) {
      setCleanTasks(true);
    } else {
      setCleanTasks(false);
    }
  };
  return (
    <div className="clean-tasks-container">
      <button
        className={
          cleanTasks
            ? "clean-tasks-btn clean-tasks-btn-active"
            : "clean-tasks-btn"
        }
        onClick={() => setCleanTasks((cleanTasks) => !cleanTasks)}
      >
        <CleanIcon /> Clean Tasks <ChevronDown />
      </button>
      {state.todos.map((todo) =>
        todo.active ? (
          <div
            className={
              cleanTasks ? "clean-tasks-options-active" : "clean-tasks-options"
            }
            key={todo.id}
          >
            <button onClick={() => deleteChekedTasks(todo)}>Checked</button>
            <button onClick={() => deleteAllTasks(todo)}>All</button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default CleanTasks;
