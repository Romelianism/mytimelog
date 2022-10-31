import { ReactElement, useState } from "react";

export default function RealtimeDate<T>({
  format,
  ms,
}: {
  format: (date: Date) => T;
  ms?: number;
}) {
  const [date, setDate] = useState(new Date());
  setInterval(() => setDate(new Date()), ms);
  return <>{format(date)}</>;
}
