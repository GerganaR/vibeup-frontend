import type { CategoryDTO } from "../types";
import { categoryStyles, defaultStyle } from "./CategoryPill";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface CategoryFilterBarProps {
  categories: CategoryDTO[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryFilterBar({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterBarProps) {
  const { t } = useTranslation();
  const allCategories = [{ id: "All", name: "All" }, ...categories];

  if (allCategories.length <= 1) {
    return null;
  }

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide bg-white shadow-sm p-4 rounded-xl"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {allCategories.map((category) => {
        const isSelected = selectedCategoryId === category.id;
        const isAll = category.name === "All";

        // Get category style for the icon
        const style = categoryStyles[category.name] || defaultStyle;
        const Icon = isAll ? FaGlobe : style.icon;

        // All Categories uses green, others use their category color
        const selectedClass = isAll
          ? "bg-green-50 text-green-700 border-green-200 shadow-md"
          : `${style.bgColor} ${style.textColor} ${style.borderColor} shadow-md`;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full border font-medium text-sm
              transition-all duration-200 whitespace-nowrap flex-shrink-0 select-none
              ${
                isSelected
                  ? selectedClass
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-sm"
              }
            `}
          >
            <Icon
              className={`w-4 h-4 ${
                isSelected
                  ? isAll
                    ? "text-green-600"
                    : style.iconColor
                  : "text-slate-400"
              }`}
            />
            <span>{isAll ? t("All Categories") : t(category.name)}</span>
          </button>
        );
      })}
    </div>
  );
}
