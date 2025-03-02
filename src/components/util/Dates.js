import { differenceInMonths, differenceInDays } from 'date-fns';

export const calculateRelativeDate = (dateString) => {
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

export const calculateRelativeFutureDate = (dateString) => {
    if (dateString === null) {
        return "sin datos";
    }

    const updatedDate = new Date(dateString);
    const today = new Date();

    const months = differenceInMonths(updatedDate, today);
    const days = differenceInDays(updatedDate, today) - months * 30;

    if (months > 0) {
        return `dentro de ${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}`;
    } else if (months < 0) {
        return `hace ${Math.abs(months)} mes${Math.abs(months) > 1 ? "es" : ""} y ${Math.abs(days)} día${Math.abs(days) !== 1 ? "s" : ""}`;
    } else if (days > 0) {
        return `dentro de ${days} día${days !== 1 ? "s" : ""}`;
    } else if (days < 0) {
        return `hace ${Math.abs(days)} día${Math.abs(days) !== 1 ? "s" : ""}`;
    } else {
        return "hoy";
    }
};

export default calculateRelativeDate;