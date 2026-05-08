export const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatNumber = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPercent = (value) => `${Number(value || 0).toFixed(2)}%`;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
