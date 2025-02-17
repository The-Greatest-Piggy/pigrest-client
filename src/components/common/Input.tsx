import React from "react";

interface InputProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  label: string;
  type?: string;
  className?: string;
  step?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type,
  className,
  step,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        type={type}
        step={step}
        onChange={onChange}
        className={`
          block
          rounded-lg
          border
          px-6
          pt-6
          pb-2
          w-full
          text-md
          text-zinc-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
          ${className || ""}
        `}
        placeholder=""
      />
      <label
        className="
          absolute
          text-md
          text-zinc-400
          duration-150
          transform
          -translate-y-3
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 
          peer-focus:-translate-y-3
        "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
