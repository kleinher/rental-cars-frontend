import { differenceInMonths, differenceInDays } from 'date-fns';

const calculateRelativeDate = (dateString) => {
    const updatedDate = new Date(dateString);
    const today = new Date();

    const months = differenceInMonths(today, updatedDate);
    const days = differenceInDays(today, updatedDate) - months * 30;

    if (months >= 1) {
        return `Aviso enviado hace: ${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}`;
    }
    if (days >= 1) {
        return `Aviso enviado hace: ${days} día${days !== 1 ? "s" : ""}`;
    }
    return "Aviso enviado hoy";
};

export default calculateRelativeDate;