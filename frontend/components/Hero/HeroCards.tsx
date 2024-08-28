"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="https://github.com/animeshchaudhri.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Animesh</CardTitle>
            <CardDescription>@animeshchaudhri</CardDescription>
          </div>
        </CardHeader>

        <CardContent>Travel planning made easy!</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <Image
            src="/logo.jpg"
            alt="Tpezz logo"
            width={100}
            height={100}
            className="absolute -top-12 rounded-full w-24 h-24"
            priority
          />
          <CardTitle className="text-center">Tpezz</CardTitle>
          <CardDescription className="font-normal text-primary">
            Your AI Travel Planner
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            Generate personalized travel itineraries in seconds with our
            AI-powered platform.
          </p>
        </CardContent>

        <CardFooter>
          <div className="space-x-2">
            <Link
              href="#demo"
              className={buttonVariants({
                variant: "default",
                size: "sm",
              })}
            >
              Try It Now
            </Link>
            <Link
              href="#pricing"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              View Plans
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Pro
            <Badge variant="secondary" className="text-sm text-primary">
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$20</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Perfect for frequent travelers and adventure seekers.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {[
              "Unlimited itineraries",
              "AI-powered recommendations",
              "24/7 travel support",
            ].map((benefit: string) => (
              <div key={benefit} className="flex items-center">
                <Icons.check className="text-green-500 w-5 h-5" />
                <h3 className="ml-2">{benefit}</h3>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-3 rounded-2xl">
            <Icons.bulb className="h-6 w-6 dark:text-orange-500 text-blue-500" />
          </div>
          <div>
            <CardTitle>Smart & Personlised</CardTitle>
            <CardDescription className="text-md mt-2">
              Our AI analyzes your preferences to suggest perfect destinations
              just for you.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
export default HeroCards;
