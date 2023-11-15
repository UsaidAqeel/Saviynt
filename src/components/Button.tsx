import React, { FC } from "react";
import { clsx } from "../utils/helper";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-gradient-to-r from-[#57BC90] to-teal-900 text-white py-3 px-4 rounded-lg text-sm flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
