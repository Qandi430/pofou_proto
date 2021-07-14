import React from 'react';
import { faFileDownload, faPhoneAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BasicContactList = ({grid}) => {
    return(
        <div className={`contact basicContactList grid${grid}`}>
            <ul>
                <li>
                    <div className="icon">
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </div>
                    <a href="mailto:dltmdwo430@gmail.com" rel="noreferrer" target="_blank">dltmdwo430@gmail.com</a>
                </li>
                <li>
                    <div className="icon">
                        <FontAwesomeIcon icon={faPhoneAlt}/>
                    </div>
                    <a href="tel:010-6476-3871">010-6476-3871</a>
                </li>
                <li>
                    <div className="icon">
                        <FontAwesomeIcon icon={faFileDownload}/>
                    </div>
                    이력서 다운로드
                </li>
            </ul>
        </div>
    )
}

export default BasicContactList;