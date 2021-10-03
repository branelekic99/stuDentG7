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
                        <textarea className={"form-control"} {...register("content",{required:true})} rows={5}/>
                        {errors.content && <span>{REQUIRED_FIELD}</span>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewsUpdate;
