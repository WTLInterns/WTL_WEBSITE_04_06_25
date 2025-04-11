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
import { useIntersectionCounter } from '@/hooks/useIntersectionCounter'

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
export default function OsmanabadCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Handle form submission
    } catch (err) {
      setHasError(true);
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
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
              src="/images/osmanabad.jpg"
              alt="Osmanabad City"
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
                  Osmanabad Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Looking for Cab In Osmanabad?
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Osmanabad Cab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip from Osmanabad Maharashtra and Other Cities.
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
                Best Cab Services in Osmanabad – Comfortable and Reliable Travel
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Looking for the best cab services in Osmanabad? Your search ends here! Worldtriplink is your trusted travel partner, providing reliable and affordable cab services in Osmanabad for local and outstation trips. Whether you need a Pune to Osmanabad cab service or an Osmanabad to Pune cab service, we ensure a safe and comfortable ride with professional drivers and well-maintained vehicles.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Why Choose Worldtriplink for Cab Service in Osmanabad?
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Availability</h3>
                <p className="text-gray-600">Book a cab anytime, anywhere.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Affordable Pricing</h3>
                <p className="text-gray-600">Competitive rates with no hidden charges.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Drivers</h3>
                <p className="text-gray-600">Experienced and courteous chauffeurs.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Well-Maintained Fleet</h3>
                <p className="text-gray-600">Choose from hatchbacks, sedans, and SUVs.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Booking</h3>
                <p className="text-gray-600">Convenient online booking for a hassle-free experience.</p>
              </div>
            </div>
          </section>

          {/* Our Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Our Cab Services in Osmanabad
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Cab Service</h3>
                <p className="text-gray-600">Need a ride within the city? Our cab service in Osmanabad ensures seamless local travel. Whether it's shopping, visiting historical sites, or business meetings, we provide quick and convenient transportation.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Outstation Cabs</h3>
                <p className="text-gray-600">Planning a trip outside Osmanabad? Book our comfortable outstation cabs and enjoy a hassle-free journey to nearby cities like Pune, Mumbai, Aurangabad, and more.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Transportation</h3>
                <p className="text-gray-600">We provide corporate cab services for daily office commute and business travel, ensuring timely pick-up and drop-off for employees.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hotel & Flight Booking</h3>
                <p className="text-gray-600">In addition to cabs, we offer hotel and flight booking services to make your travel experience seamless.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pune to Osmanabad Cab Services</h3>
                <p className="text-gray-600">Looking for a reliable Pune to Osmanabad cab service? We provide one-way and round-trip options with flexible pickup and drop locations, ensuring a smooth journey.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Osmanabad to Pune Cab Services</h3>
                <p className="text-gray-600">Need a ride from Osmanabad to Pune? Our premium taxi service guarantees a comfortable and timely journey. Book your ride with Worldtriplink for the best travel experience.</p>
              </div>
            </div>
          </section>

          {/* Price Table Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Route-wise Pricing and Kilometers Breakdown</h2>
                <p className="text-lg text-gray-600">Transparent pricing for all your travel needs</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-blue-600">
                        <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider w-1/4">Route</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider w-1/4">Distance (km)</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider w-1/4">Cab Type</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider w-1/4">Price (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>Pune to Osmanabad</td>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>260 km</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Hatchback</td>
                        <td className="px-6 py-4 text-sm text-gray-900">4800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Sedan</td>
                        <td className="px-6 py-4 text-sm text-gray-900">5800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">SUV</td>
                        <td className="px-6 py-4 text-sm text-gray-900">7800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>Osmanabad to Pune</td>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>260 km</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Hatchback</td>
                        <td className="px-6 py-4 text-sm text-gray-900">4800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Sedan</td>
                        <td className="px-6 py-4 text-sm text-gray-900">5800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">SUV</td>
                        <td className="px-6 py-4 text-sm text-gray-900">7800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>Osmanabad Local Travel</td>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>50-100 km</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Hatchback</td>
                        <td className="px-6 py-4 text-sm text-gray-900">1800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Sedan</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">SUV</td>
                        <td className="px-6 py-4 text-sm text-gray-900">3800</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* About WTL Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                About WTL Pvt Ltd
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                Worldtriplink was established in 2016 in Pune to provide reliable and affordable cab services across India. Over the years, we have expanded our offerings to include outstation cabs, employee transportation services, daily pick-up & drop services, and hotel & flight bookings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div ref={personalCabsCounter.elementRef} className="text-4xl font-bold text-blue-600 mb-2">
                  {personalCabsCounter.count}+
                </div>
                <p className="text-gray-600">Personal Cabs across India</p>
              </div>
              <div className="text-center">
                <div ref={registeredCabsCounter.elementRef} className="text-4xl font-bold text-purple-600 mb-2">
                  {registeredCabsCounter.count}+
                </div>
                <p className="text-gray-600">Registered Cabs in our network</p>
              </div>
              <div className="text-center">
                <div ref={citiesCounter.elementRef} className="text-4xl font-bold text-green-600 mb-2">
                  {citiesCounter.count}+
                </div>
                <p className="text-gray-600">Cities Covered with reliable services</p>
              </div>
              <div className="text-center">
                <div ref={officesCounter.elementRef} className="text-4xl font-bold text-orange-600 mb-2">
                  {officesCounter.count}+
                </div>
                <p className="text-gray-600">Corporate Offices served with seamless employee transportation</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Frequently Asked Questions
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <FaqItem 
                question="What is the best cab service in Osmanabad?"
                answer="Worldtriplink offers the best cab services in Osmanabad, ensuring reliable, safe, and affordable transportation for local and outstation travel."
              />
              <FaqItem 
                question="How can I book a Pune to Osmanabad cab service?"
                answer="You can easily book your ride through our online platform or contact our customer service for assistance. We offer flexible payment options for your convenience."
              />
              <FaqItem 
                question="Are your cabs safe for night travel?"
                answer="Yes, we ensure safety with well-maintained vehicles and professional drivers. Our cabs are equipped with GPS tracking for added security."
              />
              <FaqItem 
                question="Can I book a round-trip cab from Osmanabad to Pune?"
                answer="Yes, we offer both one-way and round-trip cab services at competitive prices."
              />
              <FaqItem 
                question="Do you provide hourly rentals in Osmanabad?"
                answer="Yes, we offer hourly rental services for local travel in Osmanabad, allowing you to book a cab as per your requirements."
              />
            </div>
          </section>

          {/* Contact WTL Tourism Pvt. Ltd. Today! Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657 28 0h-2.83zM32.656 0L26.172 6.485 24 8.657 34.657 0h-2zM38.315 0L29.828 8.485 27.657 10.657 38.315 0zm5.657 0l-5.657 5.657L36.485 7.828 42.142 0h2.83zM53.657 0l3.657 3.657L43.828 17.143l-1.414-1.414L53.657 0zM17.143 42.414l3.657 3.657-.828.828-3.657-3.657.828-.828zM0 22.344l3.657 3.657L0 29.657V22.344zM54.627 60l.83-.828-1.415-1.415L51.8 60h2.827zM5.373 60l-.83-.828L5.96 57.757 8.2 60H5.374zM48.97 60l3.657-3.657-1.414-1.414L46.143 60h2.828zM11.03 60L7.372 56.343 8.787 54.93 13.857 60H11.03zm32.284 0L49.8 53.515l-1.415-1.414-7.9 7.9h2.83zM16.686 60L10.2 53.515l1.415-1.414 7.9 7.9h-2.83zm5.657 0L13.857 51.515l1.415-1.414 7.9 7.9h-.828zM28 60l-8.485-8.485L17.343 49.343 28 60zm4.657 0l-6.485-6.485L24 51.343 34.657 60h-2zm5.657 0l-8.485-8.485L27.657 49.343 38.315 60zm5.657 0l-5.657-5.657 1.414-1.415 5.657 5.657h-1.414zM53.657 60l3.657-3.657L43.828 42.857l-1.414 1.414L53.657 60zM17.143 17.586l3.657-3.657-.828-.828-3.657 3.657.828.828zM0 37.656l3.657-3.657L0 30.343v7.313z\' fill=\'%23FFFFFF\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '24px 24px'
              }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  Contact WTL Tourism Pvt. Ltd. Today!
                </h2>
                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                  Experience the best cab service in Osmanabad with our professional and reliable transportation solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Call/WhatsApp</h3>
                      <div className="space-y-2">
                        <a href="tel:9112085055" className="block text-xl font-bold text-white hover:text-blue-200 transition-colors">
                          +91 91120 85055
                        </a>
                        <a href="tel:9130030054" className="block text-xl font-bold text-white hover:text-blue-200 transition-colors">
                          +91 91300 30054
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Visit Our Website</h3>
                      <a 
                        href="https://www.worldtriplink.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xl font-bold text-white hover:text-blue-200 transition-colors"
                      >
                        www.worldtriplink.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link href="/">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Book Your Ride Now
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Osmanabad Cab Service page:", error);
    setHasError(true);
    return null;
  }
}
