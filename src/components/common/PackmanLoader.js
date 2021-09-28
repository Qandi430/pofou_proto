import React from 'react';
import { Modal } from 'reactstrap';
import { createCommonConsumer } from '../../context/commonContext';
import PackmainLoder from 'react-spinners/PacmanLoader';

const PackmanLoader = ({isOpen,toggle}) => {
    return(
        <Modal id="spinnerModal" isOpen={isOpen} centered>
            <PackmainLoder size="50px" color={"#f85272"}/>
        </Modal>
    )
}

export default createCommonConsumer(PackmanLoader);