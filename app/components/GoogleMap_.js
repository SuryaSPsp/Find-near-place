'use client'
import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, InfoBox, LoadScript, Marker } from '@react-google-maps/api';
import { UserLocationContext } from '@/context/UserLocationContext';
import { BusinessListContext } from '@/context/BusinessListContext';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius:20
};


const GoogleMap_= () => {
  const [mapLoaded, setMapLoaded] = useState(false);
 const {userLocation,setUserLocation}= useContext(UserLocationContext);
 const {businessList,setBusinessList} = useContext(BusinessListContext);
 const {selectedBusiness,setSelectedBusiness} = useContext(SelectedBusinessContext);

  useEffect(() => {
    // Optionally check if the Google Maps API is loaded.
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      {userLocation?
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
            !selectedBusiness.name?
            {
                lat:userLocation.lat,
                lng:userLocation.lng
            }:selectedBusiness.geometry.location
        }
        zoom={15}
      >
        {/* Add any markers or other map components here */}
        {businessList&&businessList.map((business,index)=>
        (
            <Marker position={business.geometry.location} 
                icon={{
                    url:'/location-pin.png',
                    scaledSize:{
                        width:30,
                        height:30
                    }
                }}
        >
            <InfoBox position={business.geometry.location}>
                  <div
                    style={{
                      backgroundColor: "white",
                      backgroundColor: "#c084fc",
                      opacity: 1,
                      padding: 7,
                      color: "white",
                      borderRadius: 10,
                      width: 100,
                    }}
                  >
                    <div style={{ fontSize: 13, fontColor: `#08233B` }}>
                     <h2> {business.name}</h2>
                    </div>
                  </div>
                </InfoBox>
        </Marker>
        ))}
        <Marker position={userLocation} 
                icon={{
                    url:'/user-location.png',
                    scaledSize:{
                        width:50,
                        height:50
                    }
                }}
        />
      </GoogleMap>:null}
    </LoadScript>
  );
};

export default GoogleMap_;
