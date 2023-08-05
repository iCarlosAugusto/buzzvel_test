import React, { InputHTMLAttributes } from "react";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClickPlus: () => void;
}

export const InputComponent: React.FC<InputProps> = ({ placeholder, onClickPlus, ...rest }) => {
  return (
    <div className="max-w-md w-full px-4">
      <div className="relative rounded-md">
        <input
          {...rest}
          type="text"
          placeholder={placeholder}
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
        />
        <div
          className="absolute inset-y-0 right-0 pl-3 flex items-center cursor-pointer"
          onClick={onClickPlus}
        >
          <Image
            src="plus-circle.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={24}
            height={24}
            priority
          />
        </div>
      </div>
    </div>
  );
};
