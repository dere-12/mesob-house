export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export const relative = new Intl.RelativeTimeFormat("en-ET", {
  numeric: "auto",
});

export const number = new Intl.NumberFormat("en-ET");

export const compactNumber = new Intl.NumberFormat("en-ET", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatWhen(value) {
  if (value == null || value === "") {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return when.format(date);
}
