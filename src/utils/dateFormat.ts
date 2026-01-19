export function isEventEnded(endDate: Date): boolean {
  return new Date(endDate) < new Date();
}

export function formatDateForInput(date: Date): string {
  const d = new Date(date);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

const getLocale = (locale?: string) => {
  return locale === "bg" ? "bg-BG" : "en-US";
};

export function formatEventDate(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(getLocale(locale), {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatEventTime(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(getLocale(locale), {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatEventDateTime(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(getLocale(locale), {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
