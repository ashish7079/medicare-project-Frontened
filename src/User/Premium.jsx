import React from "react";

import axios from "../utils/axiosInstance";

import {

  useNavigate

} from "react-router-dom";

function Premium() {

  const navigate =
        useNavigate();

  // =========================
  // BUY PREMIUM
  // =========================

  const handlePremium = async () => {

    try {

      const response =
            await axios.post(

        "/create-order",

        {
          amount: 299
        }
      );

      const order =
            response.data;

      // =========================
      // RAZORPAY
      // =========================

      const options = {

        key:
          "rzp_test_SrL6YBZOpvbhDg",

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "Premium Membership",

        description:
          "Doctor Chat Premium",

        order_id:
          order.id,

        // =========================
        // PAYMENT SUCCESS
        // =========================

        handler:
        async function () {

          // SAVE PREMIUM DATABASE

          await axios.put(

            "/auth/premium-user",

            {},
          );

          // SAVE LOCAL STORAGE

          localStorage.setItem(
            "premium",
            true
          );

          alert(
            "Premium Activated"
          );

          navigate("/");
        },

        theme: {

          color: "#2563eb"
        }
      };

      const razorpay =
            new window.Razorpay(
              options
            );

      razorpay.open();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[500px] text-center">

        <h1 className="text-5xl font-bold text-blue-600">

          Premium Plan

        </h1>

        <p className="mt-6 text-gray-600 text-xl">

          Unlimited Doctor Chat

        </p>

        <h2 className="text-6xl font-bold text-green-600 mt-10">

          ₹299

        </h2>

        <button

          onClick={handlePremium}

          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-2xl font-bold"
        >

          Buy Premium

        </button>

      </div>

    </div>
  );
}

export default Premium;