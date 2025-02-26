import { Box } from '@mui/material';
import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import CommonForm from '../components/util/CommonForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteDialog from '../components/util/DeleteDialog';

import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import CustomSnackbar from '../components/util/CustomSnackbar';


export default function MechanicPage() {
    const [open, setOpen] = useState(false);
    const { mechanics, addMechanic, removeMechanic, updateMechanic } = useContext(PeopleContext);
    const [rows, setRows] = useState(mechanics);
    const [rowModesModel, setRowModesModel] = useState({});
    const [snackbar, setSnackbar] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [idToRemove, setIdToRemove] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    const renderAddressHandler = (params) => {
        return params.value ? params.value.formatted_address : 'No programado';
    };
    const handleDeleteClick = (id) => () => {
        setIdToRemove(id);
        setOpenDelete(true);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const phoneNumberPattern = /^\d{13}$/;
        if (!phoneNumberPattern.test(newRow.phoneNumber)) {
            setSnackbar({ children: 'El número debe tener 13 dígitos', severity: 'error' });
            return rows.find((row) => row.id === newRow.id);
        }

        const updatedRow = { ...newRow, isNew: false };
        updateMechanic(newRow.id, updatedRow);
        setSnackbar({ children: 'Mecánico guardado exitosamente', severity: 'success' });
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    const renderEditCellHandler = (params) => {
        return params.value ? params.value.formatted_address : 'No programado';
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200, editable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'phoneNumber', headerName: 'Teléfono', width: 150, editable: true, flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'address', headerName: 'Dirección', width: 200, editable: true,
            renderCell: renderAddressHandler,
            flex: 1, align: 'center', headerAlign: 'center', renderEditCell: renderEditCellHandler
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            flex: 1,
            cellClassName: 'actions',
            align: 'center',
            headerAlign: 'center',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditOutlinedIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteOutlineIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box sx={{ height: '70vh', width: '100%' }}>
            <Box>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Nuevo Mecánico
                </Button>
            </Box>

            <DataGrid
                rows={mechanics}
                columns={columns}
                editMode='row'
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={(updatedRow, originalRow) =>
                    processRowUpdate(updatedRow)
                }
                onCellDoubleClick={(params, event) => {
                    if (!event.ctrlKey) {
                        event.defaultMuiPrevented = true;
                    }
                }}
            />

            <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

            <DeleteDialog open={openDelete} onClose={() => setOpenDelete(false)} onConfirm={() => { removeMechanic(idToRemove); setOpenDelete(false); }} />


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Conductor</DialogTitle>
                <DialogContent>
                    <CommonForm handleClose={handleClose} createFunction={addMechanic} datos={null} />
                </DialogContent>
            </Dialog>
        </Box>
    );
}