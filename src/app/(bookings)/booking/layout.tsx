import React from "react";
import ProgressSteps from "./ProgressSteps";
import BookingNavbar from "./BookingNavbar";
import { poppins, merriweather } from "../../layout";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${poppins.variable} ${poppins.className} ${merriweather.variable} `}
    >
      <BookingNavbar />

      {children}
    </div>
  );
}

export default Layout;
