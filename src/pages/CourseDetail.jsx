// src/pages/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { coursesService } from '../services/courses';
import { earnService } from '../services/earn';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import Rating from '../components/common/Rating';
import { formatNumber, formatDuration } from '../utils/formatters';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: '' });

  // Fetch course data
  const { data: courseData, isLoading } = useQuery(
    ['course', id || slug],
    () => slug ? coursesService.getCourseBySlug(slug) : coursesService.getCourse(id),
    { enabled: !!(id || slug) }
  );

  // Fetch enrollment status
  const { data: enrollmentData } = useQuery(
    ['enrollment', courseData?.data?.id],
    () => coursesService.getCourseProgress(courseData.data.id),
    { enabled: isAuthenticated && !!courseData?.data?.id }
  );

  // Fetch reviews
  const { data: reviewsData } = useQuery(
    ['courseReviews', courseData?.data?.id],
    () => coursesService.getCourseReviews(courseData.data.id),
    { enabled: !!courseData?.data?.id }
  );

  // Enroll mutation
  const enrollMutation = useMutation(
    () => coursesService.enrollInCourse(courseData.data.id),
    {
      onSuccess: () => {
        toast.success('Successfully enrolled in the course!');
        queryClient.invalidateQueries(['enrollment', courseData.data.id]);
        if (courseData.data.price > 0) {
          // Track affiliate commission if referral
          earnService.claimLessonReward(courseData.data.id);
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Enrollment failed');
      }
    }
  );

  // Review mutation
  const reviewMutation = useMutation(
    () => coursesService.postReview(courseData.data.id, reviewData),
    {
      onSuccess: () => {
        toast.success('Review posted successfully!');
        queryClient.invalidateQueries(['courseReviews', courseData.data.id]);
        setShowReviewModal(false);
        setReviewData({ rating: 0, comment: '' });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to post review');
      }
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const course = courseData?.data;
  const isEnrolled = enrollmentData?.data?.isEnrolled || false;
  const progress = enrollmentData?.data?.progress || 0;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/course/${course.id}` } });
      return;
    }
    enrollMutation.mutate();
  };

  const handleContinue = () => {
    const firstLesson = course.lessons?.[0];
    if (firstLesson) {
      navigate(`/course/${course.id}/lesson/${firstLesson.id}`);
    }
  };

  const handleSubmitReview = () => {
    if (reviewData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    reviewMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-[#07071A]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#6C3BFF]/20 via-[#0D0D26] to-[#00D4FF]/20 pt-20 pb-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <nav className="text-sm text-[#A0A0C8] mb-4">
                <Link to="/courses" className="hover:text-white">Courses</Link>
                {' / '}
                <span className="text-white">{course.title}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-[#A0A0C8] text-lg mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span>{course.rating}</span>
                  <span className="text-[#A0A0C8]">({formatNumber(course.students)} students)</span>
                </div>
                <div className="flex items-center gap-2 text-[#A0A0C8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatDuration(course.duration)} total</span>
                </div>
                <div className="flex items-center gap-2 text-[#A0A0C8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.lessons?.length || 0} lessons</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-[#6C3BFF]/20 text-[#6C3BFF] text-sm">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] text-sm">
                  {course.level}
                </span>
                {course.language && (
                  <span className="px-3 py-1 rounded-full bg-[#00FFB2]/20 text-[#00FFB2] text-sm">
                    {course.language}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#14143A] rounded-2xl border border-[#252560] p-6 sticky top-24">
                <div className="text-center mb-4">
                  {course.price > 0 ? (
                    <>
                      <div className="text-3xl font-bold">₦{formatNumber(course.price)}</div>
                      <div className="text-sm text-[#A0A0C8]">One-time payment</div>
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-[#00FFB2]">FREE</div>
                  )}
                </div>

                {isEnrolled ? (
                  <div className="space-y-4">
                    <div className="text-center mb-2">
                      <div className="text-sm text-[#A0A0C8] mb-1">Your Progress</div>
                      <div className="w-full bg-[#0D0D26] rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] rounded-full h-2 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-white mt-1">{progress}% complete</div>
                    </div>
                    <Button onClick={handleContinue} variant="primary" fullWidth>
                      Continue Learning
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleEnroll}
                    variant="primary"
                    fullWidth
                    loading={enrollMutation.isLoading}
                  >
                    Enroll Now
                  </Button>
                )}

                <div className="mt-4 pt-4 border-t border-[#252560]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] flex items-center justify-center text-white font-bold">
                      {course.instructor?.name?.charAt(0) || 'I'}
                    </div>
                    <div>
                      <div className="font-medium">{course.instructor?.name || 'Expert Instructor'}</div>
                      <div className="text-sm text-[#A0A0C8]">Course Creator</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#A0A0C8] space-y-2">
                    <div className="flex justify-between">
                      <span>Lifetime access</span>
                      <svg className="w-5 h-5 text-[#00FFB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex justify-between">
                      <span>Certificate of completion</span>
                      <svg className="w-5 h-5 text-[#00FFB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex justify-between">
                      <span>30-day money-back guarantee</span>
                      <svg className="w-5 h-5 text-[#00FFB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container py-12">
        <div className="flex flex-wrap gap-2 border-b border-[#252560] mb-8">
          {['overview', 'curriculum', 'reviews', 'faq'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-white border-b-2 border-[#6C3BFF]'
                  : 'text-[#A0A0C8] hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-3">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYoullLearn?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-[#A0A0C8]">
                      <svg className="w-5 h-5 text-[#00FFB2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Course Description</h3>
                <p className="text-[#A0A0C8] leading-relaxed">{course.longDescription || course.description}</p>
              </div>

              {course.prerequisites?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Prerequisites</h3>
                  <ul className="list-disc list-inside text-[#A0A0C8] space-y-1">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'curriculum' && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {course.sections?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border border-[#252560] rounded-xl overflow-hidden">
                  <div className="bg-[#14143A] p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{section.title}</h4>
                      <div className="text-sm text-[#A0A0C8]">
                        {section.lessons?.length} lessons • {formatDuration(section.duration)}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-[#A0A0C8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          {i < Math.floor(course.rating) ? '★' : i < course.rating ? '½' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#A0A0C8]">({course.reviewCount || 0} reviews)</span>
                  </div>
                </div>
                {isEnrolled && !reviewsData?.data?.hasReviewed && (
                  <Button onClick={() => setShowReviewModal(true)} variant="outline" size="sm">
                    Write a Review
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {reviewsData?.data?.reviews?.map((review) => (
                  <div key={review.id} className="border-b border-[#252560] pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] flex items-center justify-center text-white font-bold">
                        {review.user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{review.user.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-[#A0A0C8]">{review.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#A0A0C8]">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Review Modal */}
      <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Write a Review">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewData({ ...reviewData, rating: star })}
                  className="text-3xl focus:outline-none"
                >
                  <span className={star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-600'}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <textarea
              rows={5}
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              placeholder="Share your experience with this course..."
              className="w-full px-4 py-2 rounded-lg bg-[#0D0D26] border border-[#252560] text-white focus:outline-none focus:border-[#6C3BFF]"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowReviewModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmitReview} loading={reviewMutation.isLoading}>
              Submit Review
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDetail;
