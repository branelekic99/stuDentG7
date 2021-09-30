import React,{useState,useRef,useEffect} from 'react';
import {Tooltip,Select,Table } from "antd";
import {useSelector,useDispatch} from "react-redux";

import {PlusCircleOutlined,DeleteOutlined } from '@ant-design/icons';
import CustomModal from "../components/CustomModal";
import ScheduleCreate from "../components/ScheduleCreate";
import CustomLoader from "../components/CustomLoader";
import Confirmation from "../components/Confirmation";
import api from "../api/api";
import {deleteSchedule, getSchedulesByCategory} from "../redux-store/actions/schedule";

const {Option} = Select;
const { Column } = Table;

const Schedule = () => {
    const form_ref = useRef();
    const dispatch = useDispatch();
    

    const schedules = useSelector(state=>state.schedule.schedules);
    console.log(schedules)
    const [categories,setCategories] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState(0);

    // const [mode,setMode] = useState("top");
    const [showModal,setShowModal] = useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [deleteItem,setDeleteItem] = useState(null);

    const re_fetch = useSelector(state=>state.schedule.reload);


    const handleClose = ()=>{
        setShowModal(false)
    }
    const handleCreateSchedule = ()=>{
        setShowModal(true);
    }
    const handleSubmit = (e)=>{
        form_ref.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    };
    const fetchCategories = async ()=>{
        const result =  await api.get("/get/categories/");
        return result;
    }
    useEffect(()=>{
        try{
            const helpFunction = async ()=>{
                const categories = await fetchCategories();
                if(categories.data.length > 0){
                    setCategories(categories.data);
                    setSelectedCategory(categories.data[0].id);
                }
            }
            helpFunction();
        }catch (err){
            console.log(err);
        }
    },[]);

    useEffect(()=>{
        if(selectedCategory === 0)
            return;
        dispatch(getSchedulesByCategory(selectedCategory));
        setShowModal(false);
    },[selectedCategory,re_fetch]);

    const selectData = categories.map((item)=>{
        return (
            <Option value={item.id} key={item.id}>{item.name}</Option>
        )
    });
    if(selectedCategory === 0){
        return <CustomLoader />
    }
   const handleSelectChange = (value)=>{
        setSelectedCategory(value);
   }
    const handleDelete = async ()=>{
        if(deleteItem !== null){
           await dispatch(deleteSchedule(deleteItem.id));
        }
        handleDeleteModalClose();
    }
    const handleDeleteModalShow = item=>{
        setDeleteItem(item);
        setShowDeleteModal(true);
    };
    const handleDeleteModalClose = ()=>{
        setShowDeleteModal(false);
        setDeleteItem(null);
    }
    return (
        <div className={"container-fluid"}>
            <div className={"row pt-3 pb-2 sv-border-bottom"}>
                <div className={"col-12 col-md-12 col-lg-3 col-xl-3 bl-schedule"}>
                    <button className={"btn btn-primary w-100"} onClick={handleCreateSchedule}>Create schedule</button>
                </div>
            </div>


            <CustomModal show={showModal} handleClose={handleClose} title={"Create Schedule"} submit={handleSubmit}>
                <ScheduleCreate form_ref={form_ref} categories={categories}/>
            </CustomModal>

            <div>
                <div className={"bl-schedule-select"}>
                    <label className={"bl-select-label"}>Choose category</label>
                    <Select
                        showSearch
                        style={{ width: 200,zIndex:5 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        defaultValue={selectedCategory}
                        onChange={handleSelectChange}
                    >
                        {selectData}
                    </Select>
                </div>
                <Table dataSource={schedules}>
                    <Column title="Start time" dataIndex="startTime" key="startTime" render={(value)=>{
                        return new Date(value).toLocaleString()
                    }}/>
                    <Column title="End time" dataIndex="endTime" key="endTime" render={(value)=>{
                        return new Date(value).toLocaleString()
                    }}/>
                    <Column title="Category" dataIndex="categoryId" key="categoryId"
                            render={(value)=>{
                                return categories.find(category=>category.id === value)?.name
                            }} />
                    <Column title={"Actions"} render={(value,object)=><Tooltip title={"Delete"} placement={"top"}>
                        <DeleteOutlined key="delete" onClick={handleDeleteModalShow.bind(this,object)} style={{ fontSize: '32px', color: '#08c',marginRight:15}} />
                    </Tooltip>}/>
                </Table>
            </div>

            <Confirmation show={showDeleteModal} handleClose={handleDeleteModalClose} confirm={handleDelete}/>
        </div>
    );
};

export default Schedule;
