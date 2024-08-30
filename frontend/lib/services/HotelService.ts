import axios from "axios";

interface Location {
  dest_id: string;
  dest_type: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Hotel {
  hotel_id: string;
  hotel_name: string;
  address: string;
  latitude: string;
  longitude: string;
  max_photo_url: string;
  price_breakdown: {
    gross_price: number;
    currency: string;
  };
  review_score: number;
  review_score_word: string;
  class: number;
  hotel_facilities: string;
  distance_to_cc: string;
  is_free_cancellable: number;
  unit_configuration_label: string;
}

export const getDestination = async (name: string): Promise<Location[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/hotels/locations`,
      {
        params: {
          locale: "en-us",
          name: name,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching destination:", error);
    throw error;
  }
};

export const searchHotels = async (
  dest_id: string,
  dest_type: string,
  checkin: string,
  checkout: string,
  adults: string,
  children: string,
  childrenAges: string
): Promise<Hotel[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKENDURL}/hotels/search`,
      {
        params: {
          dest_id,
          dest_type,
          locale: "en-us",
          checkin_date: checkin,
          checkout_date: checkout,
          adults_number: adults,
          children_number: children,
          children_ages: childrenAges,
          room_number: "1",
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error searching hotels:", error);
    throw error;
  }
};

export const APIKEY = process.env.NEXT_PUBLIC_API_KEY as string;
