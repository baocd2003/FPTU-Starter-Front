import React from 'react'
import axios from "axios";

const CLIENT_ID = "9b53b902-5477-4d48-be09-d7ecd200ac23";
const API_KEY = "09ecce8c-3971-45bd-a9f1-c89b8512a05f";

const payOsApiInstance = axios.create(
  {
    baseURL: "https://api-merchant.payos.vn",
    headers: {
      "x-client-id": CLIENT_ID,
      "x-api-key": API_KEY,
      "Content-Type": "application/json"
    }
  }
)

export default payOsApiInstance