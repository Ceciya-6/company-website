"use client";

import { useState } from "react";

const videoSequence = [
  "/images/factory/factory-index.mp4",
  "/images/factory/factory-index2.mp4",
  "/images/factory/factory-index3.mp4",
];

export function HeroVideo({ poster }: { poster: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <video
      key={videoSequence[currentIndex]}
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      data-sequence-index={currentIndex + 1}
      onEnded={() => {
        setCurrentIndex((index) => (index + 1) % videoSequence.length);
      }}
    >
      <source src={videoSequence[currentIndex]} type="video/mp4" />
    </video>
  );
}
