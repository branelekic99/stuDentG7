import axios from "axios";
import {LOG_IN, AUTH_ERROR, UPDATE_USER_STATUS, LOG_OUT, CREATE_ADMIN, UPDATE_PASSWORD, CHANGE_PASSWORD} from "./type";
import api from "../../api/api";

export const logIn = (data) =>{
    return async function(dispatch){
        try{
            const result = await axios.post("/admin/signin/",data)
            dispatch({
                type:LOG_IN,
                payload:result.data
            })
        }catch (err){
            dispatch({
                type:AUTH_ERROR,
                payload:err.response.data.message,
            })
        }
   }
};

export const checkUserStatus = ()=>{
    return async (dispatch)=>{
        try{
            const result = await api.get("/current/user")
            dispatch({
                type:UPDATE_USER_STATUS,
                payload:result.data,
            })
        }catch (err){
            dispatch({
                type:AUTH_ERROR,
                payload:""
            })
        }

    }
};
export const logOut = ()=>{
    return async (dispatch)=>{
        try{
            const result = await api.post("/admin/logout/")
            dispatch({
                type:LOG_OUT
            })
        }catch (err){
            dispatch({
                type:AUTH_ERROR,
                payload:err.response.data.message,
            })
        }
    }
};
export const createAdmin = (data)=>{
    return async dispatch=>{
        try{
            await api.post("/admin/create",data);
            dispatch({
                type:CREATE_ADMIN
            })
        }catch (err){
            throw new Error("Something went wrong!");
        }
    }
};

export const changePassword = (data)=>{
    return async dispatch =>{
        console.log(data)
        try{
            await api.put("/admin/update_password",data);
            dispatch({
                type:CHANGE_PASSWORD,
            })
        }catch (err){
            if(err.response.data){
                throw new Error(err.response.data.message);
            }else{
                throw new Error("Something went wrong!");
            }

        }
    }
}
