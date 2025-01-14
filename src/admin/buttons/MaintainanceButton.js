import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { CarsContext } from '../../context/CarsContext';

const MaintenanceButton = ({ licencePlate }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const { updateCarMaintenanceStatus } = useContext(CarsContext);

    const handleClose = (isConfirmed) => {
        setOpen(false);
        if (isConfirmed) {
            updateCarMaintenanceStatus(licencePlate);
        }
    };

    return (
        <Box>
            <Button variant="contained"
                color="warning"
                sx={{ alignSelf: 'flex-end', padding: '0 8px' }}
                onClick={handleClickOpen}>
                Mantenimiento terminado
            </Button>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro que está terminado el mantenimiento?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MaintenanceButton;
