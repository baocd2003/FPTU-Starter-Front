import axios from "axios";

const walletApiInstance = axios.create({
  baseURL: "https://localhost:7235/api/wallet"
});

export default walletApiInstance;