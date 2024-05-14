import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_UNSPLASH_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
  },
});
export const getImages = async () => {
  return api.get("/photos/random");
};
