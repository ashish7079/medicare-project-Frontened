import React, {

  useEffect,
  useState

} from "react";

import axios from "../utils/axiosInstance";

function MyDoctors() {

  const [data,
        setData] =
        useState([]);

  const authId =
        localStorage.getItem("id");

  useEffect(() => {

    fetchDoctors();

  }, []);

  // =========================
  // FETCH
  // =========================

  const fetchDoctors =
  async () => {

    try {

      const response =
            await axios.get(
              "/show"
            );

      // ONLY MY DATA

      const myDoctors =
            response.data.filter(

        (item) =>

          item.authId ===
          Number(authId)
      );

      setData(myDoctors);

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

`/delete/${id}?authId=${localStorage.getItem("id")}`

      );

      alert("Deleted");

      fetchDoctors();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold mb-10">

        My Doctors

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

src={`http://localhost:8080/uploads/profile/${item.file1Path}`}

                alt=""

                className="w-full h-72 object-cover"
              />

              {/* DETAILS */}

              <div className="p-6">

                <h1 className="text-3xl font-bold">

                  Dr. {item.userName}

                </h1>

                <p className="mt-3">

                  {item.degree}

                </p>

                <p className="mt-3 text-blue-600 font-bold">

                  {item.specialist}

                </p>

                {/* DELETE */}

                <button

                  onClick={() =>
                    deleteDoctor(item.id)
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

export default MyDoctors;