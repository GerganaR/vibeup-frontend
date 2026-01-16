import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button, Typography } from "@material-tailwind/react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PageHeader } from "@/features/layout/components/PageHeader";
import { Input } from "@/components/forms/Input";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { FaGoogle } from "react-icons/fa";

export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.user);
  const { logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-500">Please log in to view settings</p>
      </div>
    );
  }

  const handleLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageHeader title="Settings" />

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pb-4">
        <div className="max-w-2xl space-y-4">
          {/* Profile Section */}
          <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-3">
              <div className="w-1 h-5 bg-green-500 rounded-full"></div>
              <Typography
                variant="h6"
                className="text-slate-800 font-semibold text-sm"
              >
                Profile Information
              </Typography>
              <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                <FaGoogle className="w-3 h-3" />
                Synced from Google
              </span>
            </div>
            <div className="p-5 space-y-5">
              {/* Avatar Row */}
              <div className="flex items-center gap-4">
                {user.profile.avatarUrl ? (
                  <img
                    src={user.profile.avatarUrl}
                    alt={user.profile.name}
                    className="w-16 h-16 rounded-xl ring-2 ring-slate-100 shadow"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow">
                    <UserCircleIcon className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <Typography variant="small" className="text-slate-500 mb-1">
                    Profile Picture
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-slate-400 text-xs"
                  >
                    Managed by your Google Account
                  </Typography>
                </div>
              </div>

              {/* Name Input */}
              <div className="relative">
                <Input
                  label="Full Name"
                  value={user.profile.name}
                  disabled
                  icon={<LockClosedIcon className="w-4 h-4" />}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Input
                  label="Email Address"
                  type="email"
                  value={user.profile.email}
                  disabled
                  icon={<LockClosedIcon className="w-4 h-4" />}
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Typography variant="small" className="text-slate-500 text-xs">
                  Your profile is synced from Google and cannot be edited here.
                </Typography>
              </div>
            </div>
          </div>

          {/* Account Actions Section */}
          <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
            <div className="flex items-center gap-2 bg-red-50 px-4 py-3">
              <div className="w-1 h-5 bg-red-500 rounded-full"></div>
              <Typography
                variant="h6"
                className="text-slate-800 font-semibold text-sm"
              >
                Account
              </Typography>
            </div>
            <div className="p-5">
              <Button
                onClick={() => setShowLogoutDialog(true)}
                variant="outlined"
                color="red"
                className="flex items-center justify-center gap-2 rounded-xl"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation */}
      <ConfirmDialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        description="Are you sure you want to sign out? You'll need to sign in again to access your account."
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </div>
  );
}
