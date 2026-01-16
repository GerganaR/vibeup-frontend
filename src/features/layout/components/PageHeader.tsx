import { Typography } from "@material-tailwind/react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
      <Typography variant="h3" className="text-slate-800 font-bold">
        {title}
      </Typography>

      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
