"use client"

import React from 'react'
import Navbar2 from '@/components/Navbar2'
import Footer from '@/components/footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FloatingIcons from '@/components/FloatingIcons'

const ServicePage = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 })

  const services = [
    {
      title: "ONE WAY TRIP",
      description: "Book a one-way cab for any city-to-city travel. Affordable pricing, calculated per kilometer. Choose from Hatchback, Sedan, Luxury, or SUV. Flexible pickup and drop timings and Get a best cheap rental car rental from budget.",
      highlight: "One-way drop service available in Pune.",
      image: "/images/service.jpg"
    },
    {
      title: "ROUND WAY TRIP",
      description: "Plan your trip with easy return options. Book for same-day or multi-day return journeys. Transparent pricing with packages or per-km rates. Book Reliable Round Trip Cabs for Outstation Travel.",
      highlight: "Book Your Round Trip Cab Now and Enjoy Flat Discounts!",
      image: "/images/service2.jpg"
    },
    {
      title: "RENTAL CAB SERVICE",
      description: "Hourly or daily rental options. Unlimited km options available (on request). Ideal for city tours, outstation trips, or business needs. Hatchback, Sedan, SUVs, and Tempo Travelers available.",
      highlight: "Affordable Rental Cab Service for Your Next Trip. Cab rental service in Pune.",
      image: "/images/service22.jpg"
    },
    {
      title: "LUXURY CAB SERVICE",
      description: "Experience the ultimate in comfort and with our Luxury Cab Service. Hourly or daily rental options are available. Perfect for city tours, outstation trips, or business needs.",
      highlight: "Luxury Cab Rental Service in Pune",
      image: "/images/service.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar2 />
      
      {/* Hero Section */}
      <div className="relative h-[30vh] md:h-[50vh] w-full">
        <Image
          src="/images/service2.jpg"
          alt="WTL Services"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Experience premium travel with our diverse range of services
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            ref={index === 0 ? ref1 : index === 1 ? ref2 : index === 2 ? ref3 : ref4}
            initial={{ opacity: 0, y: 50 }}
            animate={index === 0 ? (inView1 ? { opacity: 1, y: 0 } : {}) :
                    index === 1 ? (inView2 ? { opacity: 1, y: 0 } : {}) :
                    index === 2 ? (inView3 ? { opacity: 1, y: 0 } : {}) :
                    (inView4 ? { opacity: 1, y: 0 } : {})}
            transition={{ duration: 0.8 }}
            className={`mb-12 md:mb-20 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row gap-8 lg:gap-12 items-center`}
          >
            <div className="w-full lg:w-1/2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  quality={90}
                />
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-900 mb-6"
              >
                {service.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 mb-6"
              >
                {service.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg"
              >
                <p className="font-semibold">{service.highlight}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose WTL?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-white/80">
                Round-the-clock customer support to assist you with all your travel needs
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Punctual Service</h3>
              <p className="text-white/80">
                On-time pickups and drops with professional drivers
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comfortable Rides</h3>
              <p className="text-white/80">
                Well-maintained vehicles for a smooth and comfortable journey
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Best Prices</h3>
              <p className="text-white/80">
                Competitive rates with transparent pricing and no hidden charges
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
      <FloatingIcons />
    </div>
  )
}

export default ServicePage 