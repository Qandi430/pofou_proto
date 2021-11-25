import React from 'react'
import {Modal,ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { createCommonConsumer } from '../../context/commonContext';

const LoginNoticeModal = ({openLoginNoticeModal,toggleLoginNoticeModal}) => {
    return (
        <Modal isOpen={openLoginNoticeModal} toggle={toggleLoginNoticeModal} id="loginNoticeModal" centered>
            <ModalBody>
                <h2>잠깐,<br />로그인이 필요해요 !</h2>
                <h6>
                    쉽고 빠르게 포트폴리오를 <br />
                    만들어보고 다른 사람들의 <br />
                    포트포리오를 한눈에.
                </h6>
                <Link className="btnLogin" to="/auth/login">로그인</Link>
                <p>아직 회원이 아니라면? <Link className="btnRegister" to="/auth/register">회원가입</Link></p>
            </ModalBody>
        </Modal>
    )
}

export default createCommonConsumer(LoginNoticeModal); 
