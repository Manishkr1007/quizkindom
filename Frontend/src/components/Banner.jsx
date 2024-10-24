import React from "react";
import banner from "../../public/Banner.png";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate(); // Initialize useNavigate

  const goToAllTests = () => {
    navigate("/course"); // Navigate to the All Test page
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcomes here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
            Challenge your knowledge with our fun and interactive quizzes or expand your skills with professionally designed courses. Whether you're looking to test what you know or dive into new learning adventures, we've got you covered!
            </p>
          
          </div>
          <button onClick={goToAllTests} className="btn mt-6 btn-secondary">Get Started</button>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
