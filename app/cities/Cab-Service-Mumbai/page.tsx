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

interface TravellerSelections {
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
}

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
export default function MumbaiCabServicePage() {
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
      <div className="min-h-screen bg-gray-50">
        <Navbar onTabChange={handleTabChange} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px]">
          <div className="absolute inset-0">
            <Image
              src="/images/mumbai.jpg"
              alt="Mumbai City"
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
                  Mumbai Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Looking for Cab In Mumbai? Book reliable, affordable cab services for OutStation, OneWay, Airport Cab and Round Trip from Mumbai Maharashtra and Other Cities.
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
                WTL Tourism Pvt. Ltd. - Best Cab Service in Mumbai
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                WTL Tourism Pvt. Ltd. (World Trip Link) is your trusted cab booking company in Mumbai, offering seamless transportation solutions for local and outstation travel. Whether you're looking for the best cab service in Mumbai, the cheapest cab service in Mumbai, or a cab service in Mumbai for a full day, we have got you covered with our professional and affordable ride options.
              </p>
            </div>
          </section>

          {/* Service Cards */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4">Best Cab Service</h3>
                <p className="text-white/90">
                  Looking for the best cab service in Mumbai? We offer top-rated cab services with professional drivers, well-maintained vehicles, and on-time pickups.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4">Cheapest Cab Service</h3>
                <p className="text-white/90">
                  We understand the importance of affordable travel, providing the cheapest cab service in Mumbai without compromising on quality.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4">Local Cab Service</h3>
                <p className="text-white/90">
                  Navigating through Mumbai has never been easier with our local cab service. Available for work commutes, airport transfers, or city tours.
                </p>
              </div>
            </div>
          </section>

          {/* Outstation Routes Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Popular Outstation Routes from Mumbai
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
                    <td className="py-4 px-6 font-medium">Mumbai to Pune</td>
                    <td className="py-4 px-6">296 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Mumbai to Lonavala</td>
                    <td className="py-4 px-6">200 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Mumbai to Shirdi</td>
                    <td className="py-4 px-6">476 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Mumbai to Alibag</td>
                    <td className="py-4 px-6">225 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Mumbai to Nashik</td>
                    <td className="py-4 px-6">334 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cabs To Mumbai Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Cab Rates for Outstation Travel
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-xl rounded-xl overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">Origin</th>
                    <th className="py-4 px-6 text-left">Distance</th>
                    <th className="py-4 px-6 text-left">Sedan Rate</th>
                    <th className="py-4 px-6 text-left">SUV Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Pune to Mumbai</td>
                    <td className="py-4 px-6">296 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Lonavala to Mumbai</td>
                    <td className="py-4 px-6">200 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Shirdi to Mumbai</td>
                    <td className="py-4 px-6">496 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">Vellore to Mumbai</td>
                    <td className="py-4 px-6">277 Km</td>
                    <td className="py-4 px-6">₹11/km</td>
                    <td className="py-4 px-6">₹14/km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          {/* About Section with Stats */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About WTL Tourism Pvt. Ltd.
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
                Established in 2016 in Pune, World Trip Link (WTL Tourism Pvt. Ltd.) has grown into a leading cab service provider, offering a wide range of transportation solutions across India.
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
                question="What are the best corporate cab services in Mumbai?" 
                answer="WTL Tourism Pvt. Ltd. offers corporate cab services in Mumbai with professional chauffeurs, on-time pickups, and customized corporate travel solutions. We provide employee transportation, corporate event travel, and long-term rental plans for businesses." 
              />
              <FaqItem 
                question="Which cab service is best in Mumbai?" 
                answer="WTL Tourism Pvt. Ltd. is widely recognized as the best cab service in Mumbai, thanks to our well-maintained fleet, affordable pricing, professional drivers, and 24/7 availability for both local and outstation travel." 
              />
              <FaqItem 
                question="Do you offer office cab service in Mumbai?" 
                answer="Yes, our office cab service in Mumbai is ideal for professionals and businesses. We offer reliable daily commutes, corporate travel solutions, and customized packages for employees." 
              />
              <FaqItem 
                question="Is there a cab service in Navi Mumbai?" 
                answer="Yes, WTL Tourism Pvt. Ltd. provides cab service in Navi Mumbai, offering affordable and comfortable rides for local and outstation travel." 
              />
              <FaqItem 
                question="Can I book a cab service in Mumbai for a full day?" 
                answer="Absolutely! We offer full-day rental cabs in Mumbai for business meetings, city tours, and personal travel needs." 
              />
              <FaqItem 
                question="What cab services in Mumbai offer the best pricing?" 
                answer="WTL Tourism Pvt. Ltd. provides the most competitive pricing with transparent rates and no hidden charges." 
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
                  Experience the best cab service in Mumbai with our professional and reliable transportation solutions.
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
    console.error("Error rendering Mumbai Cab Service page:", error);
    setHasError(true);
    return null;
  }
}