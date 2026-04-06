// src/services/courses.js
import api from './api';

export const coursesService = {
  // Course listing with filters
  getCourses: (params) => api.get('/courses', { params }),
  getCourse: (id) => api.get(`/courses/${id}`),
  getCourseBySlug: (slug) => api.get(`/courses/slug/${slug}`),

  // Categories
  getCategories: () => api.get('/courses/categories'),
  getCategoryCourses: (categoryId, params) => api.get(`/courses/categories/${categoryId}`, { params }),

  // Enrollments
  enrollInCourse: (courseId) => api.post(`/courses/${courseId}/enroll`),
  getEnrolledCourses: (params) => api.get('/courses/enrolled', { params }),
  getCourseProgress: (courseId) => api.get(`/courses/${courseId}/progress`),

  // Lessons
  getLesson: (courseId, lessonId) => api.get(`/courses/${courseId}/lessons/${lessonId}`),
  markLessonComplete: (courseId, lessonId) => api.post(`/courses/${courseId}/lessons/${lessonId}/complete`),
  saveLessonProgress: (courseId, lessonId, data) => api.post(`/courses/${courseId}/lessons/${lessonId}/progress`, data),
  saveLessonNotes: (courseId, lessonId, notes) => api.post(`/courses/${courseId}/lessons/${lessonId}/notes`, { notes }),
  getLessonNotes: (courseId, lessonId) => api.get(`/courses/${courseId}/lessons/${lessonId}/notes`),

  // Q&A
  getLessonQuestions: (courseId, lessonId, params) => api.get(`/courses/${courseId}/lessons/${lessonId}/questions`, { params }),
  postQuestion: (courseId, lessonId, question) => api.post(`/courses/${courseId}/lessons/${lessonId}/questions`, { question }),
  postAnswer: (courseId, lessonId, questionId, answer) => api.post(`/courses/${courseId}/lessons/${lessonId}/questions/${questionId}/answers`, { answer }),
  voteQuestion: (courseId, lessonId, questionId, vote) => api.post(`/courses/${courseId}/lessons/${lessonId}/questions/${questionId}/vote`, { vote }),

  // Reviews
  getCourseReviews: (courseId, params) => api.get(`/courses/${courseId}/reviews`, { params }),
  postReview: (courseId, data) => api.post(`/courses/${courseId}/reviews`, data),
  updateReview: (courseId, reviewId, data) => api.put(`/courses/${courseId}/reviews/${reviewId}`, data),
  deleteReview: (courseId, reviewId) => api.delete(`/courses/${courseId}/reviews/${reviewId}`),

  // Wishlist
  getWishlist: () => api.get('/courses/wishlist'),
  addToWishlist: (courseId) => api.post(`/courses/${courseId}/wishlist`),
  removeFromWishlist: (courseId) => api.delete(`/courses/${courseId}/wishlist`),

  // Certificate
  getCertificate: (courseId) => api.get(`/courses/${courseId}/certificate`, { responseType: 'blob' }),
  verifyCertificate: (certificateId) => api.get(`/certificates/verify/${certificateId}`),

  // Instructor specific
  getInstructorCourses: (params) => api.get('/instructor/courses', { params }),
  createCourse: (data) => api.post('/instructor/courses', data),
  updateCourse: (courseId, data) => api.put(`/instructor/courses/${courseId}`, data),
  deleteCourse: (courseId) => api.delete(`/instructor/courses/${courseId}`),
  getCourseAnalytics: (courseId) => api.get(`/instructor/courses/${courseId}/analytics`),

  // Resources
  getLessonResources: (courseId, lessonId) => api.get(`/courses/${courseId}/lessons/${lessonId}/resources`),
  downloadResource: (courseId, lessonId, resourceId) => api.get(`/courses/${courseId}/lessons/${lessonId}/resources/${resourceId}/download`, { responseType: 'blob' })
};
