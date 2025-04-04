"use client"
import { useState, useEffect, Suspense } from "react"
import Footer from "@/components/footer"
import { useSearchParams } from 'next/navigation'
import Navbar2 from "../../components/Navbar2"

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
  const [cabInfo, setCabInfo] = useState<any[]>([])
  const [days, setDays] = useState<number>(0)
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  
  // Debug logger function
  const debugLog = (...args: any[]) => {
    if (DEBUG_MODE) {
      console.log('[DEBUG]', ...args);
    }
  }
  
  const categories = [
    { name: "All Cars", count: null },
    { name: "Hatchback", count: 3 },
    { name: "Sedan", count: 4 },
    { name: "Sedan Premium", count: 3 },
    { name: "SUV", count: 2 },
    { name: "MUV", count: 1 }
  ]

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
      // Check localStorage for saved distance
      const savedDistance = localStorage.getItem('cabDistance')
      if (savedDistance) {
        setDistance(Number(savedDistance))
        // Also store in localStorage to ensure it's available throughout the session
        localStorage.setItem('cabDistance', savedDistance)
      }
    } else {
      setDistance(Number(distanceParam))
      // Also store in localStorage to ensure it's available throughout the session
      localStorage.setItem('cabDistance', distanceParam)
    }

    const fetchTripInfo = async () => {
      const pickup = searchParams.get('pickup')
      const drop = searchParams.get('drop')
      
      if (pickup && drop) {
        try {
          debugLog("Fetching pricing info for:", pickup, "to", drop)
          console.log("Fetching trip and pricing info for:", pickup, "to", drop)
          
          // Convert trip type to match what the backend expects
          let tripTypeValue = 'oneWay';
          if (searchParams.get('tripType') === 'round-trip') {
            tripTypeValue = 'roundTrip';
          } else if (searchParams.get('tripType') === 'rental-trip') {
            tripTypeValue = 'rentalTrip';
          }
          
          // Get distance from localStorage if available
          let distanceValue = '0'; // Set to 0 to force backend to calculate distance
          if (typeof window !== 'undefined') {
            const savedDistance = localStorage.getItem('cabDistance');
            if (savedDistance && Number(savedDistance) > 0) {
              distanceValue = savedDistance;
              debugLog("Using distance from localStorage:", distanceValue);
            }
          }
          
          // Use the full URL to your Java backend API
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
              distance: distanceValue // Pass the distance from localStorage if available
            })
          })

          if (response.ok) {
            const data = await response.json()
            debugLog("API response:", data)
            console.log("API full response data:", data) // Always log this for debugging
            
            // If API doesn't return valid distance, use default
            if (!data.distance || data.distance === 0 || data.distance < 0) {
              // Backend returned invalid distance
              console.error("⚠️ API returned invalid distance:", data.distance, "Using default distance: 100km");
              setDistance(100);
              
              // Store the default distance in localStorage
              if (typeof window !== 'undefined') {
                localStorage.setItem('cabDistance', '100');
              }
            } else {
              setDistance(data.distance);
              console.log("✅ Using API distance:", data.distance);
              
              // Store the API-provided distance in localStorage
              if (typeof window !== 'undefined') {
                localStorage.setItem('cabDistance', data.distance.toString());
              }
            }
            
            // If tripinfo is empty or doesn't have correct pricing, use default values
            if (!data.tripinfo || data.tripinfo.length === 0 || 
                !isValidTripInfo(data.tripinfo[0])) {
              debugLog("Using default trip info - no valid data from API");
              setTripInfo(createDefaultTripInfo())
            } else {
              debugLog("Using trip info from API:", data.tripinfo[0]);
              console.log("Trip info from API (for pricing):", data.tripinfo[0]);
              setTripInfo(data.tripinfo[0])
            }
            
            if (data.cabinfo && data.cabinfo.length > 0) {
              setCabInfo(data.cabinfo)
            }
            
            // Ensure days is always a positive number
            const daysValue = data.days && data.days > 0 ? data.days : 0;
            setDays(daysValue)
            debugLog(`Setting days: ${daysValue}`)
          } else {
            console.error('Error response from API:', response.statusText)
            
            // Default distance if API fails
            const defaultDistance = 100;
            setDistance(defaultDistance)
            
            // Store the default distance in localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('cabDistance', defaultDistance.toString());
            }
            
            // Fall back to default prices if API fails
            setTripInfo(createDefaultTripInfo())
          }
        } catch (error) {
          console.error('Error fetching trip info:', error)
          
          // Default distance if API fails
          const defaultDistance = 100;
          setDistance(defaultDistance)
          
          // Store the default distance in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('cabDistance', defaultDistance.toString());
          }
          
          // Fall back to default prices if API fails
          setTripInfo(createDefaultTripInfo())
        }
      }
    }

    fetchTripInfo()

    // Set up interval to check for price updates every 30 seconds
    const priceUpdateInterval = setInterval(() => {
      fetchTripInfo()
    }, 30000)
    
    return () => clearInterval(priceUpdateInterval)
  }, [searchParams, isClient])

  const getLatestPrice = (carType: string) => {
    // Set base prices for each car type
    let basePrice = 0;
    switch(carType) {
      case 'Hatchback':
        basePrice = 12;
        break;
      case 'Sedan':
        basePrice = 15;
        break;
      case 'Sedan Premium':
        basePrice = 18;
        break;
      case 'SUV':
        basePrice = 21;
        break;
      case 'MUV':
        basePrice = 26;
        break;
    }

    // First try to get distance from state, then localStorage as fallback, then default to 100km
    let calculatedDistance = distance;
    if (!calculatedDistance && typeof window !== 'undefined') {
      const savedDistance = localStorage.getItem('cabDistance');
      if (savedDistance && Number(savedDistance) > 0) {
        calculatedDistance = Number(savedDistance);
        debugLog(`Using distance from localStorage for ${carType}: ${calculatedDistance}km`);
      }
    }
    calculatedDistance = calculatedDistance || 100; // Default to 100 km if still no distance
    
    debugLog(`Price calculation for ${carType}:`);
    debugLog(`- Distance: ${calculatedDistance}km`);
    debugLog(`- Default price per km: ${basePrice}`);
    console.log(`Calculating price for ${carType} with distance: ${calculatedDistance}km`);

    // If no trip info, use base price × distance
    if (!tripInfo) {
      const totalPrice = Math.round(calculatedDistance * basePrice);
      debugLog(`- No trip info available, using default: ${basePrice} × ${calculatedDistance} = ${totalPrice}`);
      console.log(`No trip info available, using default price: ${basePrice}/km`);
      return {
        totalPrice
      }
    }

    console.log("Trip info for price calculation:", tripInfo);

    // Get price from database based on car type
    let dbPrice = 0;
    try {
    switch(carType) {
      case 'Hatchback':
          dbPrice = tripInfo.hatchback ? Number(tripInfo.hatchback) : 0;
        break;
      case 'Sedan':
          dbPrice = tripInfo.sedan ? Number(tripInfo.sedan) : 0;
        break;
      case 'Sedan Premium':
          dbPrice = tripInfo.sedanpremium ? Number(tripInfo.sedanpremium) : 0;
        break;
      case 'SUV':
          dbPrice = tripInfo.suv ? Number(tripInfo.suv) : 0;
        break;
      case 'MUV':
          dbPrice = tripInfo.suvplus ? Number(tripInfo.suvplus) : 0;
        break;
      }
    } catch (error) {
      console.error(`Error extracting ${carType} price from tripInfo:`, error);
      dbPrice = 0;
    }
    
    console.log(`Database price for ${carType}: ${dbPrice}/km`);
    debugLog(`- Database price per km: ${dbPrice > 0 ? dbPrice : 'Not set'}`);

    // Only use database price if it's greater than 0, otherwise use base price
    const finalPricePerKm = dbPrice > 0 ? dbPrice : basePrice;
    console.log(`Using ${dbPrice > 0 ? 'database' : 'default'} price for ${carType}: ${finalPricePerKm}/km`);
    debugLog(`- Using ${dbPrice > 0 ? 'database' : 'default'} price: ${finalPricePerKm} per km`);

    // Calculate total price based on distance
    let totalPrice = 0;
    const tripType = searchParams.get('tripType');
    debugLog(`Trip type from URL: ${tripType}`);
    debugLog(`Days value: ${days}`);
    console.log(`Trip type: ${tripType}, Days: ${days}`);
    
    if ((tripType === 'roundTrip' || tripType === 'round-trip') && days > 1) {
      // For multi-day round trips: (distance/2) * days
      totalPrice = (calculatedDistance / 2) * days * finalPricePerKm;
      debugLog(`- Multi-day round trip: (${calculatedDistance}/2) × ${days} days × ${finalPricePerKm} = ${totalPrice}`);
    } else {
      // For one-way or same-day round trips: just distance * rate
      totalPrice = calculatedDistance * finalPricePerKm;
      debugLog(`- One-way or same-day calculation: ${finalPricePerKm} × ${calculatedDistance} = ${totalPrice}`);
    }
    
    // No additional charges - show pure calculated price
    const finalTotal = Math.round(totalPrice);
    debugLog(`- Final price: ${finalTotal}`);
    console.log(`Final price for ${carType}: ₹${finalTotal}`);
    
    return {
      totalPrice: finalTotal
    }
  }

  const cars = [
    {
      name: "Hatchback",
      image: "/images/hatchback-car.jpg",
      rating: 4.5,
      reviews: 48,
      features: ["4+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      ...getLatestPrice("Hatchback"),
      discount: "13% OFF",
      category: "Hatchback"
    },
    {
      name: "Sedan",
      image: "/images/sedan-car.jpg",
      rating: 4.5,
      reviews: 48,
      features: ["4+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      ...getLatestPrice("Sedan"),
      discount: "13% OFF",
      category: "Sedan"
    },
    {
      name: "Sedan Premium",
      image: "/images/sedan-premium.jpg",
      rating: 4.5,
      reviews: 48,
      features: ["6+1 Seater", "USB Charging", "Air Conditioning", "Music System"],
      ...getLatestPrice("Sedan Premium"),
      discount: "13% OFF",
      category: "Sedan Premium"
    },
    {
      name: "SUV",
      image: "/images/suv.jpg",
      rating: 4.8,
      reviews: 56,
      features: ["6+1 Seater", "USB Charging", "Climate Control", "Premium Sound System"],
      ...getLatestPrice("SUV"),
      discount: "10% OFF",
      category: "SUV"
    },
    {
      name: "MUV",
      image: "/images/muv.jpg",
      rating: 4.7,
      reviews: 52,
      features: ["7+1 Seater", "USB Charging", "Climate Control", "Entertainment System"],
      ...getLatestPrice("MUV"),
      discount: "12% OFF",
      category: "MUV"
    }
  ]

  const filteredCars = selectedCategory === "All Cars" 
    ? cars 
    : cars.filter(car => car.category === selectedCategory)

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

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar2 />
      
      <div className="container mx-auto px-4 py-8">
        {/* Remove or comment out the Trip Details section */}
        {/* {distance && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Total Distance</p>
                <p className="text-2xl font-bold">{distance} km</p>
              </div>
              {searchParams.get('tripType') === 'roundTrip' && days > 0 && (
                <div>
                  <p className="text-gray-600">Total Days</p>
                  <p className="text-2xl font-bold">{days} days</p>
                </div>
              )}
            </div>
          </div>
        )} */}

        <h1 className="text-2xl font-bold text-center mb-8">Browse by Category</h1>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category.name
                ? "bg-[#1a1f2e] text-white"
                : "bg-white text-[#1a1f2e] border-2 border-[#1a1f2e]"
              }`}
            >
              {category.name} {category.count && `(${category.count})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  {car.discount}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{car.name}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(car.rating))}
                      {"☆".repeat(5 - Math.floor(car.rating))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({car.reviews} reviews)</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {car.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Starting Price</p>
                    <p className="text-xl font-bold text-[#1a1f2e]">
                      ₹{car.totalPrice}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      if (!distance) {
                        alert("Please select pickup and drop locations to get the final price")
                        return
                      }
                      const params = new URLSearchParams({
                        name: car.name,
                        image: car.image,
                        price: car.totalPrice.toString(),
                        features: car.features.join(','),
                        category: car.category,
                        pickupLocation: searchParams.get('pickup') || '',
                        dropLocation: searchParams.get('drop') || '',
                        date: searchParams.get('date') || '',
                        returnDate: searchParams.get('returnDate') || '',
                        time: searchParams.get('time') || '',
                        tripType: searchParams.get('tripType') || 'oneWay',
                        distance: distance?.toString() || '0',
                        days: days.toString()
                      })
                      
                      // Store in localStorage for invoice page to retrieve
                      localStorage.setItem('bookingData', JSON.stringify({
                        name: car.name,
                        image: car.image,
                        price: car.totalPrice,
                        features: car.features,
                        category: car.category,
                        pickupLocation: searchParams.get('pickup') || '',
                        dropLocation: searchParams.get('drop') || '',
                        date: searchParams.get('date') || '',
                        returnDate: searchParams.get('returnDate') || '',
                        time: searchParams.get('time') || '',
                        tripType: searchParams.get('tripType') || 'oneWay',
                        distance: distance?.toString() || '0',
                        days: days.toString()
                      }))
                      
                      window.location.href = `/booking/invoice?${params.toString()}`
                    }}
                    className="bg-[#1a1f2e] text-white px-6 py-2 rounded hover:bg-[#1a1f2e]/90"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
} 