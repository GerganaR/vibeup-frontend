import { Spinner } from "@material-tailwind/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  overlay?: boolean;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "md",
  overlay = false,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const spinner = <Spinner className={sizeMap[size]} />;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        {spinner}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg z-10">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>;
}
