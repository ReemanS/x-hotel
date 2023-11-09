import React from "react";
import ConfNavbar from "./ConfNavbar";
import { poppins, merriweather } from "../../layout";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${poppins.variable} ${poppins.className} ${merriweather.variable} `}
    >
      <ConfNavbar />
      {children}
    </div>
  );
}

export default Layout;
