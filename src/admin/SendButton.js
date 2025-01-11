import React, { useState } from "react";
import wppClient from "../client/wppClient";
import { Button } from "@mui/material";

const SendButton = () => {
    const [buttonText, setButtonText] = useState("Enviar mensaje");
    const [buttonColor, setButtonColor] = useState("primary");
    const [loading, setLoading] = useState(false);
    const api = wppClient;
    const handleButtonClick = async () => {
        try {
            setLoading(true);
            const message = {
                message: "Este es un recordatorio enviado al backend",
                number: "34645983954"
            };

            await api.post("/notification/send", message);
            setButtonText("Mensaje enviado");
            setButtonColor("success");
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);

            // Maneja el error y cambia el estado del botón
            setButtonText("Error al enviar");
            setButtonColor("danger");
        } finally {
            setLoading(false); // Finaliza el estado de carga
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
