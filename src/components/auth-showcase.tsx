"use client";

import { useState, useEffect } from "react";
import {
  Music2,
  Columns2,
  PenLine,
  ImageIcon,
  Play,
  Quote,
  Bookmark,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideData {
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    title: "Read, write, and keep.",
    subtitle: "Stories, quizzes, and audio in one reading desk.",
  },
  {
    title: "A calmer reading space.",
    subtitle: "Distraction-free typography engineered for completion.",
  },
  {
    title: "Audio, video, and quizzes.",
    subtitle: "Every piece can carry multi-modal notes and knowledge checks.",
  },
];

export function AuthShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="hidden lg:flex flex-col justify-between items-center border-l border-neutral-100 dark:border-neutral-800/80 p-10 sm:p-12 bg-neutral-50/50 dark:bg-neutral-950/40 relative select-none">
      {/* Top Header */}
      <div className="text-center max-w-xs min-h-[72px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {slides[activeSlide].title}
            </h2>
            <p className="mt-2 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {slides[activeSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Center Graphic: The Constellation Network */}
      <div className="relative w-[320px] h-[320px] my-6 flex items-center justify-center">
        {/* SVG Network Lines Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 320"
          fill="none"
        >
          {/* Subtle light gray grid lines connecting outer ring */}
          <line x1="45" y1="45" x2="275" y2="45" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1.2" strokeDasharray="3 4" />
          <line x1="275" y1="45" x2="275" y2="275" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1.2" strokeDasharray="3 4" />
          <line x1="275" y1="275" x2="45" y2="275" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1.2" strokeDasharray="3 4" />
          <line x1="45" y1="275" x2="45" y2="45" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1.2" strokeDasharray="3 4" />

          {/* Diagonals */}
          <line x1="45" y1="45" x2="275" y2="275" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1.2" strokeDasharray="3 4" />
          <line x1="275" y1="45" x2="45" y2="275" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1.2" strokeDasharray="3 4" />

          {/* Terracotta connector rays from center to 8 outer nodes */}
          <line x1="160" y1="160" x2="45" y2="45" stroke="#c25e37" strokeWidth="1.75" strokeDasharray="5 5" />
          <line x1="160" y1="160" x2="160" y2="45" stroke="#c25e37" strokeWidth="2.2" strokeDasharray="7 5" />
          <line x1="160" y1="160" x2="275" y2="45" stroke="#c25e37" strokeWidth="1.75" strokeDasharray="5 5" />
          <line x1="160" y1="160" x2="45" y2="160" stroke="#c25e37" strokeWidth="2.2" strokeDasharray="7 5" />
          <line x1="160" y1="160" x2="275" y2="160" stroke="#c25e37" strokeWidth="1.75" strokeDasharray="5 5" />
          <line x1="160" y1="160" x2="45" y2="275" stroke="#c25e37" strokeWidth="1.75" strokeDasharray="5 5" />
          <line x1="160" y1="160" x2="160" y2="275" stroke="#c25e37" strokeWidth="2.2" strokeDasharray="7 5" />
          <line x1="160" y1="160" x2="275" y2="275" stroke="#c25e37" strokeWidth="2.2" strokeDasharray="7 5" />
        </svg>

        {/* 1. Top-Left: Audio (Dark Forest Green) */}
        <div className="absolute top-[24px] left-[24px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] bg-[#1a4a35] text-white shadow-sm hover:scale-105 transition-transform duration-200">
          <Music2 className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>

        {/* 2. Top-Center: Book Columns (Black) */}
        <div className="absolute top-[24px] left-[139px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] bg-neutral-950 text-white shadow-sm hover:scale-105 transition-transform duration-200">
          <Columns2 className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>

        {/* 3. Top-Right: Pen / Editor (Pale Yellow) */}
        <div className="absolute top-[24px] right-[24px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] bg-[#fae16d] text-neutral-900 shadow-sm hover:scale-105 transition-transform duration-200">
          <PenLine className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>

        {/* 4. Middle-Left: Image (Black) */}
        <div className="absolute top-[139px] left-[24px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] bg-neutral-950 text-white shadow-sm hover:scale-105 transition-transform duration-200">
          <ImageIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>

        {/* 5. Center: Brand Squircle Logo (Black with White L and Terracotta Dot) */}
        <div className="absolute top-[132px] left-[132px] z-10 flex h-14 w-14 items-center justify-center rounded-[16px] bg-neutral-950 text-white font-bold text-2xl tracking-tight shadow-md ring-4 ring-white dark:ring-neutral-900">
          <span>L</span>
          <span className="text-[#c25e37] text-[24px] leading-none mb-1 font-bold">.</span>
        </div>

        {/* 6. Middle-Right: Video Play (White) */}
        <div className="absolute top-[139px] right-[24px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm hover:scale-105 transition-transform duration-200">
          <Play className="h-4 w-4 fill-current ml-0.5" />
        </div>

        {/* 7. Bottom-Left: Quote (Terracotta Warm Brown) */}
        <div className="absolute bottom-[24px] left-[24px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] bg-[#b55832] text-white shadow-sm hover:scale-105 transition-transform duration-200">
          <Quote className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>

        {/* 8. Bottom-Center: Bookmark (Black) */}
        <div className="absolute bottom-[24px] left-[139px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] bg-neutral-950 text-white shadow-sm hover:scale-105 transition-transform duration-200">
          <Bookmark className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>

        {/* 9. Bottom-Right: Quiz Shield (Dark Forest Green) */}
        <div className="absolute bottom-[24px] right-[24px] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-[12px] bg-[#1a4a35] text-white shadow-sm hover:scale-105 transition-transform duration-200">
          <ShieldCheck className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>
      </div>

      {/* Bottom Carousel Pill Dots */}
      <div className="flex items-center gap-1.5 pt-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeSlide === index
                ? "w-6 h-1.5 bg-[#c25e37]"
                : "w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
