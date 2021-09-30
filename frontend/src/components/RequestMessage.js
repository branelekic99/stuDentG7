import React, {useEffect,useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import api from "../api/api";
import {CheckSquareOutlined, SendOutlined} from "@ant-design/icons";
import {notification} from "antd";

const RequestMessage = ({show,handleClose,request}) => {

    const [messages,setMessages] = useState([]);
    const [messageText,setMessageText] = useState("");

    const fetchRequestById = async ()=>{
        try{
            const {id} = request;
            const result = await api.get(`/get/request/${id}`);
            setMessages(result.data.messages);
        }catch (err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(!show)
            return;
        fetchRequestById();
    },[show]);
    const handleTextChange = (e)=>{
        setMessageText(e.target.value);
    }
    const handleSentMessage = ()=>{
        const sentMessage = async()=>{
            try{
                if(!messageText)
                    return;
                const {id} = request;
                const obj = {
                    message:messageText
                }
                const result = await api.post(`/send_message/request/${id}`,obj);
                notification.open({
                    message:"Message",
                    description:"Message has been sent to patient!"
                })
                handleClose();
            }catch (err){
                console.log(err);
            }
        }
        sentMessage();
    }
    return (
        <Modal show={show} onHide={handleClose} backdrop={"static"}>
            <Modal.Header>
                <Modal.Title>Request conversation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"bl-container"}>
                    <div className={"bl-messages overflow-auto"}>
                        {messages.map(item=>{
                           const{adminId,message} = item;
                           return <div className={"bl-message"}>
                               <span className={"bl-message-user"}>{adminId?"Admin":"Patient"}</span>
                               <span className={"bl-message-text"}>{message}</span>
                           </div>
                        })}
                    </div>
                    <div className={"bl-inputbox"}>
                        <textarea className={"form-control"} onChange={handleTextChange}></textarea>
                        <SendOutlined style={{ fontSize: '32px', color: '#08c',marginRight:15}} className={"bl-sentIcon"} onClick={handleSentMessage}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-secondary w-50" onClick={handleClose}>
                    Cose
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RequestMessage;
