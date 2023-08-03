import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputComponent: React.FC<InputProps> = ({
  label,
}) => {
  return (
    <div className="flex">
      <div className=' bg-gray-400 p-5 rounedd-l-lg'>
        <p className="mr-2 decoration-gray-600 font-medium">{label}</p>
      </div>
      <input className='flex-1 border-solid border-2 pr-1'/>
    </div>
  );
};