import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { Input } from '../components/ui/input';
import { TodoType } from './TodoList';

type Props = {
    onAdd: (todo: TodoType) => void;
    onClose: () => void;
    editingTodo: TodoType | null;
};

export default function AddTodo({ onAdd, onClose, editingTodo }: Props) {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('idle');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isOverLimit = text.length > 40;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim().length === 0) return;
        onAdd({ id: Date.now(), text: text, status: status });
        setText('');
        onClose();
    };

    useEffect(() => {
        if (editingTodo) {
            setText(editingTodo.text);
            setStatus(editingTodo.status);
        }
        inputRef.current?.focus();
    }, [editingTodo]);

    return (
        <form onSubmit={handleSubmit} className='w-full py-4 bg-neutral-50'>
            <div className='grid grid-cols-[2fr_4fr_4fr_2fr] items-center text-center gap-3'>
                <button
                    type='button'
                    className='flex justify-center items-center w-8 h-8 bg-neutral-200 hover:bg-neutral-300 rounded-lg hover:scale-110 transition-transform duration-200 justify-self-center'
                    onClick={onClose}
                >
                    <X />
                </button>
                <Input
                    type='text'
                    placeholder='할 일을 입력해주세요.'
                    value={text}
                    onChange={handleChange}
                    ref={inputRef}
                    className={`text-center placeholder-gray-400 border rounded outline-none ${
                        isOverLimit && 'text-red-500'
                    }`}
                />
                <Select
                    value={status}
                    onValueChange={(value: string) => setStatus(value)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value='idle'>idle</SelectItem>
                            <SelectItem value='in process'>
                                in process
                            </SelectItem>
                            <SelectItem value='done'>done</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <button
                    type='submit'
                    disabled={isOverLimit}
                    className={`px-4 py-2 bg-orange-400 font-medium rounded-lg shadow justify-self-center text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed`}
                >
                    Save
                </button>
            </div>
        </form>
    );
}
