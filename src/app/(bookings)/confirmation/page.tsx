import React from "react";
import ProgressSteps from "../booking/ProgressSteps";

function Confirmation() {
  return (
    <>
      <ProgressSteps activeStep={2} />
      <div className="bg-yellow-50 w-2/3">
        <div>Your official receipt</div>
      </div>
    </>
  );
}

export default Confirmation;
