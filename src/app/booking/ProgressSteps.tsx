"use client";
import {
  Center,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { BsRecordCircleFill } from "react-icons/bs";
import React from "react";

export const steps = [
  { title: "Select room and dates" },
  { title: "Enter your payment details" },
  { title: "Confirmation" },
];

function ProgressSteps({ activeStep }: { activeStep: number }) {
  const activeStepText = steps[activeStep].title;

  return (
    <div className="flex min-w-full justify-center mb-2">
      <Stack className="w-2/3">
        <Stepper size="sm" index={activeStep} gap="0" colorScheme="blue">
          {steps.map((step, index) => (
            <Step key={index} className="gap-0">
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  active={
                    <BsRecordCircleFill size="15" className="text-[#3182ce]" />
                  }
                />
              </StepIndicator>
              <StepSeparator className="mr-2" />
            </Step>
          ))}
        </Stepper>
        <Center className="font-light text-base">{activeStepText}</Center>
      </Stack>
    </div>
  );
}

export default ProgressSteps;
