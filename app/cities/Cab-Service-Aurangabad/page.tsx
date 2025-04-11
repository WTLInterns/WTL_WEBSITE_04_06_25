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
export default function AurangabadCabServicePage() {
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
              src="/images/aurangabad.jpg"
              alt="Aurangabad City"
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
                  Sambhaji Nagar Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  WTL Tourism Pvt. Ltd. – Reliable Cab Service in Sambhaji Nagar
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Looking for a cab service in Sambhaji Nagar that provides comfort, affordability, and reliability? WTL Tourism Pvt. Ltd. (World Trip Link) offers top-notch cab booking services to make your travel seamless.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50">
          {/* Available Cabs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    Looking for Cab In Sambhaji Nagar?
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Sambhaji Nagar Cab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip from Sambhaji Nagar Maharashtra and Other Cities. Book your next Cab with WTL and get discount on total fare to Sambhaji Nagar.
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
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Choose Worldtriplink for Cab Services in Aurangabad?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Affordable and Transparent Pricing</h3>
                <p className="text-gray-600">At Worldtriplink, we pride ourselves on offering Pune to Aurangabad cab service rates that are both competitive and transparent. No hidden charges, no surprises.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Wide Range of Vehicles</h3>
                <p className="text-gray-600">We offer a range of vehicles to cater to your specific travel needs, from compact sedans to luxury SUVs.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Safe and Comfortable Journeys</h3>
                <p className="text-gray-600">Our vehicles are regularly serviced, and our experienced drivers ensure safe and timely journeys.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">✔</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Easy Booking Process</h3>
                <p className="text-gray-600">Quick and hassle-free booking through our website, app, or customer support team.</p>
              </div>
            </div>
          </section>

          {/* Pune to Aurangabad Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Pune to Aurangabad Cab Service: Your Travel Made Easy
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </h2>
                <p className="text-xl text-gray-600">
                  Experience a seamless journey with our professional cab service
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Comfortable Vehicles</h3>
                  <p className="text-gray-600">Choose from our range of well-maintained vehicles, from compact sedans to luxury SUVs.</p>
                </div>
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Experienced Drivers</h3>
                  <p className="text-gray-600">Our professional drivers ensure safe and timely journeys with local expertise.</p>
                </div>
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">No Hidden Fees</h3>
                  <p className="text-gray-600">Transparent pricing with no surprise costs for your journey.</p>
                </div>
                <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">Timely Arrival</h3>
                  <p className="text-gray-600">Punctual pick-up and drop-off services for your convenience.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Route Pricing & Cab Types: Affordable and Transparent Pricing
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Distance (km)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type of Cab</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pune to Aurangabad</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">230 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedan (Compact)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pune to Aurangabad</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">230 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SUV (Luxury)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Aurangabad to Pune</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">230 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedan (Compact)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Aurangabad to Pune</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">230 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SUV (Luxury)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Taxi Service in Aurangabad</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sedan (Compact)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Taxi Service in Aurangabad</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SUV (Luxury)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">Note: Prices are approximate and may vary based on demand, season, and vehicle availability.</p>
          </section>

          {/* About Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              About Us – Worldtriplink
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-lg text-gray-600">
                  Worldtriplink (WTL) was established in 2016 in Pune, with the goal of providing high-quality and affordable transportation services. We specialize in outstation cab services, employee transportation, daily pick-up & drop services, and hotel & flight bookings.
                </p>
                <p className="text-lg text-gray-600 mt-4">
                  With a fleet of over 30 personal cabs and 500+ registered cabs operating across India, we are your trusted partner for Pune to Aurangabad cab services and all your travel needs. With 100+ city holds and services for 50+ corporate offices, Worldtriplink is the name you can trust for comfort, safety, and affordability.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div ref={personalCabsCounter.elementRef} className="text-4xl font-bold text-blue-600 mb-4">
                    {personalCabsCounter.count}+
                  </div>
                  <p className="text-gray-600">Personal Cabs operating across India</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div ref={registeredCabsCounter.elementRef} className="text-4xl font-bold text-purple-600 mb-4">
                    {registeredCabsCounter.count}+
                  </div>
                  <p className="text-gray-600">Registered Cabs in our fleet</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div ref={citiesCounter.elementRef} className="text-4xl font-bold text-green-600 mb-4">
                    {citiesCounter.count}+
                  </div>
                  <p className="text-gray-600">Cities Covered with reliable services</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div ref={officesCounter.elementRef} className="text-4xl font-bold text-amber-600 mb-4">
                    {officesCounter.count}+
                  </div>
                  <p className="text-gray-600">Corporate Clients served</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem
                question="How can I book a Pune to Aurangabad cab service?"
                answer="Booking is easy! You can book online via our website or mobile app, or simply contact our customer support team."
              />
              <FaqItem
                question="What types of vehicles are available for Aurangabad to Pune cab services?"
                answer="We offer a variety of vehicles, including compact sedans, luxury SUVs, and larger vehicles for group travel."
              />
              <FaqItem
                question="How much does a Pune to Aurangabad cab service cost?"
                answer="Our rates start at INR 5,500 for a sedan and INR 8,500 for an SUV. Pricing may vary based on factors like vehicle type and season."
              />
              <FaqItem
                question="Can I use your taxi service in Aurangabad for sightseeing?"
                answer="Yes! Our taxi service in Aurangabad is perfect for sightseeing. We offer hourly and daily rental options so you can explore the city at your own pace."
              />
              <FaqItem
                question="Are your vehicles well-maintained?"
                answer="Yes, all our vehicles, including those for car rental in Aurangabad, are regularly serviced and well-maintained for your safety and comfort."
              />
              <FaqItem
                question="Do you offer taxi service in Aurangabad for outstation trips?"
                answer="Yes, we provide taxi service in Aurangabad for outstation travel. Whether you're heading to nearby cities or farther destinations, we've got you covered."
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
                  Experience the best cab service in Aurangabad with our professional and reliable transportation solutions.
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
    setHasError(true);
    return null;
  }
}
