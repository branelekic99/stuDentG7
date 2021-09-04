import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {cancelReservation} from "../redux-store/actions/appointmens";
import Confirmation from "./Confirmation";
import {Tooltip} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";

const ReleaseAppointment = ({item})=>{
    const dispatch = useDispatch();

    const [showModal,setShowModal] = useState(false);

    const reFetch = useSelector(state=>state.appointments.reload);

    useEffect(()=>{
        if(!reFetch)
            return;
        setShowModal(false);
    },[reFetch]);

    const handleConfirmation = async ()=>{
        await dispatch(cancelReservation(item.Apointment.id));
        handleClose();
    }
    const handleRelease = ()=>{
        setShowModal(true);
    }
    const handleClose = ( ) =>{
        setShowModal(false);
    }
    return <>
        <Confirmation show={showModal} handleClose={handleClose} title={"Appointment cancellation"} confirm={handleConfirmation}/>
        <Tooltip title={"Clear appointment"} placement={"right"}>
            <CloseCircleOutlined style={{ fontSize: '32px', color: '#08c' }} onClick={handleRelease}/>
        </Tooltip>
    </>
};
export default ReleaseAppointment;
