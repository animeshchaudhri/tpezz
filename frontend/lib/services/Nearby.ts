import axios from 'axios';

export const getNearby = async (lat:string , lng:string , ) => {

   

    const options = {
        method: 'GET',
        url: 'https://google-map-places.p.rapidapi.com/maps/api/place/nearbysearch/json',
        params: {
          location: `${lat},${lng}`,
          radius: '50000',
          language: 'en',
          opennow: 'true',
          rankby: 'prominence'
        },
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_API_NEARBY,
          'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
        }
      };
    
      try {
          const response = await axios.request(options);
          return response.data;
      } catch (error) {
          console.error(error);
      }
    }


