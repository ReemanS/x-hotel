"use client";
import React from "react";
import ProgressSteps from "../booking/ProgressSteps";
import Receipt from "../Receipt";
import { useSearchParams } from "next/navigation";

function Confirmation() {
  const searchParams = useSearchParams();
  return (
    <>
      <ProgressSteps activeStep={2} />
      <Receipt id={searchParams.get("transId") as string} />
    </>
  );
}

export default Confirmation;
