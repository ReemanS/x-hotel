import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Center className="h-60">
      <Spinner size="xl" color="blue.500" emptyColor="gray.200" />
    </Center>
  );
}

export default Loading;
