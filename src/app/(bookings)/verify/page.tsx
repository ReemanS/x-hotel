"use client";
import React, { useState, useEffect } from "react";
import {
  Center,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { AiOutlineSearch } from "react-icons/ai";
import TransactionDetails from "./TransactionDetails";

function Verify() {
  const [idCode, setIdCode] = useState("Not Found");
  const [searchBarCode, setSearchBarCode] = useState("");

  return (
    <>
      {idCode !== "Not Found" ? (
        <TransactionDetails id={idCode} />
      ) : (
        <div className="mt-8 font-poppins">
          <Center>
            <div className="w-80 max-w-80">
              <Center>
                <div className="text-xl font-bold mb-2">
                  Scan your QR Code Receipt
                </div>
              </Center>
              <div className="bg-primary/25 rounded-md p-4 mb-6">
                <QrScanner
                  onDecode={(result) => {
                    setIdCode(result);
                    console.log(result);
                  }}
                  onError={(error) => console.log(error?.message)}
                />
              </div>
              <Center>
                <div className="text-xl font-bold mb-2">
                  or enter your Transaction ID:
                </div>
              </Center>
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Transaction ID"
                    className="mb-4 text-xs"
                    onChange={(e) => setSearchBarCode(e.target.value)}
                  />
                  <InputRightElement>
                    <button onClick={() => setIdCode(searchBarCode)}>
                      <AiOutlineSearch className="text-primary" />
                    </button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </div>
          </Center>
        </div>
      )}
    </>
  );
}

export default Verify;
