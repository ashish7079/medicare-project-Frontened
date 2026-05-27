import React, { useState } from "react";
import axios from "../utils/axiosInstance";

function MedicineImg() {

  const [file1, setFile1] = useState(null);
  const [mediciName, setMedicine] = useState("");
  const [causes, setCauses] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("mediciName", mediciName);
    formData.append("causes", causes);
    formData.append("rate", rate);
    formData.append(

  "authId",

  localStorage.getItem("id")
);

    try {

      const response = await axios.post(
        "/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data);

    } catch (error) {

      console.log(error);
      alert("Upload Failed ❌");
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
      >

        <h1 className="text-2xl font-bold text-center mb-5">
          Upload Medicine
        </h1>

        {/* Image Upload */}
        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) => setFile1(e.target.files[0])}
        />

        {/* Medicine Name */}
        <input
          type="text"
          value={mediciName}
          onChange={(e) => setMedicine(e.target.value)}
          placeholder="Enter Medicine Name"
          className="w-full border p-2 rounded mb-4"
        />

        {/* Causes */}
        <input
          type="text"
          value={causes}
          onChange={(e) => setCauses(e.target.value)}
          placeholder="Enter Causes"
          className="w-full border p-2 rounded mb-4"
        />

        {/* Rate */}
        <input
          type="text"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter Medicine Rate"
          className="w-full border p-2 rounded mb-4"
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>

      </form>
    </div>
  );
}

export default MedicineImg;