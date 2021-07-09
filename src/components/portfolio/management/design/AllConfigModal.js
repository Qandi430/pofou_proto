import React, { useEffect, useState } from 'react';
import {FormGroup, Modal, ModalBody, ModalFooter, Label,Button,Dropdown,Col, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { ChromePicker } from 'react-color';
import { convertFontName } from '../../../common/CommonScript';


const AllConfigModal = ({isOpen,toggle,data,changeConfig}) => {

    const [openColorPicker,setOpenColorPicker] = useState(false);
    const [openFontFamily,setOpenFontFamily] = useState(false);
    const [configForm,setConfigForm] = useState({
        backgroundColor : "#ebebeb",
        fontFamily : "Noto Sans KR",
    });
    
    useEffect(() => {
        setConfigForm(data);
    },[isOpen,data]);

    const toggleColorPicker = () => {
        setOpenColorPicker(!openColorPicker);
    }
    const changeConfigForm = (name,value) => {
        setConfigForm({
            ...configForm,
            [name] : value
        })
    }
    const toggleFontFamily = () => {
        setOpenFontFamily(!openFontFamily);
    }

    const saveAllConfig = () => {
        changeConfig(configForm);
        toggle();
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="md" id="allConfigModal">
            <ModalBody>
                <FormGroup row className="backgroundColor">
                    <Col xs={4}>
                        <Label>배경 색</Label>
                    </Col>
                    <Col xs={8} className="colorGroup">
                        <button  onClick={toggleColorPicker} style={{backgroundColor:"transparent",display:"flex",alignItems:"center"}}>
                            <span className="colorName">{configForm.backgroundColor}</span>
                            <span className="colorCircle" style={{backgroundColor:`${configForm.backgroundColor}`,width:"20px",height:"20px",borderRadius:"50%",marginLeft:"5px",border: "1px solid #999"}}/>
                        </button>
                        <Modal isOpen={openColorPicker} toggle={toggleColorPicker} centered style={{maxWidth:"fit-content"}}>
                            <ChromePicker
                                color={configForm.backgroundColor}
                                onChange={color=> changeConfigForm("backgroundColor",color.hex)}
                            />
                            <Button onClick={toggleColorPicker} style={{padding:"10px",borderRadius:"0"}} block>적용</Button>
                        </Modal>
                    </Col>
                </FormGroup>
                <FormGroup row className="backgroundImage">
                    <Col xs={4}>
                        <Label>배경 이미지</Label>
                    </Col>
                    <Col xs={8}>
                        <Button>이미지 업로드</Button>
                    </Col>
                </FormGroup>
                <FormGroup row className="fontFamily">
                    <Col xs={4}>
                        <Label>글꼴</Label>
                    </Col>
                    <Col xs={8}>
                        <Dropdown isOpen={openFontFamily} toggle={toggleFontFamily}>
                            <DropdownToggle caret style={{fontFamily:`${configForm.fontFamily}`}}>
                                {convertFontName(configForm.fontFamily)}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => changeConfigForm("fontFamily","Noto Sans KR")} style={{fontFamily:"Noto Sans KR"}}>Noto Sans KR</DropdownItem>
                                <DropdownItem onClick={() => changeConfigForm("fontFamily","Nanum Gothic")} style={{fontFamily:"Nanum Gothic"}}>나눔 고딕</DropdownItem>
                                <DropdownItem onClick={() => changeConfigForm("fontFamily","Sunflower")} style={{fontFamily:"Sunflower"}}>해바라기</DropdownItem>
                                <DropdownItem onClick={() => changeConfigForm("fontFamily","Gugi")} style={{fontFamily:"Gugi"}}>구기</DropdownItem>
                                <DropdownItem onClick={() => changeConfigForm("fontFamily","Dokdo")} style={{fontFamily:"Dokdo"}}>독도</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={saveAllConfig}>적용</Button>
                <Button onClick={toggle}>취소</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AllConfigModal;