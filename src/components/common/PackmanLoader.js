import React from 'react';
import { Modal } from 'reactstrap';
import { createCommonConsumer } from '../../context/commonContext';
import PackmainLoder from 'react-spinners/PacmanLoader';

const PackmanLoader = ({isOpen,toggle}) => {
    return(
        <Modal id="spinnerModal" isOpen={isOpen} centered>
            <PackmainLoder size="40px" color={"#89c997"}/>
        </Modal>
    )
}

export default createCommonConsumer(PackmanLoader);