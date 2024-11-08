"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Subscribed to travel updates!");
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Get Travel{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Inspiration
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Subscribe for weekly travel tips, destination highlights, and
          exclusive deals.
        </p>

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="your.email@example.com"
            className="bg-muted/50 dark:bg-muted/80"
            aria-label="email"
            id="email"
            type="email"
            required
            autoComplete="email"
          />
          <Button type="submit">Join the Adventure</Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};

export default Newsletter;
