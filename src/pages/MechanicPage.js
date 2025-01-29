import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { DriverContext } from '../context/DriverContext';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import CommonForm from '../components/util/CommonForm';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone', width: 150 },
];

const MechanicPage = () => {
    const { drivers } = useContext(DriverContext);
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
                rows={drivers}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Mechanic</DialogTitle>
                <DialogContent>
                    <CommonForm handleClose={handleClose} />
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default MechanicPage;