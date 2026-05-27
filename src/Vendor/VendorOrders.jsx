import React, {

  useEffect,
  useState

} from "react";

import axios from "../utils/axiosInstance";

function VendorOrders() {

  const [data, setData] = useState([]);

  const [deliveryBoy, setDeliveryBoy] =
    useState("");

  const [estimatedTime, setEstimatedTime] =
    useState("");

  useEffect(() => {

    fetchOrders();

  }, []);

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const response = await axios.get(

        "/all-orders"

      );

      setData(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (

    id,
    status

  ) => {

    try {

      await axios.put(

        `/update-status/${id}?status=${status}`

      );

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  // ASSIGN DELIVERY
  const assignDelivery = async (id) => {

    try {

      await axios.put(

        `/assign-delivery/${id}
        ?deliveryBoy=${deliveryBoy}`

      );

      await axios.put(

        `/update-time/${id}
        ?estimatedTime=${estimatedTime}`

      );

      alert("Delivery Assigned ✅");

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">

        Vendor Orders

      </h1>

      <div className="space-y-5">

        {data.map((item) => (

          <div
            key={item.id}
            className="bg-white p-6 rounded-3xl shadow"
          >

            {/* MEDICINE */}
            <h1 className="text-3xl font-bold">

              {item.medicineName}

            </h1>

            {/* USER */}
            <p className="mt-3 text-lg">

              User:
              {" "}
              {item.userName}

            </p>

            {/* AMOUNT */}
            <p className="mt-3 text-lg">

              Amount:
              {" "}
              ₹ {item.amount}

            </p>

            {/* PAYMENT */}
            <p className="mt-3 text-lg">

              Payment ID:
              {" "}
              {item.paymentId}

            </p>

            {/* STATUS */}
            <h2 className="mt-5 text-3xl font-bold text-blue-600">

              {item.status}

            </h2>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6 flex-wrap">

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "PACKED"
                  )
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-2xl"
              >

                Packed

              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "SHIPPED"
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl"
              >

                Shipped

              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "DELIVERED"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl"
              >

                Delivered

              </button>

            </div>

            {/* DELIVERY BOY */}
            <input
              type="text"
              placeholder="Delivery Boy Name"
              className="border p-4 rounded-2xl mt-6 w-full"
              onChange={(e) =>
                setDeliveryBoy(
                  e.target.value
                )
              }
            />

            {/* ETA */}
            <input
              type="text"
              placeholder="Estimated Time"
              className="border p-4 rounded-2xl mt-4 w-full"
              onChange={(e) =>
                setEstimatedTime(
                  e.target.value
                )
              }
            />

            {/* ASSIGN BUTTON */}
            <button
              onClick={() =>
                assignDelivery(item.id)
              }
              className="bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-2xl mt-5"
            >

              Assign Delivery

            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default VendorOrders;