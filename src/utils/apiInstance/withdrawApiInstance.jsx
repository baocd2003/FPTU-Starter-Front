import axios from "axios";

const withdrawApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/withdraws`
});

export default withdrawApiInstance;