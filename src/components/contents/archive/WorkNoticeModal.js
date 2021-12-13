import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { createArchiveConsumer } from '../../../context/archiveContext'

const WorkNoticeModal = ({openWorkNoticeModal,toggleWorkNoticeModal,currentTab,workList,tempWorkList,changeWorkStatus,deleteWork}) => {
    const [currentWork,setCurrentWork] = useState({
        workNumber : "",
        type : "",
        title : "",
    });
    const [openWorkResultModal,setOpenWorkResultModal] = useState(false);
    const [workResult,setWorkResult] = useState(false);
    useEffect(() => {
        if(openWorkNoticeModal === null){
            if(currentWork.workNumber !== ""){
                setCurrentWork({
                    workNumber : "",
                    type : "",
                    title : "",
                })
            }
        }else if(openWorkNoticeModal.workNumber !== currentWork.workNumber){
            const work = currentTab === "work" ? workList.find(work => work.workNumber === openWorkNoticeModal.workNumber) : tempWorkList.find(temp => temp.workNumber === openWorkNoticeModal.workNumber);
            setCurrentWork({
                workNumber : work.workNumber,
                type : openWorkNoticeModal.type,
                title : work.title
            });
        }
    },[openWorkNoticeModal,currentTab,workList,tempWorkList,currentWork]);
    

    const handleChangeWorkStatus = async () => {
        const changeResult = await changeWorkStatus(currentWork.workNumber,currentWork.type);
        await setWorkResult(changeResult);
        toggleWorkResultModal();
    }

    const handleDeleteWork = async () => {
        const deleteResult = await deleteWork(currentWork.workNumber);
        await setWorkResult(deleteResult);
        toggleWorkResultModal();
    }

    const toggleWorkResultModal = async() => {
        if(openWorkResultModal){
            await setOpenWorkResultModal(false);
            toggleWorkNoticeModal();
        }else{
            setOpenWorkResultModal(true);
        }
    }

    return (
        <Modal isOpen={openWorkNoticeModal !== null} toggle={toggleWorkNoticeModal} centered>
            <ModalHeader style={{fontWeight:"bold",textAlign:"center"}}>
                {
                    currentWork.type === "delete" ? 
                        "콘텐츠 삭제하기"
                        :
                        currentWork.type === "private" || currentWork.type === "public" ?
                            "콘텐츠 상태 변경하기"
                            :
                            ""
                }
            </ModalHeader>
            <ModalBody style={{lineHeight:1.6,textAlign:"center",padding:"30px 20px"}}>
                {
                    currentWork.type === "delete" &&
                        <p><b style={{fontWeight:"bold"}}>'{currentWork.title}'</b>을 정말 삭제하시겠습니까?<br/>삭제된 콘텐츠는 다시 복구하실 수 없습니다.</p>
                        
                }
                {
                    currentWork.type === "private" &&
                        <p>
                            <b style={{fontWeight:"bold"}}>'{currentWork.title}'</b>을 비공개로 설정하시겠습니까?<br />
                            비공개로 전환 시 임시보관함으로 이동하여 보관되며 <br />
                            다른 사람에게 노출이 되지 않습니다.
                        </p>
                }
                {
                    currentWork.type === "public" &&
                        <p>
                            <b style={{fontWeight:"bold"}}>'{currentWork.title}'</b>을 공개로 설정하시겠습니까?<br />
                            공개로 전환 시 피드로 이동하여 보관되며 다른 사람에게 노출됩니다.
                        </p>
                }
            </ModalBody>
            <ModalFooter>
                <Button outline color="secondary" onClick={toggleWorkNoticeModal}>취소</Button>
                {
                    currentWork.type === "delete" ? 
                        <Button outline color="danger" onClick={handleDeleteWork}>삭제하기</Button>
                        :
                        currentWork.type === "private" || currentWork.type === "public"  ?
                            <Button outline color="danger" onClick={handleChangeWorkStatus}>설정하기</Button>
                            :
                            ""
                }
            </ModalFooter>
            <WorkResultModal isOpen={openWorkResultModal} toggle={toggleWorkResultModal} result={workResult} work={currentWork}/>
        </Modal>
    )
}

const WorkResultModal = ({isOpen,toggle,result,work}) => {
    return(
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalBody>
                {
                    work.type === "delete" ?
                        result ? "작업물이 삭제되었습니다." : "작업물 삭제에 실패하였습니다."
                        : result ? "작업 설정을 변경하였습니다." : "작업 설정 변경에 실패하였습니다." 
                }
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle}>닫기</Button>
            </ModalFooter>
        </Modal>
    )
}

export default createArchiveConsumer(WorkNoticeModal); 
