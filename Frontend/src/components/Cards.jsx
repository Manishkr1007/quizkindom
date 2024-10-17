import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle "Buy Now" click
  const handleBuyNow = () => {
    if (item.category === "Free") {
      navigate(`/quiz/${item.name.toLowerCase()}`); // Navigate to quiz with dynamic subject
    } else {
      navigate(`/checkout/${item.id}`); // Navigate to checkout for paid items
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src="https://www.lotus-qa.com/wp-content/uploads/2020/02/testing.jpg" alt="item image" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div
                className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                onClick={handleBuyNow}
              >
                {item.category === "Free" ? "Start Quiz" : "Buy Now"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
