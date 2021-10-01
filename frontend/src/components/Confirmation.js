import React from 'react';
import {Button, Modal} from "react-bootstrap";

const Confirmation = ({show,handleClose,confirm,title=""}) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop={"static"}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please confirm your action!</h5>
            </Modal.Body>
            <Modal.Footer>
                <div className={"bl-confirmation-footer"}>
                <Button variant="btn btn-secondary bl-btn" onClick={handleClose}>
                    No
                </Button>
                <Button variant="btn btn-primary bl-btn" onClick={confirm}>
                    Yes
                </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default Confirmation;
