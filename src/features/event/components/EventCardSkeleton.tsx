import { Card, CardBody } from "@material-tailwind/react";

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 animate-pulse">
      {/* Cover placeholder */}
      <div className="h-48 bg-gradient-to-r from-slate-100 to-slate-200" />

      <CardBody className="p-5 space-y-4">
        {/* Title */}
        <div className="h-6 bg-slate-200 rounded-lg w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-100 rounded-lg w-full" />
          <div className="h-4 bg-slate-100 rounded-lg w-5/6" />
        </div>

        {/* Date + Time pills */}
        <div className="flex items-center gap-2">
          <div className="h-7 bg-slate-100 rounded-lg w-20" />
          <div className="h-7 bg-slate-100 rounded-lg w-16" />
          <div className="h-7 bg-green-100/50 rounded-lg w-14" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          <div className="h-6 bg-slate-100 rounded-full w-20" />
          <div className="h-6 bg-slate-100 rounded-full w-24" />
        </div>
      </CardBody>
    </Card>
  );
}
