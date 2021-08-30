import React,{useEffect} from 'react';
import {Route,Redirect} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {UNAUTHORIZED} from "../constants/constants";


const PrivateRoute = (props) => {
    const auth_status = useSelector(state=>state.auth.authenticated);

    if(!auth_status){
        return <Redirect to={"/login"} />;
    }
    return (
        <Route {...props} />
    );
};

export default PrivateRoute;
