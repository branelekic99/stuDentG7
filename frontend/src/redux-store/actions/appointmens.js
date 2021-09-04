import api from "../../api/api";
import {CANCEL_RESERVATION, GET_APPOINTMENTS, GET_RESERVED_APPOINTMENTS, MAKE_RESERVATION} from "./type";
import {notification} from "antd";

export const getAvailableAppointmentsForCategory = (category_id)=>{
    return async (dispatch)=>{
        try{
            const result = await api.get(`/get/available_apointments/category/${category_id}`);
            dispatch({
                type:GET_APPOINTMENTS,
                payload:result.data,
            })
        }catch (err){
            console.log(err);
        }
    }
};
export const getReservedAppointmentsForCategory = (category_id) =>{
    return async (dispatch) =>{
        try{
            const result = await api.get(`/get/reserved_apointments/category/${category_id}`);
            dispatch({
                type:GET_RESERVED_APPOINTMENTS,
                payload:result.data
            })
        }catch (e) {
            console.log(e)
        }
    }
}
export const makeReservation = (id,data)=>{
    return async dispatch =>{
        try{
            await api.put(`/admin/reserve/apointment/${id}`,data);
            dispatch({
                type:MAKE_RESERVATION
            })
            notification.open({
                message:"Appointment reserved",
                description:"Appointment has been successfully reserved!"
            })
        }catch (err){
            console.log(err);
        }

    }
};
export const cancelReservation = (id)=>{
    return async dispatch =>{
        try{
        await api.put(`/relese/apointment/${id}`);
        dispatch({
            type:CANCEL_RESERVATION
        })
        }catch (err){
            console.log(err);
        }
    }
}