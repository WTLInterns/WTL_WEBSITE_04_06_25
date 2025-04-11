"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Footer from "@/components/footer"
import Navbar from "@/components/Navbar"
import CabBookingForm from "@/components/CabBookingForm"
import BusBookingForm from "@/components/BusBookingForm"
import FlightBookingForm from "@/components/FlightBookingForm"
import HotelBookingForm from "@/components/HotelBookingForm"
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
export default function PuneCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState("cabs");

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Render the appropriate booking form based on active tab
  const renderBookingForm = () => {
    switch (activeTab) {
      case "cabs":
        return <CabBookingForm />;
      case "buses":
        return <BusBookingForm />;
      case "flights":
        return <FlightBookingForm />;
      case "hotels":
        return <HotelBookingForm />;
      case "homestays":
        return <HomestaysBookingForm />;
      case "holiday":
        return <HolidayBookingForm />;
      default:
        return <CabBookingForm />;
    }
  };

  // If there's an error in the page, show a simple error message
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
        <Navbar onTabChange={handleTabChange} />
        
        {/* Hero Section */}
        <div className="relative h-[550px]">
          <div className="absolute inset-0">
            <Image
              src="/images/pune.jpg"
              alt="Pune City"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Cab Service in Pune
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Book reliable, affordable cab services in Pune for local travel, airport transfers, and outstation journeys
              </p>
            </div>
            
            {/* Booking Form */}
            {renderBookingForm()}
          </div>
        </div>
        
        {/* Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Cab Services in Pune
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
                <div className="flex items-center text-blue-500">
                  <span className="font-medium">Book Now</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
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
                  Explore Pune's attractions with our local city tour packages. Visit historical sites, gardens, and shopping areas with experienced drivers.
                </p>
                <div className="flex items-center text-yellow-500">
                  <span className="font-medium">Explore Tours</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
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
                  Plan your outstation journey from Pune to popular destinations like Mumbai, Lonavala, Mahabaleshwar, and more with our comfortable cabs.
                </p>
                <div className="flex items-center text-green-500">
                  <span className="font-medium">View Destinations</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Outstation Routes */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Outstation Routes from Pune
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Destination</th>
                  <th className="py-3 px-6 text-left">Distance</th>
                  <th className="py-3 px-6 text-left">Travel Time</th>
                  <th className="py-3 px-6 text-left">Starting Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Mumbai</td>
                  <td className="py-4 px-6">150 km</td>
                  <td className="py-4 px-6">3-4 hours</td>
                  <td className="py-4 px-6">₹2,500</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Lonavala</td>
                  <td className="py-4 px-6">65 km</td>
                  <td className="py-4 px-6">1.5 hours</td>
                  <td className="py-4 px-6">₹1,200</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Mahabaleshwar</td>
                  <td className="py-4 px-6">120 km</td>
                  <td className="py-4 px-6">3 hours</td>
                  <td className="py-4 px-6">₹2,200</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Shirdi</td>
                  <td className="py-4 px-6">190 km</td>
                  <td className="py-4 px-6">4-5 hours</td>
                  <td className="py-4 px-6">₹3,500</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Alibaug</td>
                  <td className="py-4 px-6">150 km</td>
                  <td className="py-4 px-6">3.5 hours</td>
                  <td className="py-4 px-6">₹2,800</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </section>
        
        {/* About Us */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Cab Service in Pune?
              </h2>
              <p className="text-gray-600 mb-6">
                We provide reliable and affordable cab services in Pune with a focus on customer satisfaction. Our fleet of well-maintained vehicles and professional drivers ensure a comfortable journey for all your travel needs.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">24/7 Availability</h4>
                    <p className="mt-2 text-gray-600">Book a cab any time, day or night</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-green-100 text-green-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Safe Travel</h4>
                    <p className="mt-2 text-gray-600">Safety protocols and verified drivers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-yellow-100 text-yellow-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Transparent Pricing</h4>
                    <p className="mt-2 text-gray-600">No hidden charges or surge pricing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-purple-100 text-purple-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Clean Vehicles</h4>
                    <p className="mt-2 text-gray-600">Sanitized and well-maintained cars</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-blue-600 text-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold mb-2">5000+</span>
                <span className="text-sm">Happy Customers</span>
              </div>
              <div className="bg-yellow-500 text-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold mb-2">100+</span>
                <span className="text-sm">Professional Drivers</span>
              </div>
              <div className="bg-green-500 text-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold mb-2">50+</span>
                <span className="text-sm">Service Areas</span>
              </div>
              <div className="bg-purple-600 text-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold mb-2">4.8</span>
                <span className="text-sm">Average Rating</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
              question="How can I book a cab in Pune?" 
              answer="You can book a cab through our website, mobile app, or by calling our customer service. Fill in details like pickup location, destination, date, and time to get instant quotes." 
            />
            <FaqItem 
              question="Do you provide airport transfer services in Pune?" 
              answer="Yes, we offer both airport pickup and drop services at Pune International Airport. You can book in advance and our driver will be waiting for you at the arrival gate with your nameplate." 
            />
            <FaqItem 
              question="What types of vehicles are available for booking?" 
              answer="We offer various vehicle options including hatchbacks, sedans, SUVs, and premium cars. The availability depends on your location and specific requirements." 
            />
            <FaqItem 
              question="How can I pay for the cab service?" 
              answer="We accept multiple payment methods including credit/debit cards, UPI, digital wallets, and cash. You can choose your preferred payment method at the time of booking." 
            />
            <FaqItem 
              question="Can I book a cab for outstation trips from Pune?" 
              answer="Yes, we provide outstation cab services from Pune to various destinations. You can choose between one-way and round trips based on your travel needs." 
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Book Your Cab in Pune?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Experience hassle-free travel with our reliable cab service. Book now for the best rates and availability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Book a Cab Now
              </button>
              <div className="flex items-center">
                <span className="text-white font-medium mr-2">Call Us:</span>
                <a href="tel:+919876543210" className="text-white text-lg font-bold hover:underline">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Pune Cab Service page:", error);
    setHasError(true);
    return null;
  }
}
