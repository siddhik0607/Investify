export const formatInr = (value: number, maximumFractionDigits = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);

/** SIP future value: FV = P × [((1+r)^n − 1)/r] × (1+r) */
export function calcMonthlySIP(target: number, years: number, annualRatePct: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRatePct / 100 / 12;

  if (r === 0) {
    return target / n;
  }

  const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return target / factor;
}

export function calculateFutureValue(monthlyInvestment: number, years: number, annualRatePct: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRatePct / 100 / 12;

  if (r === 0) {
    return monthlyInvestment * n;
  }

  return monthlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}

export function buildGrowthSeries(monthlyInvestment: number, years: number, annualRatePct: number) {
  const totalMonths = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualRatePct / 100 / 12;
  const series: Array<{ year: number; invested: number; value: number }> = [];

  let invested = 0;
  let value = 0;

  for (let month = 1; month <= totalMonths; month += 1) {
    invested += monthlyInvestment;
    value = monthlyRate === 0 ? invested : (value + monthlyInvestment) * (1 + monthlyRate);

    if (month % 12 === 0 || month === totalMonths) {
      series.push({
        year: Math.ceil(month / 12),
        invested,
        value,
      });
    }
  }

  return series;
}
