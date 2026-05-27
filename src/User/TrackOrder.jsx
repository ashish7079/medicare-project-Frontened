import React, {

  useEffect,
  useState

} from "react";

import axios from "../utils/axiosInstance";

function TrackOrder() {

  const [data, setData] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    const response = await axios.get(

     "/all-orders"

    );

    setData(response.data);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">

        Live Order Tracking

      </h1>

      <div className="space-y-5">

        {data.map((item) => (

          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <h1 className="text-2xl font-bold">

              {item.medicineName}

            </h1>

            <p className="mt-3">

              Status:
              {" "}
              {item.status}

            </p>

            <p className="mt-3">

              Delivery Boy:
              {" "}
              {item.deliveryBoy}

            </p>

            <p className="mt-3">

              Estimated Time:
              {" "}
              {item.estimatedTime}

            </p>

            <p className="mt-3">

              Latitude:
              {" "}
              {item.latitude}

            </p>

            <p className="mt-3">

              Longitude:
              {" "}
              {item.longitude}

            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TrackOrder;