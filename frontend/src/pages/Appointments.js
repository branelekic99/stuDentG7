import React,{useEffect,useState,useRef} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Select,Table, Switch ,Tooltip } from "antd";

import api from "../api/api";
import {
    getAvailableAppointmentsForCategory,
    getReservedAppointmentsForCategory

} from "../redux-store/actions/appointmens";
import ReserveAppointment from "../components/ReserveAppointment";
import ReleaseAppointment from "../components/ReleaseAppointment";

const {Option} = Select;
const { Column } = Table;

const Appointments = () => {

    const dispatch = useDispatch();
    const [categories,setCategories] = useState([]);
    const [selectedApt,setSelectedApt] = useState(0);
    const [reserved,setReserved] = useState(false);

    const appointments = useSelector(state=>state.appointments.appointmentsArray);
    const reFetch = useSelector(state=>state.appointments.reload);

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
        <div className={"container-fluid"}>
            <div className={"bl-appointments-header"}>

                <div className={"bl-appointments-select"}>
                    <label className={"bl-select-label"}>Choose category</label>
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
                </div>

                <div className={"bl-radiobutton"}>
                    <label className={"bl-select-label"}>Reserved</label>
                    <Switch onChange={handleSwitchOnChange} />
                </div>
            </div>



                        {reserved?<Table dataSource={appointments}>
                            <Column title="Start time" dataIndex = {["Apointment","startTime"]} key={["Apointment","startTime"]} render={(value)=>{
                                return new Date(value).toLocaleString()
                            }}/>
                            <Column title="Start time" dataIndex={["Apointment","endTime"]} key={["Apointment","startTime"]} render={(value)=>{
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
    );
};

export default Appointments;
