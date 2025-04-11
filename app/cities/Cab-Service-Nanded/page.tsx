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
import { FaPhone, FaWhatsapp, FaCar, FaMapMarkedAlt, FaClock, FaUserFriends, FaHotel, FaPlane, FaShieldAlt, FaMoneyBillWave, FaStar, FaHeadset, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import FloatingIcons from "@/components/FloatingIcons";

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
export default function NandedCabServicePage() {
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
              src="/images/nanded.jpg"
              alt="Nanded City"
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
                  Nanded Cab Booking
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  WTL Tourism Pvt. Ltd. – Reliable Cab Service in Nanded
                </p>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  Looking for a cab service in Nanded that provides comfort, affordability, and reliability? WTL Tourism Pvt. Ltd. (World Trip Link) offers top-notch cab booking services to make your travel seamless.
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        {/* Best Cab Services in Nanded */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Best Cab Services in Nanded</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Local City Tours */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <FaMapMarkedAlt className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Local City Tours</h3>
                  <p className="text-gray-600">
                    Explore Nanded's rich cultural heritage and historical landmarks with our guided city tours. Visit the famous Hazur Sahib Gurudwara, Mahur Temple, and other significant sites in comfort.
                  </p>
                </div>
              </div>

              {/* Outstation Cabs */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <FaCar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Outstation Cabs</h3>
                  <p className="text-gray-600">
                    Travel to nearby cities and tourist destinations with our reliable outstation cab services. We offer comfortable rides to Pune, Mumbai, Hyderabad, and other major cities.
                  </p>
                </div>
              </div>

              {/* Corporate Transportation */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <FaUserFriends className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Corporate Transportation</h3>
                  <p className="text-gray-600">
                    Professional cab services for business travelers and corporate events. We provide punctual and comfortable transportation for meetings, conferences, and business trips.
                  </p>
                </div>
              </div>

              {/* Hotel & Flight Bookings */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <FaHotel className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Hotel & Flight Bookings</h3>
                  <p className="text-gray-600">
                    Complete travel solutions with hotel and flight booking services. We help you plan your entire trip with the best deals on accommodations and air travel.
                  </p>
                </div>
              </div>

              {/* Airport Transfers */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <FaPlane className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Airport Transfers</h3>
                  <p className="text-gray-600">
                    Reliable airport pickup and drop-off services. Our drivers track your flight status to ensure timely pickups, and we offer comfortable rides to and from the airport.
                  </p>
                </div>
              </div>

              {/* Railway Station Transfers */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FaClock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Railway Station Transfers</h3>
                  <p className="text-gray-600">
                    Convenient pickup and drop-off services for railway stations. We ensure you reach your train on time and provide comfortable rides from the station to your destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Worldtriplink?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Reliability */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                  <p className="text-gray-600">
                    We pride ourselves on being the most reliable cab service in Nanded. Our drivers are punctual, professional, and committed to providing the best service.
                  </p>
                </div>
              </div>

              {/* Safety */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaShieldAlt className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Safety</h3>
                  <p className="text-gray-600">
                    Your safety is our top priority. All our vehicles are well-maintained, and our drivers undergo regular safety training and background checks.
                  </p>
                </div>
              </div>

              {/* Affordable Pricing */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaMoneyBillWave className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
                  <p className="text-gray-600">
                    We offer competitive rates without compromising on quality. Our transparent pricing policy ensures you get the best value for your money.
                  </p>
                </div>
              </div>

              {/* Comfortable Fleet */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comfortable Fleet</h3>
                  <p className="text-gray-600">
                    Our fleet includes a variety of vehicles to suit your needs. From compact cars for solo travelers to spacious SUVs for families, we have it all.
                  </p>
                </div>
              </div>

              {/* 24/7 Availability */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
                  <p className="text-gray-600">
                    Need a cab at any time? We're here for you 24/7. Our round-the-clock service ensures you can book a cab whenever you need one.
                  </p>
                </div>
              </div>

              {/* Customer Support */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaHeadset className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
                  <p className="text-gray-600">
                    Our dedicated customer support team is always ready to help. Whether you need to modify your booking or have any questions, we're just a call away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Cab Services in Nanded</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Local Sightseeing */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <FaMapMarkedAlt className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Local Sightseeing</h3>
                  <p className="text-gray-600">
                    Explore Nanded's rich cultural heritage with our guided sightseeing tours. Visit the famous Hazur Sahib Gurudwara, Mahur Temple, and other significant landmarks in comfort.
                  </p>
                </div>
              </div>

              {/* Airport Transfers */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <FaPlane className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Airport Transfers</h3>
                  <p className="text-gray-600">
                    Reliable airport pickup and drop-off services. Our drivers track your flight status to ensure timely pickups, and we offer comfortable rides to and from the airport.
                  </p>
                </div>
              </div>

              {/* Railway Station Transfers */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <FaClock className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Railway Station Transfers</h3>
                  <p className="text-gray-600">
                    Convenient pickup and drop-off services for railway stations. We ensure you reach your train on time and provide comfortable rides from the station to your destination.
                  </p>
                </div>
              </div>

              {/* Corporate Transportation */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <FaUserFriends className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Corporate Transportation</h3>
                  <p className="text-gray-600">
                    Professional cab services for business travelers and corporate events. We provide punctual and comfortable transportation for meetings, conferences, and business trips.
                  </p>
                </div>
              </div>

              {/* Hotel & Flight Bookings */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <FaHotel className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Hotel & Flight Bookings</h3>
                  <p className="text-gray-600">
                    Complete travel solutions with hotel and flight booking services. We help you plan your entire trip with the best deals on accommodations and air travel.
                  </p>
                </div>
              </div>

              {/* Outstation Cabs */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FaCar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Outstation Cabs</h3>
                  <p className="text-gray-600">
                    Travel to nearby cities and tourist destinations with our reliable outstation cab services. We offer comfortable rides to Pune, Mumbai, Hyderabad, and other major cities.
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
                    <td className="px-6 py-4 text-sm text-gray-900">Pune to Nanded</td>
                    <td className="px-6 py-4 text-sm text-gray-500">450 km</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹3,500</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹4,000</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹5,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Nanded to Pune</td>
                    <td className="px-6 py-4 text-sm text-gray-500">450 km</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹3,500</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹4,000</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹5,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Nanded Local Sightseeing</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Full Day</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹1,500</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹2,000</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹2,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Nanded to Mumbai</td>
                    <td className="px-6 py-4 text-sm text-gray-500">600 km</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹4,500</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹5,000</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹6,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Nanded to Hyderabad</td>
                    <td className="px-6 py-4 text-sm text-gray-500">300 km</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹2,500</td>
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
                WTL Tourism Pvt. Ltd. is your trusted partner for all your travel needs in Nanded. With years of experience in the travel industry, we have built a reputation for providing reliable, comfortable, and affordable cab services. Our commitment to customer satisfaction and safety has made us one of the most preferred cab service providers in the region.
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
                  <div className="text-gray-600">Offices</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <FaqItem
                question="What is the best cab service in Nanded?"
                answer="Worldtriplink offers the best cab services in Nanded, providing reliable, affordable, and comfortable transportation options for both local and outstation travel."
              />
              <FaqItem
                question="How do I book a Pune to Nanded cab service?"
                answer="Booking a Pune to Nanded cab service is simple. You can book your ride directly through our online platform or contact our customer service for assistance. We offer easy-to-use booking tools for your convenience."
              />
              <FaqItem
                question="Are the cabs in Nanded safe?"
                answer="Yes! At Worldtriplink, we prioritize safety. Our cabs are regularly maintained, and all drivers undergo thorough background checks to ensure a secure travel experience for all passengers."
              />
              <FaqItem
                question="Can I customize my trip from Nanded?"
                answer="Yes, you can! We offer customizable trips, whether you're looking for a Nanded to Pune cab service or a local sightseeing tour in Nanded. Just let us know your preferences, and we'll tailor the journey to suit your needs."
              />
              <FaqItem
                question="What are the payment options for booking a cab?"
                answer="We accept a variety of payment methods, including cash, debit/credit cards, and online payment platforms for your convenience."
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Contact WTL Tourism Pvt. Ltd. Today!</h2>
              <p className="text-gray-600 mb-12">
                Ready to book your cab in Nanded? Contact us now for the best rates and service.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FaPhone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-600">24/7 Customer Support</p>
                  <a href="tel:+919130030053" className="text-red-600 hover:text-red-700 font-medium">
                  +91 9130030053
                  </a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FaWhatsapp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                  <p className="text-gray-600">Quick Response</p>
                  <a href="https://wa.me/9130030053" className="text-green-600 hover:text-green-700 font-medium">
                    Chat with us
                  </a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkedAlt className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-600">Office Location</p>
                  <p className="text-gray-600">Kharadi, Pune</p>
                </div>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="tel:+919130030053"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <FaPhone className="mr-2" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/9130030053"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
        <FloatingIcons />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Nanded Cab Service page:", error);
    setHasError(true);
    return null;
  }
}
