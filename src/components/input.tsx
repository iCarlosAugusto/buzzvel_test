import React, { InputHTMLAttributes } from "react";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClickPlus: () => void;
}

export const InputComponent: React.FC<InputProps> = ({
  placeholder,
  onClickPlus,
  ...rest
}) => {
  return (
    <div className="relative rounded-md py-2">
      <input
        {...rest}
        type="text"
        placeholder={placeholder}
        className="w-full py-2 pl-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
      <div
        className="absolute inset-y-0 right-2 pl-3 flex items-center cursor-pointer"
        onClick={onClickPlus}
      >
        <Image
          src="plus.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={24}
          height={24}
          priority
        />
      </div>
    </div>
  );
};
