import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

export default function AppPromotion() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">WTL Android and iOS App is Available!</h2>
            <p className="text-xl">Travel smarter with our all-in-one mobile solution</p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-white/20 rounded-full p-1">
                  <Check className="h-5 w-5" />
                </span>
                <span>Access and change your itinerary on-the-go</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-white/20 rounded-full p-1">
                  <Check className="h-5 w-5" />
                </span>
                <span>Free cancellation on select hotels</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-white/20 rounded-full p-1">
                  <Check className="h-5 w-5" />
                </span>
                <span>Get real-time trip updates</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-white/20 rounded-full p-1">
                  <Check className="h-5 w-5" />
                </span>
                <span>Exclusive mobile-only deals</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#"
                className="bg-white rounded-lg px-6 py-3 flex items-center gap-2 text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Image
                  src="/images/app_store.png"
                  alt="App Store"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="font-medium">App Store</span>
              </Link>
              <Link
                href="#"
                className="bg-white rounded-lg px-6 py-3 flex items-center gap-2 text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Image
                  src="/images/play_store.jpg"
                  alt="Google Play"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="font-medium">Google Play</span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-[500px]">
              <div className="absolute inset-0 rounded-[40px] border-8 border-black overflow-hidden">
                <Image
                  src="/images/WTL_Logo.jpeg"
                  alt="Mobile app screenshot"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

