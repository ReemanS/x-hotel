"use client";

import React from "react";
import { createToDb } from "@/firebase/config";
import { testData } from "@/firebase/schema";

function ButtonTest() {
  const handleClick = () => {
    createToDb("/Rooms/room3", testData);
    console.log("clicked");
  };
  return (
    <button className="bg-yellow-500" onClick={handleClick}>
      Add
    </button>
  );
}

export default ButtonTest;
