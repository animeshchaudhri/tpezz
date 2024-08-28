import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Backpacker",
    popular: 0,
    price: 0,
    description: "Perfect for solo travelers and budget-conscious adventurers.",
    buttonText: "Start Planning",
    benefitList: [
      "Basic itinerary creation",
      "3 trips per year",
      "Budget accommodation suggestions",
      "Community travel tips",
      "Email support",
    ],
  },
  {
    title: "Pro",
    popular: 1,
    price: 9.99,
    description:
      "Ideal for frequent travelers seeking comprehensive planning tools.",
    buttonText: "Start Free Trial",
    benefitList: [
      "Advanced itinerary planning",
      "Unlimited trips",
      "Hotel and flight bookings",
      "24/7 travel support",
      "Exclusive travel deals",
    ],
  },
  {
    title: "Luxury Explorer",
    popular: 0,
    price: 29.99,
    description: "For those who want the ultimate travel planning experience.",
    buttonText: "Contact Us",
    benefitList: [
      "Personal travel concierge",
      "Luxury accommodation access",
      "Private tour bookings",
      "Priority 24/7 support",
      "VIP airport services",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Choose Your
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Travel Plan{" "}
        </span>
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Select the perfect plan to make your travel dreams a reality.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
