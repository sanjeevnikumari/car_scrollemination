"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef([]);

  const progress = useRef(0);

 useEffect(() => {

  const tl = gsap.timeline({ paused: true });

  tl.to(headlineRef.current.children, {
    opacity: 1,
    y: 0,
    stagger: 0.05,
    ease: "power2.out",
  });

  tl.to(carRef.current, {
    x: 700,
    ease: "none",
  }, 0);

  tl.to(statsRef.current, {
    opacity: 1,
    y: 50,
    stagger: 0.2,
    ease: "power2.out",
  }, 0.3);

  let progress = 0;

  const handleWheel = (e) => {
    progress += e.deltaY * 0.0005;
    progress = Math.max(0, Math.min(1, progress));

    tl.progress(progress);
  };

  window.addEventListener("wheel", handleWheel);

  return () => {
    window.removeEventListener("wheel", handleWheel);
  };

}, []);
  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden"
    >
     
     <h1
  ref={headlineRef}
  className="text-7xl font-bold tracking-[0.5em] absolute top-32 flex"
>
  {"WELCOMEITZFIZZ".split("").map((letter, index) => (
    <span key={index} className="opacity-0 translate-y-10">
      {letter}
    </span>
  ))}
</h1>

     
      <img
        ref={carRef}
        src="/carr.png"
        alt="car"
        className="absolute bottom-30 left-0 w-[500px]"
      />

    
      <div className="absolute bottom-20 flex gap-10">
        {[
          "58% Increase in pick up point use",
          "23% Decreased in customer phone calls",
        ].map((text, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            className="bg-black  text-white p-6 rounded-xl shadow-xl opacity-0 translate-y-10"
          >
            {text}
          </div>

        ))}
      </div>
      
    </section>
  );
}