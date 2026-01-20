import { Card } from "@material-tailwind/react";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Card className="h-28 bg-gray-200 rounded-lg">
        <div />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-32 bg-gray-200">
            <div className="animate-pulse h-full" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="h-96 bg-gray-200">
            <div className="animate-pulse h-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}
