import React, { createContext, useContext, useState } from 'react';

export type TodoType = {
    id: number;
    text: string;
    status: string;
};

type TodoContextType = {
    todos: TodoType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
    isAddTodo: boolean;
    editingTodo: TodoType | null;
    openAddTodo: () => void;
    closeAddTodo: () => void;
    changeEditingTodo: (todo: TodoType | null) => void;
    isOpenModal: boolean,
    openModal: (todo: TodoType | null) => void;
    closeModal: () => void;

};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isAddTodo, setIsAddTodo] = useState(false);
    const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openAddTodo = () => setIsAddTodo(true);
    const closeAddTodo = () => setIsAddTodo(false);
    const changeEditingTodo = (todo: TodoType | null) => setEditingTodo(todo);

    const openModal = (todo: TodoType | null) => {
        setIsOpenModal(true);
        setEditingTodo(todo);
    }
    const closeModal = () => {
        setIsOpenModal(false);
        setEditingTodo(null);
    }

    return (
        <TodoContext.Provider
            value={{
                todos,
                setTodos,
                isAddTodo,
                openAddTodo,
                closeAddTodo,
                editingTodo,
                changeEditingTodo,
                isOpenModal,
                openModal,
                closeModal,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error(
            'useTodoContext는 TodoProvider 내에서 사용해야 합니다.'
        );
    }
    return context;
};
