import { useAuth } from "@/features/auth/hooks";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Avatar,
  Chip,
} from "@material-tailwind/react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h6" placeholder={undefined}>
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Typography variant="h4" color="blue-gray" placeholder={undefined}>
              VibeUp Dashboard
            </Typography>
            <Button
              color="red"
              variant="outlined"
              size="sm"
              onClick={logout}
              placeholder={undefined}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <Card className="mb-8" placeholder={undefined}>
          <CardBody className="flex items-center gap-6" placeholder={undefined}>
            <Avatar
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=random`
              }
              alt={user.name}
              size="xl"
              placeholder={undefined}
            />
            <div className="flex-1">
              <Typography
                variant="h3"
                color="blue-gray"
                placeholder={undefined}
              >
                Welcome back, {user.name}! 👋
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mt-2"
                placeholder={undefined}
              >
                {user.email}
              </Typography>
              <div className="mt-3">
                <Chip
                  value={`Logged in with ${user.provider}`}
                  color="blue"
                  className="capitalize"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card placeholder={undefined}>
            <CardBody placeholder={undefined}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="gray"
                    placeholder={undefined}
                  >
                    Profile Status
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    placeholder={undefined}
                  >
                    Active
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card placeholder={undefined}>
            <CardBody placeholder={undefined}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="gray"
                    placeholder={undefined}
                  >
                    Authentication
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    placeholder={undefined}
                  >
                    Secured
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card placeholder={undefined}>
            <CardBody placeholder={undefined}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="gray"
                    placeholder={undefined}
                  >
                    Session
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    placeholder={undefined}
                  >
                    Valid
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Info Card */}
        <Card placeholder={undefined}>
          <CardHeader
            color="blue"
            className="relative h-16 flex items-center justify-center"
            placeholder={undefined}
          >
            <Typography variant="h5" color="white" placeholder={undefined}>
              Your Account Information
            </Typography>
          </CardHeader>
          <CardBody placeholder={undefined}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-semibold"
                  placeholder={undefined}
                >
                  User ID:
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                >
                  {user.id}
                </Typography>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-semibold"
                  placeholder={undefined}
                >
                  Full Name:
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                >
                  {user.name}
                </Typography>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-semibold"
                  placeholder={undefined}
                >
                  Email Address:
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                >
                  {user.email}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-semibold"
                  placeholder={undefined}
                >
                  Authentication Provider:
                </Typography>
                <Chip
                  value={user.provider}
                  color="blue"
                  className="capitalize"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
