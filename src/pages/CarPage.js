import { Box } from '@mui/material';
import { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import CarForm from '../components/util/CarForm';
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
import { CarsContext } from '../context/CarsContext';

const CarPage = () => {
    const [open, setOpen] = useState(false);
    const { cars, removeCar, updateCar } = useContext(CarsContext);
    const { drivers } = useContext(PeopleContext);
    const [rowModesModel, setRowModesModel] = useState({});
    const [driverId, setDriverId] = useState('');

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
        removeCar(id);
    };
    const renderEditCellHandler = (params) => {
        return (
            <FormControl fullWidth>
                <Select
                    value={driverId}
                    label="Driver"
                    onChange={(e) => setDriverId(e.target.value)}
                >
                    {drivers.map((driver) => (
                        <MenuItem key={driver.id} value={driver.id}>
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

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        updateCar(newRow.id, updatedRow);
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'licencePlate', headerName: 'Matrícula', width: 130, editable: true },
        { field: 'kilometers', headerName: 'Kilómetros', width: 130, editable: true },
        {
            field: 'address', headerName: 'Dirección', width: 200, editable: true,
            valueFormatter: (params) => params ? params.formattedAddress : ''
        },
        {
            field: 'driver', headerName: 'Conductor', width: 200, editable: true,
            renderCell: renderDriverHandler,
            renderEditCell: renderEditCellHandler

        },
        {
            field: 'inMaintenance',
            headerName: 'En Mantenimiento',
            width: 150,
            editable: true,
            type: 'boolean',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 100,
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
        <Box sx={{ height: 400, width: '100%' }}>
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