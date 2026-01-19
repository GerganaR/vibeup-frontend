import { Typography } from "@material-tailwind/react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <Typography
        variant="h3"
        className="text-slate-800 font-bold text-2xl sm:text-3xl truncate"
      >
        {t(title)}
      </Typography>

      {actions && (
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {actions}
        </div>
      )}
    </div>
  );
}
