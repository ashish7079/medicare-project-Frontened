import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

function MyMedicines() {

  const [data,
        setData] =
        useState([]);

  const authId =
        localStorage.getItem("id");

  useEffect(() => {

    fetchMedicines();

  }, []);

  // =========================
  // FETCH MY MEDICINES
  // =========================

  const fetchMedicines =
  async () => {

    try {

      const response =
            await axios.get(

`/my-medicines/${authId}`

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

`/deleted/${id}?authId=${authId}`

      );

      alert("Deleted");

      fetchMedicines();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold mb-10">

        My Medicines

      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        {

          data.map((item) => (

            <div

              key={item.id}

              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >

              {/* IMAGE */}

              <img

src={`http://localhost:8080/medicine/${item.medicineimg}`}

                alt=""

                className="w-full h-72 object-cover"
              />

              {/* DETAILS */}

              <div className="p-6">

                <h1 className="text-3xl font-bold">

                  {item.medicineName}

                </h1>

                <p className="mt-3">

                  {item.causes}

                </p>

                <p className="mt-3 text-green-600 font-bold">

                  ₹ {item.rate}

                </p>

                {/* DELETE */}

                <button

                  onClick={() =>
                    deleteMedicine(item.id)
                  }

                  className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-2xl"
                >

                  Delete

                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default MyMedicines;