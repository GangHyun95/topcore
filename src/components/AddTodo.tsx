import { X } from 'lucide-react';
import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function AddTodo() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit} className='w-full py-4 bg-neutral-50'>
            <div className='grid grid-cols-[2fr_4fr_4fr_2fr] items-center text-center gap-3'>
                <button className='flex justify-center items-center w-8 h-8 bg-neutral-200 hover:bg-neutral-300 rounded-lg hover:scale-110 transition-transform duration-200 justify-self-center'>
                    <X />
                </button>
                <Input
                    type='text'
                    placeholder='할 일을 입력해주세요.'
                    value={text}
                    onChange={handleChange}
                    className='text-center placeholder-gray-400 border rounded outline-none'
                />
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
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

                <button className='px-4 py-2 bg-orange-400 text-white font-medium rounded-lg shadow hover:bg-orange-500 justify-self-center'>
                    Save
                </button>
            </div>
        </form>
    );
}
