import React from "react";
import VerifyNavbar from "./VerifyNavbar";
import { poppins, merriweather } from "../../layout";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${poppins.variable} ${poppins.className} ${merriweather.variable} `}
    >
      <VerifyNavbar />
      {children}
    </div>
  );
}

export default Layout;
