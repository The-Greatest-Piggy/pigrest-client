import React from "react";

interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  none?: boolean;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  disabled,
  outline,
  none,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-3xl
      font-semibold
      hover:bg-opacity-80
      hover:text-zinc-950
      transition 
      ${fullWidth ? "w-full" : "w-fit"}
      ${secondary ? "bg-[#E9E9E9]" : "bg-pink-400"}
      ${secondary ? "text-zinc-700" : "text-white"}
      ${secondary ? "border-zinc-700" : "border-pink-400"}
      ${large ? "text-xl" : "text-md"}
      ${large ? "px-5" : "px-4"}
      ${large ? "py-3" : "py-2"}
      ${outline ? "bg-transparent" : ""}
      ${outline ? "border-2 border-pink-400" : ""}
      ${outline ? "text-zinc-700" : ""}
      ${none ? "bg-transparent" : ""}
      ${none ? "" : ""}
      ${none ? "text-zinc-700" : ""}
      ${className || ""}
    `}
    >
      {label}
    </button>
  );
};

export default Button;
