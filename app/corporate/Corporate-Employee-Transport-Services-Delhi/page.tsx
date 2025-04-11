"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import CabBookingForm from "@/components/CabBookingForm";
import BusBookingForm from "@/components/BusBookingForm";
import HotelBookingForm from "@/components/HotelBookingForm";
import FlightBookingForm from "@/components/FlightBookingForm";
import HomestaysBookingForm from "@/components/HomestaysBookingForm";
import HolidayBookingForm from "@/components/HolidayBookingForm";
import FloatingIcons from "@/components/FloatingIcons";

// Counter hook for animated numbers
const useCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const startTime = Date.now();
            const animate = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              setCount(Math.floor(target * progress));
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return { count, elementRef };
};

// FAQ Item Component
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 border-t border-gray-200">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function DelhiCorporateCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('cabs');

  // Initialize counters at component level
  const personalCabsCounter = useCounter(30);
  const registeredCabsCounter = useCounter(500);
  const citiesCounter = useCounter(100);
  const officesCounter = useCounter(50);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderBookingForm = () => {
    switch (activeTab) {
      case 'cabs':
        return <CabBookingForm />;
      case 'buses':
        return <BusBookingForm />;
      case 'flights':
        return <FlightBookingForm />;
      case 'hotels':
        return <HotelBookingForm />;
      case 'homestays':
        return <HomestaysBookingForm />;
      case 'holiday':
        return <HolidayBookingForm />;
      default:
        return <CabBookingForm />;
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-lg w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                There was an error loading this page. Please try again later.
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/delhi.jpg"
              alt="Delhi Corporate Cab Service"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 h-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full mx-auto h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Corporate Cab Services in Delhi
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Professional Corporate Employee Transport Solutions
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Reliable & Affordable Corporate Cab Services in Delhi by WTL Tourism Pvt. Ltd.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50 w-full">
          {/* Available Cabs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    Looking for Cab In Delhi?
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Delhi Cab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip from Delhi and Other Cities. Book your next Cab with WTL and get discount on total fare to Delhi.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">🚗</div>
                    <h3 className="font-semibold mb-2">OutStation</h3>
                    <p className="text-sm opacity-90">Long distance travel</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">🔄</div>
                    <h3 className="font-semibold mb-2">OneWay</h3>
                    <p className="text-sm opacity-90">Single direction trips</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">✈️</div>
                    <h3 className="font-semibold mb-2">Airport Cab</h3>
                    <p className="text-sm opacity-90">Airport transfers</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div className="text-2xl mb-3">🎯</div>
                    <h3 className="font-semibold mb-2">Round Trip</h3>
                    <p className="text-sm opacity-90">Return journey included</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gray-50">
            <div className="w-full max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Why Choose Our Corporate Cab Service in Delhi?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Affordable Pricing</h3>
                  <p className="text-gray-600">Transparent rates with no hidden charges.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Multiple Vehicle Options</h3>
                  <p className="text-gray-600">Choose from sedans, SUVs, tempo travelers, and luxury cabs.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Punctual & Reliable</h3>
                  <p className="text-gray-600">Guaranteed on-time pickups and drop-offs.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Experienced Chauffeurs</h3>
                  <p className="text-gray-600">Trained, verified, and professional drivers.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">24/7 Availability</h3>
                  <p className="text-gray-600">Flexible bookings for corporate employees.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Safety & Hygiene</h3>
                  <p className="text-gray-600">Well-maintained and sanitized vehicles.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">Custom Corporate Plans</h3>
                  <p className="text-gray-600">Tailored cab solutions based on company requirements.</p>
                </div>
                <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✔</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">Dedicated Support</h3>
                  <p className="text-gray-600">24/7 customer assistance for corporate clients.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Corporate Employee Transport Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Corporate Employee Transport Services in Delhi
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  For companies looking to optimize employee transportation, our corporate employee transport services in Delhi ensure smooth travel for staff. We offer dedicated corporate transport solutions to help businesses improve employee productivity and reduce commute stress.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Hassle-free Daily Commutes</h3>
                  <p className="text-gray-600">Well-planned routes for efficient employee transportation.</p>
                </div>
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Cost-effective Solutions</h3>
                  <p className="text-gray-600">Affordable corporate cab subscriptions for businesses.</p>
                </div>
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Real-time Tracking</h3>
                  <p className="text-gray-600">Advanced safety features with GPS tracking.</p>
                </div>
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">Eco-friendly Options</h3>
                  <p className="text-gray-600">Fuel-efficient vehicles for sustainable transportation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Benefits of Our Employee Transportation Services in Delhi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Hassle-free Daily Commutes</h3>
                </div>
                <p className="text-gray-600">Well-planned routes with efficient scheduling.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Cost-effective Solutions</h3>
                </div>
                <p className="text-gray-600">Affordable corporate cab subscriptions.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Real-time Tracking</h3>
                </div>
                <p className="text-gray-600">Advanced safety features with GPS tracking.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-amber-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Customizable Locations</h3>
                </div>
                <p className="text-gray-600">Flexible pick-up and drop locations.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Efficient Management</h3>
                </div>
                <p className="text-gray-600">Advanced fleet management system.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Safety First</h3>
                </div>
                <p className="text-gray-600">Regular vehicle maintenance and sanitization.</p>
              </div>
            </div>
          </section>

          {/* Corporate Employee Cab System Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Corporate Employee Cab System in Delhi
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Our corporate employee cab system in Delhi is designed for companies of all sizes. We provide shuttle services, on-demand cabs, and monthly corporate travel solutions tailored to your needs. Our GPS-enabled cabs ensure real-time tracking, making transportation smooth and secure.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Shuttle Services</h3>
                  <p className="text-gray-600">Regular shuttle services for employee transportation.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">On-demand Cabs</h3>
                  <p className="text-gray-600">Flexible booking for immediate transportation needs.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Solutions</h3>
                  <p className="text-gray-600">Long-term corporate travel packages.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Cab Service Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Daily Cab Service in Delhi
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Need a daily cab service in Delhi for office commutes? Our dedicated fleet ensures that employees reach work on time with a safe and reliable cab service.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Shared & Exclusive Options</h3>
                  </div>
                  <p className="text-gray-600">Choose between shared or private cab services.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Door-to-Door Service</h3>
                  </div>
                  <p className="text-gray-600">Convenient pick-up and drop facilities.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Monthly Packages</h3>
                  </div>
                  <p className="text-gray-600">Flexible corporate travel packages.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Air-conditioned Vehicles</h3>
                  </div>
                  <p className="text-gray-600">Comfortable rides in climate-controlled vehicles.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Personalized Solutions</h3>
                  </div>
                  <p className="text-gray-600">Tailored transport solutions for your needs.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Multi-location Service</h3>
                  </div>
                  <p className="text-gray-600">Coverage across multiple locations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Corporate Transport Service – Route-wise Pricing & Cab Options
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Transparent pricing for all corporate transportation needs
                </p>
              </div>
              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-500">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Route</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Distance (KM)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Hatchback</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sedan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">SUV</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tempo Traveler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to Noida</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹700</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1600</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to Gurgaon</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹550</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹750</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1050</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1700</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to Faridabad</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹450</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹650</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹950</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1500</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to Ghaziabad</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹520</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹720</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹980</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1650</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to Connaught Place</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹400</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹600</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹900</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1400</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to Cyber City</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹650</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹850</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1200</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1900</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to Saket</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹430</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹580</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹880</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1450</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Delhi to AIIMS</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 km</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹350</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹800</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1350</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">Note: Prices are approximate and may vary based on demand, season, and vehicle availability.</p>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  About Us – WTL Tourism Pvt. Ltd. (World Trip Link)
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-lg text-gray-600 mb-4">
                  Established in 2016 in Pune, World Trip Link has grown into a trusted name in the travel industry. We specialize in outstation cab services, employee transportation services, daily pickup & drop solutions, and hotel & flight bookings.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  With a network of 500+ registered cabs, we provide personal cab services across 100+ cities in India. Our expertise extends to managing 50+ corporate offices, ensuring seamless transportation for employees and executives.
                </p>
                <p className="text-lg text-gray-600">
                  At WTL Tourism Pvt. Ltd., we are committed to providing safe, reliable, and affordable cab services with a customer-first approach. Whether it's a corporate ride, daily commute, or an outstation trip, we ensure a hassle-free experience with professional drivers and well-maintained vehicles.
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-900 mb-4">🚖 Experience premium travel solutions with us! 🚖</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Frequently Asked Questions
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Find answers to common questions about our corporate transport services
                </p>
              </div>
              <div className="space-y-4">
                <FaqItem
                  question="What are the benefits of using corporate cab services in Delhi?"
                  answer="Our corporate cab services offer timely, safe, and cost-effective transport for employees, improving productivity and reducing travel stress."
                />
                <FaqItem
                  question="How can I book a corporate employee cab service in Delhi?"
                  answer="You can book through our website, call us, or send a WhatsApp message for instant bookings."
                />
                <FaqItem
                  question="Do you provide daily cab service in Delhi for employees?"
                  answer="Yes, we offer daily cab services for corporate employees with monthly and weekly plans."
                />
                <FaqItem
                  question="What are the charges for corporate transport service in Delhi?"
                  answer="Charges vary based on distance, vehicle type, and trip duration. Check our pricing table above for details."
                />
                <FaqItem
                  question="Is real-time tracking available for corporate cabs?"
                  answer="Yes, all our corporate cabs are equipped with GPS tracking for safety and efficiency."
                />
                <FaqItem
                  question="Can we book a customized corporate cab service?"
                  answer="Absolutely! We offer fully customized cab services for corporate clients as per their needs."
                />
                <FaqItem
                  question="Do you provide transport solutions for large teams?"
                  answer="Yes, we offer shuttle services and bulk bookings for large corporate teams, ensuring efficient employee transport."
                />
                <FaqItem
                  question="What safety measures are in place for corporate cabs?"
                  answer="Our vehicles are sanitized regularly, and we ensure all drivers are verified and trained for passenger safety."
                />
                <FaqItem
                  question="Can companies set up a long-term corporate cab contract?"
                  answer="Yes, we provide monthly and annual contracts tailored to corporate transportation needs."
                />
                <FaqItem
                  question="What are the cancellation policies for corporate cab bookings?"
                  answer="We offer flexible cancellation policies with prior notice. Contact our support team for more details."
                />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 w-full bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            {/* Animated circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h2>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                  Get in touch with us for your corporate transportation needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <a href="tel:+919130030053" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
                    <h3 className="text-2xl font-semibold mb-2">Phone</h3>
                    <p className="text-lg text-white/90">+91 9130030053</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to call us directly
                    </div>
                  </div>
                </a>
                
                <a href="mailto:contact@worldtriplink.com" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📧</div>
                    <h3 className="text-2xl font-semibold mb-2">Email</h3>
                    <p className="text-lg text-white/90">contact@worldtriplink.com</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to send us an email
                    </div>
                  </div>
                </a>
                
                <div className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📍</div>
                    <h3 className="text-2xl font-semibold mb-2">Address</h3>
                    <p className="text-lg text-white/90">Kharadi, Pune</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Visit our office
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <a
                  href="/"
                  className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Book Now
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}
