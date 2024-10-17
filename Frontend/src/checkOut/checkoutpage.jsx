import React from "react";
import { useParams } from "react-router-dom";

function CheckoutPage() {
  const { id } = useParams(); // Get item id from the URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Checkout Page for Item {id}</h2>
      {/* Add payment and checkout logic here */}
    </div>
  );
}

export default CheckoutPage;
