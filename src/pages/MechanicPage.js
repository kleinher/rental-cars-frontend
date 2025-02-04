import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import CommonForm from '../components/util/CommonForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'phoneNumber', headerName: 'Teléfono', width: 150 },
    { field: 'address', headerName: 'Dirección', width: 200 },
];

const MechanicPage = () => {
    const { mechanics, addMechanic, removeMechanic, updateMechanic } = useContext(PeopleContext);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (params) => {
        setSelectedRow(params.id === selectedRow?.id ? null : params.row);

    };

    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleDelete = () => {
        removeMechanic(selectedRow.id);
        setSelectedRow(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Nuevo Mecánico
                </Button>
                {selectedRow && (
                    <Box sx={{ display: 'flex' }}>
                        <Box justifyContent="center" alignItems="center">
                            <Button variant='outlined' color="primary" onClick={handleOpenEdit}>
                                <EditOutlinedIcon />
                            </Button>
                        </Box>
                        <Box justifyContent="center" alignItems="center">
                            <Button variant='outlined' color="error" onClick={handleDelete}>
                                <DeleteOutlineIcon />
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>

            <DataGrid
                rows={mechanics}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={handleRowClick}
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Mecánico</DialogTitle>
                <DialogContent>
                    <CommonForm handleClose={handleClose} createFunction={addMechanic} />
                </DialogContent>
            </Dialog>

            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Editar Mecánico</DialogTitle>
                <DialogContent>
                    <CommonForm handleClose={handleCloseEdit} createFunction={updateMechanic} datos={selectedRow} />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default MechanicPage;