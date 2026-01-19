import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button, Typography } from "@material-tailwind/react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PageHeader } from "@/features/layout/components/PageHeader";
import { Input } from "@/components/forms/Input";
import { TranslationEditor } from "@/components/TranslationEditor";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { FaGoogle } from "react-icons/fa";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const { logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-500">{t("Please log in to view settings")}</p>
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

      <div className="flex-1 overflow-hidden">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Left Column - User Profile & Actions (Narrower) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 overflow-y-auto custom-scrollbar h-full flex flex-col gap-2">
            {/* Profile Section */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm flex-1">
              <div className="flex items-center gap-2 bg-teal-50 px-4 py-3">
                <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                <Typography
                  variant="h6"
                  className="text-slate-800 font-semibold text-sm"
                >
                  {t("Profile Information")}
                </Typography>
                <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  <FaGoogle className="w-3 h-3" />
                  {t("Synced")}
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
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shadow">
                      <UserCircleIcon className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <Typography variant="small" className="text-slate-500 mb-1">
                      {t("Profile Picture")}
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-slate-400 text-xs"
                    >
                      {t("Managed by your Google Account")}
                    </Typography>
                  </div>
                </div>

                {/* Name Input */}
                <div className="relative">
                  <Input
                    label={t("Full Name")}
                    value={user.profile.name}
                    disabled
                    icon={<LockClosedIcon className="w-4 h-4" />}
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Input
                    label={t("Email Address")}
                    type="email"
                    value={user.profile.email}
                    disabled
                    icon={<LockClosedIcon className="w-4 h-4" />}
                  />
                </div>

                {/* Add here description for the profile and how it cant be changed */}
                <Typography
                  variant="small"
                  className="text-slate-400 text-[13px] max-w-[95%] mx-auto"
                >
                  {t(
                    "You can change your profile picture and name in your Google Account. Here you can only see your name and email address."
                  )}
                </Typography>
              </div>
            </div>

            {/* Account Actions Section */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
              <div className="flex items-center gap-2 bg-red-50 px-4 py-3">
                <div className="w-1 h-5 bg-red-500 rounded-full"></div>
                <Typography
                  variant="h6"
                  className="text-slate-800 font-semibold text-sm"
                >
                  {t("Account")}
                </Typography>
              </div>
              <div className="p-5">
                <Button
                  onClick={() => setShowLogoutDialog(true)}
                  variant="outlined"
                  color="red"
                  className="flex items-center justify-center gap-2 rounded-xl w-full"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  {t("Sign Out")}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Translation Editor (Wider) */}
          <div className="lg:col-span-8 xl:col-span-9 h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col">
            <div className="flex-1 overflow-hidden">
              <TranslationEditor />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation */}
      <ConfirmDialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title={t("Sign Out")}
        description={t(
          "Are you sure you want to sign out? You'll need to sign in again to access your account."
        )}
        confirmText={t("Sign Out")}
        cancelText={t("Cancel")}
      />
    </div>
  );
}
