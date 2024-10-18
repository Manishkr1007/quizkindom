import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";
function FreeCourse() {
  const [test, setTest] = useState([]);
  useEffect(() => {
    const getTest = async () => {
      try {
        const res = await axios.get("https://quizkindomserver.vercel.app/test");
         
        const data = res.data.filter((data) => data.category === "Free");
        console.log(data);
        setTest(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTest();
  }, []);

  var settings = {
    dots: true,
    infinite: test.length > 1, // Enable infinite scroll only if there are more than 1 item
    speed: 500,
    slidesToShow: Math.min(test.length, 3), // Show only the number of available slides if less than 3
    slidesToScroll: Math.min(test.length, 3), // Scroll based on available items
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(test.length, 3),
          slidesToScroll: Math.min(test.length, 3),
          infinite: test.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(test.length, 2),
          slidesToScroll: Math.min(test.length, 2),
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
          Curious to see where you stand? Try our <span className="text-red-500 font-bold">Free Tests</span> and get a taste of what we offer!
          </p>
        </div>

        <div>
          <Slider {...settings}>
            {test.map((item) => (
            
              <Cards item={item} className="p-48" key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default FreeCourse;
