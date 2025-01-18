import wppClient from "./wppClient";

export const carEndMaintainance = async (licencePlate) => {
    const api = wppClient;

    const message = {
        licencePlate: licencePlate
    };

    await api.post("/car/maintainance/end", message);
};