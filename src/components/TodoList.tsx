import { useState } from 'react';
import { Settings } from 'lucide-react';
import AddTodo from './AddTodo';
import { TodoType, useTodoContext } from '../context/TodoContext';

export default function TodoList() {
    const {
        isAddTodo,
        openAddTodo,
        editingTodo,
        changeEditingTodo,
    } = useTodoContext();
    
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [todos, setTodos] = useState<TodoType[]>([]);

    const toggleMenu = (id: number) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const closeMenu = () => setOpenMenuId(null);

    const handleAdd = (todo: TodoType) => {
        if (editingTodo) {
            setTodos((prev) =>
                prev.map((t) => (t.id === editingTodo?.id ? todo : t))
            );
        } else {
            setTodos((prev) => [...prev, todo]);
        }
    };

    const handleEdit = (todo: TodoType) => {
        changeEditingTodo(todo);
        openAddTodo();
    };

    const handleDelete = (deleted: TodoType) => {
        setTodos(todos.filter((todo) => todo.id !== deleted.id));
        changeEditingTodo(null);
    };

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
                    <li
                        key={item.id}
                        className='grid grid-cols-4 items-center text-center'
                    >
                        <span>{index + 1}</span>
                        <span>
                            {item.text.length > 16
                                ? `${item.text.slice(0, 16)}...`
                                : item.text}
                        </span>
                        <span
                            className={`px-2 py-1 text-sm font-medium text-white rounded uppercase ${
                                item.status === 'idle'
                                    ? 'bg-gray-400'
                                    : item.status === 'in process'
                                    ? 'bg-yellow-500'
                                    : item.status === 'done'
                                    ? 'bg-green-500'
                                    : 'bg-blue-500'
                            }`}
                        >
                            {item.status}
                        </span>
                        <div className='flex justify-center items-center relative'>
                            <button
                                className='text-gray-600 hover:text-black hover:scale-110 transition-transform duration-200'
                                onClick={() => toggleMenu(item.id)}
                            >
                                <Settings />
                            </button>

                            {openMenuId === item.id && (
                                <div className='absolute top-full right-0 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-10'>
                                    <ul className='text-gray-700'>
                                        <li
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                            onClick={() => {
                                                handleEdit(item);
                                                closeMenu();
                                            }}
                                        >
                                            변경하기
                                        </li>
                                        <li
                                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                            onClick={() => {
                                                const confirmed =
                                                    window.confirm(
                                                        '삭제하시겠습니까?'
                                                    );
                                                if (confirmed) {
                                                    handleDelete(item);
                                                }
                                                closeMenu();
                                            }}
                                        >
                                            삭제하기
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {isAddTodo && <AddTodo onAdd={handleAdd} />}
        </section>
    );
}
