import axios from "axios";

const userManagementApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/user`
});

export default userManagementApiInstance;