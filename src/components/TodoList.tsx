import AddTodo from './AddTodo';
import { useTodoContext } from '../context/TodoContext';
import Todo from './Todo';

export default function TodoList() {
    const { todos, isAddTodo } = useTodoContext();

    return (
        <section className='flex h-full min-h-0 flex-col'>
            <ul className='space-y-4 flex-auto overflow-y-auto'>
                <li className='grid grid-cols-4 font-semibold border-b text-center py-4'>
                    <span>#</span>
                    <span>Task Name</span>
                    <span>Status</span>
                    <span>Config</span>
                </li>
                {todos.map((item, index) => (
                    <Todo key={item.id} todo={item} index={index} />
                ))}
            </ul>
            {isAddTodo && <AddTodo />}
        </section>
    );
}
