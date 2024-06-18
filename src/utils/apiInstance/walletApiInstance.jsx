import axios from "axios";

const walletApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/wallet`
});

export default walletApiInstance;