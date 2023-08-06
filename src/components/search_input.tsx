import React, { InputHTMLAttributes } from "react";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputSearchComponent: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <div className="w-full py-6">
      <div className="relative">
        <input
          {...rest}
          type="text"
          placeholder="Search for task..."
          className="w-full py-2 pl-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
          <Image
            src="search.svg"
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
