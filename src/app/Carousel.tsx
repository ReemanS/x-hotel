"use client";
import { useMediaQuery } from "@chakra-ui/react";
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

  return (
    <section className="relative carousel">
      <img
        key={currentIndex}
        src={images[currentIndex]}
        className="h-screen min-w-full object-cover"
      />

      <div className="absolute top-1/2 left-0 z-[2] flex justify-between px-4 min-w-full">
        <div
          className="left flex justify-center items-center text-background bg-primary/40 rounded-full p-2 md:p-3"
          onClick={handlePrevious}
        >
          <BsChevronLeft size={isDesktop ? 32 : 20} />
        </div>
        <div
          className="right flex justify-center items-center text-background bg-primary/40 rounded-full p-2 md:p-3"
          onClick={handleNext}
        >
          <BsChevronRight size={isDesktop ? 32 : 20} />
        </div>
      </div>
      <div className="indicator flex justify-center absolute bottom-4 left-0 min-w-full">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={
              currentIndex === index ? "text-primary" : "text-background"
            }
          >
            <BsDot size={48} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
