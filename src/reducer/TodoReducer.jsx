import React from "react";
import { TYPES } from "../actions/TodoActions";

export const initialState = {
  todos: [
    {
      id: 1,
      title: "To Do App",
      tasks: [],
      active: true,
    },
  ],
};

export const initializer = (initialValue = initialState) => JSON.parse(localStorage.getItem("localTodos")) || initialValue

export const ReducerContext = React.createContext(null);

export function todoReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            title: `New`,
            tasks: [],
          },
        ],
      };
    }

    case TYPES.DELETE_TODO: {
      return {
        ...state,
        todos:
          state.todos.length > 1
            ? state.todos
                .filter((todo) => todo.id !== action.payload.id)
                .map((todo) => {
                  if (todo.id > action.payload.id) {
                    return { ...todo, id: todo.id - 1 };
                  }
                  return todo;
                })
                .map((todo, index, arr) => {
                  if (
                    !arr
                      .map((el) => (el.active === true ? true : null))
                      .includes(true)
                  ) {
                    if (todo.id === action.payload.id) {
                      return { ...todo, active: true };
                    }
                    return todo;
                  }
                  return todo;
                })
                .map((todo, index, arr) => {
                  if (
                    !arr
                      .map((el) => (el.active === true ? true : null))
                      .includes(true)
                  ) {
                    if (todo.id === action.payload.id - 1) {
                      return { ...todo, active: true };
                    }
                    return todo;
                  }
                  return todo;
                })
            : state.todos,
      };
    }

    case TYPES.SET_ACTIVE: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, active: true };
          } else {
            return { ...todo, active: false };
          }
        }),
      };
    }

    case TYPES.ADD_TASK: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (
            todo.id === action.payload.id &&
            action.payload.msg !== "" &&
            action.payload.msg[0] !== " "
          ) {
            return {
              ...todo,
              tasks: [
                ...todo.tasks,
                {
                  key: todo.tasks.length + 1,
                  task: action.payload.msg,
                },
              ],
            };
          }
          return todo;
        }),
      };
    }

    case TYPES.CHECK_TASK: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              tasks: todo.tasks.map((task) => {
                if (task.key === action.payload.key) {
                  if (task.checked === undefined || task.checked === false) {
                    return { ...task, checked: true };
                  } else {
                    return { ...task, checked: false };
                  }
                }
                return task;
              }),
            };
          }
          return todo;
        }),
      };
    }

    case TYPES.DELETE_TASK: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              tasks: todo.tasks
                .filter((task) => task.key !== action.payload.key)
                .map((task, index) => {
                  return { ...task, key: index + 1 };
                }),
            };
          }
          return todo;
        }),
      };
    }

    case TYPES.DELETE_CHECKED_TASKS: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todo.id
            ? {
                ...todo,
                tasks: todo.tasks
                  .filter((task) => !task.checked)
                  .map((task, index) => {
                    return { ...task, key: index + 1 };
                  }),
              }
            : todo
        ),
      };
    }

    case TYPES.DELETE_ALL_TASKS: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todo.id ? { ...todo, tasks: [] } : todo
        ),
      };
    }

    case TYPES.EDIT_TITLE: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (
            todo.id === action.payload.id &&
            action.payload.title !== "" &&
            action.payload.title[0] !== " "
          ) {
            return { ...todo, title: action.payload.title };
          }
          return todo;
        }),
      };
    }
  }
}
