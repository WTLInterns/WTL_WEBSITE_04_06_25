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
import { FaPhone, FaWhatsapp, FaCar, FaMapMarkedAlt, FaClock, FaUserFriends, FaHotel, FaPlane, FaShieldAlt, FaMoneyBillWave, FaStar, FaHeadset, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

// Counter hook for animated numbers
const useCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
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
  }, [target, duration, hasStarted]);

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
export default function WashimCabServicePage() {
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
              src="/images/lonavala2.jpg"
              alt="Washim City"
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
                  Washim Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  WTL Tourism Pvt. Ltd. – Reliable Cab Service in Washim
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Looking for Cab In Washim? Washim Cab Booking at Affordable fare. We WTL Providing Quality Services for Cab Booking for OutStation, OneWay, Airport Cab and Round Trip from Washim Maharashtra and Other Cities.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Best Cab Services in Washim */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Best Cab Services in Washim – Reliable and Affordable Travel</h2>
            <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Are you looking for the best cab services in Washim? Whether you need a Pune to Washim cab service or a Washim to Pune cab service, Worldtriplink provides the most reliable, comfortable, and affordable travel options. With our well-maintained fleet, professional drivers, and seamless booking process, we ensure a stress-free ride for every journey.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Worldtriplink for Cab Service in Washim?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">24/7 Service Availability</h3>
                  <p className="text-gray-600">Book a cab anytime, anywhere.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaMoneyBillWave className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">No hidden charges; pay only what you see.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaShieldAlt className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional & Experienced Drivers</h3>
                  <p className="text-gray-600">Ensuring a safe and smooth journey.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Diverse Fleet Options</h3>
                  <p className="text-gray-600">Choose from hatchbacks, sedans, SUVs, and luxury vehicles.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaStar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Easy Online Booking</h3>
                  <p className="text-gray-600">Hassle-free booking with multiple payment options.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Cab Services in Washim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Local Cab Service */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <FaMapMarkedAlt className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Local Cab Service in Washim</h3>
                  <p className="text-gray-600">
                    For business meetings, shopping, or sightseeing, our cab service in Washim ensures quick and comfortable travel within the city.
                  </p>
                </div>
              </div>

              {/* Outstation Cab Services */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <FaCar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Outstation Cab Services from Washim</h3>
                  <p className="text-gray-600">
                    Planning a trip outside Washim? Book our outstation cabs for a hassle-free journey to Pune, Mumbai, Nagpur, or other destinations.
                  </p>
                </div>
              </div>

              {/* Pune to Washim */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <FaArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Pune to Washim Cab Services</h3>
                  <p className="text-gray-600">
                    Looking for a Pune to Washim cab service? We offer one-way and round-trip cabs with affordable pricing and multiple cab options.
                  </p>
                </div>
              </div>

              {/* Washim to Pune */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <FaArrowRight className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Washim to Pune Cab Services</h3>
                  <p className="text-gray-600">
                    If you need a Washim to Pune cab service, we provide a comfortable ride with flexible pickup and drop-off locations.
                  </p>
                </div>
              </div>

              {/* Corporate Transportation */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <FaUserFriends className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Corporate & Employee Transportation</h3>
                  <p className="text-gray-600">
                    We offer cab services for employees and corporate offices, ensuring timely pick-up and drop-off services.
                  </p>
                </div>
              </div>

              {/* Hotel & Flight Booking */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FaHotel className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Hotel & Flight Booking Services</h3>
                  <p className="text-gray-600">
                    Apart from cab services, we also assist with hotel and flight bookings, making travel convenient for our customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Table */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Route-wise Pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Route</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Distance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hatchback</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sedan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SUV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Pune to Washim</td>
                    <td className="px-6 py-4 text-sm text-gray-500">460 km</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹7,200</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹8,500</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹10,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Washim to Pune</td>
                    <td className="px-6 py-4 text-sm text-gray-500">460 km</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹7,200</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹8,500</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹10,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Washim Local Travel</td>
                    <td className="px-6 py-4 text-sm text-gray-500">50-100 km</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹2,000</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹3,000</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹4,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>* Prices are subject to change based on season and demand</p>
              <p>* All prices include toll charges and driver allowance</p>
              <p>* For custom routes and special requirements, please contact us</p>
            </div>
          </div>
        </section>

        {/* About WTL Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">About WTL Tourism Pvt. Ltd.</h2>
              <p className="text-gray-600 mb-12">
                Worldtriplink was established in 2016 in Pune with a mission to provide affordable and comfortable cab services across India. Over time, we have broadened our range of services to include outstation cabs, corporate transportation, daily pick-up & drop services, and hotel & flight bookings.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div ref={personalCabsCounter.elementRef}>
                  <div className="text-4xl font-bold text-red-600 mb-2">{personalCabsCounter.count}+</div>
                  <div className="text-gray-600">Personal Cabs</div>
                </div>
                <div ref={registeredCabsCounter.elementRef}>
                  <div className="text-4xl font-bold text-red-600 mb-2">{registeredCabsCounter.count}+</div>
                  <div className="text-gray-600">Registered Cabs</div>
                </div>
                <div ref={citiesCounter.elementRef}>
                  <div className="text-4xl font-bold text-red-600 mb-2">{citiesCounter.count}+</div>
                  <div className="text-gray-600">Cities Covered</div>
                </div>
                <div ref={officesCounter.elementRef}>
                  <div className="text-4xl font-bold text-red-600 mb-2">{officesCounter.count}+</div>
                  <div className="text-gray-600">Corporate Clients</div>
                </div>
              </div>
              <p className="mt-12 text-gray-600">
                Experience the best cab service in Washim with Worldtriplink and enjoy a hassle-free travel experience!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <FaqItem
                question="What is the best cab service in Washim?"
                answer="Worldtriplink offers the best cab services in Washim, ensuring affordability, safety, and reliability."
              />
              <FaqItem
                question="How can I book a Pune to Washim cab service?"
                answer="You can book online through our platform or call our customer support. We offer multiple payment options for a hassle-free experience."
              />
              <FaqItem
                question="Is it safe to travel at night with Worldtriplink cabs?"
                answer="Yes, our cabs are equipped with GPS tracking, and our drivers are trained for night travel, ensuring safety at all times."
              />
              <FaqItem
                question="Can I book a round-trip cab from Washim to Pune?"
                answer="Yes, we offer both one-way and round-trip cab services at competitive prices."
              />
              <FaqItem
                question="Do you provide hourly rentals in Washim?"
                answer="Yes, we offer hourly rental services for local travel within Washim, allowing flexibility for travelers."
              />
            </div>
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

        {/* Footer */}
        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Washim Cab Service page:", error);
    setHasError(true);
    return null;
  }
}
