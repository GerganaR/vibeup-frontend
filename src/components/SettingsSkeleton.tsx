export function SettingsSkeleton() {
  return (
    <div className="flex flex-col gap-4 h-full animate-pulse">
      {/* Header */}
      <div className="h-10 w-32 bg-gray-200 rounded" />

      <div className="flex-1 lg:overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 h-auto lg:h-full">
          {/* Left Column */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            {/* Profile Section */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
              <div className="h-12 bg-gray-200" />
              <div className="p-5 space-y-5">
                {/* Avatar Row */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-40 bg-gray-200 rounded" />
                  </div>
                </div>
                {/* Name Input */}
                <div className="h-12 bg-gray-200 rounded-lg" />
                {/* Email Input */}
                <div className="h-12 bg-gray-200 rounded-lg" />
                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Account Actions Section */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
              <div className="h-12 bg-gray-200" />
              <div className="p-5">
                <div className="h-10 w-full bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Right Column - Translation Editor */}
          <div className="lg:col-span-8 xl:col-span-9 h-[500px] lg:h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col">
            {/* Editor Header Skeleton */}
            <div className="h-20 border-b border-slate-200 p-4 flex items-center justify-between bg-white">
              <div className="space-y-2">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-60 bg-gray-200 rounded" />
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-32 bg-gray-200 rounded-lg" />
                <div className="h-10 w-64 bg-gray-200 rounded-lg hidden md:block" />
              </div>
            </div>

            {/* Editor Body Skeleton - List Items */}
            <div className="flex-1 p-0 overflow-hidden">
              {/* Table Header */}
              <div className="flex border-b border-slate-200 bg-gray-50 p-4">
                <div className="w-[40%] h-4 bg-gray-200 rounded mr-4" />
                <div className="w-[60%] h-4 bg-gray-200 rounded" />
              </div>

              {/* Rows */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex border-b border-slate-100 p-4">
                  <div className="w-[40%] space-y-2 mr-4">
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    {i % 2 === 0 && (
                      <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    )}
                  </div>
                  <div className="w-[60%]">
                    <div className="h-10 w-full bg-gray-200 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
