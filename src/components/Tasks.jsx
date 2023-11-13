import { useContext, useState } from "react";
import { ReducerContext } from "../reducer/TodoReducer";
import { TYPES } from "../actions/TodoActions";
import CheckIcon from "../assets/icons/CheckIcon";
import SquareCheckIcon from "../assets/icons/SquareCheckIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";

const Tasks = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const [isDelete, setIsDelete] = useState(null);

  const checkTask = (id, key) => {
    dispatch({ type: TYPES.CHECK_TASK, payload: { id, key } });
  };

  const deleteTask = (id, key) => {
    setIsDelete(key);
    setTimeout(() => {
      dispatch({ type: TYPES.DELETE_TASK, payload: { id, key } });
      setIsDelete(null);
    }, 600);
  };

  return (
    <div className="todo-tasks">
      {state.todos.map((todo) => {
        if (todo.active) {
          return todo.tasks.map((task) => (
            <div
              className={isDelete === task.key ? "task task-delete" : "task"}
              key={task.key}
            >
              <div className="task-and-check">
                <button
                  className="task-check-btn"
                  onClick={() => checkTask(todo.id, task.key)}
                >
                  {!task.checked ? <SquareCheckIcon /> : <CheckIcon />}
                </button>
                <span
                  key={task.key}
                  className={task.checked ? "task-checked" : null}
                  onClick={() => checkTask(todo.id, task.key)}
                >
                  {task.task}
                </span>
              </div>
              <button
                className="task-delete-btn"
                onClick={() => deleteTask(todo.id, task.key)}
              >
                <DeleteIcon />
              </button>
            </div>
          ));
        }
      })}
    </div>
  );
};

export default Tasks;
