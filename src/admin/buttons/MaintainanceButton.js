import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MaintenanceButton = ({ onMaintenanceComplete }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (isConfirmed) => {
        setOpen(false);
        if (isConfirmed) {
            onMaintenanceComplete();
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
        </div>
    );
};

export default MaintenanceButton;
