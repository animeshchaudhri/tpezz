"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, CreditCard, Globe, Users } from "lucide-react";
import { format, addDays, isBefore, isAfter, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface FormData {
  destination: string;
  checkin: Date | undefined;
  checkout: Date | undefined;
  guests: string;
  interests: string[];
  budget: string;
}

const TravelBookingForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    checkin: undefined,
    checkout: undefined,
    guests: "",
    interests: [],
    budget: "",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleInputChange = (
    name: keyof FormData,
    value: string | Date | undefined
  ) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      if (name === "checkin" && value instanceof Date) {
        if (!newData.checkout || newData.checkout < value) {
          newData.checkout = addDays(value, 1);
        }
      }

      return newData;
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prevData) => ({
      ...prevData,
      interests: prevData.interests.includes(interest)
        ? prevData.interests.filter((i) => i !== interest)
        : [...prevData.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);

    const queryParams = new URLSearchParams({
      destination: formData.destination,
      checkin: formData.checkin ? format(formData.checkin, "yyyy-MM-dd") : "",
      checkout: formData.checkout
        ? format(formData.checkout, "yyyy-MM-dd")
        : "",
      guests: formData.guests,
      interests: formData.interests.join(","),
      budget: formData.budget,
    }).toString();

    router.push(`/hotelsearch?${queryParams}`);
  };

  const isDateDisabled = (date: Date): boolean => {
    return isBefore(date, today);
  };

  const isCheckoutDateDisabled = (date: Date): boolean => {
    if (isBefore(date, today)) return true;
    if (
      formData.checkin &&
      (isBefore(date, formData.checkin) || isSameDay(date, formData.checkin))
    )
      return true;
    return false;
  };

  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-left">
          Book Your Trip
        </h1>

        <Card className="w-full bg-gray-800 shadow-xl border-gray-700 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="destination"
                className="text-sm font-medium text-gray-300"
              >
                Destination
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-gray-100 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="checkin"
                  className="text-sm font-medium text-gray-300"
                >
                  Check-in
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600",
                        !formData.checkin && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.checkin ? (
                        format(formData.checkin, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-gray-800 border-gray-700"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={formData.checkin}
                      onSelect={(date) => handleInputChange("checkin", date)}
                      disabled={isDateDisabled}
                      initialFocus
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="checkout"
                  className="text-sm font-medium text-gray-300"
                >
                  Check-out
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600",
                        !formData.checkout && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.checkout ? (
                        format(formData.checkout, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-gray-800 border-gray-700"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={formData.checkout}
                      onSelect={(date) => handleInputChange("checkout", date)}
                      disabled={isCheckoutDateDisabled}
                      initialFocus
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="guests"
                className="text-sm font-medium text-gray-300"
              >
                Guests
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Select
                  onValueChange={(value) => handleInputChange("guests", value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">
                Interests
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {["beaches", "culture", "nightlife", "adventure"].map(
                  (interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                        className="border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={interest}
                        className="text-sm text-gray-300 capitalize"
                      >
                        {interest}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="budget"
                className="text-sm font-medium text-gray-300"
              >
                Budget
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Select
                  onValueChange={(value) => handleInputChange("budget", value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                    <SelectItem value="low">Budget Friendly</SelectItem>
                    <SelectItem value="medium">Moderate</SelectItem>
                    <SelectItem value="high">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-800 px-6 py-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-150 ease-in-out"
              onClick={handleSubmit}
            >
              Search Availability
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default TravelBookingForm;
