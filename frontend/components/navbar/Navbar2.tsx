"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/services/Authservice";

interface RouteProps {
  href: string;
  label: string;
}

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  return (
    <nav className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <div className="container h-16 px-4 w-screen flex justify-between items-center">
          <div className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex">
              <span className="ml-2">Tpezz</span>
            </Link>
          </div>

          {/* mobile */}
          <div className="flex md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="ghost"
                  className="px-2"
                >
                  <span className="sr-only">Open Menu</span>
                  <Menu className="flex md:hidden h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl text-start">
                    Tpezz Travel Planner
                  </SheetTitle>
                  <div className="mt-20">
                    {isUserLoggedIn ? (
                      <Button onClick={() => router.push("/sign-out")}>
                        logout
                      </Button>
                    ) : (
                      <Button onClick={() => router.push("/sign-in")}>
                        login
                      </Button>
                    )}
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          {/* desktop */}
          <div className="hidden md:flex gap-2"></div>

          <div className="hidden md:flex gap-2">
            <div className="flex space-x-2">
              {isUserLoggedIn ? (
                <Button onClick={() => router.push("/sign-out")}>logout</Button>
              ) : (
                <Button onClick={() => router.push("/sign-in")}>login</Button>
              )}
              <ModeToggle />
            </div>
          </div>
        </div>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar2;
