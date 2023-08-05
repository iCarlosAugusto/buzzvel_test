import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputComponent: React.FC<InputProps> = ({
  label,
  ...rest
}) => {
  return (
    <div className="flex">
      <div>
        <p className="font-medium">{label}</p>
      </div>
      <input className='flex-1 border-solid border-2 pr-1' {...rest}/>
    </div>
  );
};