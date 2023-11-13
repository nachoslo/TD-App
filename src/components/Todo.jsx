import { useContext, useState } from "react";
import { ReducerContext } from "../reducer/TodoReducer";
import { TYPES } from "../actions/TodoActions";
import Tasks from "./Tasks";
import CleanTasks from "./CleanTasks";
import EditIcon from "../assets/icons/EditIcon";

const Todo = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const [isEditTitle, setIsEditTitle] = useState(false);

  const addTask = (e, id) => {
    if (e.keyCode === 13) {
      let msg = e.target.value;
      let regex = new RegExp(/^[A-Za-z0-9\s]{0,40}$/g);
      let test = regex.test(msg);
      if (test) {
        dispatch({ type: TYPES.ADD_TASK, payload: { msg, id } });
      }
      document.querySelector(".input-add-task").value = "";
    }
  };

  const editTitleBlur = (e, id) => {
    let title = e.target.value;
    let regex = new RegExp(/^[A-Za-z0-9\s]{0,20}$/g);
    let test = regex.test(title);

    if (test) {
      dispatch({ type: TYPES.EDIT_TITLE, payload: { title, id } });
    }
    setIsEditTitle(false);
  };

  const editTitle = (e, id) => {
    if (e.keyCode === 13) {
      let title = e.target.value;
      let regex = new RegExp(/^[A-Za-z0-9\s]{0,20}$/g);
      let test = regex.test(title);

      if (test) {
        dispatch({ type: TYPES.EDIT_TITLE, payload: { title, id } });
        setIsEditTitle(false);
      }
    }
  };

  return state.todos.map((todo) => {
    if (todo.active) {
      return (
        <div className="todo-container" key={todo.id}>
          <div className="todo-content">
            <div className="todo-header">
              <div className="todo-title">
                {!isEditTitle ? (
                  <h2 className="title">{todo.title}</h2>
                ) : (
                  <input
                    className="title-input"
                    type="text"
                    placeholder={todo.title}
                    spellCheck="false"
                    autoFocus
                    onBlur={(e) => editTitleBlur(e, todo.id)}
                    onKeyDown={(e) => editTitle(e, todo.id)}
                  ></input>
                )}
                <button onClick={() => setIsEditTitle(!isEditTitle)}>
                  <EditIcon />
                </button>
              </div>
              <input
                type="text"
                className="input-add-task"
                placeholder="Add task"
                spellCheck="false"
                onKeyUp={(e) => addTask(e, todo.id)}
              />
            </div>
            <Tasks />
            <CleanTasks />
          </div>
        </div>
      );
    }
  });
};

export default Todo;
