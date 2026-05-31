export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function getTodayBrazil(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}
