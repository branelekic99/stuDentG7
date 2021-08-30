import React,{ useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Form,Alert} from "react-bootstrap";
import {logIn,checkUserStatus} from "../redux-store/actions/auth";
import {REQUIRED_FIELD} from "../constants/messages";
import {Button} from "react-bootstrap";
import {CHECKING} from "../constants/constants";

const Login = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector(state=>state.auth.authenticated);
    const auth_status = useSelector(state=>state.auth.auth_status);
    const auth_error = useSelector(state=>state.auth.auth_error_message);
    const {register,formState:{errors},handleSubmit} = useForm();

    useEffect(()=>{
        dispatch(checkUserStatus());
    },[])
    if(auth_status === CHECKING){
        return <h1>checking....</h1>
    }
    if(authenticated){
        return <Redirect path={"/"}/>
    }
    const onsubmit = data=>{
        dispatch(logIn(data));
    }
    return (
        <div className={"container-sm"}>
            <h1>Log In</h1>
            {auth_error&&<Alert variant={"danger"}>{auth_error}</Alert>}
           <Form onSubmit={handleSubmit(onsubmit)} validated={false}>
               <Form.Group className={"mb-3"} controlId={"formBasicEmail"}>
                   <Form.Label>Username</Form.Label>
                   <Form.Control type={"text"} placeholder={"Enter username"} {...register("username",{required:true})}/>
                   {errors.username&&(<p>Please enter your username</p>)}
               </Form.Group>
               <Form.Group className={"mb-3"} controlId={"formBasicPassword"}>
                   <Form.Label>Password</Form.Label>
                   <Form.Control type={"password"} placeholder={"Password"} {...register("password",{required:true})}/>
                   {errors.password&&(<p>Please enter your password</p>)}
               </Form.Group>
                <Button variant={"primary"} type={"submit"}>
                    Login In
                </Button>
           </Form>
        </div>
    );
};

export default Login;
