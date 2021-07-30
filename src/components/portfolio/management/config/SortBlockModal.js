import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Modal,ModalBody,ModalFooter,Button } from 'reactstrap';
import Block from '../../../template/portfolio/Block';

const SortBlockModal = ({isOpen,toggle,data,saveSortBlock}) => {

    const [blockList,setBlockList] = useState([]);

    useEffect(() => {
        if(isOpen) setBlockList(data.blockList);
        else setBlockList([]);
    },[isOpen,data]);

    const sortBlock = newList => {
        setBlockList(newList);
    }

    const handleSaveSort = () => {
        saveSortBlock(blockList);
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} id="sortBlockModal" className="modal-fullscreen">
            <ModalBody>
                <div className="sortBlockHeader">
                    <div className="headerTitle">
                        <h5>블럭 이동</h5>
                        <p>블럭을 드래그하여 위치를 변경하세요</p>
                    </div>
                    <div className="headerButton">
                        <Button color="danger" onClick={toggle}>취소</Button>
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

export default SortBlockModal;