import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import {
  FaUser,
  FaShieldAlt,
  FaPalette,
  FaSignOutAlt,
  FaPowerOff,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.user);
  const { logout } = useAuth();
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showAttendance: true,
  });
  const [preferences, setPreferences] = useState({
    defaultTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: "MM/DD/YYYY",
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please log in to view settings</p>
      </div>
    );
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  const handleDeactivateProfile = () => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate your profile? Your account will be hidden but can be reactivated later."
    );
    if (confirmed) {
      // TODO: Implement profile deactivation
      console.log("Deactivate profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="mb-8">
        <Typography variant="h3" className="text-gray-900 mb-2">
          Settings
        </Typography>
        <Typography variant="paragraph" className="text-gray-500">
          Manage your account settings and preferences
        </Typography>
      </div>

      {/* Profile Section */}
      <SettingsSection
        title="Profile Information"
        icon={<FaUser className="w-5 h-5" />}
        description="Your profile information is synced from Google and cannot be edited here"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-24 h-24 rounded-full ring-4 ring-gray-100"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-medium text-gray-500">
                  Profile Picture
                </p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  <FaGoogle className="w-3 h-3" />
                  Google
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Managed by your Google Account
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <Input
                label="Name"
                value={user.name}
                disabled
                icon={<FaLock className="w-4 h-4" />}
                className="!bg-gray-50"
                crossOrigin={undefined}
              />
              <Typography
                variant="small"
                className="text-gray-400 mt-2 flex items-center gap-1"
              >
                <FaGoogle className="w-3 h-3" />
                Synced from Google Account
              </Typography>
            </div>

            <div>
              <Input
                label="Email"
                type="email"
                value={user.email}
                disabled
                icon={<FaLock className="w-4 h-4" />}
                className="!bg-gray-50"
                crossOrigin={undefined}
              />
              <Typography
                variant="small"
                className="text-gray-400 mt-2 flex items-center gap-1"
              >
                <FaGoogle className="w-3 h-3" />
                Synced from Google Account
              </Typography>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Event Preferences */}
      <SettingsSection
        title="Event Preferences"
        icon={<FaPalette className="w-5 h-5" />}
        description="Default settings for your events"
      >
        <div className="space-y-6">
          <Select
            label="Default Timezone"
            value={preferences.defaultTimezone}
            onChange={(val) =>
              val &&
              setPreferences({
                ...preferences,
                defaultTimezone: val,
              })
            }
          >
            <Option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </Option>
            <Option value="America/New_York">America/New_York</Option>
            <Option value="America/Los_Angeles">America/Los_Angeles</Option>
            <Option value="Europe/London">Europe/London</Option>
            <Option value="Europe/Paris">Europe/Paris</Option>
            <Option value="Asia/Tokyo">Asia/Tokyo</Option>
          </Select>

          <Select
            label="Date Format"
            value={preferences.dateFormat}
            onChange={(val) =>
              val && setPreferences({ ...preferences, dateFormat: val })
            }
          >
            <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
            <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
            <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
          </Select>
        </div>
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        title="Privacy Settings"
        icon={<FaShieldAlt className="w-5 h-5" />}
        description="Control your privacy and visibility settings"
      >
        <div className="space-y-6">
          <div>
            <Select
              label="Profile Visibility"
              value={privacy.profileVisibility}
              onChange={(val) =>
                val && setPrivacy({ ...privacy, profileVisibility: val })
              }
            >
              <Option value="public">Public</Option>
              <Option value="friends">Friends Only</Option>
              <Option value="private">Private</Option>
            </Select>
            <Typography variant="small" className="text-gray-400 mt-2">
              Control who can see your profile information
            </Typography>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Typography
                  variant="small"
                  className="font-semibold text-gray-900"
                >
                  Show Attendance Status
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-500 mt-1.5 leading-relaxed"
                >
                  Allow others to see which events you're attending
                </Typography>
              </div>
              <Switch
                checked={privacy.showAttendance}
                onChange={(e) =>
                  setPrivacy({ ...privacy, showAttendance: e.target.checked })
                }
                crossOrigin={undefined}
              />
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Account Actions */}
      <SettingsSection
        title="Account Management"
        icon={<FaPowerOff className="w-5 h-5" />}
        description="Manage your account and session"
      >
        <div className="space-y-4">
          <Button
            onClick={handleLogout}
            variant="outlined"
            className="w-full flex items-center justify-center gap-3"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </Button>

          <div className="pt-6 mt-6 border-t border-gray-200">
            <Card className="bg-amber-50 border border-amber-200 shadow-none">
              <CardBody className="p-4">
                <Typography
                  variant="small"
                  className="font-medium text-amber-900 mb-1"
                >
                  Deactivate Profile
                </Typography>
                <Typography variant="small" className="text-amber-700">
                  Your profile will be hidden from other users. You can
                  reactivate it anytime by logging back in.
                </Typography>
              </CardBody>
            </Card>
            <Button
              onClick={handleDeactivateProfile}
              variant="text"
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mt-4"
            >
              <FaPowerOff className="w-4 h-4" />
              Deactivate Profile
            </Button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

// Settings Section Component
interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}

function SettingsSection({
  title,
  icon,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardBody className="p-0">
        <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex items-center gap-3 mb-1">
            <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
              {icon}
            </div>
            <Typography variant="h5" className="text-gray-900">
              {title}
            </Typography>
          </div>
          {description && (
            <Typography variant="small" className="text-gray-500 mt-2 ml-14">
              {description}
            </Typography>
          )}
        </div>
        <div className="p-6">{children}</div>
      </CardBody>
    </Card>
  );
}
