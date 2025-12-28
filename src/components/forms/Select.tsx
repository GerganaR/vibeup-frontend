import {
  Select as MTSelect,
  Option,
  type SelectProps as MTSelectProps,
} from "@material-tailwind/react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type BaseMTSelectProps = Omit<
  MTSelectProps,
  "error" | "onChange" | "children" | "required" | "crossOrigin" | "ref"
>;

interface SelectProps extends BaseMTSelectProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean; // wrapper-only
  value?: string;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
}

export function Select({
  label,
  error,
  helper,
  required,
  value,
  onChange,
  disabled,
  placeholder,
  options,
  className,
  ...rest
}: SelectProps) {
  // Build children array to avoid conditional rendering issues with Material Tailwind
  const selectOptions = [];

  if (placeholder) {
    selectOptions.push(
      <Option key="placeholder" value="" disabled>
        {placeholder}
      </Option>
    );
  }

  options.forEach((option) => {
    selectOptions.push(
      <Option
        key={option.value}
        value={option.value}
        disabled={option.disabled}
      >
        {option.label}
      </Option>
    );
  });

  return (
    <div className="w-full">
      <MTSelect
        label={required && label ? `${label} *` : label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={!!error}
        className={className}
        {...rest}
      >
        {selectOptions}
      </MTSelect>

      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
      {!error && helper && (
        <p className="text-gray-500 text-xs mt-1 ml-1">{helper}</p>
      )}
    </div>
  );
}
