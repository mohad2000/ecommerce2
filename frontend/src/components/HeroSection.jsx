import React from "react";

const HeroSection = () => {
  return (
    <section className="hero min-h-screen bg-gradient-to-br from-[#1E140D] to-[#4A2C1A] text-base-content px-6">

      <div className="hero-content flex-col lg:flex-row-reverse gap-10">

        {/* Video */}
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl rotate-3 ">
          <video
            src="./images/honey.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Text */}
        <div className="max-w-xl animate-fade-in">

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-[#FFF6E5]">
            Pure Natural Honey <br />
            With Unmatched Quality
          </h1>

          <p className="py-6 text-[#C8A165] text-lg">
            Authentic Yemeni honey, carefully harvested from the finest beehives
            to deliver exceptional taste and quality.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">

            <button className="btn btn-warning font-bold text-black">
              Buy Now
            </button>

            <button className="btn btn-outline btn-warning">
              Explore Offers
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;