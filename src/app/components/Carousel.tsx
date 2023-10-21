"use client";
import { useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight, BsDot } from "react-icons/bs";

function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex + 1 === images.length ? 0 : previousIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex - 1 < 0 ? images.length - 1 : previousIndex - 1
    );
  };
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  const sliderVariants: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 100 },
    exit: { opacity: 0, position: "absolute", zIndex: 0 },
  };
  const buttonVariants: Variants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    animate: {
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };
  const dotsVariants: Variants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.3,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="relative carousel">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          className="h-screen min-w-full object-cover"
          initial="enter"
          animate="center"
          exit="exit"
          variants={sliderVariants}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>

      <div className="absolute top-1/2 left-0 z-[2] flex justify-between px-4 min-w-full">
        <motion.button
          className="left flex justify-center items-center text-background bg-primary/40 rounded-full p-2 md:p-3"
          onClick={handlePrevious}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="animate"
        >
          <BsChevronLeft size={isDesktop ? 32 : 20} />
        </motion.button>
        <motion.button
          className="right flex justify-center items-center text-background bg-primary/40 rounded-full p-2 md:p-3"
          onClick={handleNext}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="animate"
        >
          <BsChevronRight size={isDesktop ? 32 : 20} />
        </motion.button>
      </div>
      <div className="indicator flex justify-center absolute bottom-4 left-0 min-w-full">
        {images.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => handleDotClick(index)}
            className={
              currentIndex === index ? "text-primary" : "text-background"
            }
            variants={dotsVariants}
            whileHover="hover"
            animate={currentIndex === index ? "animate" : "initial"}
          >
            <BsDot size={48} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
