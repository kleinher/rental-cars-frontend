import React, { useState } from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CarsContext } from "../../../context/CarsContext";
import { sendNotification } from "../../../client/wppEndpoint";
import CustomSnackbar from "../../util/CustomSnackbar";

const SendButton = ({ phoneNumber, licencePlate }) => {
    const [buttonText, setButtonText] = useState("Enviar mensaje");
    const [buttonColor, setButtonColor] = useState("primary");
    const [loading, setLoading] = useState(false);
    const { updateReminderSent } = useContext(CarsContext);
    const [snackbar, setSnackbar] = useState(null);

    const handleButtonClick = async () => {

        try {

            setLoading(true);
            if (!phoneNumber) {
                setSnackbar({ severity: "error", children: "No se ha encontrado el número de teléfono del conductor" });
                setLoading(false);
                return;
            }
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
        <>
            <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
            <Button
                variant='contained'
                color={buttonColor}
                sx={{ padding: '0 8px', width: '160px' }}
                onClick={handleButtonClick}
            >
                {loading ? "Enviando..." : buttonText}
            </Button>
        </>
    );
};

export default SendButton;
