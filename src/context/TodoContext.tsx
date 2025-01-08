import React, { createContext, useContext, useState } from 'react';

export type TodoType = {
    id: number;
    text: string;
    status: string;
};

type TodoContextType = {
    isAddTodo: boolean;
    editingTodo: TodoType | null;
    openAddTodo: () => void;
    closeAddTodo: () => void;
    changeEditingTodo: (todo: TodoType | null) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [isAddTodo, setIsAddTodo] = useState(false);
    const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);

    const openAddTodo = () => setIsAddTodo(true);
    const closeAddTodo = () => setIsAddTodo(false);
    const changeEditingTodo = (todo: TodoType | null) => setEditingTodo(todo);

    return (
        <TodoContext.Provider
            value={{
                isAddTodo,
                editingTodo,
                openAddTodo,
                closeAddTodo,
                changeEditingTodo,
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
