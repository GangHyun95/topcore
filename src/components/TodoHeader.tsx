import { useTodoContext } from '../context/TodoContext';

export default function TodoHeader() {
    const { openAddTodo, changeEditingTodo} = useTodoContext();
    const handleOpen = () => {
        changeEditingTodo(null);
        openAddTodo();
    }
    return (
        <header className='p-4 bg-neutral-50'>
            <h1 className='text-2xl font-semibold uppercase text-orange-400'>
                todo list page app
            </h1>
            <div className='flex justify-end'>
                <button className='px-4 py-2 bg-orange-400 text-white font-medium rounded-lg shadow hover:bg-orange-500 transition-colors' onClick={handleOpen}>
                    Add Task
                </button>
            </div>
        </header>
    );
}
