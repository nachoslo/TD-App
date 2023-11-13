import { useContext } from "react";
import { ReducerContext } from "../reducer/TodoReducer";
import { TYPES } from "../actions/TodoActions";

const Todos = () => {
  const { state, dispatch, isDeleteTodo } = useContext(ReducerContext);

  const deleteTodo = (id) => {
    dispatch({ type: TYPES.DELETE_TODO, payload: { id } });
  };

  const setActive = (id) => {
    dispatch({ type: TYPES.SET_ACTIVE, payload: { id } });
  };

  return (
    <div className="side-todos">
      {state.todos.map((todo) => {
        let todoTitle = todo.title.split(" ");
        let title;

        if (todoTitle.length === 3) {
          title =
            todoTitle[0].substring(1, 0) +
            todoTitle[1].substring(1, 0) +
            todoTitle[2].substring(1, 0);
        } else if (todoTitle.length === 2) {
          title = todoTitle[0].substring(1, 0) + todoTitle[1].substring(1, 0);
        } else if (todoTitle.length === 1) {
          title = todoTitle[0].substring(0, 3);
        }

        return (
          <div
            className={
              !isDeleteTodo ? "side-todo" : "side-todo side-todo-delete"
            }
            key={todo.id}
            onClick={
              isDeleteTodo
                ? () => deleteTodo(todo.id)
                : () => setActive(todo.id)
            }
          >
            <span>{title.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
