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
export default function WardhaCabServicePage() {
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
        <div className="relative h-[550px]">
          <div className="absolute inset-0">
            <Image
              src="/images/wardha.jpg"
              alt="Wardha City"
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
                  Wardha Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Looking for Cab In Wardha
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  WardhaCab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip from Wardha Maharashtra and Other Cities. Book your next Cab with WTL and get discount on total fare to Wardha.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50">
          {/* About Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Best Cab Services in Wardha – Reliable & Affordable Travel
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Are you looking for the best cab services in Wardha? Whether you need a Pune to Wardha cab service or a Wardha to Pune cab service, Worldtriplink provides the most reliable, comfortable, and affordable travel options.
              </p>
            </div>

            {/* Why Choose Us Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Worldtriplink for Cab Services in Wardha?</h3>
              <p className="text-xl text-gray-600 mb-8">At Worldtriplink, we prioritize customer satisfaction by offering:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">24/7</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">24/7 Service Availability</h3>
                <p className="text-gray-600">Book a cab anytime, anywhere.</p>
              </div>
              <div className="group bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-8 border border-purple-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">₹</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Transparent Pricing</h3>
                <p className="text-gray-600">No hidden charges; pay only what you see.</p>
              </div>
              <div className="group bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 border border-green-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">👨‍✈️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Professional Drivers</h3>
                <p className="text-gray-600">Ensuring a safe and smooth journey.</p>
              </div>
              <div className="group bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-8 border border-amber-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">🚗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Diverse Fleet Options</h3>
                <p className="text-gray-600">Choose from hatchbacks, sedans, SUVs, and luxury vehicles.</p>
              </div>
              <div className="group bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-8 border border-red-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">Easy Online Booking</h3>
                <p className="text-gray-600">Hassle-free booking with multiple payment options.</p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Cab Services in Wardha</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Local Cab Service in Wardha</h3>
                <p className="text-gray-600">For business meetings, shopping, or sightseeing, our cab service in Wardha ensures quick and comfortable travel within the city.</p>
              </div>
              <div className="group bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Outstation Cab Services from Wardha</h3>
                <p className="text-gray-600">Planning a trip outside Wardha? Book our outstation cabs for a hassle-free journey to Pune, Mumbai, Nagpur, or other destinations.</p>
              </div>
              <div className="group bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Pune to Wardha Cab Services</h3>
                <p className="text-gray-600">Looking for a Pune to Wardha cab service? We offer one-way and round-trip cabs with affordable pricing and multiple cab options.</p>
              </div>
              <div className="group bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">Wardha to Pune Cab Services</h3>
                <p className="text-gray-600">If you need a Wardha to Pune cab service, we provide a comfortable ride with flexible pickup and drop-off locations.</p>
              </div>
              <div className="group bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-6 border border-red-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">5</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">Corporate & Employee Transportation</h3>
                <p className="text-gray-600">We offer cab services for employees and corporate offices, ensuring timely pick-up and drop-off services.</p>
              </div>
              <div className="group bg-gradient-to-br from-cyan-50 to-white rounded-xl shadow-lg p-6 border border-cyan-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">6</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">Hotel & Flight Booking Services</h3>
                <p className="text-gray-600">Apart from cab services, we also assist with hotel and flight bookings, making travel convenient for our customers.</p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Route-wise Pricing and Kilometers Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Distance (km)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Cab Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pune to Wardha</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">510 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hatchback</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pune to Wardha</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">510 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedan</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8900</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pune to Wardha</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">510 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SUV</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wardha to Pune</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">510 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hatchback</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wardha to Pune</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">510 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedan</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wardha to Pune</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">510 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SUV</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wardha Local Travel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50-100 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hatchback</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wardha Local Travel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50-100 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedan</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wardha Local Travel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50-100 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SUV</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Types of Cabs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Types of Cabs Available</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">🚗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Hatchbacks</h3>
                <p className="text-gray-600">Budget-friendly, ideal for solo or small group travel.</p>
              </div>
              <div className="group bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">🚙</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Sedans</h3>
                <p className="text-gray-600">Comfortable rides for small families and business travel.</p>
              </div>
              <div className="group bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 w-fit mb-4">
                  <span className="text-white text-lg font-semibold">🚛</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">SUVs</h3>
                <p className="text-gray-600">Spacious and ideal for group travel and long-distance trips.</p>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">About Us – Worldtriplink</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-8">
                Worldtriplink was established in 2016 in Pune with a mission to provide affordable and comfortable cab services across India. Over time, we have broadened our range of services to include:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Outstation Cabs: Covering major cities across India.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Corporate Transportation: Safe and timely employee transport solutions.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Daily Pick-up & Drop Services: Ideal for schools, colleges, and offices.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Hotel & Flight Bookings: Complete travel solutions under one platform.
                </li>
              </ul>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div ref={personalCabsCounter.elementRef} className="text-4xl font-bold text-blue-600 mb-2">
                  {personalCabsCounter.count}+
                </div>
                <p className="text-gray-600">Personal Cabs operating across India</p>
              </div>
              <div className="text-center">
                <div ref={registeredCabsCounter.elementRef} className="text-4xl font-bold text-purple-600 mb-2">
                  {registeredCabsCounter.count}+
                </div>
                <p className="text-gray-600">Registered Cabs in our fleet</p>
              </div>
              <div className="text-center">
                <div ref={citiesCounter.elementRef} className="text-4xl font-bold text-green-600 mb-2">
                  {citiesCounter.count}+
                </div>
                <p className="text-gray-600">Cities Covered with reliable services</p>
              </div>
              <div className="text-center">
                <div ref={officesCounter.elementRef} className="text-4xl font-bold text-amber-600 mb-2">
                  {officesCounter.count}+
                </div>
                <p className="text-gray-600">Corporate Clients served</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions (FAQs)</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem
                question="What is the best cab service in Wardha?"
                answer="Worldtriplink offers the best cab services in Wardha, ensuring affordability, safety, and reliability."
              />
              <FaqItem
                question="How can I book a Pune to Wardha cab service?"
                answer="You can book online through our platform or call our customer support. We offer multiple payment options for a hassle-free experience."
              />
              <FaqItem
                question="Is it safe to travel at night with Worldtriplink cabs?"
                answer="Yes, our cabs are equipped with GPS tracking, and our drivers are trained for night travel, ensuring safety at all times."
              />
              <FaqItem
                question="Can I book a round-trip cab from Wardha to Pune?"
                answer="Yes, we offer both one-way and round-trip cab services at competitive prices."
              />
              <FaqItem
                question="Do you provide hourly rentals in Wardha?"
                answer="Yes, we offer hourly rental services for local travel within Wardha, allowing flexibility for travelers."
              />
            </div>
          </section>

          {/* Contact Section */}
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
                  Experience the best cab service in Ahmednagar with our professional and reliable transportation solutions.
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
    console.error("Error rendering Wardha Cab Service page:", error);
    setHasError(true);
    return null;
  }
}
