import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import CommonForm from '../components/util/CommonForm';

const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
];

const MechanicPage = () => {
    const { mechanics, addMechanic } = useContext(PeopleContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>

            <Button variant="outlined" onClick={handleClickOpen}>
                Nuevo Mecanico
            </Button>
            <DataGrid
                rows={mechanics}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Mecanico</DialogTitle>
                <DialogContent>
                    <CommonForm handleClose={handleClose} createFunction={addMechanic} />
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default MechanicPage;