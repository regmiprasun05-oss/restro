import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/restaurant.mp4"
        autoPlay
        loop
        muted
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Restaurant
        </h1>
        <p className="text-white text-lg md:text-2xl max-w-2xl">
          Discover the best dishes crafted with love and passion. Book your table today!
        </p>
      </div>
    </section>
  );
};

export default Banner;
