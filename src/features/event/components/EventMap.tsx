import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Card, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import type { EventModel } from "../types";
import { CategoryPill } from "./CategoryPill";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { isEventEnded } from "@/utils/dateFormat";

interface EventMapProps {
  events: EventModel[];
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 42.6977,
  lng: 23.3219,
};

export function EventMap({ events }: EventMapProps) {
  const { t } = useTranslation();
  const { formatDateTime } = useDateFormatter();
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const panToEvent = useCallback((event: EventModel) => {
    if (mapRef.current && event.latitude && event.longitude) {
      mapRef.current.panTo({ lat: event.latitude, lng: event.longitude });
      mapRef.current.setZoom(15);
    }
  }, []);

  const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
  });

  // Filter events that have coordinates
  const eventsWithCoordinates = useMemo(() => {
    return events.filter((event) => event.latitude && event.longitude);
  }, [events]);

  // Calculate map center based on all event coordinates
  const mapCenter = useMemo(() => {
    if (eventsWithCoordinates.length === 0) {
      return defaultCenter;
    }

    const avgLat =
      eventsWithCoordinates.reduce((sum, e) => sum + (e.latitude || 0), 0) /
      eventsWithCoordinates.length;
    const avgLng =
      eventsWithCoordinates.reduce((sum, e) => sum + (e.longitude || 0), 0) /
      eventsWithCoordinates.length;

    return { lat: avgLat, lng: avgLng };
  }, [eventsWithCoordinates]);

  const handleMarkerClick = (eventId: string) => {
    setActiveMarker(eventId);
    const event = eventsWithCoordinates.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  if (loadError) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center bg-gray-100 rounded-xl">
        <MapPinIcon className="w-16 h-16 text-red-400 mb-4" />
        <Typography variant="h6" className="text-gray-600">
          {t("Error Loading Maps")}
        </Typography>
        <Typography variant="small" className="text-gray-400 mt-1">
          {t("Please check your Google Maps API key")}
        </Typography>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center bg-gray-100 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mb-4"></div>
        <Typography variant="h6" className="text-gray-600">
          {t("Loading Maps...")}
        </Typography>
      </div>
    );
  }

  if (eventsWithCoordinates.length === 0) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center bg-gray-100 rounded-xl">
        <MapPinIcon className="w-16 h-16 text-gray-400 mb-4" />
        <Typography variant="h6" className="text-gray-600">
          {t("No Events with Locations")}
        </Typography>
        <Typography variant="small" className="text-gray-400 mt-1">
          {t("Events need coordinates to be displayed on the map")}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full overflow-hidden">
      {/* Events List Sidebar - LEFT */}
      <div className="flex flex-col-reverse lg:flex-row gap-4 h-full overflow-hidden"></div>
      {/* Events List Sidebar - LEFT (Bottom on mobile) */}
      <div className="h-[35%] lg:h-auto lg:w-80 min-h-0 overflow-y-auto scrollbar-thin flex-shrink-0 pr-2 border-t lg:border-t-0 border-slate-200 pt-2 lg:pt-0">
        <Typography
          variant="h6"
          className="text-gray-900 sticky top-0 bg-white pb-2 z-10"
        >
          {t("Events on Map")} ({eventsWithCoordinates.length})
        </Typography>

        <div className="space-y-3 p-2">
          {eventsWithCoordinates.map((event) => {
            const isPast = isEventEnded(new Date(event.endDateTime));
            return (
              <Card
                key={event.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedEvent?.id === event.id
                    ? "ring-2 ring-teal-500 shadow-md"
                    : ""
                } ${isPast ? "opacity-60 grayscale-[30%]" : ""}`}
                onClick={() => {
                  setSelectedEvent(event);
                  setActiveMarker(event.id);
                  panToEvent(event);
                }}
              >
                <div className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPinIcon className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Typography
                        variant="h6"
                        className="text-gray-900 text-sm font-semibold mb-1 truncate"
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-gray-600 text-xs mb-1"
                      >
                        {formatDateTime(new Date(event.startDateTime))}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-gray-500 text-xs line-clamp-2"
                      >
                        {event.address}
                      </Typography>
                    </div>
                  </div>

                  {event.categories && event.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.categories.slice(0, 2).map((category) => (
                        <CategoryPill
                          key={category.id}
                          category={category.name}
                          size="sm"
                          showIcon={false}
                        />
                      ))}
                      {event.categories.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-700 text-xs rounded-full">
                          +{event.categories.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outlined"
                      color="blue"
                      className="flex-1 text-xs py-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/events/${event.id}`;
                      }}
                    >
                      {t("View Details")}
                    </Button>
                    <Button
                      size="sm"
                      variant="text"
                      color="gray"
                      className="text-xs py-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`,
                          "_blank"
                        );
                      }}
                    >
                      {t("Directions")}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Map Container - RIGHT */}
      <div className="flex-1 min-h-0 relative rounded-xl overflow-hidden bg-gray-100 shadow-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={eventsWithCoordinates.length === 1 ? 14 : 12}
          onLoad={onMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          {eventsWithCoordinates.map((event) => {
            const isPastEvent = isEventEnded(new Date(event.endDateTime));
            return (
              <Marker
                key={event.id}
                position={{
                  lat: event.latitude!,
                  lng: event.longitude!,
                }}
                onClick={() => handleMarkerClick(event.id)}
                title={event.title}
                opacity={1}
                icon={{
                  url: isPastEvent
                    ? "data:image/svg+xml;charset=UTF-8," +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#6B7280" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle fill="#fff" cx="12" cy="9" r="3"/></svg>'
                      )
                    : "data:image/svg+xml;charset=UTF-8," +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#14b8a6" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle fill="#fff" cx="12" cy="9" r="3"/></svg>'
                      ),
                  scaledSize: new google.maps.Size(36, 36),
                  anchor: new google.maps.Point(18, 36),
                }}
              >
                {activeMarker === event.id && (
                  <InfoWindow
                    position={{
                      lat: event.latitude!,
                      lng: event.longitude!,
                    }}
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div style={{ minWidth: "200px", maxWidth: "300px" }}>
                      <h3
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        {event.title}
                      </h3>
                      <p
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "12px",
                          color: "#6b7280",
                        }}
                      >
                        {formatDateTime(new Date(event.startDateTime))}
                      </p>
                      <p
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: "11px",
                          color: "#9ca3af",
                        }}
                      >
                        {event.address}
                      </p>
                      <a
                        href={`/events/${event.id}`}
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          background: "#14b8a6",
                          color: "white",
                          textDecoration: "none",
                          borderRadius: "4px",
                          fontSize: "12px",
                        }}
                      >
                        {t("View Details")}
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>

        <div className="absolute top-3 right-14 bg-white px-3 py-2 rounded-lg shadow-lg z-10 pointer-events-none">
          <Typography variant="small" className="font-semibold">
            {eventsWithCoordinates.length}{" "}
            {eventsWithCoordinates.length === 1 ? t("Event") : t("Events")}
          </Typography>
        </div>
      </div>
    </div>
  );
}
