import React from 'react';
import {Button, Modal} from "react-bootstrap";

const Confirmation = ({show,handleClose,confirm,title=""}) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop={"static"}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Please confirm your action</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={confirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Confirmation;
