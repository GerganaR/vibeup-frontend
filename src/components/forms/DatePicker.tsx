import { Input, type InputProps } from "@material-tailwind/react";
import { forwardRef } from "react";

interface DatePickerProps
  extends Omit<InputProps, "error" | "type" | "inputRef" | "ref"> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  min?: string;
  max?: string;
  className?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, helper, required, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <Input
          type="datetime-local"
          label={label}
          error={!!error}
          required={required}
          inputRef={ref}
          className={className}
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
        {!error && helper && (
          <p className="text-gray-500 text-xs mt-1 ml-1">{helper}</p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
