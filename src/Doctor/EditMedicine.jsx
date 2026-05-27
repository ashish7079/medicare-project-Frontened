import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate,
  useParams
} from "react-router-dom";

function EditMedicine() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [file1, setFile1] =
        useState(null);

  const [mediciName, setMedicine] =
        useState("");

  const [causes, setCauses] =
        useState("");

  const [rate, setRate] =
        useState("");

  // =========================
  // FETCH
  // =========================

  useEffect(() => {

    fetchMedicine();

  }, []);

  const fetchMedicine =
  async () => {

    try {

      const response =
            await axios.get(

        `/Singlemedicine/${id}`
      );

      setMedicine(
        response.data.medicineName
      );

      setCauses(
        response.data.causes
      );

      setRate(
        response.data.rate
      );

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdate =
  async (e) => {

    e.preventDefault();

    try {

      const formData =
            new FormData();

      formData.append(
        "mediciName",
        mediciName
      );

      formData.append(
        "causes",
        causes
      );

      formData.append(
        "rate",
        rate
      );

      if(file1){

        formData.append(
          "file1",
          file1
        );
      }

      await axios.put(

        `/update-medicine/${id}`,

        formData
      );

      alert(
        "Medicine Updated ✅"
      );

      navigate("/");

    } catch (error) {

      console.log(error);
    }
  };

  return (

<div className="min-h-screen bg-gray-100 flex justify-center items-center">

<form
onSubmit={handleUpdate}
className="bg-white p-10 rounded-3xl shadow-2xl w-[500px]"
>

<h1 className="text-4xl font-bold mb-8 text-center">

Edit Medicine

</h1>

<input
type="file"
className="w-full mb-5"
onChange={(e)=>
setFile1(
e.target.files[0]
)
}
/>

<input
type="text"
value={mediciName}
onChange={(e)=>
setMedicine(
e.target.value
)
}
placeholder="Medicine Name"
className="w-full border p-4 rounded-2xl mb-5"
/>

<input
type="text"
value={causes}
onChange={(e)=>
setCauses(
e.target.value
)
}
placeholder="Causes"
className="w-full border p-4 rounded-2xl mb-5"
/>

<input
type="text"
value={rate}
onChange={(e)=>
setRate(
e.target.value
)
}
placeholder="Rate"
className="w-full border p-4 rounded-2xl mb-5"
/>

<button
className="w-full bg-blue-600 text-white p-4 rounded-2xl"
>

Update Medicine

</button>

</form>

</div>
  );
}

export default EditMedicine;