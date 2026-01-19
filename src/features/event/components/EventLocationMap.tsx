import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface EventLocationMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  height?: number;
}

export function EventLocationMap({
  latitude,
  longitude,
  address,
  height = 400,
}: EventLocationMapProps) {
  const { t } = useTranslation();

  if (!latitude || !longitude) {
    return null;
  }

  const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Google Maps Embed API (interactive map)
  const googleMapsEmbedUrl = GOOGLE_MAPS_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=${latitude},${longitude}&zoom=15`
    : null;

  // OpenStreetMap embed (fallback - also interactive)
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - 0.01
  },${latitude - 0.01},${longitude + 0.01},${
    latitude + 0.01
  }&layer=mapnik&marker=${latitude},${longitude}`;

  // Google Maps link to open in new tab
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <Card className="shadow-md overflow-hidden">
      <CardBody className="p-0">
        <div className="w-full">
          {/* Interactive Map */}
          <div className="w-full relative" style={{ height: `${height}px` }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={googleMapsEmbedUrl || osmEmbedUrl}
              title={address || t("Event Location")}
              className="border-0"
            />
          </div>

          {/* Address and Actions */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
              <div className="flex items-start gap-2 flex-1">
                <MapPinIcon className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <Typography
                    variant="small"
                    className="text-gray-500 uppercase mb-1"
                  >
                    {t("Location")}
                  </Typography>
                  {address && (
                    <Typography
                      variant="paragraph"
                      className="text-gray-900 mb-2"
                    >
                      {address}
                    </Typography>
                  )}
                  <Typography variant="small" className="text-gray-600">
                    {latitude.toFixed(6)}, {longitude.toFixed(6)}
                  </Typography>
                </div>
              </div>
              <Button
                size="sm"
                color="blue"
                variant="outlined"
                onClick={() => window.open(googleMapsUrl, "_blank")}
                className="shrink-0 w-full sm:w-auto"
              >
                {t("Open in Maps")}
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
