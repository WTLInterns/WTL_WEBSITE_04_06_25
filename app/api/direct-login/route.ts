import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the request data
    const requestData = await request.json();
    console.log('Direct login API route called with data:', requestData);
    
    // Forward the request directly to the backend with no transformations
    const response = await fetch('https://api.worldtriplink.com/auth/userlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    console.log('Backend response status:', response.status);
    
    // Return the raw response content for debugging
    const rawText = await response.text();
    console.log('Raw response:', rawText);
    
    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(rawText);
      console.log('Parsed JSON data:', data);
      return NextResponse.json(data, { status: response.status });
    } catch (err) {
      console.error('Response is not valid JSON:', err);
      // Return the raw text for debugging
      return new NextResponse(rawText, { 
        status: response.status,
        headers: { 'Content-Type': 'text/plain' } 
      });
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 