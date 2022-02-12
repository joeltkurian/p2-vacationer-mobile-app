import { createContext } from "react";
import { Reservation } from "./dtos";


export const initialReservation: Reservation = {
    id: "",
    checkIn: NaN,
    checkOut: NaN,
    owner: "",
    room: ""
};

export interface AccountContext {
    reservation: Reservation,
    setReservation: Function,
}

function does(s: any) {
    alert('Something Failed');
}

export const userContext = createContext({ user: initialReservation, setUser: does });

export function formatted_date(date: number) {
    var result = "";
    var d = new Date(date);
    result += "Date: " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + '\n' +
        "    Time: " + d.getHours() + ":" + d.getMinutes() + ":" +
        d.getSeconds() + " ";
    return result;
}