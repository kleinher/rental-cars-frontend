import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import CommonForm from '../components/util/CommonForm';
import { PeopleContext } from '../context/PeopleContext';

const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone', width: 150 },
];

const DriversPage = () => {
    const { addDriver, drivers } = useContext(PeopleContext);
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
                Nuevo Conductor
            </Button>
            <DataGrid
                rows={drivers}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Conductor</DialogTitle>
                <DialogContent>
                    <CommonForm handleClose={handleClose} createFunction={addDriver} />
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default DriversPage;