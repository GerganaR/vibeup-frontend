import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/routes";

export function LoggedOutState() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <FaCalendarAlt className="w-20 h-20 text-gray-300 mb-6" />
      <Typography variant="h4" className="text-gray-700 mb-3">
        {t("Welcome to VibeUp")}
      </Typography>
      <Typography
        variant="paragraph"
        className="text-gray-500 mb-6 max-w-md text-center"
      >
        {t("Please log in to access your personalized dashboard")}
      </Typography>
      <Link to={ROUTES.LOGIN}>
        <Button color="green" size="lg">
          {t("Log In")}
        </Button>
      </Link>
    </div>
  );
}
