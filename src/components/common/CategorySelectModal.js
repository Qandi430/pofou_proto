import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader,Button} from 'reactstrap';

const CategorySelectModal = ({isOpen,toggle,keywordList,form,changeForm}) =>{
    const closeBtn = <button onClick={toggle}><FontAwesomeIcon icon={faTimes}/></button>
    return(
        <Modal isOpen={isOpen} toggle={toggle} centered id="categorySelectModal">
            <ModalHeader toggle={toggle} close={closeBtn}>
                나의 작업 분야 설정
            </ModalHeader>
            <ModalBody>
                <p className="notice">작업 분야는 최대 2개까지 선택 가능합니다.</p>
                <ul>
                    {
                        keywordList.map(
                            (keyword,index) => (
                                <li className="customCheckbox" key={index}>
                                    <input id={`category${index}`} type='checkbox' value={keyword.code} checked={form.keyword1 === keyword.code || form.keyword2 === keyword.code } onChange={e => changeForm("keyword",e.target.value)} />
                                    <label htmlFor={`category${index}`}>
                                        <span></span>
                                        {keyword.kor}
                                        <ins><i>{keyword.kor}</i></ins>
                                    </label>
                                </li>
                            )
                        )
                    }
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} color="danger">닫기</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CategorySelectModal;