// import axios from "axios";


// const getNearByPlace=async(category,lat,lng)=>{
//     try{
//         axios.get('/api/google-nearby-place?category='+category+'&lat='+lat+'&lng='+lng);

//     }catch(error){
//         console.error(error)
//     }
// }
        
// export default{
//     getNearByPlace
// }        

import axios from "axios";

const getNearByPlace = async (category, lat, lng) => {
  try {
    const response = await axios.get(`/api/google-nearby-place?category=${category}&lat=${lat}&lng=${lng}`);
    return response.data; // Ensure you return the response data
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error; // Optionally rethrow to handle error where function is called
  }
};

const searchPlace=async(searchtext,lat,lng)=>{
    try{
        const response = await axios.get('/api/google-search-place?searchtext='+
            searchtext+"&lat="+lat+"&lng="+lng);
        return response.data; 
    }catch (error) {
        console.error('Error fetching search places:', error);
        throw error; // Optionally rethrow to handle error where function is called
      }
    
}
export default { getNearByPlace, searchPlace };
