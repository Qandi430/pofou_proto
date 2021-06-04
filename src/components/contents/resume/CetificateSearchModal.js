import React from 'react';
import { Modal, ModalHeader,ModalBody, FormGroup, InputGroup, InputGroupAddon,Button, Input } from 'reactstrap';

const CertificateSearchModal = ({isOpen,toggle,index,changteCertificateData}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered id="certificateSearchModal">
            <ModalHeader>
                자격/면허 검색
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <InputGroup>
                        
                        <Input type="text"/>
                        <InputGroupAddon><Button>검색</Button></InputGroupAddon>
                    </InputGroup>   
                </FormGroup>
                <ul className="list">

                </ul>
            </ModalBody>
        </Modal>
    )
}

export default CertificateSearchModal;