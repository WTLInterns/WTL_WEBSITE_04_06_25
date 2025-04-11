"use client"

import React, { useEffect } from 'react'
import Navbar2 from '@/components/Navbar2'
import Footer from '@/components/footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FloatingIcons from '@/components/FloatingIcons'

const AboutPage = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar2 />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/images/about.jpg"
          alt="About WTL"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              About WTL
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Revolutionizing travel with innovation and excellence
            </p>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <motion.section
        ref={ref1}
        initial={{ opacity: 0, y: 50 }}
        animate={inView1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              WTL was founded with a vision of making transportation convenient and hassle-free. We understand the importance of reaching your destination comfortably and on time, whether you're heading to an important business meeting, catching a flight, or simply exploring the city.
            </p>
            <p className="text-lg text-gray-600">
              Our journey began with the aim of creating a service that would cater to all your transportation needs. At WTL, we're on a mission to redefine the way you experience transportation. With a commitment to safety, reliability, and exceptional service, we have become your trusted partner in getting you to your destination with ease.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about2.jpg"
              alt="WTL Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={inView2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Features of WTL Service Company
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Safety Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Safety First</h3>
              <p className="text-white/80">
                Your safety is our top priority. All our drivers undergo rigorous background checks and are trained to ensure your journey is secure.
              </p>
            </motion.div>

            {/* Reliability Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Reliability</h3>
              <p className="text-white/80">
                Count on us to be punctual and dependable. We're dedicated to getting you where you need to go on time, every time.
              </p>
            </motion.div>

            {/* Comfort Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comfort</h3>
              <p className="text-white/80">
                Our vehicles are meticulously maintained to offer you a comfortable and enjoyable ride. Sit back, relax, and let us take care of the driving.
              </p>
            </motion.div>

            {/* Convenience Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Convenience</h3>
              <p className="text-white/80">
                Booking a ride with WTL is a breeze. Use our user-friendly app or website to reserve a cab in seconds, and track your driver's progress in real-time.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Innovation Section */}
      <motion.section
        ref={ref3}
        initial={{ opacity: 0, y: 50 }}
        animate={inView3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about.jpg"
              alt="WTL Innovation"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Revolutionizing Travel
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              WTL has been revolutionizing the travel industry. Metasearch for travel? No one was doing it. Until we did.
            </p>
            <p className="text-lg text-gray-600">
              We continue to push boundaries and innovate in the transportation sector, bringing you the best possible travel experience with cutting-edge technology and exceptional service.
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
      <FloatingIcons />
    </div>
  )
}

export default AboutPage 