"use client"

import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    popularCities: false,
    corporateCabs: false,
    airportCabs: false,
    states: false
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    })
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 py-3 shadow-lg">
        <div className="container mx-auto px-4 text-center text-sm font-medium text-white">
          <span className="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Book your ride now! Call us at <span className="font-bold ml-1">+91 91120 85055</span> <span className="mx-3">or</span> <span className="font-bold">+91 91300 30054</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Popular Cities Column */}
          <div className="text-center">
            <h3 
              className="flex items-center justify-center text-lg font-semibold mb-6 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => toggleSection('popularCities')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
                Popular Cities
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`ml-2 transition-transform duration-300 ${openSections.popularCities ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`grid grid-cols-2 gap-3 transition-all duration-300 ${openSections.popularCities ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="/cities/Cab-Service-Pune" className="text-gray-300 hover:text-blue-400 transition-colors">
                Pune
              </Link>
              <Link href="/cities/Cab-Service-Mumbai" className="text-gray-300 hover:text-blue-400 transition-colors">
                Mumbai
              </Link>
              <Link href="/cities/Cab-Service-Kolhapur" className="text-gray-300 hover:text-blue-400 transition-colors">
                Kolhapur
              </Link>
              <Link href="/cities/Cab-Service-Satara" className="text-gray-300 hover:text-blue-400 transition-colors">
                Satara
              </Link>
              <Link href="/cities/Cab-Service-Nashik" className="text-gray-300 hover:text-blue-400 transition-colors">
                Nashik
              </Link>
              <Link href="/cities/Cab-Service-Ratnagiri" className="text-gray-300 hover:text-blue-400 transition-colors">
                Ratnagiri
              </Link>
              <Link href="/cities/Cab-Service-Shirdi" className="text-gray-300 hover:text-blue-400 transition-colors">
                Shirdi
              </Link>
              <Link href="/cities/Cab-Service-Ahmednagar" className="text-gray-300 hover:text-blue-400 transition-colors">
                Ahmednagar
              </Link>
              <Link href="/cities/Cab-Service-Beed" className="text-gray-300 hover:text-blue-400 transition-colors">
                Beed
              </Link>
              <Link href="/cities/Cab-Service-Jalna" className="text-gray-300 hover:text-blue-400 transition-colors">
                Jalna
              </Link>
              <Link href="/cities/Cab-Service-Lonavala" className="text-gray-300 hover:text-blue-400 transition-colors">
                Lonavala
              </Link>
              <Link href="/cities/Cab-Service-Akola" className="text-gray-300 hover:text-blue-400 transition-colors">
                Akola
              </Link>
              <Link href="/cities/Cab-Service-Sindhudurg" className="text-gray-300 hover:text-blue-400 transition-colors">
                Sindhudurg
              </Link>
              <Link href="/cities/Cab-Service-Latur" className="text-gray-300 hover:text-blue-400 transition-colors">
                Latur
              </Link>
              <Link href="/cities/Cab-Service-Osmanabad" className="text-gray-300 hover:text-blue-400 transition-colors">
                Osmanabad
              </Link>
              <Link href="/cities/Cab-Service-Nanded" className="text-gray-300 hover:text-blue-400 transition-colors">
                Nanded
              </Link>
              <Link href="/cities/Cab-Service-Washim" className="text-gray-300 hover:text-blue-400 transition-colors">
                Washim
              </Link>
              <Link href="/cities/Cab-Service-Wardha" className="text-gray-300 hover:text-blue-400 transition-colors">
                Wardha
              </Link>
              <Link href="/cities/Cab-Service-Palghar" className="text-gray-300 hover:text-blue-400 transition-colors">
                Palghar
              </Link>
              <Link href="/cities/Cab-Service-Chandarpur" className="text-gray-300 hover:text-blue-400 transition-colors">
                Chandarpur
              </Link>
              <Link href="/cities/Cab-Service-Gondia" className="text-gray-300 hover:text-blue-400 transition-colors">
                Gondia
              </Link>
              <Link href="/cities/Cab-Service-Gadchiroli" className="text-gray-300 hover:text-blue-400 transition-colors">
                Gadchiroli
              </Link>
              <Link href="/cities/Cab-Service-Amravati" className="text-gray-300 hover:text-blue-400 transition-colors">
                Amravati
              </Link>
              <Link href="/cities/Cab-Service-Aurangabad" className="text-gray-300 hover:text-blue-400 transition-colors">
                Aurangabad
              </Link>
            </div>
          </div>

          {/* Corporate Cabs Column */}
          <div className="text-center">
            <h3 
              className="flex items-center justify-center text-lg font-semibold mb-6 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => toggleSection('corporateCabs')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
                  <path d="M14 17H9" />
                  <path d="M5 18v2" />
                  <path d="M19 18v2" />
                  <path d="M15 4V3" />
                  <path d="M9 4V3" />
                  <path d="M12 4V3" />
                  <path d="M4 10h16" />
                  <path d="M9 17l-1 4" />
                  <path d="M15 17l1 4" />
                </svg>
                Corporate Cabs
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`ml-2 transition-transform duration-300 ${openSections.corporateCabs ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`space-y-3 transition-all duration-300 ${openSections.corporateCabs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="/corporate/Corporate-Employee-Transport-Services-Delhi" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Delhi
              </Link>
              <Link href="/corporate/Corporate-Cab-Service-Pune" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Pune
              </Link>
              <Link href="/corporate/Monthly-Cab-Service-Bangalore" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Bangalore
              </Link>
              <Link href="/corporate/Corporate-Cab-Service-Mumbai" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Mumbai
              </Link>
              <Link href="/corporate/Corporate-Cab-Services-Telangana" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Telangana
              </Link>
              <Link href="/corporate/Corporate-Cab-Services-Chennai" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Chennai
              </Link>
              <Link href="/corporate/Corporate-Cab-Services-Indore" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Indore
              </Link>
              <Link href="/corporate/Corporate-Cab-Services-Surat" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Corporate Cabs in Surat
              </Link>
            </div>
          </div>

          {/* Airport Cabs Column */}
          <div className="text-center">
            <h3 
              className="flex items-center justify-center text-lg font-semibold mb-6 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => toggleSection('airportCabs')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Airport Cabs
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`ml-2 transition-transform duration-300 ${openSections.airportCabs ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`space-y-3 transition-all duration-300 ${openSections.airportCabs ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Delhi
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Pune
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Bangalore
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Mumbai
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Hyderabad
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Telangana
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Chennai
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Airport Cabs in Surat
              </Link>
            </div>
          </div>

          {/* States Column */}
          <div className="text-center">
            <h3 
              className="flex items-center justify-center text-lg font-semibold mb-6 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => toggleSection('states')}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m2 6 10.5-3 10.5 3" />
                  <path d="M2 12h20" />
                  <path d="M2 18h20" />
                  <path d="M2 6v16h20V6" />
                </svg>
                States
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`ml-2 transition-transform duration-300 ${openSections.states ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </h3>
            <div className={`space-y-3 transition-all duration-300 ${openSections.states ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Maharashtra
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Goa
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Gujarat
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Karnataka
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                UP
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                West Bengal
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Kerala
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Rajasthan
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                HP
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Tamil Nadu
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Punjab
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Chhattisgarh
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Andhra Pradesh
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-6 md:mb-0">
            <Link href="https://www.instagram.com/worldtriplink/" className="text-gray-300 hover:text-blue-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61554946222967&mibextid=ZbWKwL" className="text-gray-300 hover:text-blue-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://x.com/world_trip_link" className="text-gray-300 hover:text-blue-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://in.linkedin.com/in/world-trip-link-9562762a6" className="text-gray-300 hover:text-blue-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <div className="text-gray-300 text-sm text-center">
            © Copyright WTL 2025. Made with <span className="text-red-500">❤</span> by{" "}
            <Link 
              href="https://cobaztech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              cobaztech
            </Link>
            .{" "}
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

