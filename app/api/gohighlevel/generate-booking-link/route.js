import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone } = body;


    // Get the GoHighLevel API key from environment variables. We support both
    // `GOHIGHLEVEL_API_KEY` and the previous `GHL_API_KEY` for backward
    // compatibility.
    const ghlApiKey =
      process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY;

    if (!ghlApiKey) {
      throw new Error('GoHighLevel API key not configured');
    }

    // Get calendar ID from environment variable
    const calendarId = process.env.GOHIGHLEVEL_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('GoHighLevel Calendar ID not configured');
    }

    // HighLevel API v3 embeddable booking widget link
    const queryParams = new URLSearchParams();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    if (firstName) {
      queryParams.append('firstName', firstName);
      queryParams.append('firstname', firstName);
    }
    if (lastName) {
      queryParams.append('lastName', lastName);
      queryParams.append('lastname', lastName);
    }
    if (fullName) queryParams.append('name', fullName);
    if (email) queryParams.append('email', email);
    if (phone) queryParams.append('phone', phone);
    queryParams.append('embed', '1');
    queryParams.append('skipForm', '1');

    const bookingLink = `https://api.leadconnectorhq.com/widget/booking/${calendarId}?${queryParams.toString()}`;

    return NextResponse.json({
      success: true,
      bookingLink,
      data: {
        calendarId,
        contactInfo: { firstName, lastName, email, phone },
      },
      method: 'widget',
    });
  } catch (error) {
    console.error('Error generating booking link:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to generate booking link' },
      { status: 500 },
    );
  }
}
