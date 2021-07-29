import React, {Fragment, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import {Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { convertFontName } from '../../../common/CommonScript';

const TitleBlockConfig = ({configForm,modifyBlock}) => {

    const [openFontFamily,setOpenFontFamily] = useState(false);

    const toggleFontFamily = () => {
        setOpenFontFamily(!openFontFamily);
    }

    const changeContents = (index,name,value) => {
        if(name === "title"){
            value = value.replace(/\n/g, '<br/>');
        }
        const newForm  = {
            ...configForm,
            contents : configForm.contents.map(
                content => content.index === index ? {...content,[name]:value} : content
            )
        };
        modifyBlock(newForm);
    }

    const convertBr = text => {
        const result = text.replace(/<br\s*\/?>/mg,"\n");
        return result;
    }

    return(
        <div className="titleBlock">
            <dl className="titleType">
                <dt>타입</dt>
                <dd>
                    <Input type="radio" id="titleTypeText" name="titleType" value="text" defaultChecked={configForm.contents[0].titleType === "text"} onChange={ e => changeContents(0,"titleType","text")}/>
                    <Label htmlFor="titleTypeText">텍스트</Label>
                    <Input type="radio" id="titleTypeImage" name="titleType" value="image" defaultChecked={configForm.contents[0].titleType === "image"} onChange={ e => changeContents(0,"titleType","image")}/>
                    <Label htmlFor="titleTypeImage">이미지</Label>
                </dd>
            </dl>
            {
                configForm.contents[0].titleType === "image" &&
                <dl className="image">
                    <dt>이미지</dt>
                    <dd>
                        <label htmlFor="bgImage">
                            <FontAwesomeIcon icon={faFolderOpen}/>
                        </label>
                        <input type="file" id="bgImage" />
                    </dd>
                </dl>
            }
            {
                configForm.contents[0].titleType === "text" &&
                <Fragment>
                    <dl className="fontFamily">
                        <dt>글꼴</dt>
                        <dd>
                            <Dropdown isOpen={openFontFamily} toggle={toggleFontFamily}>
                                <DropdownToggle caret style={{fontFamily:`${configForm.contents[0].fontFamily}`}}>
                                    {convertFontName(configForm.contents[0].fontFamily)}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => changeContents(0,"fontFamily","Noto Sans KR")} style={{fontFamily:"Noto Sans KR"}}>Noto Sans KR</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"fontFamily","Nanum Gothic")} style={{fontFamily:"Nanum Gothic"}}>나눔 고딕</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"fontFamily","Sunflower")} style={{fontFamily:"Sunflower"}}>해바라기</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"fontFamily","Gugi")} style={{fontFamily:"Gugi"}}>구기</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"fontFamily","Dokdo")} style={{fontFamily:"Dokdo"}}>독도</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </dd>
                    </dl>
                    <dl className="color">
                        <dt>글자색</dt>
                        <dd>
                            <label htmlFor="skillTitleColor" style={{backgroundColor:`${configForm.contents[0].color}`}} /> 
                            <input type="color" id="skillTitleColor" value={configForm.contents[0].color} onChange={e => changeContents(0,"color",e.target.value)}/>
                        </dd>
                    </dl>
                    <dl className="textAlign">
                        <dt>정렬</dt>
                        <dd>
                            <div className="alignButtonWrap">
                                <button className={configForm.contents[0].textAlign === "left" ? "on" : ""} onClick={() => changeContents(0,"textAlign","left")}><FontAwesomeIcon icon={faAlignLeft}/></button>
                                <button className={configForm.contents[0].textAlign === "center" ? "on" : ""} onClick={() => changeContents(0,"textAlign","center")}><FontAwesomeIcon icon={faAlignCenter}/></button>
                                <button className={configForm.contents[0].textAlign === "right" ? "on" : ""} onClick={() => changeContents(0,"textAlign","right")}><FontAwesomeIcon icon={faAlignRight}/></button>
                            </div> 
                        </dd>
                    </dl>
                    <dl className="fontSize">
                        <dt>글자크기</dt>
                        <dd>
                            <span>{parseFloat(configForm.contents[0].fontSize)}</span>
                            <input type="range" min="0.1" max="6.0" step="0.1" value={configForm.contents[0].fontSize} onChange={e => changeContents(0,"fontSize",parseFloat(e.target.value))}/>
                        </dd>
                    </dl>
                    <dl className="title">
                        <dt>타이틀</dt>
                        <dd>
                            <Input type="textarea" defaultValue={convertBr(configForm.contents[0].title)} onChange={e => changeContents(0, "title",e.target.value)}></Input>
                        </dd>
                    </dl>
                </Fragment>
            }
        </div>
    )
}

export default TitleBlockConfig;