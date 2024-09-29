"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generate } from "@/lib/services/AiService";
import { APIKEY } from "@/lib/services/HotelService";

import { Globe } from "lucide-react";
import { getNearby } from "@/lib/services/Nearby";

interface ItineraryData {
  trip_details: {
    destination: string;
    hotel: string;
    check_in_date: string;
    check_out_date: string;
    guest_interests: string[];
  };
  itinerary: {
    [key: string]: {
      theme: string;
      route: {
        summary: string;
        start: { address: string; latitude: number; longitude: number };
        waypoints: Array<{
          name: string;
          latitude: number;
          longitude: number;
          duration: string;
          category: string;
        }>;
        end: { address: string; latitude: number; longitude: number };
        distance: string;
        duration: string;
      };
      activities: Array<{
        time: string;
        description: string;
        location: string;
        latitude: number;
        longitude: number;
        duration: string;
        category: string;
      }>;
      dining: {
        name: string;
        description: string;
        location: string;
        latitude: number;
        longitude: number;
      };
    };
  };
  notes: {
    [key: string]: string;
  };
}

function DayRoute({
  route,
  onRouteRendered,
}: {
  route: ItineraryData["itinerary"][string]["route"];
  onRouteRendered: () => void;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    const renderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !route) return;

    const waypoints = route.waypoints.map((wp) => ({
      location: new google.maps.LatLng(wp.latitude, wp.longitude),
      stopover: true,
    }));

    directionsService
      .route({
        origin: new google.maps.LatLng(
          route.start.latitude,
          route.start.longitude
        ),
        destination: new google.maps.LatLng(
          route.end.latitude,
          route.end.longitude
        ),
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        onRouteRendered();
      });

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [directionsService, directionsRenderer, route, onRouteRendered]);

  return null;
}

export default function Itinerary() {
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<
    ItineraryData["itinerary"][string]["route"] | null
  >(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    generateItinerary();
  }, []);

  const generateItinerary = async (): Promise<void> => {
    const interests = searchParams.get("interests");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const destination = searchParams.get("destination");
    const hotelname = searchParams.get("hotelname");

    if (
      !interests ||
      !checkin ||
      !checkout ||
      !lat ||
      !lng ||
      !destination ||
      !hotelname
    ) {
      setError("Missing required search parameters");
      return;
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const duration = Math.round(
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const neabyPlaces = await getNearby(lat, lng);
    console.log("Nearby places:", neabyPlaces);
    const prompt = `Generate a detailed ${duration}-day itinerary for a trip to ${destination}, with accommodations at ${hotelname}. The itinerary should include specific driving routes for each day, with at least two activities to create waypoints. Use the following details to create a personalized and well-rounded travel plan:

Check-in date: ${checkin}
Check-out date: ${checkout}
Guest interests: ${interests}
Hotel coordinates: Latitude ${lat}, Longitude ${lng}

The itinerary should cover:
- Popular tourist attractions and hidden gems.
- Local dining recommendations.
- A balance of activities and relaxation.
- Seasonal and weather considerations.
- Customized activities based on guest interests.

Each day's activities should include:
- At least 2 activities with details:
  - Approximate time
  - Brief description
  - Location name
  - Coordinates (latitude and longitude)
  - Estimated duration
  - Category (e.g., 'cultural', 'adventure', 'dining', 'relaxation')

For each day's route, provide:
- Route summary
- Start and end addresses
- Waypoints (based on activities)
- Distance
- Estimated duration
- Coordinates for start, end, and waypoints
the trip would either start or end at hotel remember each day so include the hotel in the route (important)
make sure that places are open and accessible during the guest's stay.
Please format the response as a JSON object.
give only json in response nothing else.
here is data of neaby places pick according to interest of guest they will go from hotel to the place of interest and make sure they go for interest places ${neabyPlaces};

if the neaby places are not according to the interest of guest then you can use ur own data rarely do this but if you have to then do it

here is format of json
"{\r\n  \"trip_details\": {\r\n    \"destination\": \"string\",\r\n    \"hotel\": \"string\",\r\n    \"check_in_date\": \"string\",\r\n    \"check_out_date\": \"string\",\r\n    \"guest_interests\": [\"string\"]\r\n  },\r\n  \"itinerary\": {\r\n    \"day_1\": {\r\n      \"theme\": \"string\",\r\n      \"route\": {\r\n        \"summary\": \"string\",\r\n        \"start\": {\r\n          \"address\": \"string\",\r\n          \"latitude\": 0,\r\n          \"longitude\": 0\r\n        },\r\n        \"waypoints\": [\r\n          {\r\n            \"name\": \"string\",\r\n            \"latitude\": 0,\r\n            \"longitude\": 0,\r\n            \"duration\": \"string\",\r\n            \"category\": \"string\"\r\n          }\r\n        ],\r\n        \"end\": {\r\n          \"address\": \"string\",\r\n          \"latitude\": 0,\r\n          \"longitude\": 0\r\n        },\r\n        \"distance\": \"string\",\r\n        \"duration\": \"string\"\r\n      },\r\n      \"activities\": [\r\n        {\r\n          \"time\": \"string\",\r\n          \"description\": \"string\",\r\n          \"location\": \"string\",\r\n          \"latitude\": 0,\r\n          \"longitude\": 0,\r\n          \"duration\": \"string\",\r\n          \"category\": \"string\"\r\n        }\r\n      ],\r\n      \"dining\": {\r\n        \"name\": \"string\",\r\n        \"description\": \"string\",\r\n        \"location\": \"string\",\r\n        \"latitude\": 0,\r\n        \"longitude\": 0\r\n      }\r\n    }\r\n  },\r\n  \"notes\": {\r\n    \"note_key\": \"string\"\r\n  }\r\n}"
`

;
    try {
      setLoading(true);
      setError(null);

      const response = await generate(prompt);
      
      let Code = response;
      if (Code.includes("```json") || Code.includes("```")) {
        Code = Code.replace("```json", "");
        Code = Code.replace("```", "");
        Code = Code.replace("```", "");
      }
      const data: ItineraryData = JSON.parse(Code);
      
      setItinerary(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRouteRendered = useCallback(() => {
    
  }, []);

  const handleShowRoute = useCallback(
    (dayData: ItineraryData["itinerary"][string]["route"]) => {
      setSelectedDay(dayData);
      setKey((prevKey) => prevKey + 1);
    },
    []
  );

  if (loading) {
    return (
      <div className="p-4 dark:bg-gray-900 dark:text-white flex items-center justify-center h-screen flex-col">
        <div className="relative">
          <Globe className="w-16 h-16 text-gray-600 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-gray-500 animate-spin"></div>
          <div
            className="absolute inset-0 rounded-full border-b-2 border-l-2 border-gray-700 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <p>Generating your itinerary...</p>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="p-4 dark:bg-gray-900 dark:text-white">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  

 return (

 (itinerary &&(
  <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900 min-h-screen">
    <div className="itinerary-content w-full lg:w-1/2 p-4 overflow-y-auto max-h-screen">
      <Card className="mb-6 overflow-hidden shadow-lg dark:bg-gray-800">
        <CardHeader className="text-white p-4 ">
          <CardTitle className="text-2xl font-bold ">
            {itinerary.trip_details.destination} Trip
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 dark:text-gray-300">
          <p className="mb-2">
            <span className="font-semibold">Hotel:</span> {itinerary.trip_details.hotel}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Check-in:</span> {itinerary.trip_details.check_in_date}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Check-out:</span> {itinerary.trip_details.check_out_date}
          </p>
        </CardContent>
      </Card>



      <Accordion type="single" collapsible className="w-full mb-6">
        {Object.entries(itinerary.itinerary).map(([day, dayData]) => (
          <AccordionItem value={day} key={day} className="border-b dark:border-gray-700">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                {day.replace("_", " ").toUpperCase()}: {dayData.theme}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3">
              <Card className="overflow-hidden shadow-md dark:bg-gray-800">
                <CardContent className="p-4 dark:text-gray-300">
                  <h4 className="font-bold text-xl mb-4 text-blue-600 dark:text-blue-400">
                    Activities:
                  </h4>
                  {dayData.activities.map((activity, index) => (
                    <div key={index} className="mb-4 pb-4 border-b last:border-b-0 dark:border-gray-700">
                      <p className="font-semibold text-lg dark:text-white">{activity.time}</p>
                      <p className="mb-2">{activity.description}</p>
                      <p className="mb-1">
                        <span className="font-semibold">Location:</span> {activity.location}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Duration:</span> {activity.duration}
                      </p>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {activity.category}
                      </Badge>
                    </div>
                  ))}
                  <Button
                    onClick={() => handleShowRoute(dayData.route)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Show Route
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="overflow-hidden shadow-lg dark:bg-gray-800">
        <CardHeader className="text-white p-4 ">
          <CardTitle className="text-xl font-bold">Trip Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-4 dark:text-gray-300">
          {Object.entries(itinerary.notes).map(([key, value]) => (
            <p key={key} className="mb-2">
              <strong className="font-semibold dark:text-white">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </strong>{" "}
              {value}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>

    <div className="map-container w-full lg:w-1/2 h-screen lg:fixed lg:top-0 lg:right-0">
      <APIProvider apiKey={APIKEY}>
        <Map
          defaultCenter={{
            lat: parseFloat(searchParams.get("lat") || "0"),
            lng: parseFloat(searchParams.get("lng") || "0"),
          }}
          defaultZoom={11}
          gestureHandling={"greedy"}
          fullscreenControl={false}
          className="w-full h-full"
        >
          {selectedDay && (
            <DayRoute
              key={key}
              route={selectedDay}
              onRouteRendered={handleRouteRendered}
            />
          )}
        </Map>
      </APIProvider>
    </div>
  </div>
 ))
);
}
