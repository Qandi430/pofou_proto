import { faFacebookF, faInstagram, faPinterestP, faTumblr, faTwitter, faVimeo } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const WebAddressModal = ({isOpen,toggle}) => {
    return(
        <Modal isOpen={isOpen} toggle={toggle} centered id="webAddressModal">
            <ModalHeader>웹사이트 설정</ModalHeader>
            <ModalBody>
                <p className="notice">나의 홈페이지 주소 또는 SNS아이디를 입력해 주세요.</p>
                <ul>
                    <li className="hompage">
                        <FontAwesomeIcon icon={faHome}/>
                        <Input type="text" id="webAddress"/>
                    </li>
                    <li className="facebook">
                        <FontAwesomeIcon icon={faFacebookF}/>
                        <Label for="facebookAddress">facebook.com/</Label>
                        <Input type="text" id="facebookAddress"/>
                    </li>
                    <li className="twitter">
                        <FontAwesomeIcon icon={faTwitter}/>
                        <Label for="twitterAddress">twitter.com/</Label>
                        <Input type="text" id="twitterAddress"/>
                    </li>
                    <li className="pinterest">
                        <FontAwesomeIcon icon={faPinterestP}/>
                        <Label for="pinterestAddress">pinterst.com/</Label>
                        <Input type="text" id="pinterestAddress"/>
                    </li>
                    <li className="tumblr">
                        <FontAwesomeIcon icon={faTumblr}/>
                        <Input type="text" id="tumblrAddress"/>
                        <Label for="tumblrAddress">.tumblr.com</Label>
                    </li>
                    <li className="vimeo">
                        <FontAwesomeIcon icon={faVimeo}/>
                        <Label for="vimeoAddress">vimeo.com/</Label>
                        <Input type="text" id="vimeoAddress"/>
                    </li>
                    <li className="instagram">
                        <FontAwesomeIcon icon={faInstagram}/>
                        <Label for="instagramAddress">instagram.com/</Label>
                        <Input type="text" id="instagramAddress"/>
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

export default WebAddressModal;