import { X } from 'lucide-react';
import React from 'react';
import { TodoType, useTodoContext } from '../context/TodoContext';

type Props = {
    isOpen: boolean;
};

export default function Modal({ isOpen }: Props) {
    if (!isOpen) return null;

    const { todos, setTodos, editingTodo, changeEditingTodo, closeModal } = useTodoContext();

    const handleBgClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleDelete = (deleted: TodoType | null) => {
        setTodos(todos.filter((todo) => todo.id !== deleted?.id));
        changeEditingTodo(null);
        closeModal();
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-40"
            onClick={handleBgClick}
        >
            <div
                className="bg-white rounded-2xl w-11/12 max-w-lg p-6 shadow-lg transition-transform transform scale-95 animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        <X size={24} />
                    </button>
                </div>

                <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                    삭제하시겠습니까?
                </h1>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
                        onClick={() => handleDelete(editingTodo)}
                    >
                        네
                    </button>
                    <button
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg transition-all"
                        onClick={closeModal}
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
}
