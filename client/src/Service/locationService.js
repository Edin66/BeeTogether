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
    const response = await axios.post("http://localhost:7000/get-user-by-id", {
      id: beekeeperId,
    });
    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching beekeeper:", error);
    throw error;
  }
};

export const checkOwnership = (beekeeperId) => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);
    return decoded.userId === beekeeperId;
  }
  return false;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp) {
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    }
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
