import React,{useState} from 'react';
import {Form} from "react-bootstrap";
import {REQUIRED_FIELD} from "../constants/messages";
import {useDispatch} from "react-redux";
import {addImage} from "../redux-store/actions/gallery";

const AddImage = ({form_ref}) => {
    const dispatch = useDispatch();

    const [selectedFile,setSelectedfile] = useState(null);
    const [errorMessage,setErrorMessage] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(selectedFile === null)
            setErrorMessage(REQUIRED_FIELD);
        const formData = new FormData();
        formData.append("image",selectedFile);
        dispatch(addImage(formData));
    }
    const handleFileChange = (e)=>{
        setErrorMessage("");
        setSelectedfile(e.target.files[0]);
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} ref={form_ref}>
                <Form.Group className={"mb-3"} controlId={"formBasicEmail"}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type={"file"} onChange={handleFileChange}/>
                    {errorMessage&&(<p>{errorMessage}</p>)}
                </Form.Group>
            </Form>
        </div>
    );
};

export default AddImage;
