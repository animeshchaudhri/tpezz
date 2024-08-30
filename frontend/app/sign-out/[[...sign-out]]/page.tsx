"use client";
import { logout } from "@/lib/services/Authservice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Signout() {
  const router = useRouter();
  const handlelogout = async () => {
    try {
      const data = logout();
      if (data) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    handlelogout();
  }, []);
  return <></>;
}

export default Signout;
