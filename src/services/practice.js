// src/services/practice.js
import api from './api';

export const practiceService = {
  // Challenges
  getChallenges: (params) => api.get('/practice/challenges', { params }),
  getChallenge: (id) => api.get(`/practice/challenges/${id}`),
  getChallengeCategories: () => api.get('/practice/challenges/categories'),
  submitChallenge: (challengeId, code) => api.post(`/practice/challenges/${challengeId}/submit`, { code }),
  getChallengeLeaderboard: (challengeId, params) => api.get(`/practice/challenges/${challengeId}/leaderboard`, { params }),
  getChallengeDiscussions: (challengeId, params) => api.get(`/practice/challenges/${challengeId}/discussions`, { params }),
  postChallengeDiscussion: (challengeId, content) => api.post(`/practice/challenges/${challengeId}/discussions`, { content }),
  getChallengeHint: (challengeId) => api.post(`/practice/challenges/${challengeId}/hint`),

  // Code execution
  executeCode: (data) => api.post('/practice/execute', data),
  runTests: (challengeId, code) => api.post(`/practice/challenges/${challengeId}/tests`, { code }),

  // Code snippets
  saveSnippet: (data) => api.post('/practice/snippets', data),
  getSnippets: (params) => api.get('/practice/snippets', { params }),
  getSnippet: (id) => api.get(`/practice/snippets/${id}`),
  deleteSnippet: (id) => api.delete(`/practice/snippets/${id}`),
  forkSnippet: (id) => api.post(`/practice/snippets/${id}/fork`),

  // Streak
  getStreak: () => api.get('/practice/streak'),
  getStreakHistory: () => api.get('/practice/streak/history'),
  freezeStreak: () => api.post('/practice/streak/freeze'),

  // Progress
  getPracticeProgress: () => api.get('/practice/progress'),
  getSolvedChallenges: (params) => api.get('/practice/solved', { params }),
  getChallengeStats: () => api.get('/practice/stats'),

  // Daily challenges
  getDailyChallenge: () => api.get('/practice/daily'),
  claimDailyReward: () => api.post('/practice/daily/claim')
};
