import { AbsoluteCenter, Center } from "@chakra-ui/react";
import React from "react";

function HomeNavbar() {
  return (
    <nav className="bg-background relative min-w-full py-6 px-8 z-[1]">
      <AbsoluteCenter>
        <h1>Booking</h1>
      </AbsoluteCenter>

      <div>X Hotel Logo</div>
    </nav>
  );
}

export default HomeNavbar;
