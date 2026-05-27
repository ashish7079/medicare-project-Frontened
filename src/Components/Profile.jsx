// =========================
// FULL Profile.jsx
// =========================

import React, {

  useEffect,
  useState

} from "react";

// NEW AXIOS
import axios from "../utils/axiosInstance";

function Profile() {

  const [profile,
        setProfile] =
        useState(null);

  const [file,
        setFile] =
        useState(null);

  // =========================
  // FETCH PROFILE
  // =========================

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      // NO TOKEN NEEDED

      const response =
            await axios.get(

        "/auth/profile"

      );

      setProfile(
        response.data.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // IMAGE UPLOAD
  // =========================

  const uploadImage = async () => {

    try {

      const formData =
            new FormData();

      formData.append(
        "file",
        file
      );

      await axios.post(

        "/auth/upload-profile",

        formData

      );

      fetchProfile();

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // AVATAR
  // =========================

  const chooseAvatar =
  async (emoji) => {

    try {

      await axios.put(

        `/auth/avatar?avatar=${emoji}`

      );

      fetchProfile();

    } catch (error) {

      console.log(error);
    }
  };

  if(!profile){

    return <h1>Loading...</h1>
  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[500px]">

        {/* IMAGE */}

        <div className="flex justify-center">

          {

            profile.profileImage

            ?

            (

              <img

src={`http://localhost:8080/uploads/profile/${profile.profileImage}`}

                alt=""

                className="w-40 h-40 rounded-full object-cover"
              />
            )

            :

            (

              <div className="w-40 h-40 rounded-full bg-blue-600 flex justify-center items-center text-6xl text-white">

                {

                  profile.avatar

                  ?

                  profile.avatar

                  :

                  "🙂"
                }

              </div>
            )
          }

        </div>

        {/* NAME */}

        <h1 className="text-4xl font-bold text-center mt-6">

          {profile.userName}

        </h1>

        {/* EMAIL */}

        <p className="text-center text-gray-600 mt-3">

          {profile.emailId}

        </p>

        {/* IMAGE */}

        <input

          type="file"

          className="mt-8"

          onChange={(e)=>

            setFile(
              e.target.files[0]
            )
          }
        />

        <button

          onClick={uploadImage}

          className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-5"
        >

          Upload Image

        </button>

        {/* AVATARS */}

        <div className="flex justify-center gap-5 mt-8 text-4xl">

          <button
          onClick={()=>
            chooseAvatar("🙂")
          }>

            🙂

          </button>

          <button
          onClick={()=>
            chooseAvatar("😎")
          }>

            😎

          </button>

          <button
          onClick={()=>
            chooseAvatar("👨")
          }>

            👨

          </button>

          <button
          onClick={()=>
            chooseAvatar("👩")
          }>

            👩

          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;