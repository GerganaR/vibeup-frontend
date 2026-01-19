import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type AccentColor = "green" | "blue" | "purple" | "orange" | "teal";

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  minDate?: Date;
  accentColor?: AccentColor;
}

const focusColorClasses: Record<AccentColor, string> = {
  green: "focus:border-green-500 focus:ring-green-500",
  blue: "focus:border-blue-500 focus:ring-blue-500",
  purple: "focus:border-purple-500 focus:ring-purple-500",
  orange: "focus:border-orange-500 focus:ring-orange-500",
  teal: "focus:border-teal-500 focus:ring-teal-500",
};

const primaryColors: Record<
  AccentColor,
  "green" | "blue" | "purple" | "orange" | "teal"
> = {
  green: "green",
  blue: "blue",
  purple: "purple",
  orange: "orange",
  teal: "teal",
};

export function DateTimePicker({
  label,
  value,
  onChange,
  error,
  required,
  minDate,
  accentColor = "green",
}: DateTimePickerProps) {
  const parseValue = (val: string) => {
    if (!val) return { date: null, time: "12:00" };
    const date = new Date(val);
    if (isNaN(date.getTime())) return { date: null, time: "12:00" };
    return {
      date: date,
      time: `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
    };
  };

  const { t, i18n } = useTranslation();
  const { date: initialDate, time: initialTime } = parseValue(value);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialTime);

  useEffect(() => {
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const combined = new Date(selectedDate);
      combined.setHours(hours, minutes, 0, 0);
      onChange(combined.toISOString());
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const { date, time } = parseValue(value);
    setSelectedDate(date);
    setSelectedTime(time);
  }, [value]);

  const focusClass = focusColorClasses[accentColor];

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-2 gap-3">
        {/* Date Picker - z-index set high to appear above sections */}
        <div className="relative" style={{ zIndex: 9999 }}>
          <Datepicker
            useRange={false}
            asSingle={true}
            value={{ startDate: selectedDate, endDate: selectedDate }}
            onChange={(val) => {
              if (val?.startDate) {
                setSelectedDate(new Date(val.startDate));
              }
            }}
            minDate={minDate}
            placeholder={t("Select date")}
            inputClassName={`
              w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
              ${
                error
                  ? "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500"
                  : `border-slate-200 bg-slate-50 text-slate-800 ${focusClass} focus:bg-white`
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-20
            `}
            containerClassName="relative"
            toggleClassName={`absolute right-3 top-1/2 -translate-y-1/2 ${
              error ? "text-red-400" : "text-slate-400"
            }`}
            popoverDirection="down"
            primaryColor={primaryColors[accentColor]}
            i18n={i18n.language}
            displayFormat={
              i18n.language === "bg" ? "D MMM YYYY" : "MMM DD, YYYY"
            }
          />
        </div>

        {/* Time Picker */}
        {/* Time Picker Popover */}
        <div className="relative">
          <Popover placement="bottom-start">
            <PopoverHandler>
              <Button
                variant="text"
                color="blue-gray"
                className={`
                  w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
                  flex items-center justify-between capitalize
                  ${
                    error
                      ? "border-red-300 bg-red-50 text-red-900"
                      : `border-slate-200 bg-slate-50 text-slate-800 ${focusClass} focus:bg-white`
                  }
                  focus:outline-none focus:ring-2 focus:ring-opacity-20
                `}
              >
                <span>{selectedTime}</span>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    error ? "text-red-400" : "text-slate-400"
                  }`}
                />
              </Button>
            </PopoverHandler>
            <PopoverContent className="z-[10000] w-64 p-0 border border-slate-100 shadow-xl rounded-xl overflow-hidden">
              <div className="flex h-64 divide-x divide-slate-100/50">
                {/* Hours Column */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                  <Typography
                    variant="small"
                    className="text-center text-xs font-bold text-slate-400 mb-2 sticky top-0 bg-white py-2"
                  >
                    {t("Hour")}
                  </Typography>
                  <div className="space-y-1">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const hour = i.toString().padStart(2, "0");
                      const isSelected = selectedTime.split(":")[0] === hour;
                      return (
                        <button
                          key={hour}
                          onClick={() => {
                            const minutes = selectedTime.split(":")[1] || "00";
                            setSelectedTime(`${hour}:${minutes}`);
                          }}
                          className={`
                            w-full py-1.5 rounded-lg text-sm font-medium transition-colors
                            ${
                              isSelected
                                ? `bg-${accentColor}-50 text-${accentColor}-600`
                                : "text-slate-600 hover:bg-slate-50"
                            }
                          `}
                        >
                          {hour}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Minutes Column */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                  <Typography
                    variant="small"
                    className="text-center text-xs font-bold text-slate-400 mb-2 sticky top-0 bg-white py-1"
                  >
                    {t("Minute")}
                  </Typography>
                  <div className="space-y-1">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const minute = (i * 5).toString().padStart(2, "0");
                      const isSelected = selectedTime.split(":")[1] === minute;
                      return (
                        <button
                          key={minute}
                          onClick={() => {
                            const hour = selectedTime.split(":")[0] || "12";
                            setSelectedTime(`${hour}:${minute}`);
                          }}
                          className={`
                            w-full py-1.5 rounded-lg text-sm font-medium transition-colors
                            ${
                              isSelected
                                ? `bg-${accentColor}-50 text-${accentColor}-600`
                                : "text-slate-600 hover:bg-slate-50"
                            }
                          `}
                        >
                          {minute}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
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
    </div>
  );
}
