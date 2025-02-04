import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import MaintenanceButton from "../../components/admin/buttons/MaintainanceButton";
import { useContext } from "react";
import { CarsContext } from "../../context/CarsContext";
import { calculateRelativeDate, calculateRelativeFutureDate } from "../../components/util/Dates";
import SendButton from "../../components/admin/buttons/SendButton";
import ResendButton from "../../components/admin/buttons/ResendButton";


const renderMaintenanceButton = (params) => {
    return params.row.inMaintenance ? <MaintenanceButton licencePlate={params.row.licensePlate} /> : <>-</>;
}
const projectedMaintainance = (params) => {
    return calculateRelativeFutureDate(params.row.estMaintainance)
        ;
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
    { field: 'licensePlate', headerName: 'Matrícula', },
    { field: 'driver', headerName: 'Conductor' },
    { field: 'estMaintainance', headerName: 'Mantenimiento estimado', renderCell: projectedMaintainance, flex: 1, },
    { field: 'reminderSent', headerName: 'Enviar aviso', renderCell: sendReminder, flex: 1 },
    { field: 'reminderSentDate', headerName: 'Fecha de aviso', renderCell: reminderSentDate, flex: 1 },
    { field: 'inMaintenance', headerName: 'En mantenimiento', renderCell: renderMaintenanceButton, flex: 1 },
];



const NewAdminPage = () => {
    const { cars } = useContext(CarsContext);
    return (
        <DataGrid rows={cars} columns={columns} autosizeOptions={{
        }} />
    );
};

export default NewAdminPage;