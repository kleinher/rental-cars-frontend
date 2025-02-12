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
    return params.row.reminderSent ? <ResendButton phoneNumber={params.row?.driver?.phoneNumber} licencePlate={params.row.licencePlate} /> : <SendButton phoneNumber={params.row?.driver?.phoneNumber} licencePlate={params.row.licencePlate} />;
}


const columns = [
    { field: 'licencePlate', headerName: 'Matrícula', align: 'center', headerAlign: 'center' },
    { field: 'driver', headerName: 'Conductor', flex: 1, valueFormatter: (params) => params ? params.name : '', align: 'center', headerAlign: 'center' },
    { field: 'estMaintainance', headerName: 'Mantenimiento estimado', renderCell: projectedMaintainance, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'reminderSent', headerName: 'Enviar aviso', renderCell: sendReminder, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'reminderSentDate', headerName: 'Fecha de aviso', renderCell: reminderSentDate, flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'inMaintenance', headerName: 'En mantenimiento', renderCell: renderMaintenanceButton, flex: 1, align: 'center', headerAlign: 'center' },
];



const NewAdminPage = () => {
    const { cars } = useContext(CarsContext);
    return (
        <DataGrid rows={cars} columns={columns} autosizeOptions={{
        }} />
    );
};

export default NewAdminPage;