import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader,Button} from 'reactstrap';

const CategorySelectModal = ({isOpen,toggle}) =>{
    const closeBtn = <button onClick={toggle}><FontAwesomeIcon icon={faTimes}/></button>
    return(
        <Modal isOpen={isOpen} toggle={toggle} centered id="categorySelectModal">
            <ModalHeader toggle={toggle} close={closeBtn}>
                나의 작업 분야 설정
            </ModalHeader>
            <ModalBody>
                <p className="notice">작업 분야는 최대 2개까지 선택 가능합니다.</p>
                <ul>
                    <li className="customCheckbox">
                        <input id='category1' type='checkbox' />
                        <label htmlFor='category1'>
                            <span></span>
                            그래픽 디자인
                            <ins><i>그래픽 디자인</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category2' type='checkbox' />
                        <label htmlFor='category2'>
                            <span></span>
                            브랜딩/편집
                            <ins><i>브랜딩/편집</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category3' type='checkbox' />
                        <label htmlFor='category3'>
                            <span></span>
                            영상/모션 그래픽
                            <ins><i>영상/모션 그래픽</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category4' type='checkbox' />
                        <label htmlFor='category4'>
                            <span></span>
                            UI/UX
                            <ins><i>UI/UX</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category5' type='checkbox' />
                        <label htmlFor='category5'>
                            <span></span>
                            일러스트레이션
                            <ins><i>일러스트레이션</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category6' type='checkbox' />
                        <label htmlFor='category6'>
                            <span></span>
                            디지털 아트
                            <ins><i>디지털 아트</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category7' type='checkbox' />
                        <label htmlFor='category7'>
                            <span></span>
                            타이포그래피
                            <ins><i>타이포그래피</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category8' type='checkbox' />
                        <label htmlFor='category8'>
                            <span></span>
                            산업 디자인
                            <ins><i>산업 디자인</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category9' type='checkbox' />
                        <label htmlFor='category9'>
                            <span></span>
                            포토그래피
                            <ins><i>포토그래피</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category10' type='checkbox' />
                        <label htmlFor='category10'>
                            <span></span>
                            파인아트
                            <ins><i>파인아트</i></ins>
                        </label>
                    </li>
                    <li className="customCheckbox">
                        <input id='category11' type='checkbox' />
                        <label htmlFor='category11'>
                            <span></span>
                            공예
                            <ins><i>공예</i></ins>
                        </label>
                    </li>
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} color="danger">취소</Button>
                <Button color="info">확인</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CategorySelectModal;