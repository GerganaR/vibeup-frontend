import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { bg } from "date-fns/locale";
registerLocale("bg", bg);

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

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return t("Select date");
    return new Intl.DateTimeFormat(i18n.language, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-2 gap-3">
        {/* Date Picker */}
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            minDate={minDate}
            locale={i18n.language}
            portalId="datepicker-portal"
            dateFormat={i18n.language === "bg" ? "d MMM yyyy" : "MMM d, yyyy"}
            placeholderText={t("Select date")}
            wrapperClassName="w-full"
            customInput={
              <button
                type="button"
                className={`
                  w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
                  flex items-center justify-between text-left
                  ${
                    error
                      ? "border-red-300 bg-red-50 text-red-900"
                      : `border-slate-200 bg-slate-50 text-slate-800 ${focusClass} focus:bg-white`
                  }
                  focus:outline-none focus:ring-2 focus:ring-opacity-20
                `}
              >
                <span className={!selectedDate ? "text-slate-400" : ""}>
                  {formatDisplayDate(selectedDate)}
                </span>
                <CalendarIcon className="h-4 w-4 text-slate-400" />
              </button>
            }
          />
        </div>

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
                  <div className="space-y-1 px-2 pb-2">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const hour = i.toString().padStart(2, "0");
                      const isSelected = selectedTime.split(":")[0] === hour;
                      return (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => {
                            const minutes = selectedTime.split(":")[1] || "00";
                            setSelectedTime(`${hour}:${minutes}`);
                          }}
                          className={`
                            w-full py-1.5 rounded-lg text-sm font-medium transition-colors
                            ${
                              isSelected
                                ? "bg-blue-50 text-blue-600"
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
                    className="text-center text-xs font-bold text-slate-400 mb-2 sticky top-0 bg-white py-2"
                  >
                    {t("Minute")}
                  </Typography>
                  <div className="space-y-1 px-2 pb-2">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const minute = (i * 5).toString().padStart(2, "0");
                      const isSelected = selectedTime.split(":")[1] === minute;
                      return (
                        <button
                          key={minute}
                          type="button"
                          onClick={() => {
                            const hour = selectedTime.split(":")[0] || "12";
                            setSelectedTime(`${hour}:${minute}`);
                          }}
                          className={`
                            w-full py-1.5 rounded-lg text-sm font-medium transition-colors
                            ${
                              isSelected
                                ? "bg-blue-50 text-blue-600"
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
