import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const wppClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

wppClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Error en la solicitud:", error);
        return Promise.reject(error);
    }
);

export default wppClient;
