import { Footer } from "@/components/Footer/Footer";

import Navbar2 from "@/components/navbar/Navbar2";
import TravelBookingForm from "@/components/Trip/TripForm";
import React from "react";

function Page() {
  return (
    <>
      <Navbar2 />
      <TravelBookingForm />
      <div className="shadow"></div>
      <Footer />
    </>
  );
}

export default Page;
