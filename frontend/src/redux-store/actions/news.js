import {ADD_NEWS, CLEAR_SELECTED_ITEM, DELETE_NEWS, GET_NEWS, GET_NEWS_BY_ID,UPDATE_NEWS} from "./type";

import api from "../../api/api";

export const addNews = data =>{
    return async function (dispatch){
        try{
            const result = await api.post("/admin/create/news",data);
            dispatch({
                type:ADD_NEWS
            })
        }catch (err){
            console.log(err)
        }
    }
    return{
        type:ADD_NEWS,
        payload:data
    }
};

export const getNews = (offset = 0)=>{
    return async function (dispatch){
        try{
            const result = await api.get(`/get/news/paginated?limit=10&offset=${offset}`);
            console.log(result.data)
            dispatch({
                type:GET_NEWS,
                payload:result.data
            })
        }catch (err){
            console.log(err)
        }
    }
};
export const updateNews = (id,data)=>{
    return async (dispatch)=>{
        console.log("OVDE SAM!",data)
        try{
            console.log("uasao u try blok")
            const result = await api.put(`/admin/update/news/${id}`,data);
            console.log(result)
            dispatch({
                type:UPDATE_NEWS,
            })
        }catch (err){
            console.log(err)
        }
    }
};
export const getNewsById = (id)=>{
    return async (dispatch)=>{
        try{
            const result = await api.get(`/get/news/${id}/`)
            dispatch({
                type:GET_NEWS_BY_ID,
                payload:result.data
            })
        }catch (err){
            console.log(err)
        }
    }
};
export const deleteNews = (id)=>{
    return async (dispatch)=>{
        try{
            const result = await api.delete(`/admin/delete/news/${id}`);
            dispatch({
                type:DELETE_NEWS
            })
        }catch (err){
            console.log(err)
        }
    }
}
export const clearSelectedItem = ()=>{
    return{
        type:CLEAR_SELECTED_ITEM
    }
}
