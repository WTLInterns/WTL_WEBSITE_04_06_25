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
import { useIntersectionCounter } from '@/app/hooks/useIntersectionCounter'
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
export default function NashikCabServicePage() {
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
          <Navbar onTabChange={handleTabChange} disableForm={true} />
          
          {/* Hero Section with Background */}
          <div className="relative h-[550px]">
            <div className="absolute inset-0">
              <Image
                src="/images/nashik.jpg"
                alt="Nashik City"
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
                    {activeTab === "cabs" ? "Cab Service in Nashik" :
                     activeTab === "buses" ? "Bus Service in Nashik" :
                     activeTab === "flights" ? "Flight Booking in Nashik" :
                     activeTab === "hotels" ? "Hotel Booking in Nashik" :
                     activeTab === "homestays" ? "Homestay Booking in Nashik" :
                     activeTab === "holiday" ? "Holiday Packages from Nashik" :
                     "Cab Service in Nashik"}
                  </h1>
                  <p className="text-xl text-white/90 max-w-3xl mx-auto">
                    Looking for a cab service in Nashik that offers affordability, comfort, and reliability? Book with WTL Tourism for seamless travel experience.
                  </p>
                </div>
                
                {renderBookingForm()}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="bg-gray-50">
            {/* About Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  WTL Tourism Pvt. Ltd. - Best Cab Service in Nashik
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  WTL Tourism Pvt. Ltd. (World Trip Link) provides top-notch cab booking services to make your travel seamless. Whether you need outstation cabs in Nashik, Nashik to Pune cab service, or Nashik to Mumbai cab, we have well-maintained vehicles, professional drivers, and the best rates in the industry. Our fleet includes sedans, SUVs, and premium cars, ensuring a comfortable journey for individuals, families, and corporate travelers. Whether it's a one-way trip, round-trip, or an hourly rental, our services are designed to offer the best travel experience.
                </p>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Why Choose WTL Tourism Pvt. Ltd. for Cab Services in Nashik?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
                  <p className="text-white/90">Transparent rates with no hidden charges.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
                  <p className="text-white/90">Book your cab anytime, anywhere.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Multiple Car Options</h3>
                  <p className="text-white/90">Choose from sedans, SUVs, and luxury vehicles.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">One-Way & Round-Trip Options</h3>
                  <p className="text-white/90">Flexible travel plans to suit your needs.</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Easy Online Booking</h3>
                  <p className="text-white/90">Quick reservations via WhatsApp or website.</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Professional Drivers</h3>
                  <p className="text-white/90">Well-trained and courteous drivers ensure a smooth and safe journey.</p>
                </div>
              </div>
            </section>

            {/* Taxi Service Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Taxi Service in Nashik – Comfortable & Hassle-Free Rides
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
                WTL Tourism Pvt. Ltd. offers the most reliable taxi service in Nashik, ensuring a comfortable ride for leisure, work, or pilgrimage. Our professional drivers take the best routes to make your journey smooth and hassle-free.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Affordable Pricing</h3>
                  <p className="text-gray-600">Fixed and transparent rates</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-emerald-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Well-Maintained Fleet</h3>
                  <p className="text-gray-600">AC & Non-AC cabs available</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Options</h3>
                  <p className="text-gray-600">One-way and round-trip available</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-orange-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Pickup Points</h3>
                  <p className="text-gray-600">Across Nashik city</p>
                </div>
              </div>
            </section>

            {/* Nashik to Pune Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Nashik to Pune Cab Service – Safe & Affordable Travel
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
                Need a Nashik to Pune cab service for business, leisure, or personal travel? Our cabs are available 24/7 with flexible travel options. Whether it's a last-minute booking or a scheduled ride, we ensure a comfortable and safe journey from Nashik to Pune.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">On-time Service</h3>
                  <p className="text-white/90">Punctual pickups & drop-offs</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                  <p className="text-white/90">No hidden charges</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Expert Drivers</h3>
                  <p className="text-white/90">Local route expertise</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Multiple Vehicles</h3>
                  <p className="text-white/90">Sedan, SUV, luxury cars</p>
                </div>
              </div>
            </section>

            {/* Nashik to Mumbai Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Nashik to Mumbai Cab Service – Reliable & Efficient Travel
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
                Our Nashik to Mumbai cab service is designed for travelers who seek a reliable and efficient ride. We offer affordable pricing and well-maintained vehicles to make your travel experience enjoyable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Fixed Fares</h3>
                  <p className="text-white/90">Affordable and transparent pricing</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Well-Maintained Cars</h3>
                  <p className="text-white/90">Smooth and comfortable journey</p>
                </div>
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Experienced Drivers</h3>
                  <p className="text-white/90">Best route knowledge</p>
                </div>
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                  <p className="text-white/90">Via website or WhatsApp</p>
                </div>
              </div>
            </section>

            {/* Local Cab Service Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Local Cab Service in Nashik – Explore the City with Ease
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
                Nashik is home to historical temples, vineyards, and scenic landscapes. Whether you're a tourist or a local resident, our cabs in Nashik allow you to explore the city comfortably.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Sula Vineyards</h3>
                  <p className="text-blue-800">Perfect for wine lovers and a must-visit destination in Nashik.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-2">Trimbakeshwar Temple</h3>
                  <p className="text-purple-800">A sacred site dedicated to Lord Shiva and one of the 12 Jyotirlingas.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-200">
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">Pandavleni Caves</h3>
                  <p className="text-emerald-800">A historic attraction with ancient caves showcasing Buddhist heritage.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Anjneri Hill</h3>
                  <p className="text-orange-800">A trekking destination offering scenic views of the surrounding landscape.</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-pink-200">
                  <h3 className="text-xl font-bold text-pink-900 mb-2">Saptashrungi Temple</h3>
                  <p className="text-pink-800">A must-visit religious site and one of the Shakti Peethas.</p>
                </div>
              </div>
            </section>

            {/* Booking Options Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Booking Options & How to Reserve a Cab?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
                Booking a Nashik to Pune taxi or Nashik to Mumbai cab with WTL Tourism Pvt. Ltd. is quick and easy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Call/WhatsApp</h3>
                  <p className="text-white/90">9112085055 | 9130030053</p>
                </div>
                <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Online Booking</h3>
                  <p className="text-white/90">www.worldtriplink.com</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
                  <p className="text-white/90">Real-time availability</p>
                </div>
                <div className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Social Media</h3>
                  <p className="text-white/90">Follow us on Facebook and Instagram</p>
                </div>
              </div>
            </section>

            {/* About WTL Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                About WTL Pvt Ltd
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
                Worldtriplink was established in 2016 in Pune to provide reliable and affordable cab services across India. Over the years, we have grown significantly, expanding our services to include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Outstation Cabs</h3>
                  <p className="text-white/90">Connecting major cities across India</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Employee Transportation</h3>
                  <p className="text-white/90">Hassle-free office commutes</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Daily Services</h3>
                  <p className="text-white/90">For schools, colleges, and offices</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-xl font-bold mb-2">Travel Solutions</h3>
                  <p className="text-white/90">Hotel & Flight bookings</p>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                FAQs – Cab Services in Nashik
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <FaqItem 
                  question="What is the cost of a Nashik to Pune cab?" 
                  answer="Our Nashik to Pune cab service starts at ₹12/km for sedans and ₹15/km for SUVs, ensuring an affordable and comfortable journey." 
                />
                <FaqItem 
                  question="Are your cabs available 24/7?" 
                  answer="Yes, our cabs are available 24/7 for one-way, round-trip, and local travel." 
                />
                <FaqItem 
                  question="Can I book a cab for local sightseeing in Nashik?" 
                  answer="Yes, we provide full-day and hourly rental cabs for local sightseeing in Nashik." 
                />
                <FaqItem 
                  question="Do you provide airport pickup and drop services?" 
                  answer="Yes, we offer airport transfers from Mumbai and Pune airports to Nashik." 
                />
                <FaqItem 
                  question="What types of cabs are available for booking?" 
                  answer="We offer sedans, SUVs, and luxury cars for travel within and outside Nashik." 
                />
                <FaqItem 
                  question="How can I pay for my cab booking?" 
                  answer="We accept payments via cash, UPI, net banking, and online payment gateways." 
                />
                <FaqItem 
                  question="Can I modify or cancel my booking?" 
                  answer="Yes, you can modify or cancel your booking with prior notice. Cancellation charges may apply." 
                />
                <FaqItem 
                  question="Is it safe to travel with WTL Tourism Pvt. Ltd.?" 
                  answer="Absolutely! Our drivers are experienced, verified, and professional, ensuring a safe journey." 
                />
                <FaqItem 
                  question="Do you offer one-way cabs from Nashik to Pune?" 
                  answer="Yes, we provide affordable one-way cabs from Nashik to Pune and vice versa." 
                />
                <FaqItem 
                  question="How can I get the best deal on cab bookings?" 
                  answer="To get the best deal, book in advance via our website or WhatsApp." 
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
                    Book Your Ride with WTL Tourism Pvt. Ltd. Today!
                  </h2>
                  <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                    Experience the best cab service in Nashik with our professional and reliable transportation solutions.
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
        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Nashik Cab Service page:", error);
    setHasError(true);
    return null;
  }
}
