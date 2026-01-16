import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  CalendarIcon,
  UserGroupIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

interface DashboardStatsProps {
  stats: {
    upcomingCount: number;
    attendingCount: number;
    hostedCount: number;
  } | null;
  loading: boolean;
}

export function DashboardStats({ stats, loading }: DashboardStatsProps) {
  const cards = [
    {
      title: "Upcoming Events",
      value: stats?.upcomingCount ?? 0,
      icon: CalendarIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Events Joined",
      value: stats?.attendingCount ?? 0,
      icon: UserGroupIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Events Hosted",
      value: stats?.hostedCount ?? 0,
      icon: StarIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50"
          >
            <CardBody className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-slate-200 rounded mb-3"></div>
                  <div className="h-8 w-16 bg-slate-200 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 hover:-translate-y-0.5"
        >
          <CardBody className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  variant="small"
                  className="font-medium text-slate-500 mb-1"
                >
                  {card.title}
                </Typography>
                <Typography variant="h3" className="font-bold text-slate-800">
                  {card.value}
                </Typography>
              </div>
              <div
                className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
