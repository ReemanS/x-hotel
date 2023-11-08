import React from "react";

function HomeNavbar() {
  return (
    <nav className="bg-transparent absolute min-w-full py-6 px-8  z-[1]">
      <div className="flex justify-between">
        <img src="/x-hotel_logo.svg" alt="Logo" width={64} />
        <div>Actions</div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
