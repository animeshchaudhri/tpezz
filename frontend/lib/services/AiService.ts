import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export async function generate(data: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_API_GEMINI as string
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8460,
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chatSession = model.startChat({
      generationConfig,
  
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Generate a detailed 3-day itinerary for a trip to goa, with accommodations at Novotel Genova. The itinerary should include specific driving routes for each day, with at least two activities to create waypoints. Use the following details to create a personalized and well-rounded travel plan:\n\nCheck-in date: 2024-08-30\nCheck-out date: 2024-09-02\nGuest interests: beaches,nightlife,adventure,culture\nHotel coordinates: Latitude 44.410573801164, Longitude 8.90238247811794\n\nThe itinerary should cover:\n- Popular tourist attractions and hidden gems.\n- Local dining recommendations.\n- A balance of activities and relaxation.\n- Seasonal and weather considerations.\n- Customized activities based on guest interests.\n\nEach day's activities should include:\n- At least 2 activities with details:\n  - Approximate time\n  - Brief description\n  - Location name\n  - Coordinates (latitude and longitude)\n  - Estimated duration\n  - Category (e.g., 'cultural', 'adventure', 'dining', 'relaxation')\n\nFor each day's route, provide:\n- Route summary\n- Start and end addresses\n- Waypoints (based on activities)\n- Distance\n- Estimated duration\n- Coordinates for start, end, and waypoints\n\nPlease format the response as a JSON object.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '```json\n{\n  "trip_details": {\n    "destination": "Goa, India",\n    "hotel": "Novotel Goa Dona Sylvia Resort",\n    "check_in_date": "2024-08-30",\n    "check_out_date": "2024-09-02",\n    "guest_interests": [\n      "beaches",\n      "nightlife",\n      "adventure",\n      "culture"\n    ]\n  },\n  "itinerary": {\n    "day_1": {\n      "theme": "Beach Relaxation & Cultural Exploration",\n      "route": {\n        "summary": "Hotel to Palolem Beach to Cabo de Rama Fort and back to hotel.",\n        "start": {\n          "address": "Novotel Goa Dona Sylvia Resort, Cavelossim, Goa",\n          "latitude": 15.2474,\n          "longitude": 73.9502\n        },\n        "waypoints": [\n          {\n            "name": "Palolem Beach",\n            "latitude": 15.0085,\n            "longitude": 74.0158,\n            "duration": "4-5 hours",\n            "category": "beach, relaxation"\n          },\n          {\n            "name": "Cabo de Rama Fort",\n            "latitude": 15.0522,\n            "longitude": 73.9369,\n            "duration": "1-2 hours",\n            "category": "culture, history"\n          }\n        ],\n        "end": {\n          "address": "Novotel Goa Dona Sylvia Resort, Cavelossim, Goa",\n          "latitude": 15.2474,\n          "longitude": 73.9502\n        },\n        "distance": "70 km",\n        "duration": "2-3 hours driving"\n      },\n      "activities": [\n        {\n          "time": "10:00 AM - 3:00 PM",\n          "description": "Relax and soak up the sun at Palolem Beach, known for its picturesque scenery.",\n          "location": "Palolem Beach",\n          "latitude": 15.0085,\n          "longitude": 74.0158,\n          "duration": "4-5 hours",\n          "category": "beach, relaxation"\n        },\n        {\n          "time": "4:00 PM - 6:00 PM",\n          "description": "Explore the historical Cabo de Rama Fort, offering stunning views of the Arabian Sea.",\n          "location": "Cabo de Rama Fort",\n          "latitude": 15.0522,\n          "longitude": 73.9369,\n          "duration": "1-2 hours",\n          "category": "culture, history"\n        }\n      ],\n      "dining": {\n        "name": "The Fisherman\'s Wharf",\n        "description": "Enjoy delicious seafood by the beach.",\n        "location": "Near Palolem Beach",\n        "latitude": 15.0103,\n        "longitude": 74.0147\n      }\n    },\n    "day_2": {\n      "theme": "Adventure and Spice Plantation Experience",\n      "route": {\n        "summary": "Hotel to Dudhsagar Falls to a spice plantation and back to hotel.",\n        "start": {\n          "address": "Novotel Goa Dona Sylvia Resort, Cavelossim, Goa",\n          "latitude": 15.2474,\n          "longitude": 73.9502\n        },\n        "waypoints": [\n          {\n            "name": "Dudhsagar Falls",\n            "latitude": 15.3189,\n            "longitude": 74.0231,\n            "duration": "3-4 hours",\n            "category": "adventure, nature"\n          },\n          {\n            "name": "Sahakari Spice Farm",\n            "latitude": 15.4968,\n            "longitude": 73.9882,\n            "duration": "1-2 hours",\n            "category": "culture, food"\n          }\n        ],\n        "end": {\n          "address": "Novotel Goa Dona Sylvia Resort, Cavelossim, Goa",\n          "latitude": 15.2474,\n          "longitude": 73.9502\n        },\n        "distance": "140 km",\n        "duration": "4-5 hours driving"\n      },\n      "activities": [\n        {\n          "time": "9:00 AM - 1:00 PM",\n          "description": "Embark on a jeep safari to the majestic Dudhsagar Falls, one of India\'s tallest waterfalls.",\n          "location": "Dudhsagar Falls",\n          "latitude": 15.3189,\n          "longitude": 74.0231,\n          "duration": "3-4 hours",\n          "category": "adventure, nature"\n        },\n        {\n          "time": "2:00 PM - 4:00 PM",\n          "description": "Take a guided tour of a spice plantation, learning about local spices and enjoying a traditional Goan lunch.",\n          "location": "Sahakari Spice Farm (or similar)",\n          "latitude": 15.4968,\n          "longitude": 73.9882,\n          "duration": "1-2 hours",\n          "category": "culture, food"\n        }\n      ],\n      "dining": {\n        "name": "Vinayak Family Restaurant",\n        "description": "Authentic Goan cuisine with vegetarian options.",\n        "location": "Near Sahakari Spice Farm",\n        "latitude": 15.5004,\n        "longitude": 73.9876\n      }\n    },\n    "day_3": {\n      "theme": "Culture & Nightlife in Panjim",\n      "route": {\n        "summary": "Hotel to Panjim for sightseeing and nightlife.",\n        "start": {\n          "address": "Novotel Goa Dona Sylvia Resort, Cavelossim, Goa",\n          "latitude": 15.2474,\n          "longitude": 73.9502\n        },\n        "waypoints": [\n          {\n            "name": "Fontainhas (Panjim)",\n            "latitude": 15.5005,\n            "longitude": 73.8314,\n            "duration": "2-3 hours",\n            "category": "culture, sightseeing"\n          },\n          {\n            "name": "Joseph Bar & Restaurant",\n            "latitude": 15.4983,\n            "longitude": 73.8271,\n            "duration": "2-3 hours",\n            "category": "dining, nightlife"\n          }\n        ],\n        "end": {\n          "address": "Novotel Goa Dona Sylvia Resort, Cavelossim, Goa",\n          "latitude": 15.2474,\n          "longitude": 73.9502\n        },\n        "distance": "70 km",\n        "duration": "2-3 hours driving"\n      },\n      "activities": [\n        {\n          "time": "10:00 AM - 1:00 PM",\n          "description": "Explore the colorful streets of Fontainhas, Panjim\'s Latin Quarter, with its Portuguese architecture.",\n          "location": "Fontainhas (Panjim)",\n          "latitude": 15.5005,\n          "longitude": 73.8314,\n          "duration": "2-3 hours",\n          "category": "culture, sightseeing"\n        },\n        {\n          "time": "8:00 PM - 11:00 PM",\n          "description": "Enjoy live music and drinks at Joseph Bar & Restaurant, known for its lively atmosphere.",\n          "location": "Joseph Bar & Restaurant",\n          "latitude": 15.4983,\n          "longitude": 73.8271,\n          "duration": "2-3 hours",\n          "category": "dining, nightlife"\n        }\n      ],\n      "dining": {\n        "name": "Ritz Classic",\n        "description": "Local Goan and Indian cuisine, popular with locals.",\n        "location": "Panjim",\n        "latitude": 15.4989,\n        "longitude": 73.8277\n      }\n    }\n  },\n  "notes": {\n    "weather": "August/September is monsoon season in Goa. Expect rain and high humidity. Pack accordingly.",\n    "transportation": "Hiring a car or taxi is recommended for exploring Goa comfortably.",\n    "currency": "Indian Rupee (INR)"\n  }\n}\n```',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(data);

    const response = result.response;

    console.log("Response:", response);
    return response.text();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
