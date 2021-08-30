import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Form,Alert} from "react-bootstrap";
import {REQUIRED_FIELD} from "../constants/messages";
import {createAdmin} from "../redux-store/actions/auth";

const CreateAdmin = ({form_ref,handleClose}) => {
    const dispatch = useDispatch();

    const {register,formState:{errors},handleSubmit} = useForm();

    const onsubmit = async (data)=>{
        try{
            data.isSuperuser = false;
            await dispatch(createAdmin(data));
            handleClose();
        }catch (err){
            console.log(err);
        }

    }
    return (
        <Form onSubmit={handleSubmit(onsubmit)} ref={form_ref}>
            <Form.Group className={"mb-3"} controlId={"pw1"}>
                <Form.Label>Username</Form.Label>
                <Form.Control type={"text"} {...register("username",{required:true})}/>
                {errors.username && <p>{REQUIRED_FIELD}</p>}
            </Form.Group>
            <Form.Group className={"mb-3"} controlId={"pw2"}>
                <Form.Label>Password</Form.Label>
                <Form.Control type={"password"} {...register("password",{required:true})}/>
                {errors.password && <p>{REQUIRED_FIELD}</p>}
            </Form.Group>
        </Form>
    );
};

export default CreateAdmin;
