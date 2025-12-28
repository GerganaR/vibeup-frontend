import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { PlusIcon, CalendarIcon } from "@heroicons/react/24/solid";
import Avatar from "@/components/Avatar";

interface WelcomeHeaderProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onCreateEvent: () => void;
  onBrowseEvents: () => void;
}

export function WelcomeHeader({
  userName,
  userEmail,
  userAvatar,
  onCreateEvent,
  onBrowseEvents,
}: WelcomeHeaderProps) {
  return (
    <Card className="shadow-sm">
      <CardBody className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              name={userName}
              src={userAvatar}
              size={60}
              className="text-xl"
            />
            <div>
              <Typography variant="h4" className="text-gray-900 font-bold">
                Welcome back, {userName}!
              </Typography>
              <Typography variant="small" className="text-gray-500 mt-1">
                {userEmail}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              color="green"
              className="flex items-center justify-center gap-2"
              onClick={onCreateEvent}
            >
              <PlusIcon className="w-5 h-5" />
              Create Event
            </Button>
            <Button
              variant="outlined"
              color="green"
              className="flex items-center justify-center gap-2"
              onClick={onBrowseEvents}
            >
              <CalendarIcon className="w-5 h-5" />
              Browse Events
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
