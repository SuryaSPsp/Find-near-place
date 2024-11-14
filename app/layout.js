"use client"

import localFont from "next/font/local";
import "./globals.css";
import {useEffect,useState} from 'react'
import { UserLocationContext } from "@/context/UserLocationContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});





export default function RootLayout({ children }) {
  const [userLocation, setUserLocation] = useState([])

  useEffect(() => {
    getUserLocation()
  }, [])
  

const getUserLocation=()=>{
  navigator.geolocation.getCurrentPosition(function(pos){
    setUserLocation({
      lat:pos.coords.latitude,
      lng:pos.coords.longitude
    })
  })
}

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserLocationContext.Provider value={{userLocation,setUserLocation}}>    
              {children}
        </UserLocationContext.Provider>

      </body>
    </html>
  );
}
