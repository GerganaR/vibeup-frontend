import {
  CalendarDaysIcon,
  StarIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";

type FilterTab = "all" | "my" | "attending";

interface EventFilterTabsProps {
  selectedTab: FilterTab;
  onSelectTab: (tab: FilterTab) => void;
}

const tabs = [
  { id: "all" as const, label: "All Events", icon: CalendarDaysIcon },
  { id: "my" as const, label: "My Events", icon: StarIcon },
  { id: "attending" as const, label: "Attending", icon: TicketIcon },
];

export function EventFilterTabs({
  selectedTab,
  onSelectTab,
}: EventFilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide bg-white shadow-sm p-4 rounded-xl">
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full border font-medium text-sm
              transition-all duration-200 whitespace-nowrap flex-shrink-0 select-none cursor-pointer
              ${
                isSelected
                  ? "bg-green-50 text-green-700 border-green-200 shadow-md"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-sm"
              }
            `}
          >
            <Icon
              className={`w-4 h-4 ${
                isSelected ? "text-green-600" : "text-slate-400"
              }`}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export type { FilterTab };
