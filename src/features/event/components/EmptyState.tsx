import { FaCalendarAlt } from "react-icons/fa";
import { Typography, Button } from "@material-tailwind/react";

interface Props {
  message: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  message,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <div className="text-center py-20">
      <div className="flex justify-center mb-6">
        <FaCalendarAlt className="w-20 h-20 text-gray-300" />
      </div>
      <Typography variant="h4" className="text-gray-700 mb-3">
        {message}
      </Typography>
      {description && (
        <Typography
          variant="paragraph"
          className="text-gray-500 mb-6 max-w-md mx-auto"
        >
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white border-none shadow-md hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
          size="lg"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
