import React, { useEffect, useReducer } from 'react'

import { todoReducer, getNewItem, ACTIONS } from "../reducer/todoReducer";


const initialState = [
    //   getNewItem({ description: "Recolectar piedra del alma" }),
    //   getNewItem({ description: "Recolectar piedra del poder" }),
];

const initTodos = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = () => {

    const [todos, dispatchTodoAction] = useReducer(todoReducer, initialState, initTodos);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    const handleNewTodo = (newTodo) => {
        const nt = getNewItem({ description: newTodo })
        // console.log("onNewTodo", JSON.stringify(nt));
        const action = {
            type: ACTIONS.NEW,
            payload: nt
        };
        dispatchTodoAction(action);
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: ACTIONS.DELETE,
            payload: id
        }
        dispatchTodoAction(action)
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: ACTIONS.TOGGLE,
            payload: id
        }
        dispatchTodoAction(action)
    }

    const handleClearAll = () => {
        const action = {
            type: ACTIONS.CLEAR_ALL
        }
        dispatchTodoAction(action)
    }


    return {
        todos,
        handleNewTodo,
        handleToggleTodo,
        handleDeleteTodo,
        handleClearAll,
        todosCount: todos.length,
        numPendings: todos.filter(x => !x.done).length
    }
}
