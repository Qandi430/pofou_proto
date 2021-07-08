import { Button, Modal, ModalBody, ModalFooter,Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';

const PrivacyConfigModal = ({isOpen,toggle,data,changePrivacy}) => {
    const [privacyForm,setPrivacyForm] = useState({
        displayName : true,
        displayBirthDate : true,
        displayGender : true,
        displayPhone : true,
        displayMobile : true,
        displayEmail : true,
        displayAddress : true,
        info : {
            name : "이승재",
            birthYear : "1990",
            birthMonth : "04",
            birthDay : "30",
            gender : "M",
            phone : "",
            mobile : "01064763871",
            email : "dltmdwo430@gmail.com",
            sns : "",
            address : "",
        }
    });

    useEffect(() => {
        setPrivacyForm(data);
    },[isOpen,data]);

    const togglePrivacyInfo = (e) => {
        console.log(e.target.name)
        setPrivacyForm({
            ...privacyForm,
            [e.target.name] : !privacyForm[e.target.name]
        })
    }

    const savePrivacy = () => {
        changePrivacy(privacyForm);
        toggle();
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} centered size="sm" id="privacyConfigModal">
            <ModalBody>
                <Table>
                    <thead>
                        <tr>
                            <th>항목</th>
                            <th>공개여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>
                                <input className="tgl tgl-light" id="displayName" type="checkbox" checked={privacyForm.displayName} name="displayName" onChange={ e => togglePrivacyInfo(e)}/>
                                <label className="tgl-btn" htmlFor="displayName"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td>
                                <input className="tgl tgl-light" id="displayBirthDate" type="checkbox" checked={privacyForm.displayBirthDate} name="displayBirthDate" onChange={ e => togglePrivacyInfo(e)}/>
                                <label className="tgl-btn" htmlFor="displayBirthDate"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>성별</td>
                            <td>
                                <input className="tgl tgl-light" id="displayGender" type="checkbox" checked={privacyForm.displayGender} name="displayGender" onChange={ e => togglePrivacyInfo(e)}/>
                                <label className="tgl-btn" htmlFor="displayGender"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td>
                                <input className="tgl tgl-light" id="displayPhone" type="checkbox" checked={privacyForm.displayPhone} name="displayPhone" onChange={ e => togglePrivacyInfo(e)}/>
                                <label className="tgl-btn" htmlFor="displayPhone"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>휴대전화번호</td>
                            <td>
                                <input className="tgl tgl-light" id="displayMobile" type="checkbox" checked={privacyForm.displayMobile} name="displayMobile" onChange={ e => togglePrivacyInfo(e)}/>
                                <label className="tgl-btn" htmlFor="displayMobile"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                                <input className="tgl tgl-light" id="displayEmail" type="checkbox" checked={privacyForm.displayEmail} name="displayEmail" onChange={ e => togglePrivacyInfo(e)}/>
                                <label className="tgl-btn" htmlFor="displayEmail"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>
                                <input className="tgl tgl-light" id="displayAddress" type="checkbox" checked={privacyForm.displayAddress} name="displayAddress" onChange={ e => togglePrivacyInfo(e)}/>
                                <label className="tgl-btn" htmlFor="displayAddress"></label>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button onClick={savePrivacy}>저장</Button>
                <Button onClick={toggle}>취소</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PrivacyConfigModal;