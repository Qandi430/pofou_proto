import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Modal,ModalBody,ModalFooter,Button } from 'reactstrap';
import { createPortfolioConsumer } from '../../../../context/portfolioContext';
import Block from '../../../template/portfolio/Block';

const SortBlockModal = ({openSortBlockModal,toggleSortBlockModal,portfolioData,saveSortBlock}) => {

    const [blockList,setBlockList] = useState([]);

    useEffect(() => {
        if(openSortBlockModal) setBlockList(portfolioData.blockList);
        else setBlockList([]);
    },[openSortBlockModal,portfolioData]);

    const sortBlock = newList => {
        setBlockList(newList);
    }

    const handleSaveSort = () => {
        saveSortBlock(blockList);
    }

    return(
        <Modal isOpen={openSortBlockModal} toggle={toggleSortBlockModal} id="sortBlockModal" className="modal-fullscreen">
            <ModalBody>
                <div className="sortBlockHeader">
                    <div className="headerTitle">
                        <h5>블럭 이동</h5>
                        <p>블럭을 드래그하여 위치를 변경하세요</p>
                    </div>
                    <div className="headerButton">
                        <Button color="danger" onClick={toggleSortBlockModal}>취소</Button>
                        <Button color="primary" onClick={handleSaveSort}>저장</Button>
                    </div>
                </div>
                <ReactSortable list={blockList} setList={ newList => sortBlock(newList)} className="portfolio">
                    {
                        blockList.map(
                            block => 
                                <div className="sortItemWrap" key={block.index}>
                                    <Block data={block}/>
                                </div>
                        )
                    }
                </ReactSortable>
            </ModalBody>
        </Modal>
    )
}

export default createPortfolioConsumer(SortBlockModal);