import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://worldtriplink.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/my-trip`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ]

  // City pages
  const cityPages = [
    'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 
    'Chandrapur', 'Gadchiroli', 'Gondia', 'Jalna', 'Kolhapur',
    'Latur', 'Lonavala', 'Mumbai', 'Nanded', 'Nashik',
    'Osmanabad', 'Palghar', 'Pune', 'Ratnagiri', 'Satara',
    'Shirdi', 'Sindhudurg', 'Wardha', 'Washim'
  ].map(city => ({
    url: `${baseUrl}/cities/Cab-Service-${city}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Corporate pages
  const corporatePages = [
    'Mumbai', 'Pune', 'Chennai', 'Indore',
    'Surat', 'Telangana', 'Bangalore'
  ].map(city => ({
    url: `${baseUrl}/corporate/Monthly-Cab-Service-${city}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Special corporate pages
  const specialCorporatePages = [
    {
      url: `${baseUrl}/corporate/Corporate-Employee-Transport-Services-Delhi`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ]

  // Authentication pages (lower priority)
  const authPages = [
    {
      url: `${baseUrl}/login`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/Register`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/forgot-password`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  return [
    ...staticPages,
    ...cityPages,
    ...corporatePages,
    ...specialCorporatePages,
    ...authPages,
  ]
} 