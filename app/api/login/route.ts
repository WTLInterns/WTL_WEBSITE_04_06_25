import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the request data
    const requestData = await request.json();
    console.log('Login API route called with data:', requestData);
    
    // Transform the data format to match CarRentalLoginRequest.java
    // The backend expects mobile and password
    const payload = {
      mobile: requestData.mobileNo,
      password: requestData.password
    };
    
    console.log('Sending to backend:', payload);
    
    // Forward the request to the backend
    const response = await fetch('https://api.worldtriplink.com/auth/userlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('Backend response status:', response.status);
    
    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
      console.log('Backend response data:', data);
    } catch (err) {
      const textResponse = await response.text();
      console.error('Failed to parse backend response as JSON:', textResponse);
      
      // Return an error response
      return NextResponse.json(
        { success: false, message: 'Error communicating with authentication server' },
        { status: 500 }
      );
    }
    
    // If the backend request was successful
    if (response.ok) {
      // Extract and normalize role
      let role = data.role || '';
      
      // Convert role to uppercase for consistency
      role = typeof role === 'string' ? role.toUpperCase() : '';
      
      // Map role names if needed (example: map "vendor" to "VENDOR")
      if (role.toLowerCase() === 'vendor') {
        role = 'VENDOR';
      } else if (role.toLowerCase() === 'admin') {
        role = 'ADMIN';
      } else if (!role || role.toLowerCase() === 'user') {
        role = 'USER';
      }
      
      console.log('Backend response raw data:', data);
      
      // Check if email and address are available in the response
      const emailField = data.email || data.userEmail;
      const addressField = data.address || data.userAddress;
      console.log('Found email field in response:', emailField ? 'Yes' : 'No', emailField);
      console.log('Found address field in response:', addressField ? 'Yes' : 'No', addressField);
      
      // Get username from the proper field
      const username = data.username || data.driverName || data.userName || data.user_name || requestData.mobileNo;
      console.log('Extracted username:', username);
      
      // Generate a token if one is not provided by the backend
      const token = data.token || `temp_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Transform response
      const responseData = {
        success: true,
        message: 'Login successful',
        username: username,
        role: role,
        token: token,
        // Extract email and address from the backend response
        email: emailField || '',
        address: addressField || '',
        userId: data.userId || data.id || ''
      };
      
      console.log('Normalized response data:', responseData);
      return NextResponse.json(responseData);
    } else {
      // Return the error from the backend
      return NextResponse.json(
        { success: false, message: data.message || 'Invalid credentials' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    
    // Return a generic error response
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 