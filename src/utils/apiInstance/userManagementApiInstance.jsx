import axios from "axios";

const userManagementApiInstance = axios.create({
  baseURL: "https://localhost:7235/api/UserManagement"
});

export default userManagementApiInstance;