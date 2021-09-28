import React from 'react'
import { Modal } from 'reactstrap'
import DaumPostCode from 'react-daum-postcode';

const DaumPostModal = ({openDuamPostModal,toggleDaumPostModal,completeFunction}) => {
    return (
        <Modal isOpen={openDuamPostModal} toggle={toggleDaumPostModal} centered>
            <DaumPostCode
                onComplete={completeFunction}
            />
        </Modal>
    )
}

export default DaumPostModal
