import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Form, Alert} from "react-bootstrap";
import {logIn, checkUserStatus} from "../redux-store/actions/auth";
import {REQUIRED_FIELD} from "../constants/messages";
import {Button} from "react-bootstrap";
import {CHECKING} from "../constants/constants";
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";

const Login = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector(state => state.auth.authenticated);
    const auth_status = useSelector(state => state.auth.auth_status);
    const auth_error = useSelector(state => state.auth.auth_error_message);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => {
        setShowPassword(showPassword ? false : true)
    }

    useEffect(() => {
        dispatch(checkUserStatus());
    }, [])
    if (auth_status === CHECKING) {
        return <h1>checking....</h1>
    }
    if (authenticated) {
        return <Redirect path={"/"}/>
    }
    const onsubmit = data => {
        dispatch(logIn(data));
    }
    return (
        <>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-6 col-lg-6 col-xl-6 sv-login-page"}>

                    </div>
                    <div className={"col-12 col-md-6 col-lg-6 col-xl-6 sv-login-page-form"}>
                        <div className={"row d-flex justify-content-center"}>
                            <div className={"col-12 col-md-12 col-lg-12 col-xl-12 text-center"}>
                                <h3 className={"text-uppercase"}>Login</h3>
                            </div>
                        </div>
                        <div className={"row d-flex justify-content-center pt-3"}>
                            <div className={"col-12 col-md-12 col-lg-12 col-xl-12"}>
                                {auth_error && <Alert variant={"danger"}>{auth_error}</Alert>}
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit(onsubmit)} validated={false}>
                            <div className={"row d-flex justify-content-center pt-2"}>
                                <div className={"col-12 col-md-12 col-lg-8 col-xl-8"}>
                                    <Form.Label className={"fw-bold"}>Username</Form.Label>
                                    <Form.Control type={"text"}
                                                  placeholder={"Enter username"} {...register("username", {required: true})}/>
                                    {errors.username && (<p>Please enter your username</p>)}
                                </div>
                            </div>
                            <div className={"row d-flex justify-content-center pt-3"}>
                                <div className={"col-12 col-md-12 col-lg-8 col-xl-8"}>
                                    <Form.Label className={"fw-bold"}>Password</Form.Label>
                                    <Form.Control type={showPassword ? "text" : "password"}
                                                  placeholder={"Password"} {...register("password", {required: true})}/>
                                    {errors.password && (<p>Please enter your password</p>)}
                                    <button className="btn btn-show-password" type="button"
                                            onClick={togglePassword}>{showPassword ? <BsFillEyeSlashFill/> :
                                        <BsFillEyeFill/>}</button>
                                </div>
                            </div>
                            <div className={"row d-flex justify-content-center pt-3"}>
                                <div className={"col-12 col-md-12 col-lg-8 col-xl-8"}>
                                    <Button className={"btn btn-primary w-100"} type={"submit"}>
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
