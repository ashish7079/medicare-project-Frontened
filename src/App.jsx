import "./App.css";
import {  BrowserRouter, Routes,Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import DashBoard from "./User/DashBoard";
import Medicine from "./User/Medicine";
import SingleMedicine from "./User/SinlgeMedicine";
import Payment from "./User/Payment";
import Cart from "./User/Cart";
import Success from "./User/Success";
import MyOrders from "./User/MyOrders";
import Premium from "./User/Premium";
import DrImg from "./Doctor/DrImg";
import MedicineImg from "./Doctor/MedicineImg";
import DoctorInbox from "./Doctor/DoctorInbox";
import DoctorDetails from "./User/DoctorDetails";
import Message from "./Chat/Message";
import VendorOrders from "./Vendor/VendorOrders";
import DeliveryBoy from "./Vendor/DeliveryBoy";
import MapTracking from "./User/MapTracking";
import TrackOrder from "./User/TrackOrder";
import Profile from "./Components/Profile";
import EditMedicine from "./Doctor/EditMedicine";
import EditDoctor from "./Doctor/EditDoctor";
import MyDoctors from "./Doctor/MyDoctors";
import MyMedicines from "./Doctor/MyMedicines";

function App() {

  return (

    <BrowserRouter>

      {/* NAVBAR */}

      <Navbar />

      {/* ROUTES */}

      <Routes> <Route

          path="/"

          element={<Medicine />}
        /><Route

          path="/register"

          element={<Register />}
        />

        <Route

          path="/login"

          element={<Login />}
        />  <Route

          path="/dashboard"

          element={<DashBoard />}
        />

        <Route

          path="/singlemedicine/:id"

          element={<SingleMedicine />}
        />

        <Route

          path="/payment"

          element={<Payment />}
        />

        <Route

          path="/payment/:id"

          element={<Payment />}
        />

        <Route

          path="/cart"

          element={<Cart />}
        />

        <Route

          path="/success"

          element={<Success />}
        />

        <Route

          path="/my-orders"

          element={<MyOrders />}
        />

        <Route path="/premium" element={<Premium />}  /> <Route

          path="/doctor-upload"

          element={<DrImg />}
        />

        <Route

          path="/medicine-upload"

          element={<MedicineImg />}
        />

        <Route

          path="/doctor-inbox"

          element={<DoctorInbox />}
        />

        <Route

          path="/doctor/:id"

          element={<DoctorDetails />}
        />  <Route

          path="/message/:id"

          element={<Message />}
        />  <Route

          path="/vendor-orders"

          element={<VendorOrders />}
        />

        <Route

          path="/delivery-boy"

          element={<DeliveryBoy />}
        />  <Route

          path="/track-order"

          element={<TrackOrder />}
        />

        <Route

          path="/map-tracking"

          element={<MapTracking />}
        />

        <Route
 path="/profile"
 element={<Profile />}
/>

<Route
path="/edit-doctor/:id"
element={<EditDoctor />}
/>

<Route
path="/edit-medicine/:id"
element={<EditMedicine />}
/>
<Route

  path="/my-doctors"

  element={<MyDoctors />}
/>

<Route

  path="/my-medicines"

  element={<MyMedicines />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;