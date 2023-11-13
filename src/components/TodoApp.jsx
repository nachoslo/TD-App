import Side from "./Side";
import Todo from "./Todo";
import SideTodos from "./SideTodos";
import { useEffect, useReducer, useState } from "react";
import {
  ReducerContext,
  initialState,
  initializer,
  todoReducer,
} from "../reducer/TodoReducer";

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState, initializer);
  const [isDeleteTodo, setIsDeleteTodo] = useState(false);

  const data = {
    state,
    dispatch,
    isDeleteTodo,
    setIsDeleteTodo,
  };

  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(state));
  }, [state]);

  return (
    <ReducerContext.Provider value={data}>
      <div className="wrapper">
        <div className="app" id="Light">
          <SideTodos />
          <Todo />
          <Side />
        </div>
      </div>
    </ReducerContext.Provider>
  );
};

export default TodoApp;
