// src/services/earn.js
import api from './api';

export const earnService = {
  // Affiliate
  getAffiliateStats: () => api.get('/earn/affiliate/stats'),
  getAffiliateLink: () => api.get('/earn/affiliate/link'),
  getAffiliateClicks: (params) => api.get('/earn/affiliate/clicks', { params }),
  getAffiliateConversions: (params) => api.get('/earn/affiliate/conversions', { params }),
  getReferralTree: () => api.get('/earn/affiliate/tree'),
  getCommissionRates: () => api.get('/earn/affiliate/rates'),

  // Earnings
  getEarnings: (params) => api.get('/earn/earnings', { params }),
  getEarningsBySource: (params) => api.get('/earn/earnings/by-source', { params }),
  getEarningsChart: (params) => api.get('/earn/earnings/chart', { params }),
  getTodayEarnings: () => api.get('/earn/earnings/today'),

  // Withdrawals
  requestWithdrawal: (data) => api.post('/earn/withdrawals', data),
  getWithdrawals: (params) => api.get('/earn/withdrawals', { params }),
  getWithdrawalStatus: (id) => api.get(`/earn/withdrawals/${id}`),
  cancelWithdrawal: (id) => api.delete(`/earn/withdrawals/${id}`),

  // Bank accounts
  getBankAccounts: () => api.get('/earn/bank-accounts'),
  addBankAccount: (data) => api.post('/earn/bank-accounts', data),
  updateBankAccount: (id, data) => api.put(`/earn/bank-accounts/${id}`, data),
  deleteBankAccount: (id) => api.delete(`/earn/bank-accounts/${id}`),
  verifyBankAccount: (accountNumber, bankCode) => api.post('/earn/bank-accounts/verify', { accountNumber, bankCode }),

  // Bonuses
  getBonuses: (params) => api.get('/earn/bonuses', { params }),
  claimBonus: (bonusId) => api.post(`/earn/bonuses/${bonusId}/claim`),

  // Learn-to-earn
  getLearnToEarnStats: () => api.get('/earn/learn-to-earn'),
  claimLessonReward: (lessonId) => api.post(`/earn/learn-to-earn/lesson/${lessonId}/claim`),
  claimChallengeReward: (challengeId) => api.post(`/earn/learn-to-earn/challenge/${challengeId}/claim`),
  claimCourseReward: (courseId) => api.post(`/earn/learn-to-earn/course/${courseId}/claim`),

  // Payout settings
  getPayoutSettings: () => api.get('/earn/settings'),
  updatePayoutSettings: (data) => api.put('/earn/settings', data),

  // Invoices
  getInvoices: (params) => api.get('/earn/invoices', { params }),
  downloadInvoice: (invoiceId) => api.get(`/earn/invoices/${invoiceId}/download`, { responseType: 'blob' })
};
