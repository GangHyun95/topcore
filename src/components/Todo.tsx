import { Settings } from 'lucide-react';
import { TodoType, useTodoContext } from '../context/TodoContext';
import { useState } from 'react';

export default function Todo({
    todo,
    index,
}: {
    todo: TodoType;
    index: number;
}) {
    const { openAddTodo, changeEditingTodo, openModal } = useTodoContext();

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const toggleMenu = (id: number) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };
    const closeMenu = () => setOpenMenuId(null);

    const handleEdit = (todo: TodoType) => {
        changeEditingTodo(todo);
        openAddTodo();
    };

    return (
        <li className='grid grid-cols-4 items-center text-center'>
            <span>{index + 1}</span>
            <span>
                {todo.text.length > 16
                    ? `${todo.text.slice(0, 16)}...`
                    : todo.text}
            </span>
            <span
                className={`px-2 py-1 text-sm font-medium text-white rounded uppercase ${
                    todo.status === 'idle'
                        ? 'bg-gray-400'
                        : todo.status === 'in process'
                        ? 'bg-yellow-500'
                        : todo.status === 'done'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                }`}
            >
                {todo.status}
            </span>
            <div className='flex justify-center items-center relative'>
                <button
                    className='text-gray-600 hover:text-black hover:scale-110 transition-transform duration-200'
                    onClick={() => toggleMenu(todo.id)}
                >
                    <Settings />
                </button>

                {openMenuId === todo.id && (
                    <div className='absolute top-full right-0 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-10'>
                        <ul className='text-gray-700'>
                            <li
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                onClick={() => {
                                    handleEdit(todo);
                                    closeMenu();
                                }}
                            >
                                변경하기
                            </li>
                            <li
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                onClick={() => {
                                    closeMenu();
                                    openModal(todo);
                                }}
                            >
                                삭제하기
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </li>
    );
}
