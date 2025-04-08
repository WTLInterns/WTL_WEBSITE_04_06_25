"use client"
import React from 'react'
import { useState, useEffect, Suspense } from "react"
import Footer from "@/components/footer"
import { useSearchParams } from 'next/navigation'
import Navbar2 from "../../components/Navbar2"

interface Car {
  type: string;
  image?: string;
  features?: string[];
  rating?: number;
  reviews?: number;
  category?: string;
}

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  key?: string | number;
  type?: 'button' | 'submit' | 'reset';
}

function Button({ children, className, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface CarType {
  title: string;
  subtitle: string;
  image: string;
  priceKey: string;
  options?: string[];
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  )
}

function SearchResultsContent() {
  // Set to true to enable detailed debug console logs
  const DEBUG_MODE = true;

  const [selectedCategory, setSelectedCategory] = useState("All Cars")
  const [distance, setDistance] = useState<number | null>(null)
  const [tripInfo, setTripInfo] = useState<any>(null)
  const [cabInfo, setCabInfo] = useState<Car[]>([
    {
      type: "Hatchback",
      image: "/images/hatchback-car.jpg",
      rating: 4.5,
      reviews: 48,
      features: ["4+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      category: "Hatchback"
    },
    {
      type: "Sedan",
      image: "/images/sedan-car.jpg",
      rating: 4.7,
      reviews: 52,
      features: ["4+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      category: "Sedan"
    },
    {
      type: "SUV",
      image: "/images/suv.jpg",
      rating: 4.8,
      reviews: 56,
      features: ["6+1 Seater", "USB Charging", "Climate Control", "Premium Sound System"],
      category: "SUV"
    },
    {
      type: "MUV",
      image: "/images/innova.jpg",
      rating: 4.7,
      reviews: 52,
      features: ["7+1 Seater", "USB Charging", "Climate Control", "Entertainment System"],
      category: "MUV"
    }
  ])
  const [days, setDays] = useState<number>(0)
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  const [selectedCar, setSelectedCar] = useState("Maruti Wagonr")
  const [selectedCarImage, setSelectedCarImage] = useState("/images/wagonr.jpg")
  const [selectedSedan, setSelectedSedan] = useState("Maruti Swift Dzire")
  const [selectedSedanImage, setSelectedSedanImage] = useState("/images/swift.jpg")
  const [selectedSUV, setSelectedSUV] = useState("Maruti Ertiga")
  const [selectedSUVImage, setSelectedSUVImage] = useState("/images/ertiga.jpg")
  
  // Debug logger function
  const debugLog = (...args: any[]) => {
    if (DEBUG_MODE) {
      console.log('[DEBUG]', ...args);
    }
  }
  
  // First, mark when we're on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Create default trip info when API doesn't return it
  const createDefaultTripInfo = () => {
    return {
      hatchback: 12,
      sedan: 15,
      sedanpremium: 18,
      suv: 21,
      suvplus: 26
    };
  };

  // This effect handles initial data loading, getting distance from params or localStorage
  useEffect(() => {
    if (!isClient) return; // Only run this on the client
    
    // First, try to get distance from URL params
    const distanceParam = searchParams.get('distance')
    
    // Then, try to get distance from localStorage
    if (!distanceParam || distanceParam === '0') {
      const savedDistance = localStorage.getItem('cabDistance')
      if (savedDistance) {
        setDistance(Number(savedDistance))
        localStorage.setItem('cabDistance', savedDistance)
      }
    } else {
      setDistance(Number(distanceParam))
      localStorage.setItem('cabDistance', distanceParam)
    }

    const fetchTripInfo = async () => {
      const pickup = searchParams.get('pickup')
      const drop = searchParams.get('drop')
      
      if (pickup && drop) {
        try {
          debugLog("Fetching pricing info for:", pickup, "to", drop)
          console.log("Fetching trip and pricing info for:", pickup, "to", drop)
          
          let tripTypeValue = searchParams.get('tripType') || 'oneWay';
          
          // Get distance from localStorage if available
          let distanceValue = '0';
          if (typeof window !== 'undefined') {
            const savedDistance = localStorage.getItem('cabDistance');
            if (savedDistance && Number(savedDistance) > 0) {
              distanceValue = savedDistance;
              debugLog("Using distance from localStorage:", distanceValue);
            }
          }
          
          // Use the full URL to your Java backend API with all required parameters
          const response = await fetch('https://api.worldtriplink.com/api/cab1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              tripType: tripTypeValue,
              pickupLocation: pickup,
              dropLocation: drop,
              date: searchParams.get('date') || '',
              Returndate: searchParams.get('returnDate') || '',
              time: searchParams.get('time') || '',
              distance: distanceValue,
              days: searchParams.get('days') || '1'
            })
          })

          if (response.ok) {
            const data = await response.json()
            debugLog("API response:", data)
            console.log("API full response data:", data)
            
            if (data.distance && data.distance > 0) {
              setDistance(data.distance);
              localStorage.setItem('cabDistance', data.distance.toString());
            }
            
            if (data.tripinfo && data.tripinfo.length > 0) {
              const tripData = data.tripinfo[0];
              setTripInfo(tripData);
              
              // Store trip info in localStorage for invoice page
              localStorage.setItem('currentTripInfo', JSON.stringify(tripData));
            } else {
              const defaultInfo = createDefaultTripInfo();
              setTripInfo(defaultInfo);
              localStorage.setItem('currentTripInfo', JSON.stringify(defaultInfo));
            }
            
            if (data.days && data.days > 0) {
              setDays(data.days);
              localStorage.setItem('tripDays', data.days.toString());
            }
            
            if (data.cabinfo && data.cabinfo.length > 0) {
              setCabInfo(data.cabinfo);
              localStorage.setItem('availableCabs', JSON.stringify(data.cabinfo));
            }
          } else {
            console.error('Error response from API:', response.statusText)
            handleApiError();
          }
        } catch (error) {
          console.error('Error fetching trip info:', error)
          handleApiError();
        }
      }
    }

    fetchTripInfo()

    // Set up interval to check for price updates every 30 seconds
    const priceUpdateInterval = setInterval(fetchTripInfo, 30000)
    return () => clearInterval(priceUpdateInterval)
  }, [searchParams, isClient])

  const handleApiError = () => {
    const defaultInfo = createDefaultTripInfo();
    setTripInfo(defaultInfo);
    localStorage.setItem('currentTripInfo', JSON.stringify(defaultInfo));
    
    const defaultDistance = 100;
    setDistance(defaultDistance);
    localStorage.setItem('cabDistance', defaultDistance.toString());
  }

  const getLatestPrice = (carType: string): number => {
    try {
      // Get the latest trip info from state or localStorage
      const currentTripInfo = tripInfo || JSON.parse(localStorage.getItem('currentTripInfo') || '{}');
      const currentDistance = distance || Number(localStorage.getItem('cabDistance')) || 100;
      const currentDays = days || Number(localStorage.getItem('tripDays')) || 1;
      
      // Get base price from trip info
      let basePrice = 0;
      switch(carType.toLowerCase()) {
        case 'hatchback':
          basePrice = currentTripInfo?.hatchback ? Number(currentTripInfo.hatchback) : 12;
          break;
        case 'sedan':
          basePrice = currentTripInfo?.sedan ? Number(currentTripInfo.sedan) : 15;
          break;
        case 'sedan premium':
          basePrice = currentTripInfo?.sedanpremium ? Number(currentTripInfo.sedanpremium) : 18;
          break;
        case 'suv':
          basePrice = currentTripInfo?.suv ? Number(currentTripInfo.suv) : 21;
          break;
        case 'muv':
          basePrice = currentTripInfo?.suvplus ? Number(currentTripInfo.suvplus) : 26;
          break;
      }

      // Calculate total price based on trip type
      const tripType = searchParams.get('tripType');
      let totalPrice = 0;
      
      if (tripType === 'roundTrip' || tripType === 'round-trip') {
        totalPrice = currentDistance * basePrice * currentDays;
      } else {
        totalPrice = currentDistance * basePrice;
      }

      return Math.round(totalPrice);
    } catch (error) {
      console.error('Error calculating price:', error);
      return 0;
    }
  }

  const hatchbackCars = {
    "Maruti Wagonr": "/images/wagonr.jpg",
    "Toyota Glanza": "/images/glanza.jpg",
    "Celerio": "/images/celerio.png"
  }

  const sedanCars = {
    "Maruti Swift Dzire": "/images/swift.jpg",
    "Honda Amaze": "/images/amaze.jpg",
    "Hyundai Aura/Xcent": "/images/aura.jpg",
    "Toyota etios": "/images/etios.jpg"
  }

  const suvCars = {
    "Maruti Ertiga": "/images/ertiga.jpg",
    "Mahindra Marazzo": "/images/marazzo.jpg"
  }

  const handleCarChange = (carName: string) => {
    setSelectedCar(carName);
    setSelectedCarImage(hatchbackCars[carName as keyof typeof hatchbackCars]);
  };

  const handleSedanChange = (carName: string) => {
    setSelectedSedan(carName);
    setSelectedSedanImage(sedanCars[carName as keyof typeof sedanCars]);
  };

  const handleSUVChange = (carName: string) => {
    setSelectedSUV(carName);
    setSelectedSUVImage(suvCars[carName as keyof typeof suvCars]);
  };

  // Define static car information
  const carTypes: Record<string, CarType> = {
    'Hatchback': {
      title: 'Hatchback',
      subtitle: 'Compact Hatchback • Manual • Efficient',
      image: selectedCarImage,
      priceKey: 'hatchback',
      options: ['Maruti Wagonr', 'Toyota Glanza', 'Celerio']
    },
    'Sedan': {
      title: 'Sedan',
      subtitle: 'Luxury Sedan • Manual • Sleek Design',
      image: selectedSedanImage,
      priceKey: 'sedan',
      options: ['Maruti Swift Dzire', 'Honda Amaze', 'Hyundai Aura/Xcent', 'Toyota etios']
    },
    'SUV': {
      title: 'SUV',
      subtitle: 'Premium SUV • Automatic • Spacious',
      image: selectedSUVImage,
      priceKey: 'suv',
      options: ['Maruti Ertiga', 'Mahindra Marazzo']
    },
    'MUV': {
      title: 'MUV',
      subtitle: 'Luxury MUV • Automatic • Premium',
      image: '/images/innova.jpg',
      priceKey: 'suvplus'
    }
  };

  const getCarPriceKey = (carType: string): string => {
    switch(carType.toLowerCase()) {
      case 'hatchback':
        return 'hatchback';
      case 'sedan':
        return 'sedan';
      case 'sedan premium':
        return 'sedanpremium';
      case 'suv':
        return 'suv';
      case 'muv':
        return 'suvplus';
      default:
        return carType.toLowerCase();
    }
  };

  // Filter cars based on selected category
  const displayedCars = selectedCategory === "All Cars" 
    ? cabInfo 
    : cabInfo.filter(car => car.category === selectedCategory);

  // Helper function to check if trip info has valid pricing
  const isValidTripInfo = (tripInfo: any) => {
    if (!tripInfo) {
      console.log("Trip info is null or undefined");
      return false;
    }
    
    console.log("Validating trip info:", tripInfo);
    
    // Check if the properties exist and at least one car type has a valid price
    const hasHatchback = tripInfo.hatchback !== undefined && tripInfo.hatchback !== null && Number(tripInfo.hatchback) > 0;
    const hasSedan = tripInfo.sedan !== undefined && tripInfo.sedan !== null && Number(tripInfo.sedan) > 0;
    const hasSedanPremium = tripInfo.sedanpremium !== undefined && tripInfo.sedanpremium !== null && Number(tripInfo.sedanpremium) > 0;
    const hasSUV = tripInfo.suv !== undefined && tripInfo.suv !== null && Number(tripInfo.suv) > 0;
    const hasSUVPlus = tripInfo.suvplus !== undefined && tripInfo.suvplus !== null && Number(tripInfo.suvplus) > 0;
    
    console.log("Validation results:", {
      hasHatchback,
      hasSedan,
      hasSedanPremium,
      hasSUV,
      hasSUVPlus
    });
    
    return hasHatchback || hasSedan || hasSedanPremium || hasSUV || hasSUVPlus;
  }

  const featureCards: FeatureCard[] = [
    {
      title: "Digital Check-in",
      description: "Quick vehicle access with our app",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      )
    },
    {
      title: "Premium Insurance",
      description: "Comprehensive coverage included",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F9]">
      <Navbar2 />
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Car listings */}
        <div className="grid grid-cols-1 gap-6">
          {displayedCars.map((car: Car, index) => {
            const price = getLatestPrice(car.type);
            const carInfo = carTypes[car.type as keyof typeof carTypes];
            
            if (!carInfo) return null;

            return (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="flex flex-col md:flex-row">
                  {/* Car Image Section */}
                  <div className="relative w-full md:w-2/5 h-64">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20">
                      <img
                        src={car.type === "Hatchback" ? selectedCarImage : 
                             car.type === "Sedan" ? selectedSedanImage : 
                             car.type === "SUV" ? selectedSUVImage :
                             car.image || '/images/innova.jpg'}
                        alt={carInfo.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/innova.jpg';
                        }}
                      />
                    </div>
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Premium</span>
                      <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm">{car.rating || 4.7}</span>
                      </div>
                    </div>
                  </div>

                  {/* Car Details Section */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{carInfo.title}</h3>
                        <p className="text-gray-600 text-sm">{carInfo.subtitle}</p>
                        {car.type === "Hatchback" && (
                          <div className="mt-2 flex items-center gap-4">
                            {carInfo.options?.map((option) => (
                              <div key={option} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  id={option}
                                  name="carOption"
                                  checked={selectedCar === option}
                                  onChange={() => handleCarChange(option)}
                                  className="h-4 w-4 text-blue-600"
                                />
                                <label htmlFor={option} className="text-sm text-gray-700">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {car.type === "Sedan" && (
                          <div className="mt-2 flex items-center gap-4">
                            {carInfo.options?.map((option) => (
                              <div key={option} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  id={option}
                                  name="sedanOption"
                                  checked={selectedSedan === option}
                                  onChange={() => handleSedanChange(option)}
                                  className="h-4 w-4 text-blue-600"
                                />
                                <label htmlFor={option} className="text-sm text-gray-700">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {car.type === "SUV" && (
                          <div className="mt-2 flex items-center gap-4">
                            {carInfo.options?.map((option) => (
                              <div key={option} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  id={option}
                                  name="suvOption"
                                  checked={selectedSUV === option}
                                  onChange={() => handleSUVChange(option)}
                                  className="h-4 w-4 text-blue-600"
                                />
                                <label htmlFor={option} className="text-sm text-gray-700">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-green-600 text-sm">Limited Time Offer</span>
                        <div className="text-2xl font-bold">₹{price}/day</div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Distance
                        </div>
                        <p className="text-sm">{distance || 149} km included</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Fuel Type
                        </div>
                        <p className="text-sm">CNG with refill breaks</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Duration
                        </div>
                        <p className="text-sm">24 Hour rental</p>
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Free cancellation up to 1 hour before pickup</span>
                    </div>

                    <button
                      className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        if (!distance) {
                          alert("Please select pickup and drop locations to get the final price");
                          return;
                        }

                        const priceKey = getCarPriceKey(car.type);
                        const basePrice = tripInfo?.[priceKey] || 0;

                        // Get the correct selected image based on car type
                        let selectedImage = car.image;
                        if (car.type === "Hatchback") {
                          selectedImage = selectedCarImage;
                        } else if (car.type === "Sedan") {
                          selectedImage = selectedSedanImage;
                        } else if (car.type === "SUV") {
                          selectedImage = selectedSUVImage;
                        }

                        // Store complete booking data in localStorage
                        const bookingData = {
                          name: carInfo.title,
                          image: selectedImage,
                          price: price,
                          basePrice: basePrice,
                          category: car.type,
                          pickupLocation: searchParams.get('pickup') || '',
                          dropLocation: searchParams.get('drop') || '',
                          date: searchParams.get('date') || '',
                          returnDate: searchParams.get('returnDate') || '',
                          time: searchParams.get('time') || '',
                          tripType: searchParams.get('tripType') || 'oneWay',
                          distance: distance,
                          days: days,
                          features: car.features || [],
                          rating: car.rating || 4.7,
                          reviews: car.reviews || 50,
                          priceDetails: {
                            basePrice: basePrice,
                            totalPrice: price,
                            distance: distance,
                            days: days,
                            pricePerKm: basePrice
                          }
                        };

                        localStorage.setItem('bookingData', JSON.stringify(bookingData));
                        
                        // Include all necessary parameters in the URL
                        const params = new URLSearchParams({
                          carType: car.type,
                          name: carInfo.title,
                          image: selectedImage || '',
                          price: price.toString(),
                          basePrice: basePrice.toString(),
                          category: car.type,
                          pickupLocation: searchParams.get('pickup') || '',
                          dropLocation: searchParams.get('drop') || '',
                          date: searchParams.get('date') || '',
                          returnDate: searchParams.get('returnDate') || '',
                          time: searchParams.get('time') || '',
                          tripType: searchParams.get('tripType') || 'oneWay',
                          distance: distance?.toString() || '0',
                          days: days.toString(),
                          features: JSON.stringify(car.features || []),
                          rating: (car.rating || 4.7).toString(),
                          reviews: (car.reviews || 50).toString()
                        } as Record<string, string>);
                        
                        window.location.href = `/booking/invoice?${params.toString()}`;
                      }}
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {featureCards.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
} 