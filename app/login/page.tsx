'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Cookies from 'js-cookie';
import FloatingIcons from '@/components/FloatingIcons';

export default function LoginPage() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/auth/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mobile: mobileNo,
          password 
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      // Corrected status code check
      if (response.ok && data.message === 'Login Successful') {
        const role = data.role?.toUpperCase() || 'USER';

        // Set cookies
        Cookies.set('userId', data.id, { secure: true, sameSite: 'strict' });
        Cookies.set('mobileNo', mobileNo, { secure: true, sameSite: 'strict' });
        Cookies.set('userRole', role, { secure: true, sameSite: 'strict' });

        const userData = {
          userId: data.id,
          mobileNo,
          role,
          isLoggedIn: true
        };
        Cookies.set('user', JSON.stringify(userData), { secure: true, sameSite: 'strict' });

        setSuccessMessage('Login successful! Redirecting...');
        setShowSuccessMessage(true);

        const redirectTo = searchParams?.get('redirect');
        setTimeout(() => {
          if (redirectTo) {
            router.push(redirectTo);
          } else {
            if (role === 'ADMIN') {
              router.push('/admin/dashboard');
            } else if (role === 'VENDOR') {
              router.push('/vendor/dashboard');
            } else if (role === 'DRIVER') {
              router.push('/driver/dashboard');
            } else {
              router.push('/');
            }
          }
        }, 2000);
      } else {
        setPassword('');
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setPassword('');
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the code remains the same
  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) {
      setError('');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error')) {
      setError('Invalid mobile number or password.');
    }

    const registrationSuccess = Cookies.get('registrationSuccess');
    const registrationMessage = Cookies.get('registrationMessage');

    if (registrationSuccess === 'true') {
      setShowSuccessMessage(true);
      setSuccessMessage(registrationMessage || 'Registration successful! Please log in.');
      Cookies.remove('registrationSuccess');
      Cookies.remove('registrationMessage');
    }
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'u') e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles['login-page']}>
      <div className={styles['red-background']}>
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
            className={`${styles['login-button']} ${isLoading ? styles['loading'] : ''}`}
            type="submit" 
            name="login-submit"
            id="login-submit"
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

          <p className={styles['sign-in-text']} style={{ marginTop: '20px' }}>
            <Link href="/forgot-password" className={styles['link-info']}>Forgot password?</Link>
          </p>
        </form>
      </div>
      <FloatingIcons />
    </div>
  );
}