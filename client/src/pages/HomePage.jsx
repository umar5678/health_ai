import React from "react";
import { Faps } from "./homeSections/Faqs";
import { Reviews } from "./homeSections/Reviews";
import { Contact } from "./homeSections/Contact";
import { HeroSection } from "./homeSections/HeroSection";
import { Features } from "./homeSections/Features";

const HomePage = () => {
  return (
    <div className="container w-full mx-auto">
      <HeroSection />
      <Features />
      <Reviews />
      <Faps />
      <Contact />
    </div>
  );
};

export default HomePage;
