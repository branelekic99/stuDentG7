import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addNews} from "../redux-store/actions/news";
import {REQUIRED_FIELD} from "../constants/messages";

const NewsCreate = ({form_ref}) => {
    const dispatch = useDispatch();
    const {register,formState:{errors},handleSubmit} = useForm();

    const onsubmit = data=>{
        const formData = new FormData();
        formData.append("title",data.title)
        formData.append("content",data.content)
        if(data.image){
            formData.append("image",data.image[0]);
        }
        dispatch(addNews(formData));
    }
    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)} ref={form_ref}>
                <div className={"row"}>
                    <div className={"col-12 col-md-6 col-lg-6 col-xl-6 form-group"}>
                        <label>Title</label>
                        <input type={"text"} className={"form-control"} {...register("title",{required:true})} />
                        {errors.title && <span>{REQUIRED_FIELD}</span>}
                    </div>
                    <div className={"col-12 col-md-6 col-lg-6 col-xl-6 form-group"}>
                        <label>Image</label>
                        <input type={"file"} className={"form-control"} {...register("image")}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12 col-md-12 col-lg-12 col-xl-12 form-group"}>
                        <label>Content</label>
                        <textarea className={"form-control"} {...register("content",{required:true})} rows={6}/>
                        {errors.content && <span>{REQUIRED_FIELD}</span>}
                    </div>
                </div>
            </form>
        </>
    );
};

export default NewsCreate;
