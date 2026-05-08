export const sampleLoans = [
  { id: 1, borrower: 'Apex Traders', amount: 250000, funded: 145000, rate: 14.5, term: 12, status: 'active' },
  { id: 2, borrower: 'Green Leaf Foods', amount: 180000, funded: 90000, rate: 13.2, term: 10, status: 'funding' },
  { id: 3, borrower: 'Nova Textiles', amount: 300000, funded: 300000, rate: 15.0, term: 18, status: 'active' }
];

export const samplePortfolio = [
  { id: 'P-1', name: 'Apex Traders', ownership: 12.5, invested: 32000, returns: 4180, status: 'healthy' },
  { id: 'P-2', name: 'Green Leaf Foods', ownership: 8.3, invested: 21000, returns: 2100, status: 'watchlist' },
  { id: 'P-3', name: 'Nova Textiles', ownership: 18.4, invested: 45000, returns: 6900, status: 'healthy' }
];

export const sampleListings = [
  { id: 11, investmentId: 301, loanName: 'Apex Traders', seller: 'Investor 14', price: 7800, ownership: 3.4 },
  { id: 12, investmentId: 302, loanName: 'Green Leaf Foods', seller: 'Investor 08', price: 5600, ownership: 2.1 },
  { id: 13, investmentId: 303, loanName: 'Nova Textiles', seller: 'Investor 21', price: 9200, ownership: 4.0 }
];

export const sampleRepayments = [
  { installment: 1, dueDate: '2026-05-15', principal: 16500, interest: 4200, total: 20700, status: 'pending' },
  { installment: 2, dueDate: '2026-06-15', principal: 16650, interest: 4050, total: 20700, status: 'pending' },
  { installment: 3, dueDate: '2026-07-15', principal: 16810, interest: 3890, total: 20700, status: 'upcoming' }
];

export const sampleCollections = [
  { id: 501, loan: 'Apex Traders', action: 'initial_contact', status: 'pending', notes: 'Awaiting borrower response' },
  { id: 502, loan: 'Phoenix Retail', action: 'field_visit', status: 'in_progress', notes: 'Scheduled for next week' },
  { id: 503, loan: 'Delta Garments', action: 'notice_sent', status: 'completed', notes: 'Demand notice delivered' }
];

export const analyticsSummary = {
  totalLoans: 48,
  totalFunded: 12450000,
  defaults: 3,
  returns: 1248800,
  collectionRate: 92.6
};
