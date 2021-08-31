import React,{useState} from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react-is';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { createCommonConsumer } from '../../context/commonContext';

const ResultModal = ({result,closedResultModal,history,loginMember}) => {
    const [open,setOpen] = useState(false);
    const [type,setType] = useState("");
    useEffect(() => {
        if(result){
            setOpen(true);
            setType(result);
        }else{
            setOpen(false);
            setType("");
        }
    },[result])

    const toggle = () => {
        setOpen(!open);
        closedResultModal();
    }
    const moveToArchive = () => {
        history.push(`/archive/${loginMember.url}`)
    }
    return (
        <Modal isOpen={open} toggle={toggle} centered size="md">
            <ModalHeader style={{fontWeight:"bold"}}>확인</ModalHeader>
            <ModalBody style={{lineHeight:"2"}}>
                {
                    type === "success" &&
                    <Fragment>
                        업로드가 완료되었습니다. <br />
                        저장소로 이동하시겠습니까?
                    </Fragment>
                }
                {
                    type === "fail" &&
                    <Fragment>
                        업로드에 실패하였습니다. <br/>해당 오류가 지속적으로 발생시에 관리자에 문의하여 주십시오.
                    </Fragment>
                }
            </ModalBody>
            <ModalFooter>
                {
                    type === "success" &&
                    <Fragment>
                        <Button color="danger" onClick={toggle}>취소</Button>
                        <Button color="info" onClick={moveToArchive}>확인</Button>
                    </Fragment>
                }
                {
                    type === "fail" &&
                    <Button color="danger">닫기</Button>
                }
            </ModalFooter>
        </Modal>
    )
}

export default createCommonConsumer(ResultModal);