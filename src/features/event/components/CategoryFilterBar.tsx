import { Chip } from "@material-tailwind/react";

interface CategoryFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterBarProps) {
  if (categories.length <= 1) {
    return null; // Don't show if only "All" exists
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Chip
          key={category}
          value={category}
          onClick={() => onSelectCategory(category)}
          variant={selectedCategory === category ? "filled" : "outlined"}
          color={selectedCategory === category ? "green" : "gray"}
          className="cursor-pointer whitespace-nowrap transition-all hover:shadow-md"
        />
      ))}
    </div>
  );
}

