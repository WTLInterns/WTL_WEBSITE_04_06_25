'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Cookies from 'js-cookie';

interface LoginResponse {
  success: boolean;
  message: string;
  username?: string;
  role?: string;
  token?: string;
  email?: string;
  address?: string;
  userId?: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle click outside modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Ensure searchParams are fetched after the page has been hydrated
  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []); // This effect will run only on the client side

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Submitting login form with mobile number:', mobileNo);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mobileNo,
          password 
        }),
      });
      
      console.log('Login response status:', response.status);
      
      let data;
      try {
        data = await response.json();
        console.log('Login response:', data);
      } catch (err) {
        console.error('Failed to parse JSON response:', err);
        throw new Error('Invalid response format from server');
      }
      
      if (response.ok && data.success) {
        // Store user info in cookies with secure flags
        if (data.username) {
          Cookies.set('username', data.username, { secure: true, sameSite: 'strict' });
        }
        if (data.role) {
          const role = data.role.toUpperCase();
          Cookies.set('userRole', role, { secure: true, sameSite: 'strict' });
        }
        if (data.token) {
          Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
        }
        
        // Store mobile number
        Cookies.set('mobileNo', mobileNo, { secure: true, sameSite: 'strict' });
        
        // Store additional user data
        if (data.email) {
          Cookies.set('email', data.email, { secure: true, sameSite: 'strict' });
        }
        if (data.address) {
          Cookies.set('address', data.address, { secure: true, sameSite: 'strict' });
        }
        if (data.userId) {
          Cookies.set('userId', data.userId, { secure: true, sameSite: 'strict' });
        }
        
        // Store consolidated user data
        const userData = {
          username: data.username || '',
          email: data.email || '',
          mobileNo: mobileNo,
          role: (data.role || 'USER').toUpperCase(),
          address: data.address || '',
          userId: data.userId || '',
          isLoggedIn: true
        };
        Cookies.set('user', JSON.stringify(userData), { secure: true, sameSite: 'strict' });

        setSuccessMessage('Login successful! Redirecting...');
        setShowSuccessMessage(true);
        
        // Get redirect URL from query parameters or use default based on role
        const redirectTo = searchParams?.get('redirect');
        setTimeout(() => {
          if (redirectTo) {
            router.push(redirectTo);
          } else {
            const role = data.role.toUpperCase();
            if (role === 'ADMIN') {
              router.push('/admin/dashboard');
            } else if (role === 'VENDOR') {
              router.push('/vendor/dashboard');
            } else {
              router.push('/');
            }
          }
          onClose(); // Close the modal after successful login
        }, 2000);
      } else {
        setPassword('');
        console.error('Login failed:', data.message);
        setError(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setPassword('');
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error when user starts typing
  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) {
      setError('');
    }
  };

  // Clear error message when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error')) {
      setError('Invalid mobile number or password.');
    }
    
    // Check if coming from successful registration
    if (typeof window !== 'undefined') {
      const registrationSuccess = Cookies.get('registrationSuccess');
      const registrationMessage = Cookies.get('registrationMessage');
      
      if (registrationSuccess === 'true') {
        setShowSuccessMessage(true);
        setSuccessMessage(registrationMessage || 'Registration successful! Please log in.');
        
        // Clear the registration success flags
        Cookies.remove('registrationSuccess');
        Cookies.remove('registrationMessage');
      }
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`${styles['login-modal-overlay']} ${isOpen ? styles.visible : ''}`} onClick={handleOverlayClick}>
      <div className={styles['login-modal']}>
        <button className={styles['close-button']} onClick={onClose}>
          ✕
        </button>

        <h1 className={styles['form-heading']}>Log in to your account</h1>
        <p className={styles['sign-in-text']}>
          Don't have an account? <Link href="/Register" className={styles['link-info']}>Create an account</Link>
        </p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className={`${styles['alert']} ${styles['alert-danger']} ${styles['animate-fade-in-down']}`}>
              {error}
            </div>
          )}

          {showSuccessMessage && (
            <div className={`${styles['alert']} ${styles['alert-success']} ${styles['animate-fade-in-down']}`}>
              {successMessage}
            </div>
          )}

          <div className={styles['form-group']}>
            <label htmlFor="mobileNo" className={styles['form-label']}>Mobile Number</label>
            <div className={styles['input-wrapper']}>
              <input 
                type="text" 
                id="mobileNo" 
                name="mobileNo" 
                placeholder="Enter your mobile number"
                autoFocus
                className={`${styles['form-control']} ${styles['input-with-icon']}`}
                value={mobileNo}
                onChange={handleInputChange(setMobileNo)}
                required
                disabled={isLoading}
              />
              <span className={styles['input-icon']}>📱</span>
            </div>
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="password" className={styles['form-label']}>Password</label>
            <div className={styles['input-wrapper']}>
              <input 
                type="password" 
                placeholder="Enter your password" 
                id="password" 
                name="password"
                className={`${styles['form-control']} ${styles['input-with-icon']}`}
                value={password}
                onChange={handleInputChange(setPassword)}
                required
                disabled={isLoading}
              />
              <span className={styles['input-icon']}>🔒</span>
            </div>
          </div>

          <button 
            className={`${styles['login-button']} ${isLoading ? styles.loading : ''}`}
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles['loading-text']}>
                <span className={styles['loading-spinner']}></span>
                Logging in...
              </span>
            ) : (
              'Log in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
