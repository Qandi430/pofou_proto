import React,{useState,useEffect, Fragment} from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import BasicResume from '../../containers/template/resume/basic/BasicResume'
import "../../resources/scss/template/resume/resumeTemplate.scss";

const ResumeDetailModal = ({resume,closeModal,type}) => {
    
    const [open,setOpen] = useState(false);

    useEffect(() => {
        if(resume !== null){
            setOpen(true);
        }else{
            setOpen(false);
        }
    }, [resume]);

    return (
        <Modal isOpen={open} toggle={closeModal} id="resumeDetailModal">
            {
                resume !== null &&
                <Fragment>
                    <ModalBody>
                        {
                            (type === undefined || type === "basic") &&
                                <BasicResume resume={resume}/>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>닫기</Button>
                    </ModalFooter>
                </Fragment>
            }
        </Modal>
    )
}

export default ResumeDetailModal
