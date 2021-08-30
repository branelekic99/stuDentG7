import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {REQUIRED_FIELD} from "../constants/messages";
import {updateNews} from "../redux-store/actions/news";

const NewsUpdate = ({form_ref}) => {
    const dispatch = useDispatch();
    const selected_item = useSelector(state=>state.news.edit_object);

    const {register,formState:{errors},handleSubmit} = useForm({
        defaultValues:{
            title:selected_item?.title || "",
            content:selected_item?.content || "",
        }
    });



    const onsubmit = data=>{
        const formData = new FormData();
        formData.append("title",data.title)
        formData.append("content",data.content)
        if(data.image){
            formData.append("image",data.image[0]);
        }
        dispatch(updateNews(selected_item.id,formData));
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

export default NewsUpdate;
