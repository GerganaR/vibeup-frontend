import {
  FaMusic,
  FaBasketballBall,
  FaPaintBrush,
  FaLaptopCode,
  FaHandshake,
  FaUserFriends,
  FaStar,
} from "react-icons/fa";

const CATEGORY_MAP: Record<
  string,
  { icon: JSX.Element; bg: string; text: string }
> = {
  music: {
    icon: <FaMusic className="w-10 h-10" />,
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  sports: {
    icon: <FaBasketballBall className="w-10 h-10" />,
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  art: {
    icon: <FaPaintBrush className="w-10 h-10" />,
    bg: "bg-pink-100",
    text: "text-pink-700",
  },
  tech: {
    icon: <FaLaptopCode className="w-10 h-10" />,
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  business: {
    icon: <FaHandshake className="w-10 h-10" />,
    bg: "bg-teal-100",
    text: "text-teal-700",
  },
  social: {
    icon: <FaUserFriends className="w-10 h-10" />,
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
};

// Fallback
const DEFAULT = {
  icon: <FaStar className="w-10 h-10" />,
  bg: "bg-gray-100",
  text: "text-gray-700",
};

interface Props {
  category?: string;
}

export function EventCoverPlaceholder({ category }: Props) {
  const firstCategory = category?.toLowerCase() || "";
  const chosen = CATEGORY_MAP[firstCategory] || DEFAULT;

  return (
    <div
      className={`w-full h-36 flex flex-col items-center justify-center ${chosen.bg} ${chosen.text}`}
    >
      {chosen.icon}
      <p className="mt-2 font-semibold capitalize">{category || "Event"}</p>
    </div>
  );
}
