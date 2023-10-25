"use client";
import { NextFont } from "next/dist/compiled/@next/font";
import React from "react";

type FontContextType = {
  poppins: NextFont | string;
  merriweather: NextFont | string;
};

const FontContext = React.createContext<FontContextType | null>({
  poppins: "",
  merriweather: "",
});

export default FontContext;
