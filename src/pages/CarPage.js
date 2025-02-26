import { Box } from '@mui/material';
import { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import CarForm from '../components/util/CarForm';
import { PeopleContext } from '../context/PeopleContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteDialog from '../components/util/DeleteDialog';
import CustomSnackbar from '../components/util/CustomSnackbar';

import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { CarsContext } from '../context/CarsContext';

const CarPage = () => {
    const [idToRemove, setIdToRemove] = useState('');
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const { cars, removeCar, updateCar } = useContext(CarsContext);
    const { drivers } = useContext(PeopleContext);
    const [rowModesModel, setRowModesModel] = useState({});
    const [driver, setDriver] = useState('');
    const [snackbar, setSnackbar] = useState(null);

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

    const renderAddressHandler = (params) => {
        return params.value ? params.value.formatted_address : 'No programado';
    };

    const handleEditClick = (id) => () => {
        const row = cars.find((car) => car.id === id);
        const driver = drivers.find((driver) => driver.id === row.driverId);
        setDriver(driver);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    const renderEditCellAddressHandler = (params) => {
        return params.value ? params.value.formatted_address : 'No programado';
    };
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };


    const handleDeleteClick = (id) => () => {
        setIdToRemove(id);
        setOpenDelete(true);
    };

    const renderEditCellHandler = (params) => {
        return (
            <FormControl fullWidth>
                <Select
                    value={driver}
                    label="Driver"
                    onChange={(e) => setDriver(e.target.value)}
                >
                    {drivers.map((driver) => (
                        <MenuItem key={driver.id} value={driver}>
                            {driver.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl >
        );
    }
    const renderDriverHandler = (params) => {

        return params.row.driver ? params.row.driver.name : '';


    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };
    const handleDelete = () => {
        setOpenDelete(false);
        removeCar(idToRemove);
        setSnackbar({ children: 'Coche eliminado exitosamente', severity: 'success' });
    }

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false, driver: driver, driverId: driver.id };
        updateCar(newRow.id, updatedRow);
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'licencePlate', headerName: 'Matrícula', width: 130, editable: true, flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'kilometers', headerName: 'Kilómetros', width: 130, editable: true, flex: 1, headerAlign: 'center', align: 'center' },
        {
            field: 'address', headerName: 'Dirección', width: 200, editable: true,
            renderCell: renderAddressHandler, flex: 1, headerAlign: 'center', align: 'center'
            , renderEditCell: renderEditCellAddressHandler
        },
        {
            field: 'driver', headerName: 'Conductor', width: 200, editable: true,
            renderCell: renderDriverHandler,
            renderEditCell: renderEditCellHandler, flex: 1, headerAlign: 'center', align: 'center'

        },
        {
            field: 'inMaintenance',
            headerName: 'En Mantenimiento',
            width: 150,
            editable: true,
            type: 'boolean', flex: 1, headerAlign: 'center', align: 'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            headerAlign: 'center',
            flex: 1, align: 'center',
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {

                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditOutlinedIcon />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteOutlineIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                    />,
                ];
            },
        },
    ];

    return (
        <Box sx={{ height: '70vh', width: '100%' }}>

            <Button variant="outlined" onClick={handleClickOpen}>
                Nuevo Coche
            </Button>
            <DataGrid
                rows={cars}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onCellDoubleClick={(params, event) => {
                    if (!event.ctrlKey) {
                        event.defaultMuiPrevented = true;
                    }
                }}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Coche</DialogTitle>
                <DialogContent>
                    <CarForm handleClose={handleClose} />
                </DialogContent>

            </Dialog>
            <DeleteDialog open={openDelete} onClose={() => setOpenDelete(false)} onConfirm={handleDelete} />
            <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

        </Box>
    );
};

export default CarPage;