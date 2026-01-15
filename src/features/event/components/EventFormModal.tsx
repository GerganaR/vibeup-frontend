import { useState, useMemo } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { DatePicker } from "@/components/forms/DatePicker";
import { AddressInput } from "@/components/forms/AddressInput";
import { formatDateForInput } from "@/utils/dateFormat";
import type {
  CategoryDTO,
  CreateEventDTO,
  EventModel,
  UpdateEventDTO,
} from "../types";

interface EventFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventDTO | UpdateEventDTO) => Promise<void>;
  initialData?: EventModel;
  loading?: boolean;
}

import { useAppSelector } from "@/store/hooks";

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
    // Clear error for this field
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

    // Only validate dates and capacity if not in edit mode
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
    console.log(formData);
    if (!validate()) return;

    if (isEditMode) {
      // When editing, only send the editable fields
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
      // When creating, send all fields with proper date conversion
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
      className="max-h-[90vh] overflow-y-auto"
      dismiss={{ outsidePress: false }}
    >
      <DialogHeader className="flex-col items-start sm:flex-row sm:items-center">
        <Typography variant="h4" className="text-xl sm:text-2xl">
          {initialData ? "Edit Event" : "Create New Event"}
        </Typography>
      </DialogHeader>

      <DialogBody className="space-y-6 overflow-y-auto max-h-[60vh] px-4 sm:px-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <Typography
            variant="h6"
            className="text-gray-800 text-base sm:text-lg"
          >
            Basic Information
          </Typography>

          <Input
            label="Event Title *"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
            required
            placeholder="e.g., Summer Music Festival"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            placeholder="Tell us more about your event..."
            rows={4}
          />
        </div>

        {/* Schedule - only shown when creating */}
        {!isEditMode && (
          <div className="space-y-4">
            <Typography
              variant="h6"
              className="text-gray-800 text-base sm:text-lg"
            >
              Schedule
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePicker
                label="Start Date & Time *"
                value={formData.startDateTime}
                onChange={(e) => handleChange("startDateTime", e.target.value)}
                error={errors.startDateTime}
                required
              />

              <DatePicker
                label="End Date & Time *"
                value={formData.endDateTime}
                onChange={(e) => handleChange("endDateTime", e.target.value)}
                error={errors.endDateTime}
                required
              />
            </div>
          </div>
        )}

        {/* Location */}
        <div className="space-y-4">
          <Typography
            variant="h6"
            className="text-gray-800 text-base sm:text-lg"
          >
            Location
          </Typography>

          <AddressInput
            label="Address *"
            value={formData.address}
            onChange={(value) => handleChange("address", value)}
            onCoordinatesChange={(lat, lon) => {
              handleChange("latitude", lat);
              handleChange("longitude", lon);
            }}
            error={errors.address}
            required
            placeholder="Enter event address..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="any"
              value={formData.latitude?.toString() || ""}
              onChange={(e) =>
                handleChange(
                  "latitude",
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
              placeholder="Auto-filled from address"
              disabled
            />

            <Input
              label="Longitude"
              type="number"
              step="any"
              value={formData.longitude?.toString() || ""}
              onChange={(e) =>
                handleChange(
                  "longitude",
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
              placeholder="Auto-filled from address"
              disabled
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <Typography
            variant="h6"
            className="text-gray-800 text-base sm:text-lg"
          >
            Categories
          </Typography>
          <div className="flex flex-wrap gap-2">
            {categories.map((category: CategoryDTO) => (
              <div key={category.id} onClick={() => toggleCategory(category)}>
                <Chip
                  value={category.name}
                  variant={
                    formData.categoryIds?.includes(category.id)
                      ? "filled"
                      : "outlined"
                  }
                  color={
                    formData.categoryIds?.includes(category.id)
                      ? "green"
                      : "gray"
                  }
                  className="cursor-pointer text-xs sm:text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Optional Details - only shown when creating */}
        {!isEditMode && (
          <div className="space-y-4">
            <Typography
              variant="h6"
              className="text-gray-800 text-base sm:text-lg"
            >
              Optional Details
            </Typography>

            <Input
              label="Capacity"
              type="number"
              value={formData.capacity?.toString() || ""}
              onChange={(e) =>
                handleChange(
                  "capacity",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              error={errors.capacity}
              placeholder="Maximum number of attendees"
            />
          </div>
        )}
      </DialogBody>

      <DialogFooter className="gap-2 flex-col sm:flex-row px-4 sm:px-6">
        <Button
          variant="text"
          color="gray"
          onClick={onClose}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          color="green"
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
          className="w-full sm:w-auto"
        >
          {initialData ? "Update Event" : "Create Event"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
