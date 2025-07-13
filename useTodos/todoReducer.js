import React from "react";

export const getNewItem = ({ id = new Date().getTime(), description }) => ({
  id: id + Math.random(),
  description,
  done: false,
});

export const ACTIONS = {
  NEW: "newTodo",
  DELETE: "deleteTodo",
  TOGGLE: "toggleDone",
  CLEAR_ALL: "clearAll"
};

export const todoReducer = (initialState = [], action) => {
  switch (action.type) {
    case ACTIONS.NEW:
      return [...initialState, action.payload];
    case ACTIONS.DELETE:
      return initialState.filter((x) => x.id !== action.payload);
    case ACTIONS.TOGGLE:
      return initialState.map((x) => {
        if (x.id === action.payload) {
          return { ...x, done: !x.done };
        }
        return x;
      });
      case ACTIONS.CLEAR_ALL:
        return [];

    default:
      return initialState;
  }
};
