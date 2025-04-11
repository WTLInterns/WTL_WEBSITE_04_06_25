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
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            startTimeRef.current = Date.now();
            const animate = () => {
              if (!startTimeRef.current) return;
              
              const currentTime = Date.now();
              const elapsed = currentTime - startTimeRef.current;
              const progress = Math.min(elapsed / duration, 1);
              
              setCount(Math.floor(target * progress));
              
              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setCount(target);
                if (animationRef.current) {
                  cancelAnimationFrame(animationRef.current);
                }
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

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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
export default function AkolaCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('cabs');

  // Initialize counters
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
        <div className="relative h-[550px]">
          <div className="absolute inset-0">
            <Image
              src="/images/akola.jpg"
              alt="Akola City"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 h-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Akola Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  WTL Tourism Pvt. Ltd. – Premium Car Rental Services in Akola
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Looking for Cab In Akola? AkolaCab Booking at Affordable fare.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50">
          {/* Best Cab Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Best Cab Services in Akola – Your Reliable Travel Partner
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At Worldtriplink, we provide top-notch cab service in Akola for a seamless and stress-free travel experience. Whether you're looking for a comfortable Pune to Akola cab service or want to explore the city with our best cab services in Akola, we've got you covered.
              </p>
            </div>
          </section>

          {/* Explore Akola Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Akola with Worldtriplink</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Akola is a beautiful city in Maharashtra, and whether you're visiting for business, leisure, or any other purpose, the need for reliable transportation is crucial. Worldtriplink offers a wide range of Akola to Pune cab services and intercity travel options, ensuring that your journey is smooth, safe, and on time.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Popular Destinations</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Akola Fort</li>
                    <li>• Shri Balaji Temple</li>
                    <li>• Gandhi Park</li>
                    <li>• Akola Museum</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Services</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Airport Transfers</li>
                    <li>• Local Sightseeing</li>
                    <li>• Corporate Travel</li>
                    <li>• Wedding Events</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Travel Times</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Pune: 5-6 hours</li>
                    <li>• Mumbai: 7-8 hours</li>
                    <li>• Nagpur: 4-5 hours</li>
                    <li>• Local: 30-60 mins</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Time to Visit</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• October to March</li>
                    <li>• Winter Season</li>
                    <li>• Festivals</li>
                    <li>• Business Hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Our Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Our Services in Akola
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Local City Tours</h3>
                <p className="text-gray-600">Customized city tours for exploring Akola's historical landmarks and scenic spots.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Outstation Cabs</h3>
                <p className="text-gray-600">Travel to nearby cities with competitive pricing and comfortable rides.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Transportation</h3>
                <p className="text-gray-600">Employee transportation and daily pick-up & drop services for businesses.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hotel & Flight Bookings</h3>
                <p className="text-gray-600">Comprehensive travel packages with hotel and flight bookings.</p>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Why Choose Worldtriplink for Cab Services in Akola?
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety & Security</h3>
                <p className="text-gray-600">Regularly inspected cabs and background-checked drivers.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Comfortable Rides</h3>
                <p className="text-gray-600">Variety of cabs from economical to luxury vehicles.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Affordable Rates</h3>
                <p className="text-gray-600">Transparent pricing with no hidden charges.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Availability</h3>
                <p className="text-gray-600">Available round the clock for your convenience.</p>
              </div>
            </div>
          </section>

          {/* Price Table Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Cab Service Price Chart</h2>
                <p className="text-lg text-gray-600">Transparent pricing for all your travel needs</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Route</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Distance</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Hatchback</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Sedan</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">SUV</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pune to Akola</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">290 km</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹4,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹5,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹7,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Akola to Pune</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">290 km</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹4,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹5,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹7,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Akola Local Sightseeing</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50-100 km</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹1,500</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹2,500</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">₹3,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Cabs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Types of Cabs Available
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hatchbacks</h3>
                <p className="text-gray-600">Economical and compact for shorter trips or solo travelers.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sedans</h3>
                <p className="text-gray-600">Spacious and comfortable, ideal for families or business trips.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SUVs</h3>
                <p className="text-gray-600">Perfect for long-distance travel, group trips, or those who need extra luggage space.</p>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-8">About Us - Worldtriplink</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Established in 2016 in Pune, Worldtriplink has been a leader in providing exceptional cab services across India. Over the years, we have expanded our fleet and services to meet the evolving needs of our clients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center" ref={personalCabsCounter.elementRef}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{personalCabsCounter.count}+</div>
                <div className="text-sm text-gray-300">Personal Cabs</div>
              </div>
              <div className="text-center" ref={registeredCabsCounter.elementRef}>
                <div className="text-4xl font-bold text-purple-400 mb-2">{registeredCabsCounter.count}+</div>
                <div className="text-sm text-gray-300">Registered Cabs</div>
              </div>
              <div className="text-center" ref={citiesCounter.elementRef}>
                <div className="text-4xl font-bold text-green-400 mb-2">{citiesCounter.count}+</div>
                <div className="text-sm text-gray-300">Cities Covered</div>
              </div>
              <div className="text-center" ref={officesCounter.elementRef}>
                <div className="text-4xl font-bold text-yellow-400 mb-2">{officesCounter.count}+</div>
                <div className="text-sm text-gray-300">Corporate Offices</div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-300">Find answers to common questions about our cab services</p>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                <FaqItem
                  question="What is the best cab service in Akola?"
                  answer="Worldtriplink is one of the leading providers of best cab services in Akola, known for offering reliable, affordable, and comfortable rides. Our services include local travel, outstation bookings, and city-to-city tours."
                />
                <FaqItem
                  question="How do I book a cab from Pune to Akola?"
                  answer="Booking your ride is easy with our online platform, allowing you to reserve a Pune to Akola cab service at your convenience. You can also contact us directly through our customer service number for assistance."
                />
                <FaqItem
                  question="Can I customize my journey from Akola?"
                  answer="Yes, you can! Worldtriplink offers customized travel options to meet your specific needs, whether it's sightseeing in Akola or planning a trip from Akola to Pune."
                />
                <FaqItem
                  question="What are the payment options for booking a cab?"
                  answer="We accept various payment methods, including cash, credit/debit cards, and online payment platforms for a hassle-free transaction."
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-16 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Book Your Akola Cab Service with WTL Tourism Pvt. Ltd. Today!</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="tel:9112085055"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                >
                  📞 Call Now: 9112085055
                </Link>
                <Link
                  href="https://wa.me/919112085055"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
                >
                  💬 WhatsApp: 9130030054
                </Link>
              </div>
              <p className="mt-4 text-lg text-white/80">Experience a smooth, reliable, and budget-friendly travel experience with us!</p>
              <p className="mt-2 text-white/80">🌐 Website: www.worldtriplink.com</p>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    console.error("Error rendering AkolaCabServicePage:", error);
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
}
