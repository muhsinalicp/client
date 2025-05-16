import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Promotion from "./Promotion";
import Arrivalpage from "./Arrivalpage";
import Topsellpage from "./Topsellpage";
import BrowseCat from "./BrowseCat";
import Footer from "./Footer";

function Home() {
  const [lid, setlid] = useState();

  return (
    <div>
      {/* hero section */}
      <div className="h-screen w-screen">
        <div className="h-fit">
          <Navbar />
        </div>

        <div className="h-[80vh] ">
          <Hero />
        </div>

        <div className="h-[12vh]">
          <Promotion />
        </div>
      </div>

      {/* New Arrivals page */}
      <div className="h-fit w-screen py-8 ">
        <Arrivalpage />
      </div>

      {/* Top Sellings page */}
      <div className="h-fit w-screen py-8 ">
        <Topsellpage />
      </div>

      {/* browse categories page  */}
      <div className="h-fit w-screen py-8 ">
        <BrowseCat />
      </div>

      {/* footer  */}
      <footer className="w-full lg:h-[50vh] h-fit">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
