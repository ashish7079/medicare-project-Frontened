// =========================
// FULL Payment.jsx
// =========================

import React from "react";

import axios from "../utils/axiosInstance";

import {

  useNavigate,
  useLocation

} from "react-router-dom";

function Payment() {

  const navigate = useNavigate();

  const location = useLocation();

  const total =
        location.state?.total || 0;

  const handlePayment = async () => {

    try {

      const response =
            await axios.post(

        "/create-order",

        {
          amount: total
        }

      );

      const order = response.data;

      const options = {

        key:
        "rzp_test_SrL6YBZOpvbhDg",

        amount:
        order.amount,

        currency:
        order.currency,

        name:
        "Medicare",

        description:
        "Medicine Payment",

        order_id:
        order.id,

        handler:
        async function (response) {

          try {

            await axios.post(

              "/save-order",

              {

                medicineName:
                "Medicine",

                userName:
                localStorage.getItem(
                  "userName"
                ),

                amount:
                total,

                paymentId:
                response.razorpay_payment_id,

                // IMPORTANT
                authId:
                localStorage.getItem(
                  "id"
                )

              }

            );

            alert(
              "Payment Successful ✅"
            );

            navigate(
              "/success"
            );

          } catch (error) {

            console.log(error);
          }
        },

        theme: {

          color: "#2563eb",
        },
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

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[500px] text-center">

        <h1 className="text-4xl font-bold text-blue-600">

          Secure Payment

        </h1>

        <p className="mt-5 text-gray-600 text-lg">

          Total Amount

        </p>

        <h2 className="text-5xl font-bold text-green-600 mt-4">

          ₹ {total}

        </h2>

        <button
          onClick={handlePayment}
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-xl font-bold transition"
        >

          Pay Now

        </button>

      </div>

    </div>
  );
}

export default Payment;