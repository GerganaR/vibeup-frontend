import { Card, CardBody } from "@material-tailwind/react";

export function EventCardSkeleton() {
  return (
    <Card className="shadow-md rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Cover placeholder */}
      <div className="h-48 bg-gray-200" />

      <CardBody className="p-4 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Date + Time */}
        <div className="flex items-center gap-4">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-20" />
        </div>
      </CardBody>
    </Card>
  );
}
