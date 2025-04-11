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
export default function SindhudurgCabServicePage() {
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
              src="/images/sindhudurg.jpeg"
              alt="Sindhudurg City"
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
                  Sindhudurg Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  WTL Tourism Pvt. Ltd. – Premium Car Rental Services in Sindhudurg
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Looking for Cab In Sindhudurg? SindhudurgCab Booking at Affordable fare.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50">
          {/* Comfortable and Reliable Travel Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Comfortable and Reliable Travel
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Looking for the best cab services in Sindhudurg? Your search ends here! Worldtriplink is your trusted travel partner, providing reliable and affordable cab services in Sindhudurg for local and outstation trips. Whether you need a Pune to Sindhudurg cab service or a Sindhudurg to Pune cab service, we ensure a safe and comfortable ride with professional drivers and well-maintained vehicles.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Why Choose Worldtriplink for Cab Service in Sindhudurg?
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Pricing</h3>
                <p className="text-gray-600">Competitive rates with no hidden charges.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Drivers</h3>
                <p className="text-gray-600">Experienced and courteous chauffeurs.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                Our Cab Services in Sindhudurg
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Cab Service</h3>
                <p className="text-gray-600">Need a ride within the city? Our cab service in Sindhudurg ensures seamless local travel. Whether it's shopping, visiting historical sites, or business meetings, we provide quick and convenient transportation.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Outstation Cab Services</h3>
                <p className="text-gray-600">Planning a trip outside Sindhudurg? Book our comfortable outstation cabs and enjoy a hassle-free journey to nearby cities like Pune, Mumbai, Goa, and more.</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hotel & Flight Bookings</h3>
                <p className="text-gray-600">In addition to cabs, we offer hotel and flight booking services to make your travel experience seamless.</p>
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
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>Pune to Sindhudurg</td>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>400 km</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Hatchback</td>
                        <td className="px-6 py-4 text-sm text-gray-900">6800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Sedan</td>
                        <td className="px-6 py-4 text-sm text-gray-900">7800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">SUV</td>
                        <td className="px-6 py-4 text-sm text-gray-900">9800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>Sindhudurg to Pune</td>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>400 km</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Hatchback</td>
                        <td className="px-6 py-4 text-sm text-gray-900">6800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Sedan</td>
                        <td className="px-6 py-4 text-sm text-gray-900">7800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">SUV</td>
                        <td className="px-6 py-4 text-sm text-gray-900">9800</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900" rowSpan={3}>Sindhudurg Local Travel</td>
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

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Frequently Asked Questions
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our Sindhudurg cab services
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              <FaqItem
                question="What is the best cab service in Sindhudurg?"
                answer="Worldtriplink offers the best cab services in Sindhudurg, ensuring reliable, safe, and affordable transportation for local and outstation travel."
              />
              <FaqItem
                question="How can I book a Pune to Sindhudurg cab service?"
                answer="You can easily book your ride through our online platform or contact our customer service for assistance."
              />
              <FaqItem
                question="Are your cabs safe for night travel?"
                answer="Yes, we ensure safety with well-maintained vehicles and professional drivers. Our cabs are equipped with GPS tracking for added security."
              />
              <FaqItem
                question="Can I book a round-trip cab from Sindhudurg to Pune?"
                answer="Yes, we offer both one-way and round-trip cab services at competitive prices."
              />
              <FaqItem
                question="Do you provide hourly rentals in Sindhudurg?"
                answer="Yes, we offer hourly rental services for local travel in Sindhudurg, allowing you to book a cab as per your requirements."
              />
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Contact Us for Cab Booking in Sindhudurg
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Get in touch with us for any queries or to book your cab service in Sindhudurg. We're here to help!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-6 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                    <p className="text-white/90">+91 9130030054</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-6 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-white/90">info@worldtriplink.com</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg p-6 hover:from-indigo-500/30 hover:to-blue-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                    <p className="text-white/90">Kharadi, Pune</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200 shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/9130030054"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-200 shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.14 15.86c-1.5 0-2.92-.37-4.16-1.02l-2.97.78.79-2.89c-.71-1.24-1.12-2.68-1.12-4.22 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.69-5.54c-.24-.12-1.42-.7-1.64-.78-.21-.08-.37-.12-.53.12-.16.25-.62.78-.76.94-.14.17-.27.19-.51.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.29.36-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.11-.53-1.28-.73-1.75-.19-.46-.39-.39-.53-.4-.14 0-.3-.01-.46-.01-.16 0-.43.06-.65.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.46-.28z" clipRule="evenodd"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </section>

          <Footer />
          <FloatingIcons />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error rendering SindhudurgCabServicePage:", error);
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
