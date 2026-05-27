// =========================
// FULL MyOrders.jsx
// =========================

import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

function MyOrders() {

  const [data, setData] =
        useState([]);

  const [loading, setLoading] =
        useState(true);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const authId =
            localStorage.getItem("id");

      const response =
            await axios.get(

        `/my-orders/${authId}`

      );

      setData(response.data);

    } catch (error) {

      console.log(error);
    }

    finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <div className="p-10 text-3xl">

        Loading Orders...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">

        My Orders

      </h1>

      {

        data.length === 0

        &&

        (

          <h1 className="text-2xl">

            No Orders Found

          </h1>
        )
      }

      <div className="space-y-5">

        {

          data.map((item) => (

            <div

              key={item.id}

              className="bg-white p-6 rounded-3xl shadow"
            >

              <h1 className="text-3xl font-bold">

                {item.medicineName}

              </h1>

              <p className="mt-3">

                Amount:
                {" "}
                ₹ {item.amount}

              </p>

              <p className="mt-3">

                Status:
                {" "}
                {item.status}

              </p>

              <p className="mt-3">

                Delivery Boy:
                {" "}

                {

                  item.deliveryBoy

                  ?

                  item.deliveryBoy

                  :

                  "Not Assigned"
                }

              </p>

              <p className="mt-3">

                ETA:
                {" "}

                {

                  item.estimatedTime

                  ?

                  item.estimatedTime

                  :

                  "Waiting"
                }

              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default MyOrders;