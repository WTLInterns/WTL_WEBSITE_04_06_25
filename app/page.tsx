"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import CabBookingForm from "../components/CabBookingForm"
import BusBookingForm from "../components/BusBookingForm"
import HotelBookingForm from "../components/HotelBookingForm"
import FlightBookingForm from "../components/FlightBookingForm"
import HolidayBookingForm from "../components/HolidayBookingForm"
import HomestaysBookingForm from "../components/HomestaysBookingForm"
import Navbar from "../components/Navbar"
import DestinationCard from "@/components/destination-card"
import CabCard from "@/components/cab-card"
import AppPromotion from "@/components/app-promotion"
import Footer from "@/components/footer"
import Navbar2 from "../components/Navbar2"
import FloatingIcons from "@/components/FloatingIcons"
import Link from "next/link"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentTab, setCurrentTab] = useState("cabs")
  const [bgImage, setBgImage] = useState("/images/vin.jpg")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTabChange = useCallback((tab: string) => {
    setCurrentTab(tab)
    // Update background image based on tab
    switch (tab) {
      case 'flights':
        setBgImage("/images/flight.jpg")
        break
      case 'hotels':
        setBgImage("/images/hotel.jpg")
        break
      case 'buses':
        setBgImage("/images/bus.jpg")
        break
      case 'cabs':
        setBgImage("/images/vin.jpg")
        break
      case 'homestays':
        setBgImage("/images/villa.jpg")
        break
      case 'holiday':
        setBgImage("/images/holiday.jpg")
        break
      default:
        setBgImage("/background.jpg")
    }
  }, [])

  const renderBookingForm = useCallback(() => {
    if (!mounted) return null;
    
    switch (currentTab) {
      case 'cabs':
        return <CabBookingForm />
      case 'buses':
        return <BusBookingForm />
      case 'flights':
        return <FlightBookingForm />
      case 'hotels':
        return <HotelBookingForm />
      case 'homestays':
        return <HomestaysBookingForm />
      case 'holiday':
        return <HolidayBookingForm />
      default:
        return <CabBookingForm />
    }
  }, [currentTab, mounted])

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={75}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Scrollable Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen">
          {/* Content */}
          <div className="relative z-10 pt-4">
            <div className="fixed w-full z-[9999]">
              <Navbar2 />
            </div>

            {/* Navbar */}
            <div className="mt-16 px-4">
              <Navbar onTabChange={handleTabChange} />
            </div>
         
            {/* Booking Form Container */}
            <div className="pt-40 px-4 max-w-6xl mx-auto">
              {renderBookingForm()}
            </div>
          </div>
        </section>

        {/* Top Visited Places Section */}
        <section className="relative py-16 z-[1]">
          <div className="relative container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">Top Visited Places</h2>
            <p className="text-white/80 text-center mb-10 max-w-3xl mx-auto">
              Discover the most popular destinations in Maharashtra, each offering unique experiences and unforgettable memories.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DestinationCard
                city="Pune City"
                tag="Pune"
                description="Cultural capital with perfect blend of tradition and modernity"
                rating={5}
                reviews={7064}
                imageSrc="/images/pune.jpg"
              />
              <DestinationCard
                city="Mumbai"
                tag="Mumbai"
                description="The city that never sleeps, financial capital of India"
                rating={5}
                reviews={12385}
                imageSrc="/images/mumbai.jpg"
              />
              <DestinationCard
                city="Kolhapur"
                tag="Kolhapur"
                description="Historic city known for temples and traditional cuisine"
                rating={5}
                reviews={4892}
                imageSrc="/images/kolhapur.jpg"
              />
              <DestinationCard
                city="Hyderabad"
                tag="Hyderabad"
                description="Historic landmarks and thriving tech hubs."
                rating={5}
                reviews={3456}
                imageSrc="/images/hyderabad.jpg"
              />
              <DestinationCard
                city="Banglore"
                tag="Banglore"
                description="Green parks enhance Bangalore's urban charm"
                rating={4}
                reviews={2789}
                imageSrc="/images/banglore.jpg"
              />
              <DestinationCard
                city="Solapur"
                tag="Solapur"
                description="Famous for textiles and religious heritage"
                rating={4}
                reviews={3124}
                imageSrc="/images/solapur.jpg"
              />
            </div>
          </div>
        </section>

        {/* White background for remaining sections */}
        <div className="bg-white">
          {/* Cab Booking Section */}
          {currentTab === 'cabs' && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Book Your Cab Now!</h2>
                <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                  Choose from our selection of comfortable and reliable vehicles
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CabCard type="Luxury" description="Premium comfort and style" imageSrc="/images/luxury-car.jpg" />
                  <CabCard type="Hatchback" description="Compact and efficient" imageSrc="/images/glanza.jpg" />
                  <CabCard type="Sedan" description="Perfect balance of comfort" imageSrc="/images/aura.jpg" />
                </div>
              </div>
            </section>
          )}

          {/* App Promotion Section */}
          <AppPromotion />

          {/* Footer */}
          <Footer />
          <FloatingIcons />
        </div>
      </div>
    </main>
  )
}

