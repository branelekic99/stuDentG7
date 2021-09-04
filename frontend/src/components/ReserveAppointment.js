import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import CustomModal from "./CustomModal";
import AppointmentReservation from "./AppointmentReservation";
import {Tooltip} from "antd";
import {ScheduleOutlined} from "@ant-design/icons";

const ReserveAppointment = ({item})=>{
    const form_ref = useRef();
    const [showModal,setShowModal] = useState(false);

    const reFetch = useSelector(state=>state.appointments.reload);

    useEffect(()=>{
        if(!reFetch)
            return;
        setShowModal(false);
    },[reFetch]);

    const handleSubmit = (e)=>{
        form_ref.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    };
    const freeAppointment = ()=>{
        setShowModal(true);
    }
    const handleCancel = ()=>{
        setShowModal(false);
    }
    return <>
        <CustomModal show={showModal} handleClose={handleCancel} title={"Make reservation"} submit={handleSubmit}>
            <AppointmentReservation form_ref={form_ref} appointment_id={item.id}/>
        </CustomModal>
        <Tooltip title={"Make reservation"} placement={"right"}>

            <ScheduleOutlined style={{ fontSize: '32px', color: '#08c' }} onClick={freeAppointment}/>
        </Tooltip>
    </>
};
export default ReserveAppointment;