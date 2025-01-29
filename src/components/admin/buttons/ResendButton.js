import React, { useState } from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CarsContext } from "../../../context/CarsContext";
import { sendNotification } from "../../../client/wppEndpoint";

const ResendButton = ({ phoneNumber, licencePlate }) => {
    const [buttonText, setButtonText] = useState("Reenviar mensaje");
    const [buttonColor, setButtonColor] = useState("violet");
    const [loading, setLoading] = useState(false);
    const { updateReminderSent } = useContext(CarsContext);

    const handleButtonClick = async () => {
        try {
            setLoading(true);
            await sendNotification(phoneNumber, licencePlate);

            setButtonText("Aviso reenviado");
            setButtonColor("green");

            updateReminderSent(licencePlate, true);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);

            setButtonText("Error al enviar");
            setButtonColor("red");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant='contained'
            sx={{ padding: '0 8px', backgroundColor: buttonColor, width: '160px' }}
            onClick={handleButtonClick}
        >
            {loading ? "Enviando..." : buttonText}
        </Button>
    );
};

export default ResendButton;
