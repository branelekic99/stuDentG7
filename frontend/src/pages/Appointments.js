import React,{useEffect,useState,useRef} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Select,Table, Switch ,Tooltip } from "antd";

import api from "../api/api";
import {
    cancelReservation,
    getAppointmentsForCategory,
    getAvailableAppointmentsForCategory,
    getReservedAppointmentsForCategory

} from "../redux-store/actions/appointmens";
import {CloseCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import CustomModal from "../components/CustomModal";
import AppointmentReservation from "../components/AppointmentReservation";
import Confirmation from "../components/Confirmation";

const {Option} = Select;
const { Column } = Table;

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
}
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


const Appointments = () => {

    const dispatch = useDispatch();
    const [categories,setCategories] = useState([]);
    const [selectedApt,setSelectedApt] = useState(0);
    const [reserved,setReserved] = useState(false);

    const appointments = useSelector(state=>state.appointments.appointmentsArray);
    const reFetch = useSelector(state=>state.appointments.reload);
    if(reserved){
        console.log(appointments)
    }
    const fetchCategories = async ()=>{
        return await api.get("/get/categories/");
    };
    const fetchAppointments = async () =>{
        if(reserved){
            await dispatch(getReservedAppointmentsForCategory(selectedApt));
        }else{
            await dispatch(getAvailableAppointmentsForCategory(selectedApt));
        }
    }
    useEffect(async ()=>{
        try{
           const categories = await fetchCategories();
           if(categories.data.length > 0){
                setCategories(categories.data);
                setSelectedApt(categories.data[0].id);
           }
        }catch (err){
            console.log(err);
        }
    },[]);


    useEffect(()=>{
        if(selectedApt === 0)
            return;
        const helpFunction = async ()=>{
            await fetchAppointments();
        }
        helpFunction();
    },[selectedApt,reserved]);

    useEffect(()=>{
        if(!reFetch)
            return;
        const helpFunction = async ()=>{
            await fetchAppointments();
        }
        helpFunction();
    },[reFetch])

    const select_data = categories.map((item)=>{
        return (
            <Option value={item.id} key={item.id}>{item.name}</Option>
        )
    });
    if(selectedApt === 0){
        return "Loading..."
    }
    const handleSelectChange = (value)=>{
        setSelectedApt(value);
    }

    const handleSwitchOnChange = (value)=>{
        setReserved(value)
    }
    return (
        <div>
            Appointments
            <div>
                <div>
                    <label>Choose category</label>
                    <Select
                        showSearch
                        style={{ width: 200,zIndex:5 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        defaultValue={selectedApt}
                        onChange={handleSelectChange}
                    >
                        {select_data}
                    </Select>
                    <div style={{display:"flex"}}>
                        <label>Rezervisani</label>
                        <Switch onChange={handleSwitchOnChange} />
                    </div>
                </div>
                    <div>

                        {reserved?<Table dataSource={appointments}>
                            <Column title="Start time" dataIndex = {["Appointment","startTime"]} key={["Appointment","startTime"]} render={(value)=>{
                                return new Date(value).toLocaleString()
                            }}/>
                            <Column title="Start time" dataIndex={["Appointment","endTime"]} key={["Appointment","startTime"]} render={(value)=>{
                                return new Date(value).toLocaleString()
                            }}/>
                            <Column title="Description" dataIndex="description" key="description"/>
                            <Column title="Action" dataIndex="reserved" key="reserved"
                                    render={(value,obj)=>{
                                        return <ReleaseAppointment item={obj} />;
                                    }} />
                        </Table>:<Table dataSource={appointments}>
                            <Column title="Start time" dataIndex="startTime" key="startTime" render={(value)=>{
                                return new Date(value).toLocaleString()
                            }}/>
                            <Column title="End time" dataIndex="endTime" key="endTime" render={(value)=>{
                                return new Date(value).toLocaleString()
                            }}/>
                            <Column title="Action" dataIndex="reserved" key="reserved"
                                    render={(value,obj)=>{
                                        return <ReserveAppointment item={obj} />;
                                    }} />
                        </Table>}

                    </div>

            </div>

        </div>
    );
};

export default Appointments;
