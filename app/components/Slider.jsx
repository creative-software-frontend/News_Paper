"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const sliderRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "/img/slider (1).jpg",
      alt: "Copa America",
      title: "Teams qualified for 2024 Copa America Cup",
      description:
        "Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation...",
      date: "May 18, 2022",
    },
    {
      id: 2,
      image: "/img/slider (1).webp",
      alt: "Sample Image 2",
      title: "Another Sports Event",
      description: "Sample description for the second slide...",
      date: "June 10, 2022",
    },
    {
      id: 3,
      image: "/img/slider (2).jpg",
      alt: "Sample Image 3",
      title: "Upcoming Tournament",
      description: "Sample description for the third slide...",
      date: "July 5, 2022",
    },
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="max-w-4xl mx-auto relative group cursor-pointer">
      <div
        className="relative overflow-hidden "
        onMouseEnter={() => {
          setIsPaused(true);
          setShowControls(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setShowControls(false);
        }}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0 ">
              <div className="relative h-64 md:h-80 lg:h-96 w-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  layout="fill"
                  objectFit="cover"
                  className=" transition-opacity duration-300 hover:opacity-90"
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                />

                <div
                  className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
              <div className="bg-white ">
                <h3 className=" text-xl md:text-2xl font-bold mt-3">
                  {slide.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {slide.description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  codemin · {slide.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goToPrev}
          className={`absolute left-4 cursor-pointer top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full shadow-md z-10 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className={`absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full shadow-md z-10 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
