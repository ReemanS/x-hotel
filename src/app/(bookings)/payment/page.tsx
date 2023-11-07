"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function Payment() {
  const searchParams = useSearchParams();
  return (
    <div>
      <div>{searchParams.get("roomName")}</div>
    </div>
  );
}

export default Payment;
