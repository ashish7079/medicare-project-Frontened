import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate
} from "react-router-dom";

function DoctorInbox() {

  const [users, setUsers] =
        useState([]);

  const navigate =
        useNavigate();

  const doctorId =
        localStorage.getItem("id");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
  async () => {

    try {

      const response =
            await axios.get(

`/auth/doctor-users/${doctorId}`

      );

      setUsers(
        response.data
      );

    }

    catch(error){

      console.log(error);
    }
  };

  return (

<div>

{

users.map((item) => (

<div

key={item.userId}

onClick={() => {

  navigate(
    `/message/${item.userId}`
  );

}}
>

{item.userName}

</div>
))
}

</div>
  );
}

export default DoctorInbox;