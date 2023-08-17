import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [];
        
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}


export const useTodos = () => {
  

        
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);   
        
    useEffect(() => {
        //console.log(todos); 
        localStorage.setItem('todos',JSON.stringify(todos));
       
       }, [todos])

       const handleNewTodo = ( todo ) => {
        const action = {
            type : '[TODO] Add Todo',
            payload: todo,
        }
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch( {
            type : '[TODO] Remove Todo',
            payload: id,
        } );
    }

    const handleToggleTodo = ( id ) => {
        console.log({id});
        dispatch( {
            type : '[TODO] Toggle Todo',
            payload: id,
        } );   
    }

  
    return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount : todos.length,
    todosPendingCount: todos.filter(todo =>  !todo.done).length
    }

}
