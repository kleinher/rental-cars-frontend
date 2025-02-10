import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import CarForm from '../components/util/CarForm';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'phoneNumber', headerName: 'Teléfono', width: 150 },
];

const CarPage = () => {
    const { drivers } = useContext(PeopleContext);
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
                Nuevo Coche
            </Button>
            <DataGrid
                rows={drivers}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Coche</DialogTitle>
                <DialogContent>
                    <CarForm handleClose={handleClose} />
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default CarPage;