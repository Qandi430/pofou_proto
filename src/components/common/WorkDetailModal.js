import React from 'react';
import { Modal } from 'reactstrap';
import {createCommonConsumer} from '../../context/commonContext';
import WorkDetailContainer from '../../containers/contents/workDetail/WorkDetailContainer';
const WorkDetailModal = ({isOpen,toggle,workDetail,loginMember,getLikeList,toggleSpinnerModal,resetMemberInfo}) => {

    return(
        <Modal isOpen={isOpen} toggle={toggle} centered id="workDetailModal">
            <WorkDetailContainer workDetail={workDetail} loginMember={loginMember} getLikeList={getLikeList} toggleSpinnerModal={toggleSpinnerModal} resetMemberInfo={resetMemberInfo}/>
        </Modal>
    )
}

export default createCommonConsumer(WorkDetailModal);