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
import Head from "next/head";


<Head>
    <title>Corporate Cab Service in Mumbai | Employee Transportation</title>
    <meta name="description" content="WTL Tourism Pvt. Ltd. offers reliable corporate cab service in Mumbai. Ensure safe, on-time employee transportation services with our hassle-free cab solutions."/>
    <link rel="canonical" href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Mumbai"/>
    <meta name="author" content="WTL Tourism"/>
    <meta name="keywords" content="employee transportation services in mumbai, corporate employee transport services in mumbai, employee transport service in mumbai, cab transport services in mumbai for corporate, corporate cab service in mumbai, corporate cab services in mumbai, corporate employee cab services in mumbai, corporate employee cab system in mumbai, whats per km price for corporate night cabs in mumbai"/>
    <meta name="robots" content="index, follow"/>
</Head>


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
export default function MumbaiCorporateCabServicePage() {
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
              src="/images/mumbai.jpg"
              alt="Mumbai Corporate Cab Service"
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
                  Corporate Cab Services in Mumbai
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Professional Corporate Employee Transport Solutions
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Reliable & Affordable Corporate Cab Services in Mumbai by WTL Tourism Pvt. Ltd.
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
                    Looking for Cab In Mumbai?
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Mumbai Cab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip from Mumbai Maharashtra and Other Cities. Book your next Cab with WTL and get discount on total fare to Mumbai.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Reliable & Affordable Corporate Cab Services in Mumbai</h3>
                  <p className="text-gray-700 leading-relaxed">
                    WTL Tourism Pvt. Ltd. (World Trip Link) offers professional and cost-effective corporate cab services in Mumbai, ensuring seamless transportation solutions for businesses. Whether you need employee transportation services in Mumbai, daily cabs, or customized travel solutions, we provide well-maintained vehicles and trained drivers for a hassle-free experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  {/* Statistics Cards */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-blue-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={personalCabsCounter.elementRef}>
                        {personalCabsCounter.count}+
                      </h3>
                      <p className="text-gray-600">Personal Cabs</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-purple-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={registeredCabsCounter.elementRef}>
                        {registeredCabsCounter.count}+
                      </h3>
                      <p className="text-gray-600">Registered Cabs</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-green-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={citiesCounter.elementRef}>
                        {citiesCounter.count}+
                      </h3>
                      <p className="text-gray-600">Cities Covered</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-yellow-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" ref={officesCounter.elementRef}>
                        {officesCounter.count}+
                      </h3>
                      <p className="text-gray-600">Corporate Offices</p>
                    </div>
                  </div>
                </div>

                {/* Available Cabs Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src="/images/sedan-car.jpg"
                        alt="Sedan"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Sedan</h3>
                      <p className="text-gray-600 mb-4">Comfortable and economical choice for daily commute</p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 4 Seater</li>
                        <li>• AC</li>
                        <li>• Music System</li>
                        <li>• GPS Tracking</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src="/images/suv.jpg"
                        alt="SUV"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">SUV</h3>
                      <p className="text-gray-600 mb-4">Spacious and premium choice for executive travel</p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 6 Seater</li>
                        <li>• AC</li>
                        <li>• Premium Interior</li>
                        <li>• GPS Tracking</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src="/images/luxury-car.jpg"
                        alt="Luxury"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Luxury</h3>
                      <p className="text-gray-600 mb-4">Ultimate comfort for VIP and special occasions</p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 4 Seater</li>
                        <li>• Premium AC</li>
                        <li>• Entertainment System</li>
                        <li>• GPS Tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Corporate Cab Service in Mumbai?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-blue-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
                  <p className="text-gray-600">Competitive rates with no hidden charges</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-green-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety & Hygiene</h3>
                  <p className="text-gray-600">Well-maintained and sanitized vehicles</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-purple-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Punctual & Reliable</h3>
                  <p className="text-gray-600">Guaranteed on-time pickups and drop-offs</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-yellow-600 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pan Mumbai Coverage</h3>
                  <p className="text-gray-600">Service available across all major business districts</p>
                </div>
              </div>
            </div>
          </section>

          {/* Corporate Employee Cab Services Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Employee Cab Services in Mumbai</h2>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg mb-12">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For companies seeking corporate employee transport services in Mumbai, we offer structured and reliable employee transportation services in Mumbai that ensure a smooth and efficient commute for employees. Our services are designed to reduce commute stress, improve productivity, and provide a safe ride.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Benefits of Our Employee Transport Service in Mumbai:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Well-planned routes for hassle-free daily commutes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Cost-effective corporate cab subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Real-time tracking for enhanced safety</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Customizable pick-up and drop locations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Monthly and weekly invoicing for easy billing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Fuel-efficient and eco-friendly ride options</span>
                  </li>
                </ul>
              </div>

              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Corporate Employee Cab System in Mumbai</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our corporate employee cab system in Mumbai is tailored to accommodate businesses of all sizes. Whether it's shuttle services, on-demand cabs, or dedicated monthly cab solutions, we ensure seamless travel with GPS-enabled cabs for real-time tracking.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Daily & Monthly Cab Services in Mumbai</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Looking for a monthly cab service in Mumbai for office commutes? Our corporate fleet ensures that employees reach work on time with our dedicated daily cab services in Mumbai.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Features of Our Daily & Monthly Cab Services:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Shared and exclusive cab options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Door-to-door pick-up and drop services</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Monthly and weekly travel packages</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Comfortable, air-conditioned rides</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Multi-location pick-up and drop services</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Reliable fleet management system</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing Table Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Transport Service – Route-wise Pricing & Cab Options</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-lg">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="py-4 px-6 text-left">Route</th>
                      <th className="py-4 px-6 text-left">Distance (KM)</th>
                      <th className="py-4 px-6 text-left">Hatchback</th>
                      <th className="py-4 px-6 text-left">Sedan</th>
                      <th className="py-4 px-6 text-left">SUV</th>
                      <th className="py-4 px-6 text-left">Tempo Traveler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-6">Mumbai to BKC</td>
                      <td className="py-4 px-6">15 km</td>
                      <td className="py-4 px-6">₹400</td>
                      <td className="py-4 px-6">₹550</td>
                      <td className="py-4 px-6">₹850</td>
                      <td className="py-4 px-6">₹1400</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Mumbai to Andheri</td>
                      <td className="py-4 px-6">18 km</td>
                      <td className="py-4 px-6">₹430</td>
                      <td className="py-4 px-6">₹580</td>
                      <td className="py-4 px-6">₹880</td>
                      <td className="py-4 px-6">₹1450</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Mumbai to Lower Parel</td>
                      <td className="py-4 px-6">12 km</td>
                      <td className="py-4 px-6">₹350</td>
                      <td className="py-4 px-6">₹500</td>
                      <td className="py-4 px-6">₹800</td>
                      <td className="py-4 px-6">₹1350</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Mumbai to Powai</td>
                      <td className="py-4 px-6">20 km</td>
                      <td className="py-4 px-6">₹450</td>
                      <td className="py-4 px-6">₹600</td>
                      <td className="py-4 px-6">₹900</td>
                      <td className="py-4 px-6">₹1500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Mumbai to Navi Mumbai</td>
                      <td className="py-4 px-6">30 km</td>
                      <td className="py-4 px-6">₹650</td>
                      <td className="py-4 px-6">₹800</td>
                      <td className="py-4 px-6">₹1100</td>
                      <td className="py-4 px-6">₹1800</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-6">Mumbai to Thane</td>
                      <td className="py-4 px-6">25 km</td>
                      <td className="py-4 px-6">₹600</td>
                      <td className="py-4 px-6">₹750</td>
                      <td className="py-4 px-6">₹1050</td>
                      <td className="py-4 px-6">₹1700</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Mumbai to Borivali</td>
                      <td className="py-4 px-6">22 km</td>
                      <td className="py-4 px-6">₹500</td>
                      <td className="py-4 px-6">₹650</td>
                      <td className="py-4 px-6">₹950</td>
                      <td className="py-4 px-6">₹1550</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.828 42.142 0h2.83zM53.657 0l3.657 3.657L43.828 17.143l-1.414-1.414L53.657 0zM17.143 42.414l3.657 3.657-.828.828-3.657-3.657.828-.828zM0 22.344l3.657 3.657L0 29.657V22.344zM54.627 60l.83-.828-1.415-1.415L51.8 60h2.827zM5.373 60l-.83-.828L5.96 57.757 8.2 60H5.374zM48.97 60l3.657-3.657-1.414-1.414L46.143 60h2.828zM11.03 60L7.372 56.343 8.787 54.93 13.857 60H11.03zm32.284 0L49.8 53.515l-1.415-1.414-7.9 7.9h2.83zM16.686 60L10.2 53.515l1.415-1.414 7.9 7.9h-2.83zm5.657 0L13.857 51.515l1.415-1.414 7.9 7.9h-.828zM28 60l-8.485-8.485L17.343 49.343 28 60zm4.657 0l-6.485-6.485L24 51.343 34.657 60h-2zm5.657 0l-8.485-8.485L27.657 49.343 38.315 60zm5.657 0l-5.657-5.657 1.414-1.415 5.657 5.657h-1.414zM53.657 60l3.657-3.657L43.828 42.857l-1.414 1.414L53.657 60zM17.143 17.586l3.657-3.657-.828-.828-3.657 3.657.828.828zM0 37.656l3.657-3.657L0 30.343v7.313z\' fill=\'%23000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '24px 24px'
              }}></div>
            </div>

            <div className="relative">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12 relative inline-block">
                About Us – Worldtriplink
                <div className="absolute bottom--4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform hover:scale-[1.02] transition-all duration-300">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Worldtriplink (WTL) was established in 2016 in Pune with a mission to offer reliable and convenient travel services across India. Since our inception, we have grown to become a leading provider of outstation cab services, employee transportation, daily pick-up & drop services, and hotel & flight bookings.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">FAQs – Corporate Cab Services in Mumbai</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <FaqItem
                  question="What are the benefits of using corporate cab services in Mumbai?"
                  answer="Our corporate cab services offer safe, timely, and cost-effective transportation, helping businesses enhance employee productivity and reduce travel stress."
                />
                <FaqItem
                  question="How can I book a corporate employee cab service in Mumbai?"
                  answer="You can book via our website, call us, or send a WhatsApp message for instant bookings."
                />
                <FaqItem
                  question="Do you provide monthly cab services in Mumbai for corporate employees?"
                  answer="Yes, we offer monthly and weekly cab services with customized plans for businesses."
                />
                <FaqItem
                  question="What is the cost of corporate transport services in Mumbai?"
                  answer="Charges vary based on distance, vehicle type, and trip duration. Check our pricing table above for details."
                />
                <FaqItem
                  question="Do your corporate cabs have real-time tracking?"
                  answer="Yes, all our corporate cabs are equipped with GPS tracking for enhanced security and efficiency."
                />
                <FaqItem
                  question="Can we book a customized corporate cab service for our company?"
                  answer="Absolutely! We offer fully customizable cab services tailored to corporate needs."
                />
                <FaqItem
                  question="Do you offer transport solutions for large teams?"
                  answer="Yes, we provide shuttle services and bulk bookings for corporate teams, ensuring efficient employee transport."
                />
                <FaqItem
                  question="What safety measures are in place for corporate cabs?"
                  answer="All our vehicles are sanitized regularly, and we ensure verified and trained drivers for passenger safety."
                />
                <FaqItem
                  question="Can companies set up a long-term corporate cab contract?"
                  answer="Yes, we provide monthly and annual contracts tailored to corporate transportation needs."
                />
                <FaqItem
                  question="What is the per km price for corporate night cabs in Mumbai?"
                  answer="The price per km varies based on the vehicle type and trip duration. Contact our support team for detailed pricing."
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

          <Footer />
          <FloatingIcons />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}
