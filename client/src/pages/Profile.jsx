import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../store/AuthProvider";

import Loader from "../components/Loader/Loader";
import UserInformation from "../components/Profile/UserInformation";
import UserLocations from "../components/Profile/UserLocations";
import PageWrapperComponent from "../components/PageWrapperComponent/PageWrapperComponent";
import "./Pages.css";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <PageWrapperComponent>
      {loading && <Loader />}
      <section className="user-profile-container">
        <UserInformation user={user} />
        <UserLocations user={user} />
      </section>
    </PageWrapperComponent>
  );
};

export default Profile;
