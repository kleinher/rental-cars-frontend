import React from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    TextField,
    Box,
} from "@mui/material";

const CarDialog = ({ open, car, newKm, onClose, onSave, onKmChange }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                        Modificar kilómetros del coche:
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                        {car?.licensePlate}
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    label="Kilómetros"
                    value={newKm}
                    onChange={(e) => onKmChange(e.target.value)}
                    type="number"
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={onSave} color="primary" variant="contained">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CarDialog;
