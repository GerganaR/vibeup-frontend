import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { Input, Select, Switch } from "@/components/forms";
import { ConfirmDialog } from "@/components/ConfirmDialog";
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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please log in to view settings</p>
      </div>
    );
  }

  const handleLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };

  const handleDeactivateProfile = () => {
    setShowDeactivateDialog(false);
    // TODO: Implement profile deactivation
    console.log("Deactivate profile");
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
            {user.profile.avatarUrl && (
              <img
                src={user.profile.avatarUrl}
                alt={user.profile.name}
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
            <Input
              label="Name"
              value={user.profile.name}
              disabled
              icon={<FaLock className="w-4 h-4" />}
              className="!bg-gray-50"
              helper="Synced from Google Account"
            />

            <Input
              label="Email"
              type="email"
              value={user.profile.email}
              disabled
              icon={<FaLock className="w-4 h-4" />}
              className="!bg-gray-50"
              helper="Synced from Google Account"
            />
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
            options={[
              {
                value: Intl.DateTimeFormat().resolvedOptions().timeZone,
                label: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
              { value: "America/New_York", label: "America/New_York" },
              { value: "America/Los_Angeles", label: "America/Los_Angeles" },
              { value: "Europe/London", label: "Europe/London" },
              { value: "Europe/Paris", label: "Europe/Paris" },
              { value: "Asia/Tokyo", label: "Asia/Tokyo" },
            ]}
          />

          <Select
            label="Date Format"
            value={preferences.dateFormat}
            onChange={(val) =>
              val && setPreferences({ ...preferences, dateFormat: val })
            }
            options={[
              { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
              { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
              { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
            ]}
          />
        </div>
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        title="Privacy Settings"
        icon={<FaShieldAlt className="w-5 h-5" />}
        description="Control your privacy and visibility settings"
      >
        <div className="space-y-6">
          <Select
            label="Profile Visibility"
            value={privacy.profileVisibility}
            onChange={(val) =>
              val && setPrivacy({ ...privacy, profileVisibility: val })
            }
            helper="Control who can see your profile information"
            options={[
              { value: "public", label: "Public" },
              { value: "friends", label: "Friends Only" },
              { value: "private", label: "Private" },
            ]}
          />

          <div className="pt-4 border-t border-gray-100">
            <Switch
              label="Show Attendance Status"
              description="Allow others to see which events you're attending"
              checked={privacy.showAttendance}
              onChange={(e) =>
                setPrivacy({ ...privacy, showAttendance: e.target.checked })
              }
            />
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
            onClick={() => setShowLogoutDialog(true)}
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
              onClick={() => setShowDeactivateDialog(true)}
              variant="text"
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mt-4"
            >
              <FaPowerOff className="w-4 h-4" />
              Deactivate Profile
            </Button>
          </div>
        </div>
      </SettingsSection>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description="Are you sure you want to log out? You'll need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
      />

      <ConfirmDialog
        open={showDeactivateDialog}
        onClose={() => setShowDeactivateDialog(false)}
        onConfirm={handleDeactivateProfile}
        title="Deactivate Profile"
        description="Are you sure you want to deactivate your profile? Your account will be hidden but can be reactivated later by logging back in."
        confirmText="Deactivate"
        cancelText="Cancel"
        danger
      />
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
