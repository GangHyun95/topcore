import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import AddTodo from './AddTodo';

export default function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: '장보기', status: 'idle' },
        { id: 2, text: '공부', status: 'in process' },
        { id: 3, text: '과제', status: 'done' },
    ]);
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
                        <span>{item.text}</span>
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
                        <button className='flex justify-center items-cente text-gray-600 hover:text-black hover:scale-110 transition-transform duration-200'>
                            <Settings />
                        </button>
                    </li>
                ))}
            </ul>
            <AddTodo />
        </section>
    );
}
