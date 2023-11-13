import PlusIcon from "../assets/icons/PlusIcon";
import { useContext } from "react";
import { ReducerContext } from "../reducer/TodoReducer";
import { TYPES } from "../actions/TodoActions";
import TrashIcon from "../assets/icons/TrashIcon";

const TodoSide = () => {
  const { dispatch, isDeleteTodo, setIsDeleteTodo } = useContext(ReducerContext);

  return (
    <div className="side-btns">
      <div
        className="add-todo-btn"
        onClick={() => {
          dispatch({ type: TYPES.ADD_TODO });
        }}
      >
        <PlusIcon />
      </div>
      <div
        className={
          isDeleteTodo
            ? "delete-todo-btn delete-todo-btn-active"
            : "delete-todo-btn"
        }
        onClick={() => setIsDeleteTodo((isDeleteTodo) => !isDeleteTodo)}
      >
        <TrashIcon/>
      </div>
    </div>
  );
};

export default TodoSide;
