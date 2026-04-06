// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loader from '../../components/common/Loader';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional()
});

const Login = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setValue('email', savedEmail);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setLoginAttempts(prev => prev + 1);
    }
  };

  const handleSocialLogin = (provider) => {
    const authUrls = {
      google: import.meta.env.VITE_GOOGLE_AUTH_URL,
      github: import.meta.env.VITE_GITHUB_AUTH_URL,
      linkedin: import.meta.env.VITE_LINKEDIN_AUTH_URL
    };
    window.location.href = authUrls[provider];
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#07071A] to-[#0D0D26] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#6C3BFF] to-[#00D4FF] bg-clip-text text-transparent">
              Change X Academy
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-[#A0A0C8]">
            Or{' '}
            <Link to="/register" className="font-medium text-[#00D4FF] hover:text-[#6C3BFF]">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/50 rounded-lg p-4"
            >
              <p className="text-red-500 text-sm">{error}</p>
              {loginAttempts >= 3 && (
                <p className="text-red-400 text-xs mt-2">
                  Too many failed attempts?{' '}
                  <Link to="/forgot-password" className="underline">
                    Reset your password
                  </Link>
                </p>
              )}
            </motion.div>
          )}

          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
              autoComplete="current-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#A0A0C8] hover:text-white"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 rounded border-[#252560] bg-[#14143A] text-[#6C3BFF] focus:ring-[#6C3BFF]"
              />
              <span className="ml-2 text-sm text-[#A0A0C8]">Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#00D4FF] hover:text-[#6C3BFF]"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="py-3"
          >
            {isLoading ? <Loader size="sm" /> : 'Sign in'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#252560]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#07071A] text-[#A0A0C8]">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex justify-center py-2 px-4 border border-[#252560] rounded-md shadow-sm text-sm font-medium text-white bg-[#14143A] hover:bg-[#1A1A45] transition-colors"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="flex justify-center py-2 px-4 border border-[#252560] rounded-md shadow-sm text-sm font-medium text-white bg-[#14143A] hover:bg-[#1A1A45] transition-colors"
            >
              GitHub
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('linkedin')}
              className="flex justify-center py-2 px-4 border border-[#252560] rounded-md shadow-sm text-sm font-medium text-white bg-[#14143A] hover:bg-[#1A1A45] transition-colors"
            >
              LinkedIn
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-[#6B6B98]">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-[#00D4FF] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-[#00D4FF] hover:underline">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
