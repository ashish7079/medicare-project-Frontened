import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate,
  useParams
} from "react-router-dom";

function EditDoctor() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [file1, setFile1] =
        useState(null);

  const [file2, setFile2] =
        useState(null);

  const [userName, setUserName] =
        useState("");

  const [degree, setDegree] =
        useState("");

  const [specialist, setSpecialist] =
        useState("");

  // =========================
  // FETCH SINGLE DOCTOR
  // =========================

  useEffect(() => {

    fetchDoctor();

  }, []);

  const fetchDoctor = async () => {

    try {

      const response =
            await axios.get("/show");

      const doctor =
            response.data.find(

        (item) =>

          item.id === Number(id)
      );

      setUserName(
        doctor.userName
      );

      setDegree(
        doctor.degree
      );

      setSpecialist(
        doctor.specialist
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
        "userName",
        userName
      );

      formData.append(
        "degree",
        degree
      );

      formData.append(
        "specialist",
        specialist
      );

      if(file1){

        formData.append(
          "file1",
          file1
        );
      }

      if(file2){

        formData.append(
          "file2",
          file2
        );
      }

      await axios.put(

        `/update-doctor/${id}`,

        formData
      );

      alert(
        "Doctor Updated ✅"
      );

      navigate("/dashboard");

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

Edit Doctor

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
type="file"
className="w-full mb-5"
onChange={(e)=>
setFile2(
e.target.files[0]
)
}
/>

<input
type="text"
value={userName}
onChange={(e)=>
setUserName(
e.target.value
)
}
placeholder="Doctor Name"
className="w-full border p-4 rounded-2xl mb-5"
/>

<input
type="text"
value={degree}
onChange={(e)=>
setDegree(
e.target.value
)
}
placeholder="Degree"
className="w-full border p-4 rounded-2xl mb-5"
/>

<input
type="text"
value={specialist}
onChange={(e)=>
setSpecialist(
e.target.value
)
}
placeholder="Specialist"
className="w-full border p-4 rounded-2xl mb-5"
/>

<button
className="w-full bg-blue-600 text-white p-4 rounded-2xl"
>

Update Doctor

</button>

</form>

</div>
  );
}

export default EditDoctor;