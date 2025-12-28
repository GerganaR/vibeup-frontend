import {
  Textarea as MTTextarea,
  type TextareaProps as MTTextareaProps,
} from "@material-tailwind/react";
import { forwardRef } from "react";

interface TextareaProps extends Omit<MTTextareaProps, "error" | "ref"> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, required, rows = 4, className, ...props }) => {
    return (
      <div className="w-full">
        <MTTextarea
          label={label}
          error={!!error}
          required={required}
          rows={rows}
          className={className}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
        {!error && helper && (
          <p className="text-gray-500 text-xs mt-1 ml-1">{helper}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
