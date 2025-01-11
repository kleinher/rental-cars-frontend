import axios from "axios";

const wppClient = axios.create({
    baseURL: "http://localhost:4000/api",
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
