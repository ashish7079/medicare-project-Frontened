import React, { useContext } from "react";

import { CartContext } from "../Context/CartContext";

import { useNavigate } from "react-router-dom";

function Cart() {

  const { cart, removeCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  // Total
  const total = cart.reduce(

    (sum, item) =>

      sum + Number(item.rate),

    0
  );

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">

        Cart

      </h1>

      {/* Empty Cart */}
      {cart.length === 0 && (

        <div className="text-center text-2xl text-gray-500 mt-20">

          Cart is Empty 😄

        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-6">

        {cart.map((item, index) => (

          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow flex items-center justify-between"
          >

            <div className="flex gap-5 items-center">

              {/* Image */}
              <img
                src={`http://localhost:8080/medicine/${item.medicineimg}`}
                alt=""
                className="w-32 h-32 object-cover rounded-xl"
              />

              {/* Details */}
              <div>

                <h1 className="text-2xl font-bold">
                  {item.medicineName}
                </h1>

                <p className="text-gray-600 mt-2">
                  {item.causes}
                </p>

                <h2 className="text-green-600 text-2xl font-bold mt-3">
                  ₹ {item.rate}
                </h2>

              </div>

            </div>

            {/* Remove */}
            <button
              onClick={() =>
                removeCart(item.id)
              }
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
            >

              Remove

            </button>

          </div>
        ))}

      </div>

      {/* Total Section */}
      {cart.length > 0 && (

        <div className="mt-10 bg-white p-8 rounded-2xl shadow">

          <h1 className="text-3xl font-bold">

            Total: ₹ {total}

          </h1>

          {/* Payment Button */}
          <button
            onClick={() =>

              navigate("/payment", {

                state: {

                  total: total
                }
              })
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-xl font-bold"
          >

            Proceed To Payment

          </button>

        </div>
      )}

    </div>
  );
}

export default Cart;