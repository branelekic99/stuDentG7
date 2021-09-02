import axios from "axios";
import {GET_PROFILE, LOG_OUT, SIGN_IN, UPDATE_PROFILE,GUEST_MODE} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ASYNC_STORAGE_KEY,SERVER_ADRESA} from "../../constants/variables";

export const sigUp = data=>{
    return async dispatch =>{
        try{
            console.log("DOSAM SAM OVDE SA DATOM",data);
            // const result = await axios.post("/patient/signup",data);
            // console.log(result);
        }catch (err){
            console.log(err);
        }
    }
};

export const signIn = data =>{
    return async dispatch =>{
        try{
            console.log("IDE REQUEST");
            data.password = "patka123";
            const result = await axios.post( SERVER_ADRESA+ "/patient/signin",data);
            dispatch({
                type:SIGN_IN,
                payload:result.data
            })
        }catch (err){
            console.log(err);
            throw new Error("Incorrect credentials")
        }
    }
};
export const guestSignIn = ()=>{
    return {
        type:GUEST_MODE,
    }
}
export const signOut = ()=>{
    return async dispatch=>{
        try{
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            await axios.post(SERVER_ADRESA + "/patient/logout",{},{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            dispatch({
                type:LOG_OUT,
            })
        }catch (err){

        }
    }
};
export const updateProfile = (data,userId) =>{
    return async dispatch =>{
        try{
            console.log("ovo je data",data);
            console.log("ovo je user id",userId);
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
           const result = await axios.put(SERVER_ADRESA + `/patient/update/${userId}`,data,{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
           dispatch({
               type:UPDATE_PROFILE,
               payload:result.data
           })
        }catch (err){
            console.log(err)
            throw new Error("Something went wrong!");
        }
    }
};
export const getUserById = (id)=>{
    return async dispatch =>{
        try{
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.get(SERVER_ADRESA + `/get/patient/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            console.log(result.data)
            dispatch({
                type:GET_PROFILE,
                payload:result.data,
            })
        }catch (err){

        }
    }
};
export const updateUserPassword = (data,id)=>{
    return async dispatch =>{
        try{
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            const result = await axios.put(SERVER_ADRESA + `/patient/update_password/${id}/`,data,{
                headers:{
                    'Content-Type':"application/json",
                    "x-access-token": token,
                }
            });
            console.log(result.data)

        }catch (err){
            console.log(err)
            throw new Error("Something went wrong, please try again!")
        }
    }
}