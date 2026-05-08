const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const toQueryString = (params = {}) => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : '';
};

const request = async (path, params = {}, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}${toQueryString(params)}`, {
    method: options.method || 'POST',
    headers: {
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.status === 'error') {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};

export const createLoan = (data) => request('/create-loan', data);
export const fundLoan = (data) => request('/fund-loan', data);
export const repayLoan = (data) => request('/repay', data);
export const submitKyc = (data) => request('/submit-kyc', data);
export const verifyKyc = (data) => request('/verify-kyc', data);
export const buyInvestment = (data) => request('/buy-investment', data);

export const apiBaseUrl = BASE_URL;
