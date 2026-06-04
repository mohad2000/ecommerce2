import React from "react";
const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white py-20">
      <div className="container mx-auto text-center px-6">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Natural Honey Store 🍯
        </h1>

        <p className="text-lg opacity-90 mb-8">
          Premium fresh local honey with high quality and affordable prices
        </p>

        <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition">
          Shop Now
        </button>

      </div>
    </section>
  );
};

export default Hero;
