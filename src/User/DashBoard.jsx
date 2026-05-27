// =========================
// FULL PREMIUM Dashboard.jsx
// ONLY OWNER CAN EDIT/DELETE
// =========================

import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate
} from "react-router-dom";

import {
  FaTrash,
  FaEdit,
  FaGraduationCap,
  FaStar,
  FaBrain,
  FaHeartbeat,
  FaBone,
  FaAllergies
} from "react-icons/fa";

import { motion } from "framer-motion";

function DashBoard() {

  // =========================
  // STATE
  // =========================

  const [data, setData] =
        useState([]);

  const navigate =
        useNavigate();

  const role =
        localStorage.getItem(
          "role"
        );

  const loginId =
        Number(
          localStorage.getItem(
            "id"
          )
        );

  // =========================
  // FETCH DOCTORS
  // =========================

  useEffect(() => {

    fetchDoctors();

  }, []);

  const fetchDoctors =
  async () => {

    try {

      const response =
            await axios.get(
        "/show"
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

  const deleteDoctor =
  async (id) => {

    try {

      await axios.delete(
        `/delete/${id}`
      );

      fetchDoctors();

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // SPECIALIST ICON
  // =========================

  const specialistIcon =
  (specialist) => {

    if (
      specialist?.toLowerCase()
      .includes("card")
    ) {

      return <FaHeartbeat />;
    }

    if (
      specialist?.toLowerCase()
      .includes("neuro")
    ) {

      return <FaBrain />;
    }

    if (
      specialist?.toLowerCase()
      .includes("ortho")
    ) {

      return <FaBone />;
    }

    return <FaAllergies />;
  };

  return (

<div className="min-h-screen bg-[#020B2D] px-6 md:px-10 py-10">

{/* ========================= */}
{/* HEADER */}
{/* ========================= */}

<div className="flex justify-between items-start flex-wrap gap-5 mb-14">

<div>

<h1 className="text-6xl md:text-7xl font-black text-white tracking-tight">

Doctors

</h1>

<p className="text-gray-400 text-2xl mt-4">

Premium Doctor Dashboard

</p>

</div>

{/* TOTAL */}

<div className="bg-[#16224D] rounded-[30px] px-10 py-8 min-w-[250px] border border-cyan-500/10 shadow-2xl">

<p className="text-gray-300 text-2xl">

Total Doctors

</p>

<h1 className="text-6xl font-black text-cyan-400 mt-4">

{data.length}

</h1>

</div>

</div>

{/* ========================= */}
{/* GRID */}
{/* ========================= */}

<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

{

data.map((item, index) => (

<motion.div

key={item.id}

initial={{

opacity: 0,

y: 60
}}

animate={{

opacity: 1,

y: 0
}}

transition={{

duration: 0.5,

delay: index * 0.1
}}

className="bg-[#07163F] border border-cyan-500/20 rounded-[28px] overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
>

{/* ========================= */}
{/* CARD */}
{/* ========================= */}

<div className="flex p-5 gap-5">

{/* IMAGE */}

<div className="w-[42%] shrink-0">

<img

src={`http://localhost:8080/uploads/profile/${item.file1Path}`}

alt=""

className="w-full h-[330px] object-cover rounded-[24px] cursor-pointer"

onClick={() =>

navigate(
`/doctor/${item.id}`
)
}
/>

</div>

{/* DETAILS */}

<div className="flex-1 flex flex-col justify-between">

<div>

{/* NAME */}

<h1 className="text-white text-[40px] font-black leading-tight">

Dr. {item.userName}

</h1>

{/* SPECIALIST */}

<div className="flex items-center gap-3 mt-6 text-cyan-400 text-[28px] font-bold">

{specialistIcon(item.specialist)}

<span>

{item.specialist}

</span>

</div>

{/* LINE */}

<div className="h-[1px] bg-white/10 my-7"></div>

{/* DEGREE */}

<div className="flex items-center gap-3 text-gray-300 text-[24px]">

<FaGraduationCap className="text-purple-400" />

<span>

{item.degree}

</span>

</div>

{/* EXPERIENCE */}

<div className="flex items-center gap-3 text-gray-300 text-[24px] mt-6">

<FaStar className="text-yellow-400" />

<span>

10 Years Experience

</span>

</div>

</div>

{/* ========================= */}
{/* BUTTONS */}
{/* ONLY OWNER CAN SEE */}
{/* ========================= */}

{

(
(role === "DOCTOR" ||

role === "ROLE_DOCTOR")

&&

loginId === item.authId
)

&&

(

<div className="flex gap-4 mt-8">

{/* EDIT */}

<button

onClick={() =>

navigate(

`/edit-doctor/${item.id}`
)
}

className="flex-1 bg-[#102C6B] hover:bg-blue-700 border border-blue-500/20 py-4 rounded-[18px] text-white font-bold text-2xl transition-all duration-300 flex justify-center items-center gap-3"
>

<FaEdit />

Edit

</button>

{/* DELETE */}

<button

onClick={() =>

deleteDoctor(item.id)
}

className="flex-1 bg-[#4A1120] hover:bg-red-700 border border-red-500/20 py-4 rounded-[18px] text-white font-bold text-2xl transition-all duration-300 flex justify-center items-center gap-3"
>

<FaTrash />

Delete

</button>

</div>
)
}

</div>

</div>

</motion.div>
))
}

</div>

{/* ========================= */}
{/* BOTTOM DOTS */}
{/* ========================= */}

<div className="flex justify-center gap-4 mt-16">

<div className="w-4 h-4 rounded-full bg-cyan-400"></div>

<div className="w-4 h-4 rounded-full bg-white/20"></div>

<div className="w-4 h-4 rounded-full bg-white/20"></div>

<div className="w-4 h-4 rounded-full bg-white/20"></div>

</div>

</div>
  );
}

export default DashBoard;