import {
  Input as MTInput,
  type InputProps as MTInputProps,
} from "@material-tailwind/react";
import { forwardRef } from "react";

interface InputProps extends Omit<MTInputProps, "error" | "inputRef" | "ref"> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  step?: string;
  min?: string;
  max?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      required,
      icon,
      className,
      type,
      placeholder,
      value,
      onChange,
      onBlur,
      disabled,
      step,
      min,
      max,
      ...restProps
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <MTInput
          label={label}
          error={!!error}
          required={required}
          inputRef={ref}
          icon={icon}
          className={className}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          step={step}
          min={min}
          max={max}
          crossOrigin={undefined}
          {...restProps}
        />
        {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
        {!error && helper && (
          <p className="text-gray-500 text-xs mt-1 ml-1">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
