import { Card, CardBody, Typography } from "@material-tailwind/react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  icon,
  color,
  loading = false,
}: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardBody className="p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg" />
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography
              variant="small"
              className="text-gray-500 mb-1 font-medium"
            >
              {title}
            </Typography>
            <Typography variant="h3" className="text-gray-900 font-bold">
              {value}
            </Typography>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        </div>
      </CardBody>
    </Card>
  );
}
