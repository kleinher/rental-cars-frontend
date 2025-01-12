import wppClient from "../client/wppClient";

export const sendNotification = async (phoneNumber, licencePlate) => {
    const api = wppClient;

    const message = {
        message: "Este es un recordatorio enviado al backend",
        number: phoneNumber,
        licencePlate: licencePlate,
    };

    await api.post("/notification/send", message);
};