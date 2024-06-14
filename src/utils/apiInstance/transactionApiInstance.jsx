import React from "react";
import axios from "axios";

const transactionApiInstance = axios.create({
  baseURL: "https://localhost:7235/api/transactions",
});

export default transactionApiInstance;
