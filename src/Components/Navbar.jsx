import React, {
  useContext,
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate
} from "react-router-dom";

import {
  CartContext
} from "../Context/CartContext";

import {

  FaShoppingCart,
  FaUserMd,
  FaCapsules,
  FaClipboardList,
  FaComments,
  FaBars,
  FaTimes,
  FaHome

} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const { cart } =
        useContext(CartContext);

  const role =
        localStorage.getItem("role");

  const token =
        localStorage.getItem("token");

  const [profile,
        setProfile] =
        useState(null);

  const [open,
        setOpen] =
        useState(false);

  const [mobile,
        setMobile] =
        useState(false);

  // =========================
  // FETCH PROFILE
  // =========================

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      if (!token) return;

      const response =
            await axios.get(
              "/auth/profile"
            );

      setProfile(
        response.data.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.clear();

    navigate("/login");

    window.location.reload();
  };

  return (

<>
{/* ========================= */}
{/* NAVBAR */}
{/* ========================= */}

<nav className="sticky top-0 z-50 bg-[#020817]/95 backdrop-blur-xl border-b border-white/10">

<div className="max-w-[1700px] mx-auto px-5 lg:px-10 h-[90px] flex justify-between items-center">

{/* ========================= */}
{/* LOGO */}
{/* ========================= */}

<div

onClick={() => navigate("/")}

className="flex items-center gap-4 cursor-pointer"
>

<div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex justify-center items-center">

<FaCapsules className="text-white text-2xl" />

</div>

<div>

<h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

Medicare

</h1>

<p className="text-gray-400 text-xs">
Smart Healthcare System
</p>

</div>

</div>

{/* ========================= */}
{/* DESKTOP MENU */}
{/* ========================= */}

<div className="hidden lg:flex items-center gap-8 text-white font-semibold">

{/* ========================= */}
{/* USER MENU */}
{/* ========================= */}

{
(role === "USER" ||
role === "ROLE_USER") && (
<>

<button
onClick={() => navigate("/")}
className="hover:text-cyan-400 flex items-center gap-2"
>
<FaHome />
Home
</button>

<button
onClick={() => navigate("/")}
className="hover:text-cyan-400 flex items-center gap-2"
>
<FaCapsules />
Medicines
</button>

<button
onClick={() => navigate("/dashboard")}
className="hover:text-cyan-400 flex items-center gap-2"
>
<FaUserMd />
Doctors
</button>

{/* ========================= */}
{/* CART */}
{/* ========================= */}

<button

onClick={() =>
navigate("/cart")
}

className="hover:text-cyan-400 flex items-center gap-2 relative"
>

<FaShoppingCart />

<span>

Cart

</span>

<span className="absolute -top-3 -right-4 bg-cyan-500 text-xs w-6 h-6 rounded-full flex justify-center items-center">

{cart.length}

</span>

</button>

<button
onClick={() => navigate("/my-orders")}
className="hover:text-cyan-400 flex items-center gap-2"
>
<FaClipboardList />
Orders
</button>

</>
)
}

{/* ========================= */}
{/* DOCTOR MENU */}
{/* ========================= */}

{
(role === "DOCTOR" ||
role === "ROLE_DOCTOR") && (
<>

<button
onClick={() =>
navigate("/doctor-upload")
}
className="hover:text-cyan-400"
>
Upload Profile
</button>

<button
onClick={() =>
navigate("/medicine-upload")
}
className="hover:text-cyan-400"
>
Upload Medicine
</button>

<button
onClick={() =>
navigate("/my-doctors")
}
className="hover:text-cyan-400"
>
My Doctors
</button>

<button
onClick={() =>
navigate("/my-medicines")
}
className="hover:text-cyan-400"
>
My Medicines
</button>

<button
onClick={() =>
navigate("/doctor-inbox")
}
className="hover:text-cyan-400 flex items-center gap-2"
>
<FaComments />
Chats
</button>

</>
)
}

{/* ========================= */}
{/* LOGIN */}
{/* ========================= */}

{
!token && (
<button
onClick={() =>
navigate("/login")
}
className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 rounded-2xl"
>
Login
</button>
)
}

{/* ========================= */}
{/* REGISTER */}
{/* ========================= */}

{
!token && (
<button
onClick={() =>
navigate("/register")
}
className="border border-cyan-400 text-cyan-400 px-5 py-3 rounded-2xl"
>
Register
</button>
)
}

{/* ========================= */}
{/* PROFILE */}
{/* ========================= */}

{
profile && (

<div className="relative">

<div
onClick={() =>
setOpen(!open)
}
className="cursor-pointer"
>

{
profile.profileImage
?

<img

src={`http://localhost:8080/uploads/profile/${profile.profileImage}`}

alt=""

className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
/>

:

<div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex justify-center items-center text-white text-2xl">

🙂

</div>
}

</div>

{
open && (

<div className="absolute right-0 top-20 w-[320px] bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl">

<h1 className="text-white text-2xl font-black">

{profile.userName}

</h1>

<p className="text-gray-400 mt-2">

{profile.emailId}

</p>

<button

onClick={() => {

navigate("/profile");

setOpen(false);

}}

className="w-full mt-5 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl text-white font-bold"
>

Open Profile

</button>

<button

onClick={logout}

className="w-full mt-4 bg-red-500 py-4 rounded-2xl text-white font-bold"
>

Logout

</button>

</div>
)
}

</div>
)
}

</div>

{/* ========================= */}
{/* MOBILE MENU BUTTON */}
{/* ========================= */}

<div className="lg:hidden flex items-center gap-5">

{
profile && (

<img

src={
profile.profileImage
? `http://localhost:8080/uploads/profile/${profile.profileImage}`
: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}

alt=""

className="w-12 h-12 rounded-full object-cover border border-cyan-400"
/>
)
}

<button
onClick={() =>
setMobile(true)
}
className="text-white text-3xl"
>
<FaBars />
</button>

</div>

</div>

</nav>

{/* ========================= */}
{/* MOBILE SIDEBAR */}
{/* ========================= */}

<div className={`fixed top-0 right-0 h-full w-[320px] bg-[#020817] z-[999] border-l border-white/10 transform transition-all duration-500 ${
mobile
? "translate-x-0"
: "translate-x-full"
}`}>

{/* TOP */}

<div className="flex justify-between items-center p-6 border-b border-white/10">

<h1 className="text-white text-3xl font-black">
Menu
</h1>

<button
onClick={() =>
setMobile(false)
}
className="text-white text-3xl"
>
<FaTimes />
</button>

</div>

{/* ========================= */}
{/* MOBILE MENU */}
{/* ========================= */}

<div className="flex flex-col p-6 gap-6 text-white text-lg font-semibold">

{/* USER */}

{
(role === "USER" ||
role === "ROLE_USER") && (
<>

<button onClick={() => navigate("/")}>
Home
</button>

<button onClick={() => navigate("/")}>
Medicines
</button>

<button onClick={() => navigate("/dashboard")}>
Doctors
</button>

<button onClick={() => navigate("/cart")}>
Cart
</button>

<button onClick={() => navigate("/my-orders")}>
Orders
</button>

</>
)
}

{/* DOCTOR */}

{
(role === "DOCTOR" ||
role === "ROLE_DOCTOR") && (
<>

<button onClick={() => navigate("/doctor-upload")}>
Upload Profile
</button>

<button onClick={() => navigate("/medicine-upload")}>
Upload Medicine
</button>

<button onClick={() => navigate("/my-doctors")}>
My Doctors
</button>

<button onClick={() => navigate("/my-medicines")}>
My Medicines
</button>

<button onClick={() => navigate("/doctor-inbox")}>
Chats
</button>

</>
)
}

{/* LOGIN */}

{
!token && (
<button
  onClick={() => {
    navigate("/login");
    setMobile(false);
  }}
  className="bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl"
>
  Login
</button>
)
}

{/* REGISTER */}

{
!token && (
<button
  onClick={() => {
    navigate("/register");
    setMobile(false);
  }}
  className="border border-cyan-400 text-cyan-400 py-4 rounded-2xl"
>
  Register
</button>
)
}

{
token && (

<button
onClick={logout}
className="bg-red-500 py-4 rounded-2xl mt-5"
>

Logout

</button>
)
}

</div>

</div>

</>
  );
}

export default Navbar;