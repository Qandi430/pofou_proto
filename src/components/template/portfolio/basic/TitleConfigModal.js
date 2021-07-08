import React,{useEffect,useState} from 'react';
import { Modal, ModalBody, ModalFooter,Button, FormGroup,Col, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { ChromePicker } from 'react-color';

const TitleConfigModal = ({isOpen,toggle,target,data,changeTitle}) => {
    
    useEffect(() => {
        if(target !== ""){
            setTitleForm(data[target].title);    
        }
    }, [isOpen,target,data]);

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
        if(name === "text"){
            value = value.replace(/\n/g, '<br/>');
        }
        setTitleForm({
            ...titleForm,
            [name] : value
        })
    }

    const convertBr = text => {
        const result = text.replace(/<br\s*\/?>/mg,"\n");
        return result;
    }

    const saveFormData = () => {
        changeTitle(target,titleForm);
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
                                    <Input type="textarea" defaultValue={convertBr(titleForm.text)} onChange={e => changeTitleForm("text",e.target.value)}/>
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

export default TitleConfigModal;