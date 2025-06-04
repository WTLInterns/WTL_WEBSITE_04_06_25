"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

// Define a more comprehensive user interface
interface UserData {
  username?: string;
  isLoggedIn?: boolean;
  mobileNo?: string;
  email?: string;
  address?: string;
  role?: string;
  userId?: string;
}

const Navbar2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Get user data from localStorage
    if (typeof window !== 'undefined') {
      loadUserData();
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to load all user data
  const loadUserData = () => {
    // Try to load user data from 'user' item first (most complete)
    // const userData = localStorage.getItem('user');
    const userData=Cookies.get('user')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('Loaded user data from localStorage:', parsedUser);
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
        // If parsing fails, try loading from individual items
        loadUserFromIndividualItems();
      }
    } else {
      // If no 'user' item, try loading from individual items
      loadUserFromIndividualItems();
    }
  };
  
  // Function to load user data from individual localStorage items
  const loadUserFromIndividualItems = () => {
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    const email = localStorage.getItem('email');
    const address = localStorage.getItem('address');
    
    if (username || userRole) {
      const userData: UserData = {
        username: username || undefined,
        isLoggedIn: !!username,
        role: userRole || undefined,
        email: email || undefined,
        address: address || undefined
      };
      setUser(userData);
      console.log('Loaded user data from individual localStorage items:', userData);
    }
  };
  
  // Function to handle logout
  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('address');

    Cookies.remove('user')
    
    // Update state
    setUser(null);
    setShowLogoutConfirmation(false);
    setShowLogoutSuccess(true);
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };
  
  // Function to handle profile edit
  const handleProfileEdit = () => {
    if (user) {
      setEditedUser({ ...user });
      setIsEditMode(true);
    }
  };
  
  // Function to handle profile save
  const handleProfileSave = () => {
    if (editedUser) {
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(editedUser));
      localStorage.setItem('email', editedUser.email || '');
      localStorage.setItem('address', editedUser.address || '');
      
      // Update state
      setUser(editedUser);
      setIsEditMode(false);
    }
  };
  
  // Function to handle profile cancel
  const handleProfileCancel = () => {
    setIsEditMode(false);
    setEditedUser(null);
  };
  
  // Function to handle profile modal close
  const handleProfileModalClose = () => {
    setShowProfileModal(false);
    setIsEditMode(false);
    setEditedUser(null);
  };
  
  // Refresh user data when profile modal is opened
  useEffect(() => {
    if (showProfileModal) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (e) {
          console.error('Error parsing user data from localStorage:', e);
        }
      }
    }
  }, [showProfileModal]);

  // Navigation items - dynamic based on login status
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'My Trip', href: '/my-trip' },
    { name: 'About', href: '/about' },
    { name: 'Service', href: '/service' },
    { name: 'Contact', href: '/contact' },
    ...(user?.isLoggedIn || user?.username 
      ? [{ name: 'Logout', action: () => setShowLogoutConfirmation(true) }] 
      : [{ name: 'Login', href: '/login' }]),
  ];

  // User profile modal component
  const UserProfileModal = () => {
    if (!showProfileModal) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleProfileModalClose}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        ></div>
        
        {/* Modal */}
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10 overflow-hidden transform transition-all duration-300 ease-in-out animate-fade-in-up"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3 transition-all duration-300 hover:bg-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">{user?.username || 'User'}</h3>
                <p className="text-white/80">{user?.role || 'User'}</p>
              </div>
            </div>
            
            {!isEditMode && (
              <button 
                onClick={handleProfileEdit}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Edit Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            )}
          </div>
          
          {/* User details */}
          <div className="p-6 space-y-4">
            {isEditMode ? (
              // Edit mode form
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editedUser?.username || ''}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={editedUser?.mobileNo || ''}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, mobileNo: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your mobile number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser?.email || ''}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={editedUser?.address || ''}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            ) : (
              // Display mode
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-blue-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{user?.username || 'Not available'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-blue-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium">{user?.mobileNo || 'Not available'}</p>
                    {!user?.mobileNo && (
                      <p className="text-xs text-red-500 mt-1">
                        Add your mobile number to enhance account security
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={handleProfileEdit}>
                  <div className="text-blue-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 flex items-center">
                      Email
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </p>
                    <p className="font-medium">{user?.email || 'Not available'}</p>
                    {!user?.email && (
                      <p className="text-xs text-red-500 mt-1">
                        Click to add your email and receive important notifications
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={handleProfileEdit}>
                  <div className="text-blue-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 flex items-center">
                      Address
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </p>
                    <p className="font-medium">{user?.address || 'Not available'}</p>
                    {!user?.address && (
                      <p className="text-xs text-red-500 mt-1">
                        Click to add your address for improved service delivery
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-blue-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">{user?.role || 'User'}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex space-x-3 pt-4 mt-4 border-t border-gray-200">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleProfileCancel}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileSave}
                    className="flex-1 px-4 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleProfileModalClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-500 rounded-md text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Logout Confirmation Modal
  const LogoutConfirmationModal = () => {
    if (!showLogoutConfirmation) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowLogoutConfirmation(false)}>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"></div>
        
        {/* Modal */}
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10 overflow-hidden transform transition-all duration-300 ease-in-out animate-fade-in-up"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-5 text-white">
            <h3 className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Confirm Logout
            </h3>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? You'll need to log in again to access your account.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-500 rounded-md text-white font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Logout Success Toast
  const LogoutSuccessToast = () => {
    if (!showLogoutSuccess) return null;
    
    return (
      <div className="fixed top-4 right-4 z-50 transform transition-all duration-500 ease-in-out animate-fade-in-down">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]">
          <div className="bg-white/20 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">Success!</h3>
            <p className="text-sm text-white/90">You have been logged out successfully.</p>
          </div>
          <button 
            onClick={() => setShowLogoutSuccess(false)}
            className="ml-auto bg-transparent text-white p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="w-full px-2 sm:px-4">
        <div className="flex justify-start items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 animate-fade-in pl-1 sm:pl-2">
            <Link href="/" className="flex items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <img 
                src="/images/wtl-removebg-preview.png" 
                alt="WTL Tourism Logo" 
                className="h-8 mr-2 filter drop-shadow-md hover:drop-shadow-xl transition-all duration-300" 
                style={{ filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))' }}
              />
              <span className="text-shadow-sm hover:text-shadow-md transition-all duration-300">WTL Tourism</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                    }`}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
            
            {/* Sign Up button for non-logged in users */}
            {!user?.isLoggedIn && !user?.username && (
              <div className="transform transition-all duration-200 hover:scale-105 active:scale-95">
                <Link
                  href="/Register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Welcome message with user avatar - modified to be clickable */}
            {(user?.isLoggedIn || user?.username) && (
              <div className="flex items-center">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center rounded-full bg-teal-500 text-white px-3 py-2 hover:bg-teal-600 transition-colors duration-200"
                >
                  <div className="bg-teal-600 rounded-full w-7 h-7 flex items-center justify-center text-white mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm whitespace-nowrap">Welcome, {user?.username}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {(user?.isLoggedIn || user?.username) && (
            <button
              onClick={() => {
                setShowProfileModal(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-base font-medium rounded-full bg-teal-500 text-white mx-1 mb-3 hover:bg-teal-600 transition-colors"
            >
              <div className="bg-teal-600 rounded-full w-7 h-7 flex items-center justify-center text-white mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Welcome, {user?.username}</span>
            </button>
          )}
          
          {navItems.map((item) => (
            <div
              key={item.name}
              className="transform transition-all duration-200 hover:translate-x-2"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    item.action?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
          
          {/* Show Sign Up option on mobile only when not logged in */}
          {!user?.isLoggedIn && !user?.username && (
            <div className="transform transition-all duration-200 hover:translate-x-2">
              <Link
                href="/Register"
                className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Render the user profile modal */}
      <UserProfileModal />
      
      {/* Render the logout confirmation modal */}
      <LogoutConfirmationModal />
      
      {/* Render the logout success toast */}
      <LogoutSuccessToast />
    </nav>
  );
};

export default Navbar2; 