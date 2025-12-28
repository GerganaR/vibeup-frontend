import {
  Switch as MTSwitch,
  type SwitchProps as MTSwitchProps,
  Typography,
} from "@material-tailwind/react";

interface SwitchProps extends Omit<MTSwitchProps, "crossOrigin" | "ref"> {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  color?: "blue" | "red" | "green" | "amber" | "gray";
  className?: string;
}

export function Switch({
  label,
  description,
  checked,
  onChange,
  disabled,
  color = "green",
  className,
  ...props
}: SwitchProps) {
  if (!label && !description) {
    // Simple switch without label
    return (
      <MTSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        color={color}
        className={className}
        crossOrigin={undefined}
        {...props}
      />
    );
  }

  // Switch with label and description
  return (
    <div className={`flex items-center justify-between ${className || ""}`}>
      {(label || description) && (
        <div className="flex-1 pr-4">
          {label && (
            <Typography variant="small" className="font-semibold text-gray-900">
              {label}
            </Typography>
          )}
          {description && (
            <Typography
              variant="small"
              className="text-gray-500 mt-1.5 leading-relaxed"
            >
              {description}
            </Typography>
          )}
        </div>
      )}
      <MTSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        color={color}
        crossOrigin={undefined}
        {...props}
      />
    </div>
  );
}
