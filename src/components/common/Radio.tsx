import React from "react";

interface RadioProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

interface RadioGroupProps {
  name: string;
  options: { id: string; value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  id,
  label,
  value,
  name,
  checked,
  onChange,
}) => {
  return (
    <div className="space-x-6">
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <label htmlFor={id} className="text-md text-zinc-700">
        {label}
      </label>
    </div>
  );
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <Radio
          key={option.value}
          id={option.id}
          name={name}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
