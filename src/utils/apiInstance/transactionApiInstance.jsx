import React from "react";
import axios from "axios";

const transactionApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/transactions`,
});

export default transactionApiInstance;
