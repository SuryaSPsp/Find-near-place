import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(req) {
    const { searchtext, lat, lng } = req.nextUrl.searchParams;

    if (!searchtext || !lat || !lng) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const url = `${BASE_URL}/findplacefromtext/json`;

    try {
        const response = await axios.get(url, {
            params: {
                fields: "formatted_address,name,rating,opening_hours,geometry,photos",
                input: searchtext,
                inputtype: "textquery",
                locationbias: `circle:20000@${lat},${lng}`,
                key: GOOGLE_API_KEY,
            },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("API Request Error:", error.response ? error.response.data : error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
