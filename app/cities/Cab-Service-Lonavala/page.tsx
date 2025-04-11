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
export default function LonavalaCabServicePage() {
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
              src="/images/lonavala.jpg"
              alt="Lonavala City"
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
                  Lonavala Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  WTL Tourism Pvt. Ltd. – Premium Car Rental Services in Lonavala
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Looking for the best car hire in Lonavala? WTL Tourism Pvt. Ltd. (World Trip Link) offers premium and affordable car rental services in Lonavala.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50">
          {/* Why Choose Us Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Why Choose Our Car Rental Service in Lonavala?
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p>Whether you need a one-way taxi from Mumbai to Lonavala, a round-trip cab from Pune to Lonavala, or a local sightseeing cab, we have got you covered with our well-maintained fleet and professional drivers.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">₹</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Affordable Pricing</h3>
                <p className="text-gray-600">Transparent fare structure with no hidden costs.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">🚗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Multiple Car Options</h3>
                <p className="text-gray-600">Choose from hatchbacks, sedans, SUVs, and luxury cars.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">⇌</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">One-Way & Round-Trip</h3>
                <p className="text-gray-600">Flexible travel options for your convenience.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">⏰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">24/7 Availability</h3>
                <p className="text-gray-600">Book anytime, anywhere.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">👨‍✈️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">Trained Drivers</h3>
                <p className="text-gray-600">Safe and reliable travel experience.</p>
              </div>
            </div>
          </section>

          {/* Mumbai to Lonavala Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Mumbai to Lonavala Cab Service</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Planning a trip from Mumbai to Lonavala? Our Mumbai to Lonavala cab service ensures a hassle-free and comfortable journey. 
                </p>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Distance & Taxi Fare</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span>
                      Distance: 83 km (Approx. 2 hours)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span>
                      One-way taxi fare: Starting from ₹1,800
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span>
                      Round-trip fare: Custom pricing available
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/lonavala.jpg"
                  alt="Mumbai to Lonavala Route"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Pune to Lonavala Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/lonavala2.jpg"
                  alt="Pune to Lonavala Route"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pune to Lonavala Cab Service</h2>
                <p className="text-lg text-gray-600 mb-6">
                  For travelers looking for a Pune to Lonavala cab service, WTL Tourism Pvt. Ltd. offers the most affordable and convenient options. Whether it's a one-way trip or a round-trip journey, our well-maintained vehicles and experienced drivers ensure a smooth ride.
                </p>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Distance & Cab Fare</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span>
                      Distance: 65 km (Approx. 1.5 hours)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span>
                      One-way cab fare: Starting from ₹1,500
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="mr-2">•</span>
                      Round-trip fare: Custom pricing available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Local Car Rental Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Local Car Rental in Lonavala
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Lonavala is a beautiful hill station known for its waterfalls, caves, and scenic viewpoints. Our car hire in Lonavala service allows you to explore the city's attractions comfortably.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tiger's Point</h3>
                <p className="text-gray-600">Enjoy breathtaking valley views.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Bhushi Dam</h3>
                <p className="text-gray-600">A popular monsoon attraction.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Karla and Bhaja Caves</h3>
                <p className="text-gray-600">Historic Buddhist caves carved into rock.</p>
              </div>
              <div className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Rajmachi Fort</h3>
                <p className="text-gray-600">Perfect for trekkers and adventure lovers.</p>
              </div>
            </div>
          </section>

          {/* Why Lonavala Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Why Lonavala Should Be Your Next Destination
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="prose lg:prose-lg">
                <p className="text-lg text-gray-600">
                  Lonavala offers the perfect escape for those seeking serenity amidst nature. Its scenic beauty, cool climate, and adventure-packed activities make it a top destination for tourists. Whether you're a nature lover or someone looking for adventure, Lonavala offers a wide range of options for everyone.
                </p>
                <p className="text-lg text-gray-600 mt-4">
                  Besides its natural beauty, Lonavala has a rich historical and cultural heritage. The famous Karla and Bhaja caves, with their intricate carvings and structures, give you a glimpse into India's ancient Buddhist history. For the adventure seekers, trekking to Rajmachi Fort or visiting Tiger's Point to witness panoramic views of the valley is an unforgettable experience.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/lonavala.jpg"
                  alt="Lonavala Attractions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* About WTL Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-8">About WTL Pvt Ltd</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Worldtriplink was established in 2016 in Pune to provide reliable and affordable cab services across India. Over the years, we have grown significantly, expanding our services to include:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3">Outstation Cabs</h3>
                <p className="text-gray-300">Connecting major cities across India.</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3">Employee Transportation</h3>
                <p className="text-gray-300">Ensuring hassle-free office commutes.</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3">Daily Pick-up & Drop</h3>
                <p className="text-gray-300">For schools, colleges, and offices.</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3">Hotel & Flight Bookings</h3>
                <p className="text-gray-300">Complete travel solutions under one roof.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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

          {/* Price Table Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Mumbai to Lonavala Taxi Price Chart</h2>
                <p className="text-lg text-gray-600">Transparent pricing for all your travel needs</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hatchback</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sedan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUV</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mumbai to Lonavala</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">83 km</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,800</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,200</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹3,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mumbai Airport to Lonavala</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">90 km</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,500</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹3,500</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pune to Lonavala</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">65 km</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,500</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,800</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹2,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                  question="What are the steps to book a taxi from Mumbai to Lonavala?"
                  answer="You can book a cab through our website or contact us via WhatsApp at 9112085055 | 9130030054."
                />
                <FaqItem
                  question="What is the Mumbai to Lonavala taxi fare?"
                  answer="The one-way taxi fare starts from ₹1,800. Round-trip fares vary based on duration and vehicle type."
                />
                <FaqItem
                  question="Do you offer airport pickup and drop services?"
                  answer="Yes, we offer Mumbai airport to Lonavala and Pune airport to Lonavala cab services."
                />
                <FaqItem
                  question="Is it possible to hire a taxi for sightseeing in and around Lonavala?"
                  answer="Absolutely! Our car rental in Lonavala is perfect for local sightseeing."
                />
                <FaqItem
                  question="What are the best travel options from Pune to Lonavala?"
                  answer="You can book our Pune to Lonavala cab for a comfortable and affordable ride."
                />
                <FaqItem
                  question="How far is Lonavala from Mumbai and Pune?"
                  answer="Lonavala is approximately 83 km from Mumbai and 65 km from Pune, making it an easy and quick getaway from both cities."
                />
                <FaqItem
                  question="Is the taxi fare fixed for a one-way trip?"
                  answer="The taxi fare for a one-way trip is generally fixed but may vary based on the car type and travel duration."
                />
                <FaqItem
                  question="Are the drivers safe and experienced?"
                  answer="Yes, all our drivers are professionally trained, verified, and experienced, ensuring a safe and comfortable ride."
                />
                <FaqItem
                  question="Can I customize my itinerary for local sightseeing in Lonavala?"
                  answer="Yes, we offer customizable sightseeing packages based on your preferences. Let us know your plans, and we'll tailor the service accordingly."
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-16 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Book Your Lonavala Cab Service with WTL Tourism Pvt. Ltd. Today!</h2>
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
                  💬 WhatsApp: 9130030053
                </Link>
              </div>
              <p className="mt-4 text-lg text-white/80">Experience a smooth, reliable, and budget-friendly travel experience with us!</p>
              <p className="mt-2 text-white/80">🌍 Website: www.worldtriplink.com</p>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    console.error("Error rendering LonavalaCabServicePage:", error);
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