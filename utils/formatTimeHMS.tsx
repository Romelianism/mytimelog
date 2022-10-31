import zeroPad from "utils/zeroPad";

export default function formatTimeHMS(milliseconds: number) {
  const s = milliseconds / 1000;
  const m = s / 60;
  const h = m / 60;
  const seconds = zeroPad(Math.floor(s) % 60, 2);
  const minutes = zeroPad(Math.floor(m) % 60, 2);
  const hours = zeroPad(Math.floor(h), 2);
  return `${hours}:${minutes}:${seconds}`;
}
