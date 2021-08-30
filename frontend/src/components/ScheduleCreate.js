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
        <div>
            <form onSubmit={handleSubmit} ref={form_ref}>
                <div>
                    <p>{error_message}</p>
                </div>
            <div>
                <label>Choose category</label>
                <Select
                    showSearch
                    style={{ width: 200,zIndex:5 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={handleSelectChange}
                    getPopupContainer={node => node.parentNode}
                >
                    {select_data}
                </Select>
                <p>{selectError}</p>
            </div>
            <div>
                <label>Pocetak rada</label>
                <Space direction={"vertical"} size={12}>
                    <DatePicker showTime onChange={startDateOnChange}   getPopupContainer={node => node.parentNode}
                    disabledDate={min_date} />
                </Space>
                <p>{startDateError}</p>
            </div>
            <div>
                <label>Kraj rada</label>
                <Space direction={"vertical"} size={12}>
                    <DatePicker showTime onChange={endDateOnChange}   getPopupContainer={node => node.parentNode}
                                disabledDate={min_date} />
                </Space>
                <p>{endDateError}</p>
            </div>
            </form>
        </div>
    );
};

export default ScheduleCreate;
