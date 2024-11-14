
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!category || !lat || !lng) {
    console.error('Missing required query parameters:', { category, lat, lng });
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: `${lat},${lng}`,
        radius: 1000,
        type: category,
        key: GOOGLE_API_KEY,
      },
    });

    console.log("Google API Response:", response.data); // Verify response structure
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message); // Log specific error details
    return NextResponse.json({ error: error.response?.data || 'Server error' }, { status: 500 });
  }
}
