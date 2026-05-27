import React, {

  useEffect

} from "react";

import axios from "../utils/axiosInstance";

function DeliveryBoy() {

  // Order ID
  const orderId = 1;

  useEffect(() => {

    // LIVE GPS TRACKING
    navigator.geolocation.watchPosition(

      async (position) => {

        // AUTO LATITUDE
        const latitude =
          position.coords.latitude;

        // AUTO LONGITUDE
        const longitude =
          position.coords.longitude;

        // FIXED ETA
        const estimatedTime =
          "10 mins";

        try {

          // SEND TO BACKEND
          await axios.put(

            `/track-order/${orderId}
            ?latitude=${latitude}
            &longitude=${longitude}
            &estimatedTime=${estimatedTime}`

          );

          console.log(
            "Live Location Updated ✅"
          );

        } catch (error) {

          console.log(error);
        }

      },

      // ERROR
      (error) => {

        console.log(error);

      },

      // OPTIONS
      {

        enableHighAccuracy: true,

        maximumAge: 0,

        timeout: 5000

      }

    );

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">

        <h1 className="text-5xl font-bold text-blue-600">

          Delivery Boy App 🚚

        </h1>

        <p className="mt-5 text-xl text-gray-600">

          Live location sharing started...

        </p>

        <div className="mt-6">

          <div className="w-5 h-5 bg-green-500 rounded-full animate-ping mx-auto">

          </div>

          <p className="mt-3 text-green-600 font-bold">

            GPS ACTIVE

          </p>

        </div>

      </div>

    </div>
  );
}

export default DeliveryBoy;