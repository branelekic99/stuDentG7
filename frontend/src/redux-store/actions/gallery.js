import api from "../../api/api";
import {ADD_IMAGE, DELETE_IMAGE, GET_GALLERY} from "./type";

export const getGallery = ()=>{
    return async dispatch =>{
        try{
            const result = await api.get("/get/gallery")
            dispatch({
                type:GET_GALLERY,
                payload:result.data
            })
        }catch (err){
            console.log(err);
        }
    }
}

export const addImage = (data)=>{
    return async dispatch =>{
        try{
            const result = await api.post("/add/gallery/image",data)
            dispatch({
                type:ADD_IMAGE,
            })
        }catch (err){
            console.log(err);

        }
    }
};
export const deleteImage = (id) =>{
    return async dispatch =>{
        try{
            console.log("OVO JE ID",id)
            await api.delete(`/delete/gallery/image/${id}`);
            dispatch({
                type:DELETE_IMAGE
            })
        }catch (err){
            console.log(err)
        }
    }
}