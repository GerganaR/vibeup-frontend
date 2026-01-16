import { Typography, Button } from "@material-tailwind/react";

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
}

export function DashboardError({ error, onRetry }: DashboardErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="text-red-500 mb-4">
        <svg
          className="w-20 h-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <Typography variant="h5" className="text-gray-700 mb-2">
        Something went wrong
      </Typography>
      <Typography variant="paragraph" className="text-gray-500 mb-6">
        {error}
      </Typography>
      <Button color="green" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}
