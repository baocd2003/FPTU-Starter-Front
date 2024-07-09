import axios from "axios";
const commissionApiInstance = axios.create(
    {
        baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/commission`
    }
)

export default commissionApiInstance