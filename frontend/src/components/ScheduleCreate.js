import React,{useState} from 'react';
import { Select,DatePicker,Space } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {clearScheduleError, createSchedule,} from "../redux-store/actions/schedule";

import {REQUIRED_FIELD} from "../constants/messages";

const {Option} = Select;

const ScheduleCreate = ({form_ref,categories}) => {
    const dispatch = useDispatch();

    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [selectedItem,setSelectedItem] = useState("");

    const [selectError,setSelectError] = useState("");
    const [startDateError,setStartDateError] = useState("");
    const [endDateError,setEndDateError] = useState("");

    const error_message = useSelector(state=>state.schedule.error_message);


    const startDateOnChange =(value,dateString)=>{
        setStartDate(dateString);
        setStartDateError("")
        if(error_message){
            dispatch(clearScheduleError());
        }
    };
    const endDateOnChange =(value,dateString)=>{
        setEndDate(dateString);
        setEndDateError("")
        if(error_message){
            dispatch(clearScheduleError());
        }
    }
    const handleSubmit =e=>{
        e.preventDefault();
        let control = false;
        if(!selectedItem){
            setSelectError(REQUIRED_FIELD);
            control = true;
        }
        if(!startDate){
            setStartDateError(REQUIRED_FIELD);
            control = true;
        };
        if(!endDate){
            setEndDateError(REQUIRED_FIELD);
            control = true;
        }
        if(!control){
            let data = {
                categoryId:selectedItem,
                startTime:new Date(startDate).toUTCString(),
                endTime:new Date(endDate).toUTCString()
            }
            dispatch(createSchedule(data));
        }
    };
    const handleSelectChange = value=>{
        setSelectedItem(value)
        setSelectError("")
    };
    const select_data = categories.map(item=>{
        return (
            <Option value={item.id} key={item.id}>{item.name}</Option>
        )
    });
    const min_date = current =>{
        return current && current < new Date();
    }
    return (

            <form onSubmit={handleSubmit} ref={form_ref}>
                <span>{error_message}</span>
                <div className={"bl-schedule-container"}>
                    <div className={"bl-box"}>
                        <label style={{fontSize:18}}>Choose category</label>
                        <Select
                            showSearch
                            style={{ width: 500,zIndex:5 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={handleSelectChange}
                            getPopupContainer={node => node.parentNode}
                            size={"large"}
                        >
                            {select_data}
                        </Select>
                        <span>{selectError}</span>
                    </div>

                    <div className={"bl-box"}>
                        <label style={{fontSize:18}}>Start time</label>
                        <Space direction={"vertical"} size={12}>
                            <DatePicker showTime onChange={startDateOnChange}   getPopupContainer={node => node.parentNode}
                                        disabledDate={min_date}    size={"large"}
                                        style={{width:"500px"}}/>
                        </Space>
                        <span>{startDateError}</span>
                    </div>

                    <div className={"bl-box"}>
                        <label style={{fontSize:18}}>End time</label>
                        <Space direction={"vertical"} size={12}>
                            <DatePicker showTime onChange={endDateOnChange}   getPopupContainer={node => node.parentNode}
                                        disabledDate={min_date}    size={"large"}
                                        style={{width:"500px"}}/>
                        </Space>
                        <p>{endDateError}</p>
                    </div>
                </div>
            </form>
    );
};

export default ScheduleCreate;
