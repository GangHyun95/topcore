import React from 'react';

export default function TodoHeader() {
    return (
        <header className='p-4 bg-neutral-50'>
            <h1 className='text-2xl font-semibold uppercase text-orange-400'>todo list page app</h1>
            <div className='flex justify-end'>
                <button className='px-4 py-2 bg-orange-400 text-white font-medium rounded-lg shadow hover:bg-orange-500 transition-colors'>
                    Add Task
                </button>
            </div>
        </header>
    );
}
