"use client";
import React from "react";
import { Center, useMediaQuery } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

function CenterActions({ font }: { font: string }) {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const buttonVariants: Variants = {
    hover: {
      backgroundColor: "#3182CE",
      transition: { duration: 0.2 },
    },
  };

  return (
    <Center zIndex={2}>
      <section className="absolute top-1/2 flex flex-col items-center">
        <div className="text-background text-2xl md:text-6xl lg:text-8xl pb-2 md:pb-5 drop-shadow-md">
          Comfort awaits
        </div>
        <motion.button
          className="group flex items-center bg-primary p-3 md:p-5 text-background shadow-lg md:shadow-xl shadow-gray-600/50 rounded-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <div className="pr-2 md:pr-4 text-xl md:text-4xl">
            <span className={font}>Book now</span>
          </div>
          <div className="group-hover:-rotate-45 duration-200">
            <AiOutlineArrowRight size={isDesktop ? 32 : 24} />
          </div>
        </motion.button>
        <div className="flex pt-1 text-background">
          <span>or&#160;</span>
          <Link
            href={"/"}
            className="flex hover:underline active:text-accent duration-150 items-center text-sm md:text-base drop-shadow-md"
          >
            <span className="pe-1">verify your previous transaction</span>
            <HiOutlineExternalLink />
          </Link>
        </div>
      </section>
    </Center>
  );
}

export default CenterActions;
