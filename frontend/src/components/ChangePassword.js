import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Form,Alert} from "react-bootstrap";
import {REQUIRED_FIELD} from "../constants/messages";
import {changePassword} from "../redux-store/actions/auth";

const ChangePassword = ({form_ref,handleClose}) => {
    const dispatch = useDispatch();
    const {register,formState:{errors},handleSubmit} = useForm();
    const [passwordError,setPasswordError] = useState("");

    const onsubmit = async (data)=>{
        if(data.newPassword !== data.newPassword2){
            setPasswordError("Password doesn't match")
            return
        }
        try{
            delete data.newPassword2;
            await dispatch(changePassword(data));
            handleClose();
        }catch (err){
            setPasswordError(err.message);
        }
    }
    return (
            <Form onSubmit={handleSubmit(onsubmit)} ref={form_ref}>
                {passwordError&&<Alert variant={"danger"}>{passwordError}</Alert>}
                <Form.Group className={"mb-3"} controlId={"pw1"}>
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type={"password"} {...register("oldPassword",{required:true})}/>
                    {errors.oldPassword && <p>{REQUIRED_FIELD}</p>}
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"pw2"}>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type={"password"} {...register("newPassword",{required:true})}/>
                    {errors.newPassword && <p>{REQUIRED_FIELD}</p>}
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"pw3"}>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type={"password"} {...register("newPassword2",{required:true})}/>
                    {errors.newPassword2 && <p>{REQUIRED_FIELD}</p>}
                </Form.Group>
            </Form>
    );
};

export default ChangePassword;
