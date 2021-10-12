import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { createPortfolioConsumer } from '../../../../context/portfolioContext';
import { getResumeByMemberNumber,getResumeDetailByResumeNumber } from '../../../../server/resume/ResumeServer';
import moment from 'moment';


const ResumeSelectModal = ({openResumeSelectModal,toggleResumeSelectModal,loginMember,toggleSpinnerModal,openResumeDetailModal}) => {
    const [resumeList,setResumeList] = useState([]);
    
    useEffect(() => {
        if(openResumeSelectModal){
            setList();
        }
    },[openResumeSelectModal]);

    const setList = async() => {
        const {data : list} = await getResumeByMemberNumber(loginMember.memberNumber);
        console.log(list);
        setResumeList(list.filter(l => l.complete === true));
    }

    const handleResumeDetail = async (resumeNumber) => {
        toggleSpinnerModal(true);
        const {data : resume} = await getResumeDetailByResumeNumber(resumeNumber);
        openResumeDetailModal(resume);
        toggleSpinnerModal(false);
    }
    

    return (
        <Modal isOpen={openResumeSelectModal} toggle={toggleResumeSelectModal} id="resumeSelectModal" size="xl" centered>
            <ModalHeader>연동할 이력서 선택</ModalHeader>
            <ModalBody>
                <div className="resumeList">
                    {
                        resumeList.map(
                            (resume,index) => 
                                <div className="listItem" key={index}>
                                    <div className="itemInfo">
                                        <h6 className="resumeTitle">{resume.title}</h6>
                                        <p className="updateDate">{moment(resume.updateDate).format('YYYY.MM.DD')}</p>    
                                        {
                                            resume.represent &&
                                            <h3 className="represent">대표 이력서</h3>
                                        }
                                    </div>
                                    <div className="itemFooter">
                                        <Button color="primary">이력서 선택</Button>
                                        <Button color="info" style={{color:"#ffffff"}} onClick={() => handleResumeDetail(resume.resumeNumber)}>이력서 확인</Button>
                                    </div>
                                </div>
                        )
                    }
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggleResumeSelectModal}>닫기</Button>
            </ModalFooter>
        </Modal>
    )
}

export default createPortfolioConsumer(ResumeSelectModal); 
