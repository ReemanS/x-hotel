import React from "react";

function HomeNavbar() {
  return (
    <nav className="bg-transparent absolute min-w-full py-6 px-8 z-[1]">
      <div className="flex justify-between items-center">
        <img
          src="/x-hotel_logo.svg"
          alt="Logo"
          width={80}
          className="bg-background/25 p-2 rounded-lg"
        />

        <div>Actions</div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
