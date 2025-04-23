"use client"

import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
import { useCounter } from "@/hooks/useCounter"
import Image from "next/image"
import Link from "next/link"
import CabBookingForm from "@/components/CabBookingForm"
import BusBookingForm from "@/components/BusBookingForm"
import FlightBookingForm from "@/components/FlightBookingForm"
import HotelBookingForm from "@/components/HotelBookingForm"
import HomestaysBookingForm from "@/components/HomestaysBookingForm"
import HolidayBookingForm from "@/components/HolidayBookingForm"
import FloatingIcons from "@/components/FloatingIcons"

interface FaqItemProps {
  question: string
  answer: string
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
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

export default function SataraCabServicePage() {
  const [hasError, setHasError] = useState(false)
  const [activeTab, setActiveTab] = useState("cabs")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const renderBookingForm = () => {
    switch (activeTab) {
      case "cabs":
        return <CabBookingForm />
      case "buses":
        return <BusBookingForm />
      case "flights":
        return <FlightBookingForm />
      case "hotels":
        return <HotelBookingForm />
      case "homestays":
        return <HomestaysBookingForm />
      case "holiday":
        return <HolidayBookingForm />
      default:
        return <CabBookingForm />
    }
  }

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
    )
  }

  try {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section */}
        <div className="relative h-[550px]">
          <div className="absolute inset-0">
            <Image
              src="/images/satara.jpg"
              alt="Satara City"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Cab Service in Satara
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Book reliable, affordable cab services in Satara for local travel, airport transfers, and outstation journeys
              </p>
            </div>
            
            {/* Booking Form */}
            {renderBookingForm()}
          </div>
        </div>

        {/* Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Cab Services in Satara
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-3 bg-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Airport Transfers
                </h3>
                <p className="text-gray-600 mb-4">
                  Reliable airport pickup and drop services with 24/7 availability. Book in advance for hassle-free travel to and from Pune International Airport.
                </p>
                <Link href="/" className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                  <span className="font-medium">Book Now</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-3 bg-yellow-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Local City Tours
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore Satara's attractions with our local city tour packages. Visit historical sites, gardens, and shopping areas with experienced drivers.
                </p>
                <Link href="/" className="flex items-center text-yellow-500 hover:text-yellow-600 transition-colors">
                  <span className="font-medium">Explore Tours</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Outstation Trips
                </h3>
                <p className="text-gray-600 mb-4">
                  Plan your outstation journey from Satara to popular destinations like Pune, Mumbai, Mahabaleshwar, and more with our comfortable cabs.
                </p>
                <Link href="/" className="flex items-center text-green-500 hover:text-green-600 transition-colors">
                  <span className="font-medium">View Destinations</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Outstation Routes */}
        <section className="min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
          <div className="max-w-[2000px] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Popular Outstation Routes from Satara
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-xl">
              <table className="w-full bg-white">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Distance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Travel Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Starting Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pune</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">112 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.5-3 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1,800</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mumbai</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">260 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-6 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹3,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mahabaleshwar</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">55 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.5 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1,200</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Kolhapur</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">120 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹2,200</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Shirdi</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">180 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹3,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose WTL Tourism Pvt. Ltd. for Cab Services in Satara?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
              <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
              <p className="text-white/90">Clear and upfront fares with no unexpected costs.</p>
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

        {/* Pune to Satara Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Pune to Satara Cab Service – Comfortable & Hassle-Free Rides
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
            Planning a trip from Pune to Satara? WTL Tourism Pvt. Ltd. offers the most reliable cab services from Pune to Satara, ensuring a comfortable ride for leisure, work, or pilgrimage. Our professional drivers take the best routes to make your journey smooth and hassle-free.
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
              <p className="text-gray-600">Across Pune city</p>
            </div>
          </div>
        </section>

        {/* Satara to Pune Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Satara to Pune Cab Service – Safe & Affordable Travel
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
            Need a Satara to Pune cab service for business, leisure, or personal travel? Our cabs are available 24/7 with flexible travel options. Whether it's a last-minute booking or a scheduled ride, we ensure a comfortable and safe journey from Satara to Pune.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
              <h3 className="text-xl font-bold mb-2">On-time Service</h3>
              <p className="text-white/90">Punctual pickups & drop-offs</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-white/90">No hidden charges</p>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
              <h3 className="text-xl font-bold mb-2">Expert Drivers</h3>
              <p className="text-white/90">Local route expertise</p>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white">
              <h3 className="text-xl font-bold mb-2">Multiple Vehicles</h3>
              <p className="text-white/90">Sedan, SUV, luxury cars</p>
            </div>
          </div>
        </section>

        {/* Pricing Table Section */}
        <section className="min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-[2000px] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Cab Service Rates
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-xl">
              <table className="w-full bg-white">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Route</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Distance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Normal Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Premium Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Satara to Pune</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">112 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹12/km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹15/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Satara to Mumbai</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">260 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹11/km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Satara to Kolhapur</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">120 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹12/km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹15/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Satara to Mahabaleshwar</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">55 km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹13/km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹15/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Local Satara (Full Day)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fixed ₹2500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fixed ₹3500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Popular Destinations in Satara
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 text-center">
            Satara is home to historical forts, lush green landscapes, and beautiful waterfalls. Whether you're a tourist or a local resident, our cab service in Satara allows you to explore the city comfortably.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Kaas Plateau</h3>
              <p className="text-blue-800">Valley of Flowers - Ideal for nature lovers.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-2">Ajinkyatara Fort</h3>
              <p className="text-purple-800">A must-visit for history enthusiasts.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-900 mb-2">Thoseghar Waterfalls</h3>
              <p className="text-emerald-800">A scenic getaway.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-2">Sajjangad Fort</h3>
              <p className="text-orange-800">A spiritual and historical landmark.</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-pink-200">
              <h3 className="text-xl font-bold text-pink-900 mb-2">Shri Chhatrapati Shivaji Museum</h3>
              <p className="text-pink-800">Learn about Maratha history.</p>
            </div>
          </div>
        </section>

        {/* Booking Options Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Options & How to Reserve a Cab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Booking a Pune to Satara cab service or Satara to Pune cab service with WTL Tourism Pvt. Ltd. is quick and easy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Call/WhatsApp Card */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white rounded-full p-4 shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <div className="text-center pt-4 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Call/WhatsApp</h3>
                <div className="space-y-2">
                  <a href="tel:9112085055" className="block text-xl text-blue-600 hover:text-blue-700 font-semibold">
                    9112085055
                  </a>
                  <a href="tel:9130030054" className="block text-xl text-blue-600 hover:text-blue-700 font-semibold">
                    9130030054
                  </a>
                </div>
              </div>
            </div>

            {/* Online Booking Card */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-purple-500 text-white rounded-full p-4 shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </div>
              <div className="text-center pt-4 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Online Booking</h3>
                <a href="https://www.worldtriplink.com" target="_blank" rel="noopener noreferrer" 
                   className="text-xl text-purple-600 hover:text-purple-700 font-semibold block mb-4">
                  www.worldtriplink.com
                </a>
              </div>
            </div>

            {/* Instant Booking Card */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-500 text-white rounded-full p-4 shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center pt-4 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Booking</h3>
                <p className="text-xl text-gray-600 font-semibold mb-4">Real-time availability</p>
              </div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
            <a href="https://wa.me/919112085055" className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.287.129.332.202.045.073.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
              </svg>
              WhatsApp Us
            </a>
            <a href="https://www.worldtriplink.com" target="_blank" rel="noopener noreferrer"
               className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Website
            </a>
            <Link href="/" className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Book Now
            </Link>
          </div>
        </section>

        {/* About WTL Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(() => {
              const { count, elementRef } = useCounter(30, 2000);
              return (
                <div ref={elementRef} className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-2xl font-bold mb-2">{count}+</h3>
                  <p className="text-white/90">Personal Cabs</p>
                </div>
              );
            })()}
            {(() => {
              const { count, elementRef } = useCounter(500, 2000);
              return (
                <div ref={elementRef} className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-2xl font-bold mb-2">{count}+</h3>
                  <p className="text-white/90">Registered Fleet</p>
                </div>
              );
            })()}
            {(() => {
              const { count, elementRef } = useCounter(100, 2000);
              return (
                <div ref={elementRef} className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-2xl font-bold mb-2">{count}+</h3>
                  <p className="text-white/90">Cities Covered</p>
                </div>
              );
            })()}
            {(() => {
              const { count, elementRef } = useCounter(50, 2000);
              return (
                <div ref={elementRef} className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <h3 className="text-2xl font-bold mb-2">{count}+</h3>
                  <p className="text-white/90">Corporate Solutions</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            FAQs – Cab Services in Satara
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <FaqItem
              question="What is the cost of a Pune to Satara cab?"
              answer="Our Pune to Satara cab starts at ₹12/km for sedans and ₹15/km for SUVs, ensuring an affordable and comfortable journey."
            />
            <FaqItem
              question="Are your cabs available 24/7?"
              answer="Yes, our cabs are available 24/7 for one-way, round-trip, and local travel."
            />
            <FaqItem
              question="Can I book a cab for local sightseeing in Satara?"
              answer="Yes, we provide full-day and hourly rental cabs for local sightseeing in Satara."
            />
            <FaqItem
              question="Do you provide airport pickup and drop services?"
              answer="Yes, we offer airport transfers from Pune and Mumbai airports to Satara."
            />
            <FaqItem
              question="What types of cabs are available for booking?"
              answer="We offer sedans, SUVs, and luxury cars for travel within and outside Satara."
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
              question="Do you offer one-way cabs from Pune to Satara?"
              answer="Yes, we provide affordable one-way cabs from Pune to Satara and vice versa."
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
                Contact WTL Tourism Pvt. Ltd. Today!
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                Experience the best cab service in Satara with our professional and reliable transportation solutions.
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

        <Footer />
        <FloatingIcons />
      </div>
    )
  } catch (error) {
    setHasError(true)
    return null
  }
}
