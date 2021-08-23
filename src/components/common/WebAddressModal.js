import { faFacebookF, faInstagram, faPinterestP, faTumblr, faTwitter, faVimeo, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const WebAddressModal = ({isOpen,toggle,form,changeSns}) => {

    const [webAddressForm,setWetAddressForm] = useState({
        homepage : "",
        facebook : "",
        twitter : "",
        instagram : "",
        tumblr : "",
        vimeo : "",
        youtube : "",
        pinterest : "",
    });

    useEffect(() => {
        if(isOpen){
            if(webAddressForm.memberNumber !== form.memberNumber){
                setWetAddressForm(
                    JSON.parse(JSON.stringify(form))
                )
            }
        }
        
    },[isOpen,form,webAddressForm]);

    const changeForm = (name,value) => {
        setWetAddressForm({
            ...webAddressForm,
            [name] : value
        })
    }

    const handleConfirm = () => {
        changeSns(webAddressForm);
        toggle();
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} centered id="webAddressModal">
            <ModalHeader>웹사이트 설정</ModalHeader>
            <ModalBody>
                <p className="notice">나의 홈페이지 주소 또는 SNS아이디를 입력해 주세요.</p>
                <ul>
                    <li className="hompage">
                        <FontAwesomeIcon icon={faHome}/>
                        <Input type="text" id="homepage" value={webAddressForm.homepage} onChange={ e => changeForm("homepage",e.target.value)}/>
                    </li>
                    <li className="facebook">
                        <FontAwesomeIcon icon={faFacebookF}/>
                        <Label for="facebookAddress">facebook.com/</Label>
                        <Input type="text" id="facebookAddress" value={webAddressForm.facebook} onChange={ e => changeForm("facebook",e.target.value)}/>
                    </li>
                    <li className="twitter">
                        <FontAwesomeIcon icon={faTwitter}/>
                        <Label for="twitterAddress">twitter.com/</Label>
                        <Input type="text" id="twitterAddress" value={webAddressForm.twitter} onChange={ e => changeForm("twitter",e.target.value)}/>
                    </li>
                    <li className="pinterest">
                        <FontAwesomeIcon icon={faPinterestP}/>
                        <Label for="pinterestAddress">pinterst.com/</Label>
                        <Input type="text" id="pinterestAddress" value={webAddressForm.pinterest} onChange={ e => changeForm("pinterest",e.target.value)}/>
                    </li>
                    <li className="tumblr">
                        <FontAwesomeIcon icon={faTumblr}/>
                        <Input type="text" id="tumblrAddress" value={webAddressForm.tumblr} onChange={ e => changeForm("tumblr",e.target.value)}/>
                        <Label for="tumblrAddress">.tumblr.com</Label>
                    </li>
                    <li className="vimeo">
                        <FontAwesomeIcon icon={faVimeo}/>
                        <Label for="vimeoAddress">vimeo.com/</Label>
                        <Input type="text" id="vimeoAddress" value={webAddressForm.vimeo} onChange={ e => changeForm("vimeo",e.target.value)}/>
                    </li>
                    <li className="youtube">
                        <FontAwesomeIcon icon={faYoutube}/>
                        <Label for="youtubeAddress">youtube.com/</Label>
                        <Input type="text" id="youtubeAddress" value={webAddressForm.youtube} onChange={ e => changeForm("youtube",e.target.value)}/>
                    </li>
                    <li className="instagram">
                        <FontAwesomeIcon icon={faInstagram}/>
                        <Label for="instagramAddress">instagram.com/</Label>
                        <Input type="text" id="instagramAddress" value={webAddressForm.instagram} onChange={ e => changeForm("instagram",e.target.value)}/>
                    </li>
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} color="danger">취소</Button>
                <Button color="info" onClick={handleConfirm}>확인</Button>
            </ModalFooter>
        </Modal>
    )
}

export default WebAddressModal;