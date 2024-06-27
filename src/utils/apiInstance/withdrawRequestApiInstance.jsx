import axios from "axios";

const withdrawRequestApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/Withdraw`
});

export default withdrawRequestApiInstance;