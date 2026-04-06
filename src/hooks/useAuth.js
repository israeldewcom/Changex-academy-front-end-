// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register, logout, forgotPassword, resetPassword, setup2FA, verify2FA } from '../store/authSlice';
import { clearError } from '../store/authSlice';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error, twoFactorRequired, twoFactorSetup } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    const result = await dispatch(login(credentials));
    if (login.fulfilled.match(result)) {
      toast.success('Login successful!');
      navigate('/dashboard');
      return true;
    } else {
      toast.error(result.payload || 'Login failed');
      return false;
    }
  };

  const handleRegister = async (userData) => {
    const result = await dispatch(register(userData));
    if (register.fulfilled.match(result)) {
      toast.success('Registration successful! Please verify your email.');
      navigate('/verify-email');
      return true;
    } else {
      toast.error(result.payload || 'Registration failed');
      return false;
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleForgotPassword = async (email) => {
    const result = await dispatch(forgotPassword({ email }));
    if (forgotPassword.fulfilled.match(result)) {
      toast.success('Password reset link sent to your email');
      return true;
    } else {
      toast.error(result.payload || 'Request failed');
      return false;
    }
  };

  const handleResetPassword = async (token, password) => {
    const result = await dispatch(resetPassword({ token, password }));
    if (resetPassword.fulfilled.match(result)) {
      toast.success('Password reset successful! Please login.');
      navigate('/login');
      return true;
    } else {
      toast.error(result.payload || 'Reset failed');
      return false;
    }
  };

  const handleSetup2FA = async () => {
    const result = await dispatch(setup2FA());
    if (setup2FA.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  };

  const handleVerify2FA = async (token) => {
    const result = await dispatch(verify2FA({ token }));
    if (verify2FA.fulfilled.match(result)) {
      toast.success('2FA enabled successfully');
      return true;
    } else {
      toast.error(result.payload || 'Verification failed');
      return false;
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    twoFactorRequired,
    twoFactorSetup,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    setup2FA: handleSetup2FA,
    verify2FA: handleVerify2FA,
    clearError: clearAuthError
  };
};
