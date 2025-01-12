import React, { useState } from "react";
import wppClient from "../client/wppClient";
import { Button } from "@mui/material";

const SendButton = ({ phoneNumber, licencePlate }) => {
    const [buttonText, setButtonText] = useState("Enviar mensaje");
    const [buttonColor, setButtonColor] = useState("primary");
    const [loading, setLoading] = useState(false);
    const api = wppClient;

    const handleButtonClick = async () => {
        try {
            setLoading(true);
            const message = {
                message: "Este es un recordatorio enviado al backend",
                number: { phoneNumber },
                licencePlate: { licencePlate },
            };

            await api.post("/notification/send", message);
            setButtonText("Mensaje enviado");
            setButtonColor("success");
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
            sx={{ alignSelf: 'flex-end', padding: '0 8px' }}
            onClick={handleButtonClick}
        >
            {loading ? "Enviando..." : buttonText}
        </Button>
    );
};

export default SendButton;
