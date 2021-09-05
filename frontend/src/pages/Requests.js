import React,{useEffect,useState} from 'react';
import api from "../api/api";
import {CheckSquareOutlined,CloseSquareOutlined,MessageOutlined} from "@ant-design/icons";
import Confirmation from "../components/Confirmation";
import {Tooltip,Table } from "antd";

const { Column } = Table;

const ApproveRequest = ({item,reload})=>{

    const [showModal,setShowModal] = useState(false);

    const handleRequestApprove = ()=>{
        setShowModal(true);
    }
    const handleClose = ()=>{
        setShowModal(false);
    }
    const confirm = async ()=>{
        try{
            const {id} = item;
            await api.put(`/approve/request/${id}`);
            reload();
            handleClose();
        }catch (err){
            console.log(err);
        }
    }
    return(
        <>
            <Tooltip title={"Make reservation"} placement={"right"}>
              <CheckSquareOutlined style={{ fontSize: '32px', color: '#08c',marginRight:15}} onClick={handleRequestApprove}/>
            </Tooltip>
               <Confirmation show={showModal} handleClose={handleClose} confirm={confirm} title={"Request confirmation"}/>

        </>
    )
};

const DeclineRequest = ({item,reload})=>{
    const [showModal,setShowModal] = useState(false);

    const handleDecline = ()=>{
        setShowModal(true);
    }
    const handleClose = ()=>{
        setShowModal(false);
    }
    const confirm = async ()=>{
        try{
            const {id} = item;
            await api.delete(`/declain/request/${id}`);
            reload();
            handleClose();
        }catch (err){
            console.log(err);
        }
    }
    return(
        <>

            <Tooltip title={"Decline request"} placement={"right"}>
                <CloseSquareOutlined style={{ fontSize: '32px', color: '#08c',marginRight:15 }} onClick={handleDecline}/>
            </Tooltip>
            <Confirmation show={showModal} handleClose={handleClose} confirm={confirm} title={"Decline request"}/>
        </>
    )
}

const SentMessage = (request)=>{
    return (<MessageOutlined style={{ fontSize: '32px', color: '#08c' }}/>)
}
const Requests = () => {
    const [requestData,setRequestData] = useState([]);

    const fetchRequests = async ()=>{
        try{
            const result = await api.get("/admin/get_unapproved_requests");
            setRequestData(result.data)
        }catch (err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[]);

    return (
        <div className={"container-fluid mt-3"}>
            <Table dataSource={requestData}>
                <Column title="Start time" dataIndex = {["Apointment","startTime"]} key={["Apointment","startTime"]} render={(value)=>{
                    console.log("ovo je",value)
                    return new Date(value).toLocaleString()
                }}/>
                <Column title="End time" dataIndex={["Apointment","endTime"]} key={["Apointment","startTime"]} render={(value)=>{
                    return new Date(value).toLocaleString()
                }}/>
                <Column title="Description" dataIndex={"description"} key={"id"} />
                {/*<Column title="Category" dataIndex="categoryId" key="categoryId"*/}
                {/*        render={(value)=>{*/}
                {/*            return categories.find(category=>category.id === value)?.name*/}
                {/*        }} />*/}
                <Column title={"Actions"} render={(value,object)=>{
                    return <>
                        <ApproveRequest item={object} reload={fetchRequests}/>
                        <DeclineRequest item={object} reload={fetchRequests}/>
                        <SentMessage item={object} />
                    </>
                }}
               />
            </Table>
        </div>
    );
};

export default Requests;
