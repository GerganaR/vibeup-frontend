import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useJsApiLoader } from "@react-google-maps/api";

type AccentColor = "green" | "blue" | "purple" | "orange" | "teal";

interface PlacePrediction {
  place_id: string;
  description: string;
}

interface AddressInputProps {
  label?: string;
  value: string;
  onChange: (address: string) => void;
  onCoordinatesChange: (lat: number, lon: number) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  accentColor?: AccentColor;
}

const focusColorClasses: Record<AccentColor, string> = {
  green: "focus:border-green-500 focus:ring-green-500",
  blue: "focus:border-blue-500 focus:ring-blue-500",
  purple: "focus:border-purple-500 focus:ring-purple-500",
  orange: "focus:border-orange-500 focus:ring-orange-500",
  teal: "focus:border-teal-500 focus:ring-teal-500",
};

const libraries: "places"[] = ["places"];

export function AddressInput({
  label = "Address",
  value,
  onChange,
  onCoordinatesChange,
  error,
  required = false,
  placeholder = "Enter an address...",
  accentColor = "green",
}: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const focusClass = focusColorClasses[accentColor];

  // Initialize Google Places services
  useEffect(() => {
    if (
      isLoaded &&
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      !autocompleteServiceRef.current
    ) {
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService();
      // Create a dummy div for PlacesService (required by API)
      const dummyDiv = document.createElement("div");
      placesServiceRef.current = new google.maps.places.PlacesService(dummyDiv);
    }
  }, [isLoaded]);

  // Update dropdown position when showing suggestions
  useLayoutEffect(() => {
    if ((showSuggestions || isLoading) && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [showSuggestions, suggestions, isLoading]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3 || !autocompleteServiceRef.current) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: query,
          types: ["establishment", "geocode"],
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(
              predictions.map((p) => ({
                place_id: p.place_id,
                description: p.description,
              }))
            );
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
          }
          setIsLoading(false);
        }
      );
    } catch (err) {
      console.error("Error fetching address suggestions:", err);
      setSuggestions([]);
      setIsLoading(false);
    }
  };

  const handleInputChange = (newValue: string) => {
    onChange(newValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: PlacePrediction) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);

    // Get place details to get coordinates
    if (placesServiceRef.current) {
      placesServiceRef.current.getDetails(
        {
          placeId: suggestion.place_id,
          fields: ["geometry"],
        },
        (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            onCoordinatesChange(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
          }
        }
      );
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <MapPinIcon className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-all
            ${
              error
                ? "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500"
                : `border-slate-200 bg-slate-50 text-slate-800 ${focusClass} focus:bg-white`
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20
          `}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {showSuggestions &&
        suggestions.length > 0 &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 99999,
            }}
            className="bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto custom-scrollbar"
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 cursor-pointer hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
              >
                <p className="text-sm text-slate-800">
                  {suggestion.description}
                </p>
              </div>
            ))}
          </div>,
          document.body
        )}

      {isLoading &&
        !showSuggestions &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 99999,
            }}
            className="bg-white border border-slate-200 rounded-xl shadow-xl p-3"
          >
            <p className="text-sm text-slate-500">Searching addresses...</p>
          </div>,
          document.body
        )}
    </div>
  );
}
