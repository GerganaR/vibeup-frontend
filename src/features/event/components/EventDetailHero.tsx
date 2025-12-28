import { CategoryChip } from "./CategoryChip";
import { Chip } from "@material-tailwind/react";
import { isEventEnded } from "@/utils/dateFormat";

interface EventDetailHeroProps {
  title: string;
  description?: string;
  categories?: string[];
  coverCategory?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  endDateTime: Date;
}

const categoryGradients: Record<string, string> = {
  Music: "from-purple-500 to-pink-500",
  Sports: "from-blue-500 to-cyan-500",
  Food: "from-orange-500 to-red-500",
  Tech: "from-green-500 to-teal-500",
  Art: "from-pink-500 to-rose-500",
  Culture: "from-indigo-500 to-purple-500",
  Business: "from-gray-500 to-slate-500",
  Education: "from-cyan-500 to-blue-500",
  Health: "from-emerald-500 to-green-500",
  Social: "from-rose-500 to-pink-500",
};

export function EventDetailHero({
  title,
  description,
  categories,
  coverCategory,
  latitude,
  longitude,
  address,
  endDateTime,
}: EventDetailHeroProps) {
  const gradient =
    categoryGradients[coverCategory || ""] || "from-gray-400 to-gray-600";
  const isPast = isEventEnded(new Date(endDateTime));

  // Google Street View cover photo
  const hasCoordinates = latitude !== undefined && longitude !== undefined;
  const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Using Google Street View API for real location photos - Higher resolution
  const mapUrl =
    hasCoordinates && GOOGLE_MAPS_KEY
      ? `https://maps.googleapis.com/maps/api/streetview?size=2048x800&location=${latitude},${longitude}&fov=90&heading=0&pitch=0&source=outdoor&key=${GOOGLE_MAPS_KEY}`
      : null;

  return (
    <div className="w-full h-full bg-white">
      {/* Cover with Google Street View or gradient */}
      {hasCoordinates && mapUrl ? (
        <div className="w-full flex gap-4 relative ">
          
          {/* Title Below Street View */}
          <div className="w-2/3 px-4 sm:px-6 py-6 sm:py-8 bg-white border-b border-gray-200">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              {title}
            </h1>
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 my-4">
                {categories.map((category) => (
                  <CategoryChip key={category} category={category} size="md" />
                ))}
              </div>
            )}

            {description && (
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {/* Street View Image */}
          <div className="w-1/3 h-[15rem] relative">
            <img
              src={mapUrl}
              alt={address || "Event Location"}
              className={`w-full h-full object-cover ${
                isPast ? "grayscale" : ""
              }`}
              onError={(e) => {
                // If Street View fails, show gradient
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) {
                  (fallback as HTMLElement).style.display = "flex";
                }
              }}
            />
            {/* Fallback gradient (hidden by default) */}
            <div
              className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center absolute inset-0`}
              style={{ display: "none" }}
            >
              <div className="text-white text-center px-4 sm:px-6">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                  {title}
                </h1>
              </div>
            </div>
            {/* Past Event Badge on Image */}
            {isPast && (
              <div className="absolute top-4 right-4">
                <Chip
                  value="Past Event"
                  size="lg"
                  className="bg-gray-700 text-white font-medium shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`w-full h-48 sm:h-64 md:h-80 bg-gradient-to-br ${gradient} flex flex-col gap-4 items-center justify-center relative ${
            isPast ? "grayscale" : ""
          }`}
        >
          <div className="text-white text-center px-4 sm:px-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
              {title}
            </h1>
            {isPast && (
              <div className="mt-4">
                <Chip
                  value="Past Event"
                  size="lg"
                  className="bg-gray-700 text-white font-medium"
                />
              </div>
            )}
          </div>
          {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <CategoryChip key={category} category={category} size="md" />
                ))}
              </div>
            )}

            {description && (
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            )}
        </div>
      )}
    </div>
  );
}
