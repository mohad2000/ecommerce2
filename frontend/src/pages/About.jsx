import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* HERO */}
      <section className="pt-28 pb-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About <span className="text-indigo-600">Dukkan</span>
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          We are a modern online store aiming to make shopping in Yemen easy — simple, fast, and secure, with a local touch close to the people.
        </p>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-indigo-600">+1000</h2>
          <p className="text-gray-600 mt-2">Diverse product</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-indigo-600">+500</h2>
          <p className="text-gray-600 mt-2">Happy customer</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-indigo-600">24/7</h2>
          <p className="text-gray-600 mt-2">Continuous support</p>
        </div>

      </section>

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-4 mt-16 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Story
          </h2>

          <p className="text-gray-600 leading-7">
            We started the idea of the store from something simple: making the buying process easy without any complications. We believe that shopping should be fast, clear, and affordable for everyone. That's why we built the Dukkan platform to be close to the Yemeni user and with an easy interface for anyone.
          </p>

          <p className="text-gray-600 leading-7 mt-4">
            Our goal is to improve the e-commerce experience in the region and provide reliable products and excellent customer service.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="team"
            className="rounded-xl w-full h-80 object-cover"
          />
        </div>

      </section>

      {/* VALUES */}
      <section className="max-w-5xl mx-auto px-4 mt-20">

        <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
          Our values
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Confidence",
              desc: 
              "We are committed to providing reliable products and honest service.",
            },
            {
              title: "Speed",
              desc: "A quick shopping experience without any hassle.",
            },
            {
              title: "Excellence",
              desc: "We always strive to give our best.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
            >
              <h3 className="text-xl font-bold text-indigo-600">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="text-center mt-20 pb-20 px-4">
        <h2 className="text-2xl font-bold text-gray-800">
Ready to start shopping?
        </h2>

        <p className="text-gray-600 mt-2">
          Discover our products now and start a different experience
        </p>

        <a
          href="/products"
          className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
Browse products
        </a>
      </section>

    </div>
  );
};

export default About;