import React from 'react';
import { Form, FormGroup } from 'reactstrap';
import { faApple, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccountForm = () => {
    return (
        <Form className="accountForm">
            <h3 className="contentsTitle">내정보 관리</h3>
            <div className="formItem">
                <h5 className="formTitle">로그인정보</h5>
                <FormGroup>
                    <p>dltmdwo430@gmail.com</p>
                    <button>관리하기</button>
                </FormGroup>
                <FormGroup>
                    <p>암호 및 보안</p>
                    <button>관리하기</button>
                </FormGroup>
            </div>
            <div className="formItem">
                <h5 className="formTitle">소설 계정 관리</h5>
                <ul className="snsList">
                    <li><button className="btnNaver">N</button></li>
                    <li><button className="btnKakao"><FontAwesomeIcon icon={faComment}/></button></li>
                    <li><button className="btnFacebook"><FontAwesomeIcon icon={faFacebookF}/></button></li>
                    <li><button className="btnApple"><FontAwesomeIcon icon={faApple}/></button></li>
                </ul>
            </div>
        </Form>
    )
}

export default AccountForm;