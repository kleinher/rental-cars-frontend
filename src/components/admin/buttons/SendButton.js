import React, { useState } from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CarsContext } from "../../../context/CarsContext";
import { sendNotification } from "../../../client/wppEndpoint";

const SendButton = ({ phoneNumber, licencePlate }) => {
    const [buttonText, setButtonText] = useState("Enviar mensaje");
    const [buttonColor, setButtonColor] = useState("primary");
    const [loading, setLoading] = useState(false);
    const { updateReminderSent } = useContext(CarsContext);


    const handleButtonClick = async () => {

        try {
            setLoading(true);
            await sendNotification(phoneNumber, licencePlate);

            setButtonText("Mensaje enviado");
            setButtonColor("success");

            updateReminderSent(licencePlate, true);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);

            setButtonText("Error al enviar");
            setButtonColor("danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant='contained'
            color={buttonColor}
            sx={{ padding: '0 8px', width: '160px' }}
            onClick={handleButtonClick}
        >
            {loading ? "Enviando..." : buttonText}
        </Button>
    );
};

export default SendButton;
