import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [test, setTest] = useState([]);
  useEffect(() => {
    const getTest = async () => {
      try {
        const res = await axios.get("https://quizkindomserver.vercel.app/test");
        console.log(res.data);
        setTest(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTest();
  }, []);
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
          Ready to take your skills to the next level? Our Premium Paid Tests offer in-depth assessments designed to challenge your knowledge and boost your expertise.
          </p>
          
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {test.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-28 items-center justify-center text-center">
        <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>

        </div>
      </div>
    </>
  );
}

export default Course;
