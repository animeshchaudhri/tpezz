"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import {
  APIProvider,
  Map,
  Marker,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Wifi, Coffee, ParkingCircleIcon, Globe } from "lucide-react";
import {
  APIKEY,
  getDestination,
  searchHotels,
} from "@/lib/services/HotelService";
import { set } from "date-fns";
import Loading from "@/app/loading";

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

export function HotelSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(12);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLocationData = async () => {
      const destination = searchParams.get("destination") || "";
      try {
        const data = await getDestination(destination);
        console.log("Fetched location data:", data);
        if (data && data.length > 0) {
          setLocation(data[0]);
          setMapCenter({ lat: data[0].latitude, lng: data[0].longitude });
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, [searchParams]);

  useEffect(() => {
    const fetchHotels = async () => {
      if (location) {
        const checkin = searchParams.get("checkin") || "2024-09-01";
        const checkout = searchParams.get("checkout") || "2024-09-05";
        const adults = searchParams.get("adults") || "2";
        const children = searchParams.get("children") || "1";
        const childrenAges = searchParams.get("childrenAges") || "5";

        try {
          const data = await searchHotels(
            location.dest_id,
            location.dest_type,
            checkin,
            checkout,
            adults,
            children,
            childrenAges
          );

          setHotels(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      }
    };

    fetchHotels();
  }, [location, searchParams]);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setMapCenter({
      lat: parseFloat(hotel.latitude),
      lng: parseFloat(hotel.longitude),
    });
    setMapZoom(16);
  };

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setMapCenter(ev.detail.center);
    setMapZoom(ev.detail.zoom);
  }, []);

  const renderStars = (classRating: number) => {
    return Array(Math.floor(classRating))
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ));
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const renderAmenities = (facilities: string) => {
    const hasWifi = facilities.includes("wifi");
    const hasParking = facilities.includes("parking");
    const hasBreakfast = facilities.includes("breakfast");

    return (
      <div className="flex space-x-2 mt-2">
        {hasWifi && <Wifi className="w-4 h-4" />}
        {hasParking && <ParkingCircleIcon className="w-4 h-4" />}
        {hasBreakfast && <Coffee className="w-4 h-4" />}
      </div>
    );
  };

  const handlesubmit = async (hotel: Hotel) => {
    const intertests = searchParams.get("interests") || "";
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const lat = parseFloat(hotel.latitude);
    const lng = parseFloat(hotel.longitude);
    const destination = searchParams.get("destination") || "";
    const hotelname = hotel.hotel_name;

    const queryParams = new URLSearchParams({
      interests: intertests,
      checkin: checkin,
      checkout: checkout,
      lat: lat.toString(),
      lng: lng.toString(),
      destination: destination,
      hotelname: hotelname,
    });
    router.push(`/Itinerary?${queryParams}`);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 overflow-y-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          Hotels in {location?.name || "Loading..."}
        </h2>
        {loading ? (
          <>
            <div>
              <div className="flex items-center justify-center min-h-screen bg-gray-900 flex-col">
                <div className="relative">
                  <Globe className="w-16 h-16 text-gray-600 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-gray-500 animate-spin"></div>
                  <div
                    className="absolute inset-0 rounded-full border-b-2 border-l-2 border-gray-700 animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
                <p>hotels loading..</p>
              </div>
            </div>
          </>
        ) : (
          hotels.map((hotel) => (
            <Card
              key={hotel.hotel_id}
              className={`${
                selectedHotel?.hotel_id === hotel.hotel_id
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{hotel.hotel_name}</span>
                  <div className="flex">{renderStars(hotel.class)}</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <img
                    src={hotel.max_photo_url}
                    alt={hotel.hotel_name}
                    className="w-40 h-40 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="font-semibold text-lg">
                        {hotel.price_breakdown.gross_price}{" "}
                        {hotel.price_breakdown.currency}
                      </p>
                      <Badge
                        variant={
                          hotel.review_score > 8 ? "default" : "secondary"
                        }
                        className="mt-1"
                      >
                        {hotel.review_score}/10 - {hotel.review_score_word}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-2">
                        {hotel.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        {hotel.distance_to_cc} km from center
                      </p>
                      <p className="text-sm font-medium mt-2">
                        {stripHtmlTags(hotel.unit_configuration_label)}
                      </p>
                      {renderAmenities(hotel.hotel_facilities)}
                    </div>
                    <p className="text-sm text-green-600 mt-2">
                      {hotel.is_free_cancellable
                        ? "Free cancellation"
                        : "Non-refundable"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="mr-6"
                  onClick={() => handleSelectHotel(hotel)}
                >
                  View
                </Button>
                <Button onClick={() => handlesubmit(hotel)}>Select</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      <div className="map-container w-full lg:w-1/2 h-screen lg:fixed lg:top-0 lg:right-0">
        <APIProvider apiKey={APIKEY}>
          <Map
            center={mapCenter}
            zoom={mapZoom}
            gestureHandling={"greedy"}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
            clickableIcons={false}
            mapTypeControl={false}
            streetViewControl={false}
            disableDefaultUI={true}
            onCameraChanged={handleCameraChange}
            style={{ width: "100%", height: "100%" }}
          >
            {hotels.map((hotel) => (
              <Marker
                key={hotel.hotel_id}
                position={{
                  lat: parseFloat(hotel.latitude),
                  lng: parseFloat(hotel.longitude),
                }}
                title={hotel.hotel_name}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}

export default HotelSearch;
