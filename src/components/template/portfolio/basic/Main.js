import React,{useEffect, useState} from 'react';
import MainImage from '../../../../resources/images/template/portfolio/basic/basicMainImage.jpg';
import { Modal, ModalBody, ModalFooter,Button, FormGroup,Col, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { ChromePicker } from 'react-color';
const Main = ({designMode,data,setTitleForm}) => {

    const [openTitleConfigModal, setOpenTitleConfigModal] = useState(false);

    const toggleTitleConfigModal = () => {
        setOpenTitleConfigModal(!openTitleConfigModal);
    }

    const configButton = () => {
        return '<button onClick={toggleTitleConfigModal}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" class="svg-inline--fa fa-cog fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg></button>';
    }

    return (
        <div className="main" style={{backgroundImage : `url(${MainImage})`}}>
            <div className="titleWrap">
                <h2 
                    className={`title ${designMode ? "designMode" : ""}`} 
                    style={{color : `${data.main.color}`,textAlign:`${data.main.textAlign}`}}
                    dangerouslySetInnerHTML={{__html: designMode ?  data.main.text+configButton() : data.main.text }}
                    onClick={designMode && toggleTitleConfigModal}
                >
                </h2>
            </div>
            <TitleConfigModal isOpen={openTitleConfigModal} toggle={toggleTitleConfigModal} form={data.main} changeOriginalForm={setTitleForm}/>
        </div>
    )
}

const TitleConfigModal = ({isOpen,toggle,form,changeOriginalForm}) => {
    
    useEffect(() => {
        setTitleForm(form)
    }, [isOpen,form]);

    const [currentTab, setCurrentTab] = useState("text");
    const [openColorPicker,setOpenColorPicker] = useState(false);
    const [titleForm,setTitleForm] = useState({
        text : "Welcome to <br/> My Portfolio",
        color : "#ffffff",
        fontFamilly : "",
        textAlign : "left",
        image : "",
    });
    const toggleTab = type => {
        if(type === "image"){
            alert("준비중 입니다.")
        }else{
            setCurrentTab(type);
        }
    };

    const toggleColorPicker = () => {
        setOpenColorPicker(!openColorPicker);   
    }

    const changeTitleForm = (name,value) => {
        setTitleForm({
            ...titleForm,
            [name] : value
        })
    }

    const convertBr = text => {
        const result = text.replace("<br/>", "\n")
        console.log(result)
        return result;
    }

    const saveFormData = () => {
        changeOriginalForm(titleForm);
        toggle();
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered id="titleConfigModal" className="basic">
            <ModalBody>
                <ul className="titleConfigTab">
                    <li className={`${currentTab === "text" ? "on" : ""}`} onClick={() => toggleTab("text")}>텍스트</li>
                    <li className={`${currentTab === "image" ? "on" : ""}`} onClick={() => toggleTab("image")}>이미지</li>
                </ul>
                {
                    currentTab === "text" &&
                    <div className="tabContents text">
                        <div className="form">
                            <FormGroup row>
                                <Col>
                                    <Label>글자색</Label>
                                </Col>
                                <Col>
                                    <button onClick={toggleColorPicker} style={{backgroundColor:"transparent",display:"flex",alignItems:"center"}}>
                                        <span className="colorName">{titleForm.color}</span>
                                        <span className="colorCircle" style={{backgroundColor:`${titleForm.color}`,width:"20px",height:"20px",borderRadius:"50%",marginLeft:"5px",border: "1px solid #999"}}/>
                                    </button>
                                </Col>
                                <Modal isOpen={openColorPicker} toggle={toggleColorPicker} centered style={{maxWidth:"fit-content"}}>
                                    <ChromePicker
                                        color={titleForm.color}
                                        onChange={color=> changeTitleForm("color",color.hex)}
                                    />
                                    <Button onClick={toggleColorPicker} style={{padding:"10px",borderRadius:"0"}} block>적용</Button>
                                </Modal>
                            </FormGroup>
                            <FormGroup row style={{display:"none"}}>
                                <Col>
                                    글꼴
                                </Col>
                                <Col>
                                    <select type="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>                                
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    정렬
                                </Col>
                                <Col>
                                    <div className="alignButtonWrap">
                                        <button className={titleForm.textAlign === "left" ? "on" : ""} onClick={() => changeTitleForm("textAlign","left")}><FontAwesomeIcon icon={faAlignLeft}/></button>
                                        <button className={titleForm.textAlign === "center" ? "on" : ""} onClick={() => changeTitleForm("textAlign","center")}><FontAwesomeIcon icon={faAlignCenter}/></button>
                                        <button className={titleForm.textAlign === "right" ? "on" : ""} onClick={() => changeTitleForm("textAlign","right")}><FontAwesomeIcon icon={faAlignRight}/></button>
                                    </div> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Input type="textarea" defaultValue={convertBr(titleForm.text)}/>
                                </Col>
                            </FormGroup>
                        </div>
                        <div className="preview" style={{backgroundColor:"rgba(0,0,0,0.5)",marginTop:"30px",padding:"10px"}}>
                            <h2 dangerouslySetInnerHTML={{__html:titleForm.text }} style={{color : `${titleForm.color}`,textAlign:`${titleForm.textAlign}`}}>
                                
                            </h2>
                        </div>
                    </div>
                }
                {
                    currentTab === "image" &&
                    <div className="tabContents image">image</div>
                }
            </ModalBody>
            <ModalFooter>
                <Button color="info" outline onClick={saveFormData}>저장</Button>
                <Button color="danger" outline onClick={toggle}>취소</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Main;