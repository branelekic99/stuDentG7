import React,{useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {REQUIRED_FIELD} from "../constants/messages";
import {useDispatch} from "react-redux";
import {makeReservation} from "../redux-store/actions/appointmens";

const AppointmentReservation = ({form_ref,appointment_id}) => {
    const dispatch = useDispatch();

    const [description,setDescription] = useState("");
    const [descriptionError,setDescriptionError] = useState("");

    const handleSubmit = ()=>{
        if(!description)
            setDescriptionError(REQUIRED_FIELD);
        const data = {
            "description":description
        }
        dispatch(makeReservation(appointment_id,data));
    }
    const handleChange = e =>{
        setDescription(e.target.value);
        setDescriptionError("");
    }
    return (
     <div>
         <form ref={form_ref} onSubmit={handleSubmit}>
             <div className={"row"}>
                 <div className={"col-12 col-md-6 col-lg-6 col-xl-6 form-group"}>
                     <label className={"bl-select-label"}>Description</label>
                     <textarea onChange={handleChange} className={"form-control"} rows={5} style={{width:500}}/>
                     {descriptionError && <p>{descriptionError}</p>}
                 </div>
             </div>
         </form>
     </div>
    );
};

export default AppointmentReservation;
