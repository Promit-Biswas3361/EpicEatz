import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100 px-5 py-15 mt-35 mb-[-110px]">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-orange-600">
            About EpicEatz
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Welcome to <strong>EpicEatz</strong>, your one-stop destination for
            satisfying all your food cravings. We bring your favorite dishes
            from the best restaurants in town straight to your doorstep. At
            EpicEatz, we are committed to offering you a seamless, fast, and
            delicious experience, whether you're in the mood for a quick bite, a
            comforting meal, or something exotic.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-orange-500">
            Our Mission
          </h3>
          <p className="text-gray-700 mb-4">
            Our mission is to revolutionize the way people experience food by
            bridging the gap between local restaurants and food lovers. We
            strive to provide top-notch service, ensuring that your orders are
            delivered fresh, fast, and with a touch of love. We believe that
            everyone deserves to enjoy their favorite meals, anytime, anywhere.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-orange-500">
            Why Choose EpicEatz?
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              🚀 <strong>Fast & Reliable Delivery:</strong> We guarantee timely
              delivery, ensuring that your food arrives hot and fresh.
            </li>
            <li>
              🍱 <strong>Wide Variety:</strong> Choose from an extensive range
              of cuisines, including Indian, Chinese, Italian, and more.
            </li>
            <li>
              🎁 <strong>Exclusive Offers:</strong> Enjoy amazing deals and
              discounts on your favorite dishes.
            </li>
            <li>
              🔒 <strong>Secure Payments:</strong> Pay with confidence through
              secure and trusted payment gateways.
            </li>
            <li>
              💬 <strong>24/7 Support:</strong> Our dedicated support team is
              always here to assist you.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mt-5 mb-3 text-orange-500">
            Our Journey
          </h3>
          <p className="text-gray-700 mb-4">
            EpicEatz was born out of a passion for bringing people and food
            closer together. Starting with a few local restaurants, we have now
            expanded to hundreds of eateries, serving thousands of happy
            customers. Our platform has evolved to offer not just food delivery
            but a complete dining experience, from tracking your order in
            real-time to exploring new tastes and cuisines.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-orange-500">
            Our Team
          </h3>
          <p className="text-gray-700 mb-4">
            Behind EpicEatz is a team of food enthusiasts, tech wizards, and
            customer service heroes who work around the clock to ensure that
            every order brings joy to your table. We are a team that believes in
            quality, innovation, and putting the customer first.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-orange-500">
            Join Us on Our Epic Journey!
          </h3>
          <p className="text-gray-700">
            Whether you're a food lover or a restaurant owner looking to reach
            more customers, EpicEatz welcomes you to be a part of our growing
            community. Together, let's make every meal an epic experience! 🍲✨
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
