import React, {

  useState

} from "react";

import axios from "../utils/axiosInstance";

function DrImg() {

  const [file1,
        setFile1] =
        useState(null);

  const [file2,
        setFile2] =
        useState(null);

  const [userName,
        setUserName] =
        useState("");

  const [degree,
        setDegree] =
        useState("");

  const [specialist,
        setSpecialist] =
        useState("");

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (
        e
  ) => {

    e.preventDefault();

    const formData =
          new FormData();

    // IMAGE

    formData.append(
      "file1",
      file1
    );

    // CERTIFICATE

    formData.append(
      "file2",
      file2
    );

    // USERNAME

    formData.append(
      "userName",
      userName
    );

    // DEGREE

    formData.append(
      "degree",
      degree
    );

    // SPECIALIST

    formData.append(
      "specialist",
      specialist
    );

    // AUTH ID

    formData.append(

      "authId",

      localStorage.getItem(
        "id"
      )
    );

    try {


      // =========================
      // API
      // =========================

      const response =
            await axios.post(

        "/upload",

        formData,
      );

      alert(response.data);

    } catch (error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form

        onSubmit={handleSubmit}

        className="bg-white p-10 rounded-3xl shadow-2xl w-[450px]"
      >

        <h1 className="text-4xl font-bold text-center mb-10">

          Upload Doctor

        </h1>

        {/* PROFILE */}

        <input

          type="file"

          className="w-full mb-5"

          onChange={(e) =>

            setFile1(
              e.target.files[0]
            )
          }
        />

        {/* CERTIFICATE */}

        <input

          type="file"

          className="w-full mb-5"

          onChange={(e) =>

            setFile2(
              e.target.files[0]
            )
          }
        />

        {/* NAME */}

        <input

          type="text"

          value={userName}

          onChange={(e) =>

            setUserName(
              e.target.value
            )
          }

          placeholder="Doctor Name"

          className="w-full border p-4 rounded-2xl mb-5"
        />

        {/* DEGREE */}

        <input

          type="text"

          value={degree}

          onChange={(e) =>

            setDegree(
              e.target.value
            )
          }

          placeholder="Degree"

          className="w-full border p-4 rounded-2xl mb-5"
        />

        {/* SPECIALIST */}

        <input

          type="text"

          value={specialist}

          onChange={(e) =>

            setSpecialist(
              e.target.value
            )
          }

          placeholder="Specialist"

          className="w-full border p-4 rounded-2xl mb-5"
        />

        {/* BUTTON */}

        <button

          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl text-xl font-bold"
        >

          Upload

        </button>

      </form>

    </div>
  );
}

export default DrImg;