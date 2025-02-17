import React from "react";
import { Faps } from "./homeSections/Faqs";
import { Reviews } from "./homeSections/Reviews";
import { Contact } from "./homeSections/Contact";
import { HeroSection } from "./homeSections/HeroSection";
import { Features } from "./homeSections/Features";

const HomePage = () => {
  return (
    <div>

    <HeroSection />
      <Features />
    <div className="container w-full mx-auto">
      <Reviews />
      <Faps />
      <Contact />
    </div>
    </div>
  );
};

export default HomePage;
