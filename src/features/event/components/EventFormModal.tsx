import { useState, useMemo, createContext, useContext } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { DateTimePicker } from "@/components/forms/DateTimePicker";
import { AddressInput } from "@/components/forms/AddressInput";
import { formatDateForInput } from "@/utils/dateFormat";
import { categoryStyles, defaultStyle } from "./CategoryPill";
import type {
  CategoryDTO,
  CreateEventDTO,
  EventModel,
  UpdateEventDTO,
} from "../types";
import { useAppSelector } from "@/store/hooks";

interface EventFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventDTO | UpdateEventDTO) => Promise<void>;
  initialData?: EventModel;
  loading?: boolean;
}

function getInitialFormData(initialData?: EventModel): CreateEventDTO {
  if (initialData) {
    return {
      title: initialData.title,
      description: initialData.description || "",
      categoryIds: initialData.categories?.map((c) => c.id) || [],
      startDateTime: formatDateForInput(new Date(initialData.startDateTime)),
      endDateTime: formatDateForInput(new Date(initialData.endDateTime)),
      address: initialData.address,
      latitude: initialData.latitude,
      longitude: initialData.longitude,
      capacity: initialData.capacity,
    };
  }
  return {
    title: "",
    description: "",
    categoryIds: [],
    startDateTime: "",
    endDateTime: "",
    address: "",
    latitude: undefined,
    longitude: undefined,
    capacity: undefined,
  };
}

// Color context for section-aware styling
type SectionColor = "green" | "blue" | "purple" | "orange" | "teal";
const SectionColorContext = createContext<SectionColor>("green");

// Reusable Section Wrapper Component
interface FormSectionProps {
  title: string;
  color: SectionColor;
  children: React.ReactNode;
}

const colorStyles = {
  green: {
    bg: "bg-green-50",
    accent: "bg-green-500",
    border: "border-green-100",
  },
  blue: { bg: "bg-blue-50", accent: "bg-blue-500", border: "border-blue-100" },
  purple: {
    bg: "bg-purple-50",
    accent: "bg-purple-500",
    border: "border-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    accent: "bg-orange-500",
    border: "border-orange-100",
  },
  teal: { bg: "bg-teal-50", accent: "bg-teal-500", border: "border-teal-100" },
};

function FormSection({ title, color, children }: FormSectionProps) {
  const styles = colorStyles[color];
  return (
    <SectionColorContext.Provider value={color}>
      <div className={`rounded-2xl border ${styles.border}`}>
        <div
          className={`flex items-center gap-2 ${styles.bg} px-4 py-3 rounded-t-2xl`}
        >
          <div className={`w-1 h-5 ${styles.accent} rounded-full`}></div>
          <Typography
            variant="h6"
            className="text-slate-800 font-semibold text-sm"
          >
            {title}
          </Typography>
        </div>
        <div className="p-4 bg-white space-y-4 rounded-b-2xl">{children}</div>
      </div>
    </SectionColorContext.Provider>
  );
}

// Focus color classes for each section
const focusColorClasses = {
  green: "focus:border-green-500 focus:ring-green-500",
  blue: "focus:border-blue-500 focus:ring-blue-500",
  purple: "focus:border-purple-500 focus:ring-purple-500",
  orange: "focus:border-orange-500 focus:ring-orange-500",
  teal: "focus:border-teal-500 focus:ring-teal-500",
};

// Styled Input that uses section color
interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hasLabel?: boolean;
}

function StyledInput({
  label,
  error,
  className,
  disabled,
  ...props
}: StyledInputProps) {
  const sectionColor = useContext(SectionColorContext);
  const focusClass = focusColorClasses[sectionColor];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
          ${
            disabled
              ? "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
              : error
              ? "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500"
              : `border-slate-200 bg-slate-50 text-slate-800 ${focusClass} focus:bg-white`
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-20
          ${className || ""}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Styled Textarea that uses section color
interface StyledTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

function StyledTextarea({
  label,
  error,
  className,
  disabled,
  rows = 3,
  ...props
}: StyledTextareaProps) {
  const sectionColor = useContext(SectionColorContext);
  const focusClass = focusColorClasses[sectionColor];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all resize-none
          ${
            disabled
              ? "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
              : error
              ? "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500"
              : `border-slate-200 bg-slate-50 text-slate-800 ${focusClass} focus:bg-white`
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-20
          ${className || ""}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function EventFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading = false,
}: EventFormModalProps) {
  const categories = useAppSelector((state) => state.category.items);

  const initialFormData = useMemo(
    () => getInitialFormData(initialData),
    [initialData]
  );
  const [formData, setFormData] = useState<CreateEventDTO>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!initialData;

  const handleChange = (field: keyof CreateEventDTO, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleCategory = (category: CategoryDTO) => {
    setFormData((prev) => {
      const categoryIds = prev.categoryIds || [];
      if (categoryIds.includes(category.id)) {
        return {
          ...prev,
          categoryIds: categoryIds.filter((c) => c !== category.id),
        };
      } else {
        return { ...prev, categoryIds: [...categoryIds, category.id] };
      }
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.address || formData.address.trim().length < 5) {
      newErrors.address =
        "Address is required and must be at least 5 characters";
    }

    if (!isEditMode) {
      if (!formData.startDateTime) {
        newErrors.startDateTime = "Start date/time is required";
      } else {
        const startDate = new Date(formData.startDateTime);
        if (startDate < new Date()) {
          newErrors.startDateTime = "Start date must be in the future";
        }
      }

      if (!formData.endDateTime) {
        newErrors.endDateTime = "End date/time is required";
      } else if (formData.startDateTime) {
        const startDate = new Date(formData.startDateTime);
        const endDate = new Date(formData.endDateTime);
        if (endDate <= startDate) {
          newErrors.endDateTime = "End date must be after start date";
        }
      }

      if (formData.capacity !== undefined && formData.capacity <= 0) {
        newErrors.capacity = "Capacity must be a positive number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (isEditMode) {
      const submitData: UpdateEventDTO = {
        title: formData.title,
        description: formData.description,
        categoryIds: formData.categoryIds,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };
      await onSubmit(submitData);
    } else {
      const submitData: CreateEventDTO = {
        ...formData,
        startDateTime: new Date(formData.startDateTime).toISOString(),
        endDateTime: new Date(formData.endDateTime).toISOString(),
      };
      await onSubmit(submitData);
    }
  };

  return (
    <Dialog
      key={initialData ? `edit-${initialData.id}` : "create"}
      open={open}
      handler={onClose}
      size="lg"
      className="max-h-[90vh] overflow-y-auto rounded-2xl"
      dismiss={{ outsidePress: false }}
    >
      <DialogHeader className="border-b border-slate-100 px-6 py-4">
        <Typography variant="h4" className="text-slate-800 font-bold">
          {initialData ? "Edit Event" : "Create New Event"}
        </Typography>
      </DialogHeader>

      <DialogBody className="space-y-4 overflow-y-auto max-h-[60vh] px-6 py-5">
        {/* Basic Info Section */}
        <FormSection title="Basic Information" color="green">
          <StyledInput
            label="Event Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., Summer Music Festival"
            error={errors.title}
          />
          <StyledTextarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Tell us more about your event..."
          />
        </FormSection>

        {/* Schedule Section */}
        {!isEditMode && (
          <FormSection title="Schedule" color="blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateTimePicker
                label="Start Date & Time"
                value={formData.startDateTime}
                onChange={(val) => handleChange("startDateTime", val)}
                error={errors.startDateTime}
                required
                minDate={new Date()}
                accentColor="blue"
              />
              <DateTimePicker
                label="End Date & Time"
                value={formData.endDateTime}
                onChange={(val) => handleChange("endDateTime", val)}
                error={errors.endDateTime}
                required
                minDate={
                  formData.startDateTime
                    ? new Date(formData.startDateTime)
                    : new Date()
                }
                accentColor="blue"
              />
            </div>
          </FormSection>
        )}

        {/* Location Section */}
        <FormSection title="Location" color="purple">
          <AddressInput
            label="Address"
            value={formData.address}
            onChange={(value) => handleChange("address", value)}
            onCoordinatesChange={(lat, lon) => {
              handleChange("latitude", lat);
              handleChange("longitude", lon);
            }}
            error={errors.address}
            required
            placeholder="Enter event address..."
            accentColor="purple"
          />
          <div className="grid grid-cols-2 gap-4">
            <StyledInput
              label="Latitude"
              value={formData.latitude?.toString() || ""}
              placeholder="Auto-filled"
              disabled
            />
            <StyledInput
              label="Longitude"
              value={formData.longitude?.toString() || ""}
              placeholder="Auto-filled"
              disabled
            />
          </div>
        </FormSection>

        {/* Categories Section */}
        <FormSection title="Categories" color="orange">
          <div className="flex flex-wrap gap-2">
            {categories.map((category: CategoryDTO) => {
              const isSelected = formData.categoryIds?.includes(category.id);
              const style = categoryStyles[category.name] || defaultStyle;
              const Icon = style.icon;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium
                    transition-all duration-200 select-none
                    ${
                      isSelected
                        ? `${style.bgColor} ${style.textColor} ${style.borderColor} shadow-sm`
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                    }
                  `}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? style.iconColor : "text-slate-400"
                    }`}
                  />
                  <span>{category.name}</span>
                  {isSelected && (
                    <CheckIcon className="w-4 h-4 text-green-600" />
                  )}
                </button>
              );
            })}
          </div>
        </FormSection>

        {/* Capacity Section */}
        {!isEditMode && (
          <FormSection title="Optional Details" color="teal">
            <StyledInput
              label="Capacity"
              type="number"
              value={formData.capacity?.toString() || ""}
              onChange={(e) =>
                handleChange(
                  "capacity",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              placeholder="Maximum number of attendees"
              error={errors.capacity}
            />
          </FormSection>
        )}
      </DialogBody>

      <DialogFooter className="gap-3 border-t border-slate-100 px-6 py-4">
        <Button
          variant="text"
          color="gray"
          onClick={onClose}
          disabled={loading}
          className="rounded-xl font-medium"
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          color="green"
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
          className="rounded-xl font-semibold shadow-lg shadow-green-500/20"
        >
          {initialData ? "Update Event" : "Create Event"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
