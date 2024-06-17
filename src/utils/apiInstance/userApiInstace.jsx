import React from 'react'
import axios from "axios";
const userApiInstace =  axios.create(
    {
        baseURL : "https://localhost:7235/api/Authentication"
    }
)

export default userApiInstace