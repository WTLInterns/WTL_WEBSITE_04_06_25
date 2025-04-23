"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Footer from "@/components/footer"
import Navbar from "@/components/Navbar"
import CabBookingForm from "@/components/CabBookingForm"
import BusBookingForm from "@/components/BusBookingForm"
import HotelBookingForm from "@/components/HotelBookingForm"
import { useIntersectionCounter } from '@/hooks/useIntersectionCounter'
import FlightBookingForm from "@/components/FlightBookingForm"
import HomestaysBookingForm from "@/components/HomestaysBookingForm"
import HolidayBookingForm from "@/components/HolidayBookingForm"
import FloatingIcons from "@/components/FloatingIcons"

// FAQ Item Component
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

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
  )
}

// Main Page Component
export default function KolhapurCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('cabs');

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

  const getBackgroundImage = () => {
    switch (activeTab) {
      case 'cabs':
        return '/images/cab-bg.jpg';
      case 'buses':
        return '/images/bus-bg.jpg';
      case 'flights':
        return '/images/flight-bg.jpg';
      case 'hotels':
        return '/images/hotel-bg.jpg';
      case 'homestays':
        return '/images/homestay-bg.jpg';
      case 'holiday':
        return '/images/holiday-bg.jpg';
      default:
        return '/images/cab-bg.jpg';
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
      <div className="min-h-screen flex flex-col">
        <div className="relative z-10 flex-grow">
          <Navbar onTabChange={handleTabChange} />
          
          {/* Hero Section with Background */}
          <div className="relative h-[550px]">
            <div className="absolute inset-0">
              <Image
                src="/images/kolhapur.jpg"
                alt="Kolhapur City"
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
                    {activeTab === "cabs" ? "Cab Service in Kolhapur" :
                     activeTab === "buses" ? "Bus Service in Kolhapur" :
                     activeTab === "flights" ? "Flight Booking in Kolhapur" :
                     activeTab === "hotels" ? "Hotel Booking in Kolhapur" :
                     activeTab === "homestays" ? "Homestay Booking in Kolhapur" :
                     activeTab === "holiday" ? "Holiday Packages from Kolhapur" :
                     "Cab Service in Kolhapur"}
                  </h1>
                  <p className="text-xl text-white/90 max-w-3xl mx-auto">
                    {activeTab === "cabs" ? "Book reliable and comfortable cab services in Kolhapur" :
                     activeTab === "buses" ? "Find the best bus routes and book your tickets" :
                     activeTab === "flights" ? "Search and book flights from Kolhapur" :
                     activeTab === "hotels" ? "Discover the best hotels in Kolhapur" :
                     activeTab === "homestays" ? "Experience authentic local living in Kolhapur" :
                     activeTab === "holiday" ? "Explore exciting holiday packages from Kolhapur" :
                     "Book reliable and comfortable cab services in Kolhapur"}
                  </p>
                </div>
                
                {renderBookingForm()}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-gray-50">
            {/* Best Cab Service Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Best Cab Service in Kolhapur for Local & Outstation Rides
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We are committed to providing the most reliable and comfortable travel experience in Kolhapur. Our services extend from local commutes to long-distance trips, making us your one-stop shop for all travel needs.
                </p>
              </div>
            </section>

            {/* Kolhapur to Pune Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Kolhapur to Pune Cab & Taxi Service
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Planning a trip from Kolhapur to Pune? Book our Kolhapur to Pune taxi at the most competitive rates. Our comfortable cabs ensure a hassle-free journey, whether you're traveling for business, leisure, or family visits. We prioritize your convenience, with a fleet of well-maintained vehicles that offer a smooth ride throughout the journey.
                </p>
              </div>
            </section>

            {/* Pune to Kolhapur Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pune to Kolhapur Cab Service
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Need a Pune to Kolhapur cab? WTL Tourism Pvt. Ltd. offers one-way and round-trip taxi services with transparent pricing, professional drivers, and a smooth ride experience. We ensure that your trip between these two cities is as comfortable and pleasant as possible. With WTL Tourism, you can travel stress-free, knowing you're in good hands.
                </p>
              </div>
            </section>

            {/* Local Cab Service Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Local Cab Service in Kolhapur
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Navigating within Kolhapur is now easier with our local cab service in Kolhapur. Whether you need a ride to Mahalaxmi Temple, Rankala Lake, or the New Palace, we provide full-day and hourly rental cabs tailored to your needs. Our drivers are knowledgeable about the city and can guide you to the most popular tourist spots or help with daily commutes. With WTL Tourism, your travel within Kolhapur is simplified, allowing you to enjoy your day without worrying about logistics.
                </p>
              </div>
            </section>

            {/* Service Cards */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-4">Best Cab Service</h3>
                  <p className="text-white/90">
                    Looking for the best cab service in Kolhapur? We offer top-rated cab services with professional drivers, well-maintained vehicles, and on-time pickups.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-4">Local Cab Service</h3>
                  <p className="text-white/90">
                    Navigating within Kolhapur is now easier with our local cab service. Whether you need a ride to Mahalaxmi Temple, Rankala Lake, or the New Palace.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-4">Outstation Travel</h3>
                  <p className="text-white/90">
                    Book our Kolhapur to Pune taxi at the most competitive rates. Our comfortable cabs ensure a hassle-free journey for business or leisure.
                  </p>
                </div>
              </div>
            </section>

            {/* Outstation Routes Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Popular Outstation Routes from Kolhapur
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <tr>
                      <th className="py-4 px-6 text-left">Destination</th>
                      <th className="py-4 px-6 text-left">Distance</th>
                      <th className="py-4 px-6 text-left">Sedan Rate</th>
                      <th className="py-4 px-6 text-left">SUV Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">Kolhapur to Pune</td>
                      <td className="py-4 px-6">233 Km</td>
                      <td className="py-4 px-6">₹11/km</td>
                      <td className="py-4 px-6">₹14/km</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">Kolhapur to Belgaum</td>
                      <td className="py-4 px-6">120 Km</td>
                      <td className="py-4 px-6">₹12/km</td>
                      <td className="py-4 px-6">₹15/km</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">Kolhapur to Mumbai</td>
                      <td className="py-4 px-6">400 Km</td>
                      <td className="py-4 px-6">₹11/km</td>
                      <td className="py-4 px-6">₹14/km</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">Kolhapur to Satara</td>
                      <td className="py-4 px-6">123 Km</td>
                      <td className="py-4 px-6">₹12/km</td>
                      <td className="py-4 px-6">₹15/km</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium">Local Kolhapur (Full Day)</td>
                      <td className="py-4 px-6">Unlimited</td>
                      <td className="py-4 px-6">Fixed ₹2500</td>
                      <td className="py-4 px-6">Fixed ₹3500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Why Choose WTL Tourism Pvt. Ltd. for Cab Services in Kolhapur?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">24/7 Availability</h3>
                      <p className="text-gray-600">Book your cab anytime, anywhere, and we'll be ready to serve you.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Affordable Pricing</h3>
                      <p className="text-gray-600">Get the best deal for cab service in Kolhapur with no hidden charges.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Professional Drivers</h3>
                      <p className="text-gray-600">Our experienced chauffeurs ensure a safe and comfortable ride.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Multiple Car Options</h3>
                      <p className="text-gray-600">Choose from sedans, SUVs, luxury cars, and more to match your preferences.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">One-Way & Round-Trip</h3>
                      <p className="text-gray-600">Flexible travel options for both one-way and round-trip journeys.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Easy Online Booking</h3>
                      <p className="text-gray-600">Quick and hassle-free booking via WhatsApp or our website.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section with Stats */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About WTL Tourism Pvt. Ltd.
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
                  Worldtriplink was established in 2016 in Pune to provide reliable and affordable cab services across India. Over the years, we have grown significantly, expanding our services to include outstation cabs, employee transportation services, daily pick-up & drop services, and hotel & flight bookings.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  {(() => {
                    const { count, elementRef } = useIntersectionCounter(30);
                    return (
                      <div ref={elementRef} className="text-4xl font-bold text-blue-600 mb-2">
                        {count}+
                      </div>
                    );
                  })()}
                  <div className="text-gray-600">Personal Cabs</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  {(() => {
                    const { count, elementRef } = useIntersectionCounter(500);
                    return (
                      <div ref={elementRef} className="text-4xl font-bold text-emerald-600 mb-2">
                        {count}+
                      </div>
                    );
                  })()}
                  <div className="text-gray-600">Registered Fleet</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  {(() => {
                    const { count, elementRef } = useIntersectionCounter(100);
                    return (
                      <div ref={elementRef} className="text-4xl font-bold text-purple-600 mb-2">
                        {count}+
                      </div>
                    );
                  })()}
                  <div className="text-gray-600">Cities Covered</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  {(() => {
                    const { count, elementRef } = useIntersectionCounter(50);
                    return (
                      <div ref={elementRef} className="text-4xl font-bold text-yellow-600 mb-2">
                        {count}+
                      </div>
                    );
                  })()}
                  <div className="text-gray-600">Corporate Solutions</div>
                </div>
              </div>
            </section>
            
            {/* FAQs Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <FaqItem 
                  question="What is the best cab service in Kolhapur?" 
                  answer="WTL Tourism Pvt. Ltd. is known for offering the best cab service in Kolhapur, with well-maintained cars, professional drivers, and transparent pricing." 
                />
                <FaqItem 
                  question="Do you provide a local cab service in Kolhapur?" 
                  answer="Yes, we provide reliable local cab service in Kolhapur for full-day rentals, sightseeing, and business travel. Our fleet ensures a smooth and comfortable experience." 
                />
                <FaqItem 
                  question="What is the cost of a Kolhapur to Pune cab?" 
                  answer="Our Kolhapur to Pune cab starts at ₹11/km for a sedan and ₹14/km for an SUV, ensuring budget-friendly and comfortable travel." 
                />
                <FaqItem 
                  question="Are cab services available in Kolhapur for outstation travel?" 
                  answer="Yes, our cab services are available in Kolhapur for outstation destinations like Pune, Mumbai, Satara, and Belgaum, ensuring your convenience no matter the destination." 
                />
                <FaqItem 
                  question="Can I book a cab service from Belgaum to Kolhapur?" 
                  answer="Yes, we offer a cab service from Belgaum to Kolhapur with competitive pricing and professional drivers to ensure your travel is comfortable." 
                />
                <FaqItem 
                  question="How can I get the best deal for a cab service in Kolhapur?" 
                  answer="To get the best deal for cab service in Kolhapur, book in advance through our website or WhatsApp at 9112085055 for exclusive offers." 
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
                    Experience the best cab service in Kolhapur with our professional and reliable transportation solutions.
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

                {/* Book Your Ride Now Button */}
                <div className="mt-12 text-center">
                  <Link 
                    href="/" 
                    className="inline-block bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Book Your Ride Now
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>

        <div className="relative z-10">
          <Footer />
          <FloatingIcons />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering Kolhapur Cab Service page:", error);
    setHasError(true);
    return null;
  }
}
