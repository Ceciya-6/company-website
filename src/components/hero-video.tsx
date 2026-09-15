"use client";

import { useState } from "react";

const videoSequence = [
  "/images/factory/factory-index.mp4",
  "/images/factory/factory-index2.mp4",
  "/images/factory/factory-index3.mp4",
];

export function HeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover object-center"
      src={videoSequence[currentIndex]}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      data-sequence-index={currentIndex + 1}
      onCanPlay={(event) => {
        void event.currentTarget.play();
      }}
      onEnded={() => {
        setCurrentIndex((index) => (index + 1) % videoSequence.length);
      }}
    />
  );
}
