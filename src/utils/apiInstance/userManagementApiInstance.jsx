import axios from "axios";

const userManagementApiInstance = axios.create({
  baseURL: "https://localhost:7235/api/user"
});

export default userManagementApiInstance;