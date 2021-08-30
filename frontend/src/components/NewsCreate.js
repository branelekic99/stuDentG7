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
        <div>
            <form onSubmit={handleSubmit(onsubmit)} ref={form_ref}>
                <div>
                    <label>Title</label>
                    <input type={"text"} {...register("title",{required:true})} />
                    {errors.title && <span>{REQUIRED_FIELD}</span>}
                </div>
                <div>
                    <label>Content</label>
                    <textarea {...register("content",{required:true})} />
                    {errors.content && <span>{REQUIRED_FIELD}</span>}
                </div>
                <div>
                    <label>Image</label>
                    <input type={"file"} {...register("image")}/>
                </div>
            </form>
        </div>
    );
};

export default NewsCreate;
