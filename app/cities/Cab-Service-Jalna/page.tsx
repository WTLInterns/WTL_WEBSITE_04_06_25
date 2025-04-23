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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
export default function JalnaCabServicePage() {
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
              src="/images/jalna.jpg"
              alt="Jalna City"
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
                  Jalna Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  WTL Tourism Pvt. Ltd. – Reliable Cab Service in Jalna
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Looking for a cab service in Jalna that offers comfort, reliability, and affordability? WTL Tourism Pvt. Ltd. (World Trip Link) is your trusted travel partner for all your transportation needs.
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
                Why Choose WTL Tourism Pvt. Ltd. for Cab Services in Jalna?
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you need a Jalna to Pune cab service, Jalna to Mumbai cab service, or local travel within Jalna, we provide well-maintained vehicles, professional drivers, and the best pricing in the industry.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Affordable Pricing</h3>
                <p className="text-gray-600">Transparent and competitive rates with no hidden charges.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">24/7 Availability</h3>
                <p className="text-gray-600">Book your ride anytime, anywhere.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Multiple Vehicle Options</h3>
                <p className="text-gray-600">Choose from sedans, SUVs, and luxury cars.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Flexible Travel Plans</h3>
                <p className="text-gray-600">One-way and round-trip options available.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">Professional Drivers</h3>
                <p className="text-gray-600">Experienced, courteous, and well-trained drivers.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">Safe & Comfortable Ride</h3>
                <p className="text-gray-600">Clean and well-maintained cabs for a smooth journey.</p>
              </div>
            </div>
          </section>

          {/* Outstation Routes Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Cab Services in Jalna – Routes & Pricing
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto">
              We provide reliable cab services for multiple routes from Jalna. Below is a detailed pricing chart for different routes and cab types:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">Route</th>
                    <th className="py-4 px-6 text-left">Distance (km)</th>
                    <th className="py-4 px-6 text-left">Sedan (₹/km)</th>
                    <th className="py-4 px-6 text-left">SUV (₹/km)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Jalna to Pune</td>
                    <td className="py-4 px-6">310 km</td>
                    <td className="py-4 px-6">₹12/km</td>
                    <td className="py-4 px-6">₹15/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Jalna to Mumbai</td>
                    <td className="py-4 px-6">420 km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Jalna to Pune Airport</td>
                    <td className="py-4 px-6">315 km</td>
                    <td className="py-4 px-6">₹12/km</td>
                    <td className="py-4 px-6">₹15/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Jalna Local (Full Day)</td>
                    <td className="py-4 px-6">Unlimited</td>
                    <td className="py-4 px-6">Fixed ₹2500</td>
                    <td className="py-4 px-6">Fixed ₹3500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Popular Places Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-blue-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                Popular Places to Visit in Jalna
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore the historical landmarks and cultural heritage of Jalna with our reliable cab services
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="p-6 border border-gray-100 bg-gradient-to-br from-blue-50 to-white">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🕉️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Matsyodari Devi Temple</h3>
                  <p className="text-gray-600">A famous religious site.</p>
                </div>
              </div>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="p-6 border border-gray-100 bg-gradient-to-br from-purple-50 to-white">
                  <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🏛️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Jalna Fort</h3>
                  <p className="text-gray-600">A historical landmark in the city.</p>
                </div>
              </div>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="p-6 border border-gray-100 bg-gradient-to-br from-amber-50 to-white">
                  <div className="bg-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🏰</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Gautala Autramghat Wildlife Sanctuary</h3>
                  <p className="text-gray-600">Perfect for nature lovers.</p>
                </div>
              </div>
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="p-6 border border-gray-100 bg-gradient-to-br from-green-50 to-white">
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🌊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Anandi Swami Temple</h3>
                  <p className="text-gray-600">A place of spiritual significance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                How to Book a Cab in Jalna?
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Booking a Jalna cab service with WTL Tourism Pvt. Ltd. is quick and simple.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📞</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Call or WhatsApp</h3>
                <div className="space-y-2">
                  <a href="tel:9112085055" className="block text-xl font-semibold text-white hover:text-blue-100 transition-colors">
                    +91 91120 85055
                  </a>
                  <a href="tel:9130030053" className="block text-xl font-semibold text-white hover:text-blue-100 transition-colors">
                    +91 91300 30054
                  </a>
                </div>
              </div>
              <a 
                href="https://www.worldtriplink.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block group h-full"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🌐</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors">Online Booking</h3>
                  <p className="text-xl font-semibold text-white hover:text-purple-100 transition-colors">
                    www.worldtriplink.com
                  </p>
                </div>
              </a>
            </div>
          </section>

          {/* About WTL Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-blue-50 to-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                About WTL Pvt Ltd
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                Worldtriplink was established in 2016 in Pune to provide reliable and affordable cab services across India. Over the years, we have grown significantly, expanding our services to include:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🚗</div>
                <h3 className="text-xl font-semibold mb-3">Outstation Cabs</h3>
                <p className="text-white/90">Connecting major cities across India.</p>
              </div>
              <div className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🏢</div>
                <h3 className="text-xl font-semibold mb-3">Employee Transportation</h3>
                <p className="text-white/90">Ensuring hassle-free office commutes.</p>
              </div>
              <div className="group bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">🚌</div>
                <h3 className="text-xl font-semibold mb-3">Daily Pick-up & Drop</h3>
                <p className="text-white/90">For schools, colleges, and offices.</p>
              </div>
              <div className="group bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-8 text-white transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">✈️</div>
                <h3 className="text-xl font-semibold mb-3">Hotel & Flight Bookings</h3>
                <p className="text-white/90">Complete travel solutions under one roof.</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <span ref={personalCabsCounter.elementRef}>{personalCabsCounter.count}+</span>
                </div>
                <p className="text-gray-600">Personal Cabs across India</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <span ref={registeredCabsCounter.elementRef}>{registeredCabsCounter.count}+</span>
                </div>
                <p className="text-gray-600">Registered Cabs in our network</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  <span ref={citiesCounter.elementRef}>{citiesCounter.count}+</span>
                </div>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  <span ref={officesCounter.elementRef}>{officesCounter.count}+</span>
                </div>
                <p className="text-gray-600">Corporate Offices served</p>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              FAQs – Cab Services in Jalna
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem 
                question="What is the cost of a Jalna to Pune cab?" 
                answer="The starting price is ₹12/km for sedans and ₹15/km for SUVs." 
              />
              <FaqItem 
                question="Are your cabs available 24/7?" 
                answer="Yes, our cabs are available round-the-clock for one-way, round-trip, and local rides." 
              />
              <FaqItem 
                question="Can I book a cab for sightseeing in Jalna?" 
                answer="Yes, we offer full-day and hourly rental cabs for local sightseeing." 
              />
              <FaqItem 
                question="Do you provide airport pickup and drop services?" 
                answer="Yes, we offer airport transfers to and from Pune and Mumbai." 
              />
              <FaqItem 
                question="What types of cabs are available?" 
                answer="We have sedans, SUVs, and luxury cars for travel within and outside Jalna." 
              />
              <FaqItem 
                question="How can I pay for my cab booking?" 
                answer="We accept cash, UPI, net banking, and online payment gateways." 
              />
              <FaqItem 
                question="Can I modify or cancel my booking?" 
                answer="Yes, modifications and cancellations are allowed with prior notice. Cancellation charges may apply." 
              />
              <FaqItem 
                question="Is it safe to travel with WTL Tourism Pvt. Ltd.?" 
                answer="Absolutely! Our drivers are experienced, background-verified, and professional, ensuring a safe journey." 
              />
              <FaqItem 
                question="Do you offer one-way cabs from Jalna to Pune?" 
                answer="Yes, we provide one-way cab services at affordable rates." 
              />
              <FaqItem 
                question="How can I get the best deal on cab bookings?" 
                answer="To avail the best deals, book in advance through our website or WhatsApp." 
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
                  Experience a comfortable and affordable ride with WTL Tourism Pvt. Ltd. – Your Trusted Travel Partner in Jalna!
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
                        <a href="tel:9130030053" className="block text-xl font-bold text-white hover:text-blue-200 transition-colors">
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
    setHasError(true);
    return null;
  }
}
