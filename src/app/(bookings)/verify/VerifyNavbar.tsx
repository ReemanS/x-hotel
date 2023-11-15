import { AbsoluteCenter, Center } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

// TODO: Fix broken navbar
function VerifyNavbar() {
  return (
    <nav className="bg-background relative min-w-full py-6 px-8 z-[1]">
      <AbsoluteCenter>
        <h1 className="font-merriweather">Verify Transaction</h1>
      </AbsoluteCenter>

      <Link href={"/"}>
        <img
          src="/x-hotel_logo.svg"
          alt="Logo"
          width={80}
          className="bg-background/25 p-2 rounded-lg"
        />
      </Link>
    </nav>
  );
}

export default VerifyNavbar;
