import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate
} from "react-router-dom";

import {
  FaEdit,
  FaTrash,
  FaStar,
  FaHeart
} from "react-icons/fa";

import { motion } from "framer-motion";

function Medicine() {

  const [data,
        setData] =
        useState([]);

  const navigate =
        useNavigate();

  const role =
        localStorage.getItem(
          "role"
        );

  // =========================
  // FETCH
  // =========================

  useEffect(() => {

    fetchMedicine();

  }, []);

  const fetchMedicine =
  async () => {

    try {

      const response =
            await axios.get(
        "/shows"
      );

      setData(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteMedicine =
  async (id) => {

    try {

      await axios.delete(
        `/deleted/${id}`
      );

      fetchMedicine();

    } catch (error) {

      console.log(error);
    }
  };

  return (

<div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071330] to-[#0f172a] px-5 md:px-10 py-10">

{/* ========================= */}
{/* HEADER */}
{/* ========================= */}

<div className="flex justify-between items-center flex-wrap gap-5 mb-14">

<div>

<h1 className="text-5xl md:text-6xl font-black text-white">

Medicine Store

</h1>

<p className="text-gray-400 text-xl mt-3">

Premium Healthcare Products

</p>

</div>

{/* TOTAL */}

<div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] px-10 py-6 shadow-2xl">

<p className="text-gray-300 text-lg">

Products

</p>

<h1 className="text-5xl font-black text-cyan-400 mt-2 text-center">

{data.length}

</h1>

</div>

</div>

{/* ========================= */}
{/* GRID */}
{/* ========================= */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

{

data.map((item, index) => (

<motion.div

key={item.id}

initial={{

opacity: 0,

y: 40
}}

animate={{

opacity: 1,

y: 0
}}

transition={{

duration: 0.4,

delay: index * 0.08
}}

className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl hover:-translate-y-2 transition-all duration-500"
>

{/* ========================= */}
{/* CARD */}
{/* ========================= */}

<div className="flex flex-col md:flex-row">

{/* ========================= */}
{/* IMAGE */}
{/* ========================= */}

<div className="relative md:w-[45%] bg-white flex justify-center items-center p-6">

<img

src={`https://res.cloudinary.com/pfpskbkx/image/upload/medicine/${item.medicineimg}`}

alt=""

className="w-full h-[300px] object-contain group-hover:scale-105 transition-all duration-500 cursor-pointer"

onClick={() =>

navigate(
`/singlemedicine/${item.id}`
)
}
/>

{/* TAG */}

<div className="absolute top-5 left-5 bg-cyan-500 text-black px-4 py-2 rounded-full text-sm font-black">

NEW

</div>

{/* HEART */}

<div className="absolute top-5 right-5 bg-white w-11 h-11 rounded-full flex justify-center items-center shadow-lg cursor-pointer">

<FaHeart className="text-red-500 text-lg" />

</div>

</div>

{/* ========================= */}
{/* DETAILS */}
{/* ========================= */}

<div className="flex-1 p-7 flex flex-col justify-between">

<div>

{/* CATEGORY */}

<p className="text-cyan-400 font-bold uppercase tracking-widest text-sm">

Healthcare Product

</p>

{/* NAME */}

<h1 className="text-4xl font-black text-white mt-3">

{item.medicineName}

</h1>

{/* DESCRIPTION */}

<p className="text-gray-300 mt-5 leading-8 text-lg">

{item.causes}

</p>

{/* RATING */}

<div className="flex items-center gap-3 mt-6">

<div className="bg-green-500 px-4 py-2 rounded-xl flex items-center gap-2 text-white font-bold">

<FaStar />

<span>

4.9

</span>

</div>

<p className="text-gray-300">

Premium Quality

</p>

</div>

{/* PRICE */}

<div className="mt-7 flex items-center gap-4">

<h1 className="text-5xl font-black text-white">

₹ {item.rate}

</h1>

<p className="text-gray-400 line-through text-2xl">

₹999

</p>

</div>

<p className="text-green-400 font-bold mt-4">

Free Delivery Available

</p>

</div>

{/* BUTTON */}

<div>

<button

onClick={() =>

navigate(
`/singlemedicine/${item.id}`
)
}

className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-5 rounded-[20px] font-black text-2xl transition-all duration-300 shadow-xl"
>

View Details

</button>

{/* ========================= */}
{/* DOCTOR BUTTONS */}
{/* ========================= */}



</div>

</div>

</div>

</motion.div>
))
}

</div>

</div>
  );
}

export default Medicine;