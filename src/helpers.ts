export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function percentageChange(prev, current) {
  if (prev === 0) return current === 0 ? "0%" : "+∞";

  const change = ((current - prev) / prev) * 100;
  const sign = change >= 0 ? "+" : "";

  // remove unnecessary .0
  const formatted = Number(change.toFixed(1));
  return `${sign}${formatted}%`;
}

export function formatNumber(value, options = {}) {
  const { prefix = "", decimals = 1 } = options;

  let formatted = value;
  let suffix = "";

  if (Math.abs(value) >= 1_000_000_000) {
    formatted = value / 1_000_000_000;
    suffix = "B";
  } else if (Math.abs(value) >= 1_000_000) {
    formatted = value / 1_000_000;
    suffix = "M";
  } else if (Math.abs(value) >= 1_000) {
    formatted = value / 1_000;
    suffix = "k";
  }

  // Round to specified decimals and remove unnecessary .0
  formatted = Number(formatted.toFixed(decimals));

  return `${prefix}${formatted}${suffix}`;
}
