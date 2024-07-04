"use client";
import { useState } from "react";

const VerticalSlider = () => {
  const sections = [
    {
      title: "About Us",
      content: "Content for About Us",
      image: "/AboutNuclear.png",
    },
    {
      title: "Objectives",
      content: "Content for Objectives",
      image: "/ObjectivesRock.png",
    },
    {
      title: "Vision",
      content: "Content for Vision",
      image: "/VisionMine.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-white relative bg-cover bg-center"
      style={{ backgroundImage: `url(${sections[currentIndex].image})` }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">{sections[currentIndex].title}</h1>
        <p className="mt-4 text-lg">{sections[currentIndex].content}</p>
      </div>
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
        <div
          className="relative flex flex-col items-center text-right"
          style={{ width: "200px" }}
        >
          {sections.map((section, index) => (
            <button
              key={index}
              className={`cursor-pointer py-2 transition-all duration-300 ${
                index === currentIndex ? "text-xl font-semibold" : "text-lg"
              }`}
              onClick={() => handleClick(index)}
            >
              {section.title}
            </button>
          ))}
          {/* Scrolling Line Indicator */}
          <div
            className="absolute transition-all duration-300 w-3 bg-[#27AE60] z-20"
            style={{
              height: `${(1 / sections.length) * 100}%`,
              top: `${(currentIndex / sections.length) * 100}%`,
              left: "calc(85%)",
            }}
          ></div>
          <div
            className="absolute w-3 bg-white z-10"
            style={{
              height: "100%",
              top: `0`,
              left: "calc(85%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VerticalSlider;
