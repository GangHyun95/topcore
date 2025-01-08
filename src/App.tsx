import { useState } from 'react';
import './App.css';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

function App() {
    const [isAddTodo, setIsAddTodo] = useState(false);

    const openAddTodo = () => setIsAddTodo(true);
    const closeAddTodo = () => setIsAddTodo(false);
    return (
        <>
            <TodoHeader openAddTodo={openAddTodo}/>
            <TodoList isAddTodo={isAddTodo} openAddTodo={openAddTodo} closeAddTodo={closeAddTodo}/>
        </>
    );
}

export default App;
