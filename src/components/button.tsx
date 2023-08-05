import React, { ButtonHTMLAttributes } from "react";

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ButtonComponent: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <button {...rest} className="bg-green-500 px-24 py-3 rounded-lg">
      <span className="text-white font-bold"> {label}</span>
    </button>
  );
};
