import api from "../../api/api";
import {
    CLEAR_CREATE_SCHEDULE_ERROR,
    CREATE_SCHEDULE,
    CREATE_SCHEDULE_ERROR, DELETE_SCHEDULE,
    GET_CATEGORIES,
    GET_SCHEDULE_BY_CATEGORY
} from "./type";
import {notification} from "antd";


export const getCategories = ()=>{
    return async (dispatch) =>{
        try{
            const result = await api.get("/get/categories/")
            dispatch({
                type:GET_CATEGORIES,
                payload:result.data
            })
        }catch (err) {
            console.log(err)
        }
    }
};
export const getSchedulesByCategory = (category_id)=>{
    return async (dispatch)=>{
        try{
            const result = await api.get(`get/schedules/category/${category_id}`);
            dispatch({
                type:GET_SCHEDULE_BY_CATEGORY,
                payload:result.data
            })
        }catch (err){
            console.log(err);
        }
    }
};

export const createSchedule = data =>{
    return async (dispatch)=>{
        try{
            const result = await api.post("/admin/create/schedule",data);
            dispatch({
                type:CREATE_SCHEDULE,
            })
            notification.open({
                message:"Schedule created",
                description:"New schedule has been successfully created!"
            })
        }catch (err){
          dispatch({
              type:CREATE_SCHEDULE_ERROR,
              payload:err.response.data.message
          })
        }
    }
};
export const deleteSchedule = (id)=>{
    return async dispatch =>{
        try{
            await api.delete(`/admin/delete/schedule/${id}`);
            dispatch({
                type:DELETE_SCHEDULE
            })
            notification.open({
                message:"Schedule deleted",
                description:"Schedule has been successfully deleted!"
            })
        }catch (err){
            console.log(err);
        }
    }
}
export const clearScheduleError = ()=>{
    return{
        type:CLEAR_CREATE_SCHEDULE_ERROR
    }
}