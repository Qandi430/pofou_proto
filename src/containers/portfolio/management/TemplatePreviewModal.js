import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import Basic from '../../../containers/template/portfolio/Basic';

const TemplatePreviewModal = ({isOpen,toggle}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-fullscreen">
            <ModalHeader >Basic</ModalHeader>
            <ModalBody>
                <Basic/>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>닫기</Button>
            </ModalFooter>
        </Modal>
        
    )
}

export default TemplatePreviewModal;