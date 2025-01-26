import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import MaintenanceButton from "../../admin/buttons/MaintainanceButton";
import { useContext } from "react";
import { CarsContext } from "../../context/CarsContext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';
import calculateRelativeDate from "../../util/Dates";
import SendButton from "../../admin/buttons/SendButton";
import ResendButton from "../../admin/buttons/ResendButton";

const renderMaintenanceButton = (params) => {
    return params.row.inMaintenance ? <MaintenanceButton licencePlate={params.row.licensePlate} /> : <>-</>;
}
const projectedMaintainance = (params) => {
    return params.row.estMaintainance ? params.row.estMaintainance : "-";
}
const reminderSentDate = (params) => {
    return params.row.reminderSentDate ? calculateRelativeDate(params.row.reminderSentDate) : "-";
}
const sendReminder = (params) => {
    if (params.row.inMaintenance) {
        return <>-</>;
    }
    return params.row.reminderSent ? <ResendButton phoneNumber={params.row.phoneNumber} licencePlate={params.row.licensePlate} /> : <SendButton phoneNumber={params.row.phoneNumber} licencePlate={params.row.licensePlate} />;
}

const columns = [
    { field: 'licensePlate', headerName: 'Matricula', width: 150 },
    { field: 'user', headerName: 'Conductor', width: 150 },
    { field: 'estMaintainance', headerName: 'Mantenimiento estimado', renderCell: projectedMaintainance },
    { field: 'reminderSent', headerName: 'Enviar aviso', flex: 1, renderCell: sendReminder },
    { field: 'reminderSentDate', headerName: 'Fecha de aviso', width: 150, renderCell: reminderSentDate },
    { field: 'inMaintenance', headerName: 'En mantenimiento', flex: 1, renderCell: renderMaintenanceButton },
];



const NewAdminPage = () => {
    const { cars } = useContext(CarsContext);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '75vh', width: '100%' }}>
            <DataGrid rows={cars} columns={columns} />
        </Box>
    );
};

export default NewAdminPage;