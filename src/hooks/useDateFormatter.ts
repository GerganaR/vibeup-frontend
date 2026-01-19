import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  formatEventDate as formatEventDateUtil,
  formatEventTime as formatEventTimeUtil,
  formatEventDateTime as formatEventDateTimeUtil,
} from "@/utils/dateFormat";

export function useDateFormatter() {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const formatDate = useCallback(
    (date: Date | string) => {
      return formatEventDateUtil(new Date(date), locale);
    },
    [locale]
  );

  const formatTime = useCallback(
    (date: Date | string) => {
      return formatEventTimeUtil(new Date(date), locale);
    },
    [locale]
  );

  const formatDateTime = useCallback(
    (date: Date | string) => {
      return formatEventDateTimeUtil(new Date(date), locale);
    },
    [locale]
  );

  return {
    formatDate,
    formatTime,
    formatDateTime,
  };
}
