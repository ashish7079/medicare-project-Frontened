import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function SingleMedicine() {

  const { id } = useParams();

  const [medicine, setMedicine] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    fetchSingleMedicine();
  }, []);

  const fetchSingleMedicine = async () => {

    try {

      const response = await axios.get(
        `/Singlemedicine/${id}`
      );

      setMedicine(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!medicine) {

    return (

      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-5">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE IMAGE */}
        <div className="p-6 flex justify-center items-center bg-gray-50">

          <img
            src={`http://localhost:8080/medicine/${medicine.medicineimg}`}
            alt=""
            className="w-full h-[500px] object-cover rounded-2xl hover:scale-105 transition duration-500"
          />

        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="p-10 flex flex-col justify-center">

          <p className="text-blue-600 font-semibold text-lg">
            Medicine Details
          </p>

          <h1 className="text-5xl font-bold mt-3 text-gray-800">
            {medicine.medicineName}
          </h1>

          <p className="text-gray-600 text-lg mt-6 leading-8">
            {medicine.causes}
          </p>

          {/* Price */}
          <div className="mt-8">

            <h2 className="text-4xl font-bold text-green-600">
              ₹ {medicine.rate}
            </h2>

            <p className="text-gray-500 mt-2">
              Inclusive of all taxes
            </p>

          </div>

          {/* Buttons */}
       <div className="flex gap-5 mt-10">

  {/* Buy Now */}
<button
  onClick={() =>
    navigate(`/payment/${medicine.id}`)
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300"
>

  Buy Now

</button>

  {/* Add To Cart */}
  <button
    onClick={() => addToCart(medicine)}
    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition duration-300"
  >

    Add To Cart

  </button>

</div>

          {/* Extra Info */}
          <div className="mt-10 border-t pt-6 space-y-3 text-gray-600">

            <p>✔ Original Medicine</p>

            <p>✔ Fast Delivery Available</p>

            <p>✔ Trusted by Doctors</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SingleMedicine;