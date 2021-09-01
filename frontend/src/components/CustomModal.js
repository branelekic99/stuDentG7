import React,{useState} from 'react';
import {Modal,Button} from "react-bootstrap";



const CustomModal = ({show,handleClose,title,submit,children}) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop={"static"} size="lg">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={submit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
