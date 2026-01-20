import { Card, CardBody } from "@material-tailwind/react";

export function EventDetailSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-10 w-32 bg-gray-200 rounded" />

      {/* Hero Section Skeleton */}
      <Card className="shadow-lg overflow-hidden">
        <div className="h-64 sm:h-80 bg-gray-300" />
      </Card>

      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Event Info */}
          <Card className="shadow-md">
            <CardBody className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg" />
                ))}
              </div>
              <div className="h-24 bg-gray-200 rounded-lg" />
            </CardBody>
          </Card>

          {/* Map Skeleton */}
          <Card className="shadow-md overflow-hidden">
            <div className="h-[400px] bg-gray-300" />
          </Card>

          {/* Attendees Skeleton */}
          <Card className="shadow-md">
            <CardBody className="p-4 sm:p-6 space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="flex gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-200 rounded-full" />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: RSVP Skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4 sm:space-y-6">
            <Card className="shadow-lg">
              <CardBody className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-5 w-28 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="h-6 w-24 bg-gray-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
                <div className="h-12 w-full bg-gray-200 rounded-lg" />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
