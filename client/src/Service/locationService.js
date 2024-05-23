import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const fetchLocation = async (id) => {
  try {
    const response = await axios.get(`http://localhost:7000/location/${id}`);
    return response.data.data.location;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

export const fetchBeekeeper = async (beekeeperId) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/get-specific-user",
      { id: beekeeperId }
    );
    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching beekeeper:", error);
    throw error;
  }
};

export const checkOwnership = (beekeeperId) => {
  const token = localStorage.getItem("token"); // Adjust according to how you store your token

  if (token) {
    const decoded = jwtDecode(token);
    return decoded.userId === beekeeperId;
  }
  return false;
};
