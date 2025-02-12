import React from "react";
import { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
import Twogether from "@/app/assets/images/Twogether";
import ShapeFlower from "@/app/assets/images/ShapeFlower";
import ShapeSparkle from "@/app/assets/images/ShapeSparkle";

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: <Twogether />,
      text: "Getting things done, together.",
    },
    {
      image: <ShapeFlower />,
      text: "Keep track of your to-dos, ideas and goals.",
    },
    {
      image: <ShapeSparkle />,
      text: "Stay organised and connected.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.image}>
            {slide.image}
            <p className={styles.text}>{slide.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
