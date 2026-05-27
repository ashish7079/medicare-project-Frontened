import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-green-50 flex justify-center items-center p-5">

      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full">

        {/* Success Icon */}
        <div className="text-7xl">
          🎉
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-green-600 mt-5">

          Payment Successful

        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mt-5 leading-8">

          Your medicine order has been placed successfully.

        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-5 justify-center">

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >

            Home

          </button>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >

            Download Bill

          </button>

        </div>

      </div>

    </div>
  );
}

export default Success;