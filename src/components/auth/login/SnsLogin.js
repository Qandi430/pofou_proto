import { faApple, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const SnsLogin = () => {
    return (
        <div className="snsLogin">
            <h6>SNS 계정으로 간편하게 시작하기</h6>
            <ul className="snsList">
                <li><button className="btnNaver">N</button></li>
                <li><button className="btnKakao"><FontAwesomeIcon icon={faComment}/></button></li>
                <li><button className="btnFacebook"><FontAwesomeIcon icon={faFacebookF}/></button></li>
                <li><button className="btnApple"><FontAwesomeIcon icon={faApple}/></button></li>
            </ul>
        </div>
    )
}

export default SnsLogin;