// src/pages/Home.jsx 2 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { coursesService } from '../services/courses';
import CourseCard from '../components/courses/CourseCard';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { formatNumber } from '../utils/formatters';

const Home = () => {
  const [stats, setStats] = useState({ learners: 0, courses: 0, paidOut: 0 });

  const { data: featuredCourses, isLoading } = useQuery(
    'featuredCourses',
    () => coursesService.getCourses({ featured: true, limit: 6 }),
    { staleTime: 5 * 60 * 1000 }
  );

  useEffect(() => {
    // Animated counter for stats
    const animateValue = (start, end, duration, setter) => {
      const increment = (end - start) / (duration / 16);
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    };

    animateValue(0, 24580, 2000, (val) =>
      setStats((s) => ({ ...s, learners: val }))
    );
    animateValue(0, 186, 1500, (val) =>
      setStats((s) => ({ ...s, courses: val }))
    );
    animateValue(0, 1240000, 2500, (val) =>
      setStats((s) => ({ ...s, paidOut: val }))
    );
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C3BFF]/20 via-transparent to-[#00D4FF]/20" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[#00FFB2] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
                Nigeria's #1 Learn-to-Earn Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-5xl md:text-7xl font-bold tracking-tight"
            >
              Learn.
              <span className="bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] bg-clip-text text-transparent">
                {' '}Practice.{' '}
              </span>
              <br />
              Earn Real Money.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-xl text-[#A0A0C8] max-w-2xl mx-auto"
            >
              Master in-demand tech skills, practice in our live sandbox, and monetize
              your knowledge through our affiliate ecosystem. Built for Nigerian creators
              & learners.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button to="/courses" variant="primary" size="lg">
                Start Learning Free
              </Button>
              <Button to="/practice" variant="outline" size="lg">
                Try Code Sandbox
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] bg-clip-text text-transparent">
                  {formatNumber(stats.learners)}
                </div>
                <div className="text-sm text-[#A0A0C8] mt-1">Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] bg-clip-text text-transparent">
                  {stats.courses}
                </div>
                <div className="text-sm text-[#A0A0C8] mt-1">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] bg-clip-text text-transparent">
                  ₦{formatNumber(stats.paidOut / 1000)}k
                </div>
                <div className="text-sm text-[#A0A0C8] mt-1">Paid Out</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 rounded-full bg-[#6C3BFF]/30 blur-3xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-[#00D4FF]/20 blur-3xl animate-pulse delay-1000" />
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-[#0D0D26]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#6C3BFF] uppercase tracking-wider">
              Top Rated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Featured{' '}
              <span className="bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] bg-clip-text text-transparent">
                Courses
              </span>
            </h2>
            <p className="text-[#A0A0C8] mt-4 max-w-2xl mx-auto">
              Start with our most popular courses loved by thousands of learners
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-[#14143A] rounded-xl h-80" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredCourses?.data?.map((course, index) => (
                <motion.div key={course.id} variants={fadeInUp}>
                  <CourseCard course={course} index={index} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Button to="/courses" variant="outline">
              View All Courses
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#6C3BFF] uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Your Path to{' '}
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#00FFB2] bg-clip-text text-transparent">
                Success
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📚',
                title: 'Learn',
                description: 'Access 180+ premium courses taught by industry experts',
                color: 'from-[#6C3BFF] to-[#8A5FFF]'
              },
              {
                icon: '💻',
                title: 'Practice',
                description: 'Apply your knowledge with 50+ coding challenges and projects',
                color: 'from-[#00D4FF] to-[#00B8E0]'
              },
              {
                icon: '💰',
                title: 'Earn',
                description: 'Monetize your skills through affiliate marketing and course sales',
                color: 'from-[#00FFB2] to-[#00CC90]'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-[#14143A] border border-[#252560] hover:border-[#6C3BFF] transition-all duration-300"
              >
                <div className={`text-5xl mb-4 inline-block p-4 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-[#A0A0C8]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6C3BFF] to-[#5025E0]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerian learners already building their future with Change X Academy
          </p>
          <Button to="/register" variant="accent" size="lg">
            Get Started Free
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
