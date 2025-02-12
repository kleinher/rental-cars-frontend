import { Box } from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import CommonForm from '../components/util/CommonForm';
import { PeopleContext } from '../context/PeopleContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';




export default function DriversPage() {
    const [open, setOpen] = useState(false);
    const { addDriver, drivers, removeDriver, updateDriver } = useContext(PeopleContext);
    const [rows, setRows] = useState(drivers);
    const [rowModesModel, setRowModesModel] = useState({});

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

    const handleDeleteClick = (id) => () => {
        removeDriver(id);
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
        const updatedRow = { ...newRow, isNew: false };
        updateDriver(newRow.id, updatedRow);
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 200, editable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'phoneNumber', headerName: 'Teléfono', width: 150, editable: true, flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'address', headerName: 'Dirección', width: 200, editable: true,
            valueFormatter: (params) => params ? params.formattedAddress : 'No programado',
            flex: 1, align: 'center', headerAlign: 'center'
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
        <Box sx={{ height: 400, width: '100%' }}>
            <Box>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Nuevo Conductor
                </Button>
            </Box>

            <DataGrid
                rows={drivers}
                columns={columns}
                editMode='row'
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={(updatedRow, originalRow) =>
                    processRowUpdate(updatedRow)
                }
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Conductor</DialogTitle>
                <DialogContent>
                    <CommonForm handleClose={handleClose} createFunction={addDriver} datos={null} />
                </DialogContent>
            </Dialog>
        </Box>
    );
}