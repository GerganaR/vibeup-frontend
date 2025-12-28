import React from "react";
import {
  Checkbox as MTCheckbox,
  type CheckboxProps as MTCheckboxProps,
  Typography,
} from "@material-tailwind/react";

type BaseMTProps = Omit<MTCheckboxProps, "crossOrigin" | "ref">;

interface CheckboxProps extends BaseMTProps {
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  color?: "blue" | "red" | "green" | "amber" | "gray";
  className?: string;
}

export function Checkbox({
  label,
  description,
  error,
  checked,
  onChange,
  disabled,
  color = "green",
  className,
  ...props
}: CheckboxProps) {
  return (
    <div className="w-full">
      <div className={`flex items-start gap-2 ${className || ""}`}>
        <MTCheckbox
          {...props}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          color={color}
          crossOrigin={undefined}
        />

        {(label || description) && (
          <div className="flex-1 pt-1">
            {label && (
              <Typography variant="small" className="font-medium text-gray-900">
                {label}
              </Typography>
            )}
            {description && (
              <Typography variant="small" className="text-gray-500 mt-0.5">
                {description}
              </Typography>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}
