import React,{useEffect,useState} from 'react';
import api from "../api/api";
import {CheckSquareOutlined,CloseSquareOutlined,MessageOutlined} from "@ant-design/icons";
import {Tooltip,Table } from "antd";

const { Column } = Table;

const ApproveRequest = (request)=>{
    return(
        <CheckSquareOutlined style={{ fontSize: '32px', color: '#08c' }} />
    )
};
const DeclineRequest = (request)=>{
    return(
        <CloseSquareOutlined style={{ fontSize: '32px', color: '#08c' }} />
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
            console.log(result.data)
        }catch (err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[]);
    
    return (
        <div className={"container-fluid"}>
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
                <Column title={"Actions"} render={(value,object)=><Tooltip title={"Delete"} placement={"top"}>
                    <ApproveRequest item={object} />
                    <DeclineRequest item={object} />
                    <SentMessage item={object} />
                </Tooltip>}/>
            </Table>
        </div>
    );
};

export default Requests;
