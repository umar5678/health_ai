import React from "react";
import { Footer, Header } from "./components";
import { HomePage } from "./pages";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default App;
