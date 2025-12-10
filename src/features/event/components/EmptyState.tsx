import { FaCalendarAlt } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";

interface Props {
  message: string;
  description?: string;
}

export function EmptyState({ message, description }: Props) {
  return (
    <div className="text-center py-16">
      <FaCalendarAlt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <Typography variant="h6" className="text-gray-600">
        {message}
      </Typography>
      {description && (
        <Typography variant="small" className="text-gray-400 mt-1">
          {description}
        </Typography>
      )}
    </div>
  );
}
