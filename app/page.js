"use client"

import Image from "next/image";
import SearchBar  from "./components/SearchBar";
import CategoryList from "./components/CategoryList";
import BusinessList from "./components/BusinessList";
import GlobalApi from "@/services/GlobalApi";
import { useEffect,useState,useContext } from "react";
import { UserLocationContext } from "@/context/UserLocationContext";
import GoogleMap_ from "./components/GoogleMap_";
import { BusinessListContext } from "@/context/BusinessListContext";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";
import BusinessToast from "./components/BusinessToast";
import SideNavBar  from "./components/SideNavBar";

export default function Home() {
  const [businessList,setBusinessList]=useState([]); 
  const [selectedBusiness,setSelectedBusiness]=useState([]); 
  const {userLocation,setUserLocation}=useContext(UserLocationContext)

  useEffect(() => {
    if(userLocation)
    getNearByPlace('restaurant');
  }, [userLocation])
  

  const getNearByPlace=(category)=>{
    GlobalApi.getNearByPlace(category,userLocation?.lat,userLocation?.lng)
    .then(res=>{
      setBusinessList(res.results)
    })
  }
  return (
    <div className='flex'>
      <SelectedBusinessContext.Provider value={{selectedBusiness,setSelectedBusiness}}>
      <BusinessListContext.Provider value={{businessList,setBusinessList}}>      
        <SideNavBar/>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:px-10 w-full mt-10 gap-8">
        <div>
          <SearchBar />
          <CategoryList setSelectedCategory={(category)=>getNearByPlace(category)} />
          <BusinessList businessListData={businessList} />
        </div>

        <div className="order-first md:order-last">
          <GoogleMap_/>
          <BusinessToast userLocation={userLocation}/>
        </div>
      </div>
      </BusinessListContext.Provider>
      </SelectedBusinessContext.Provider>
    </div>
    
  );
}
