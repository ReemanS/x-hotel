import React from "react";
import PaymentNavbar from "./PaymentNavbar";
import { poppins, merriweather } from "../../layout";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${poppins.variable} ${poppins.className} ${merriweather.variable} `}
    >
      <PaymentNavbar />

      {children}
    </div>
  );
}

export default Layout;
