interface CategoryChipProps {
  category: string;
  size?: "sm" | "md";
}

const categoryColors: Record<string, string> = {
  Music: "bg-purple-100 text-purple-700 border-purple-200",
  Sports: "bg-blue-100 text-blue-700 border-blue-200",
  Food: "bg-orange-100 text-orange-700 border-orange-200",
  Tech: "bg-teal-100 text-teal-700 border-teal-200",
  Art: "bg-pink-100 text-pink-700 border-pink-200",
  Culture: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Business: "bg-gray-100 text-gray-700 border-gray-200",
  Education: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Health: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Social: "bg-rose-100 text-rose-700 border-rose-200",
};

export function CategoryChip({ category, size = "sm" }: CategoryChipProps) {
  const colorClass =
    categoryColors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  const sizeClass = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <span
      className={`${colorClass} ${sizeClass} rounded-full font-medium border inline-block`}
    >
      {category}
    </span>
  );
}
