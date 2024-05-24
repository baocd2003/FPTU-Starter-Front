import React from 'react'
import axios from "axios";
const categoryApiInstance =  axios.create(
    {
        baseURL : "https://localhost:7235/api/categories"
    }
)

export default categoryApiInstance