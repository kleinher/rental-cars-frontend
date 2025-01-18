import wppClient from "./wppClient";

export const sendNotification = async (phoneNumber, licencePlate) => {
    const api = wppClient;

    const message = {
        message: `Buenos dias, necesitamos que actualice los kilometros actuales del coche con matricula ${licencePlate}. Por favor, responda con el numero de kilometros actuales.`,
        number: phoneNumber,
        licencePlate: licencePlate,
    };

    await api.post("/notification/send", message);
};

