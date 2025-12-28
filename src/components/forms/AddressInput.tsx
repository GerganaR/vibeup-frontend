import { useState, useRef, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

interface AddressInputProps {
  label?: string;
  value: string;
  onChange: (address: string) => void;
  onCoordinatesChange: (lat: number, lon: number) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function AddressInput({
  label = "Address",
  value,
  onChange,
  onCoordinatesChange,
  error,
  required = false,
  placeholder = "Enter an address...",
}: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
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
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1`,
        {
          headers: {
            "User-Agent": "VibeUp Event App",
          },
        }
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching address suggestions:", err);
      setSuggestions([]);
    } finally {
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
    }, 500);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name);
    onCoordinatesChange(parseFloat(suggestion.lat), parseFloat(suggestion.lon));
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleEvaluateCoordinates = async () => {
    if (!value) return;

    setIsEvaluating(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&limit=1`,
        {
          headers: {
            "User-Agent": "VibeUp Event App",
          },
        }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const location = data[0];
        onCoordinatesChange(parseFloat(location.lat), parseFloat(location.lon));
        alert(`Coordinates found: ${location.lat}, ${location.lon}`);
      } else {
        alert(
          "No coordinates found for this address. Please try a different address."
        );
      }
    } catch (err) {
      console.error("Error evaluating coordinates:", err);
      alert("Failed to evaluate coordinates. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            label={label}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            error={!!error}
            required={required}
            placeholder={placeholder}
            crossOrigin={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <Button
          size="sm"
          color="blue"
          onClick={handleEvaluateCoordinates}
          disabled={!value || isEvaluating}
          loading={isEvaluating}
          className="shrink-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Get Coords
        </Button>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
            >
              <p className="text-sm text-gray-900">{suggestion.display_name}</p>
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <p className="text-sm text-gray-500">Loading suggestions...</p>
        </div>
      )}
    </div>
  );
}
