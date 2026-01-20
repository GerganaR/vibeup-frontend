import { forwardRef } from "react";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, required, disabled, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all resize-none
            ${
              disabled
                ? "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                : error
                ? "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500"
                : "border-slate-200 bg-slate-50 text-slate-800 focus:border-green-500 focus:ring-green-500 focus:bg-white"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20
          `}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {!error && helper && (
          <p className="text-slate-500 text-xs mt-1">{helper}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
