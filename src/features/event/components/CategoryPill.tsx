import {
  FaMusic,
  FaRunning,
  FaLaptopCode,
  FaUtensils,
  FaBriefcase,
  FaPalette,
  FaHeartbeat,
  FaGraduationCap,
  FaFilm,
  FaGamepad,
  FaUsers,
  FaPlane,
  FaTshirt,
  FaGlassCheers,
  FaChalkboardTeacher,
  FaTag,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";

interface CategoryPillProps {
  category: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

interface CategoryStyle {
  icon: IconType;
  bgColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
}

// Map category names to their styles and icons
const categoryStyles: Record<string, CategoryStyle> = {
  "Music & Concerts": {
    icon: FaMusic,
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    iconColor: "text-purple-500",
    borderColor: "border-purple-200",
  },
  "Sports & Fitness": {
    icon: FaRunning,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    iconColor: "text-blue-500",
    borderColor: "border-blue-200",
  },
  "Technology & Innovation": {
    icon: FaLaptopCode,
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-700",
    iconColor: "text-cyan-500",
    borderColor: "border-cyan-200",
  },
  "Food & Dining": {
    icon: FaUtensils,
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    iconColor: "text-orange-500",
    borderColor: "border-orange-200",
  },
  "Networking & Business": {
    icon: FaBriefcase,
    bgColor: "bg-slate-50",
    textColor: "text-slate-700",
    iconColor: "text-slate-500",
    borderColor: "border-slate-200",
  },
  "Arts & Culture": {
    icon: FaPalette,
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    iconColor: "text-pink-500",
    borderColor: "border-pink-200",
  },
  "Health & Wellness": {
    icon: FaHeartbeat,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-200",
  },
  "Education & Learning": {
    icon: FaGraduationCap,
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    iconColor: "text-indigo-500",
    borderColor: "border-indigo-200",
  },
  Entertainment: {
    icon: FaFilm,
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    iconColor: "text-red-500",
    borderColor: "border-red-200",
  },
  Gaming: {
    icon: FaGamepad,
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    iconColor: "text-violet-500",
    borderColor: "border-violet-200",
  },
  "Community & Social": {
    icon: FaUsers,
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
    iconColor: "text-rose-500",
    borderColor: "border-rose-200",
  },
  "Travel & Adventure": {
    icon: FaPlane,
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    iconColor: "text-sky-500",
    borderColor: "border-sky-200",
  },
  "Fashion & Style": {
    icon: FaTshirt,
    bgColor: "bg-fuchsia-50",
    textColor: "text-fuchsia-700",
    iconColor: "text-fuchsia-500",
    borderColor: "border-fuchsia-200",
  },
  "Nightlife & Parties": {
    icon: FaGlassCheers,
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    iconColor: "text-amber-500",
    borderColor: "border-amber-200",
  },
  "Workshops & Classes": {
    icon: FaChalkboardTeacher,
    bgColor: "bg-teal-50",
    textColor: "text-teal-700",
    iconColor: "text-teal-500",
    borderColor: "border-teal-200",
  },
};

// Default style for unknown categories
const defaultStyle: CategoryStyle = {
  icon: FaTag,
  bgColor: "bg-gray-50",
  textColor: "text-gray-700",
  iconColor: "text-gray-500",
  borderColor: "border-gray-200",
};

export function CategoryPill({
  category,
  size = "sm",
  showIcon = true,
}: CategoryPillProps) {
  const { t } = useTranslation();
  const style = categoryStyles[category] || defaultStyle;
  const Icon = style.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        transition-all duration-200 hover:shadow-sm
        ${style.bgColor} ${style.textColor} ${style.borderColor}
        ${sizeClasses[size]}
      `}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ${style.iconColor}`} />}
      <span className="whitespace-nowrap">{t(category)}</span>
    </span>
  );
}

// Export for use in other components that need category colors
export { categoryStyles, defaultStyle };
