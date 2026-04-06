// src/services/auth.js
import api from './api';

export const authService = {
  // Password reset
  requestPasswordReset: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),

  // Email verification
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  resendVerification: () => api.post('/auth/resend-verification'),

  // Social login URLs
  getGoogleAuthUrl: () => `${api.defaults.baseURL}/auth/google`,
  getGithubAuthUrl: () => `${api.defaults.baseURL}/auth/github`,
  getLinkedInAuthUrl: () => `${api.defaults.baseURL}/auth/linkedin`,

  // Session management
  logoutAllDevices: () => api.post('/auth/logout-all'),
  getSessions: () => api.get('/auth/sessions'),
  revokeSession: (sessionId) => api.delete(`/auth/sessions/${sessionId}`),

  // Account deletion
  requestAccountDeletion: () => api.post('/auth/delete-account/request'),
  confirmAccountDeletion: (token) => api.post('/auth/delete-account/confirm', { token }),

  // Rate limit status
  getRateLimitStatus: () => api.get('/auth/rate-limit-status')
};
