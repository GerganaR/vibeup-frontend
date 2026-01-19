import moment from "moment";

export function isEventEnded(endDate: Date): boolean {
  return moment(endDate).isBefore(moment());
}

export function formatDateForInput(date: Date): string {
  return moment(date).format("YYYY-MM-DDTHH:mm");
}

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatEventTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatEventDateTime(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
