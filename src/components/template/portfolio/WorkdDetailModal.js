import { Modal, ModalBody } from 'reactstrap';
import React from 'react';

const WorkDetailModal = ({isOpen,toggle,item}) => {
    return(
        <Modal isOpen={isOpen} toggle={toggle} centered size="xl" id="workDetailModal" >
            <ModalBody>
                <div className="detailHeader">
                    <h3 className="galleryTitle">{item.title}</h3>
                    <div className="galleryInfo">
                        <span className="regDate">{item.registrationDate}</span>
                        <span className="category">
                            <ul>
                                {
                                    item.categoryList.map(
                                        (category,index) =>
                                            <li key={index}>{category}</li>
                                    )
                                }
                            </ul>
                        </span>
                    </div>
                </div>
                <div className="detailBody">
                    <div className="detailContent">
                        {
                            item.contentList.map(
                                (content,index) =>
                                    <div className="contentWrap" key={index} dangerouslySetInnerHTML={ {__html: content.content} }/>
                            )
                        }
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default WorkDetailModal;