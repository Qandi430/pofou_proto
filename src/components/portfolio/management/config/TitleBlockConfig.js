import React, {Fragment, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import {Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { convertFontName } from '../../../common/CommonScript';

const TitleBlockConfig = ({configForm,modifyBlock,saveHistory}) => {

    const [openFontFamily,setOpenFontFamily] = useState(false);

    const toggleFontFamily = () => {
        setOpenFontFamily(!openFontFamily);
    }

    const changeContents = async (index,name,value) => {
        console.log(index,name,value);
        let modifyName = "";
        switch(name){
            case "title":
                value = value.replace(/\n/g, '<br/>');
                modifyName = "titleContent";
                break;
            case "titleFontFamily":
                modifyName = "titleFontFamily";
                break;
            case "titleColor":
                modifyName = "titleColor";
                break;
            case "titleTextAlign":
                modifyName = "titleTextAlign";
                break;
            case "subTitle":
                value = value.replace(/\n/g, '<br/>');
                modifyName = "subTitleContent";
                break;
            case "subTitleFontFamily":
                modifyName = "subTitleFontFamily";
                break;
            case "subTitleColor":
                modifyName = "subTitleColor";
                break;
            case "subTitleTextAlign":
                modifyName = "subTitleTextAlign";
                break;
            default :
                modifyName = "modifyContents";
        }
        // if(name === "title"){
        //     value = value.replace(/\n/g, '<br/>');
        // }
        const newForm  = {
            ...configForm,
            contents : configForm.contents.map(
                content => content.index === index ? {...content,title : {...content.title,[name]:value}} : content
            )
        };
        await modifyBlock(newForm);
        saveHistory(modifyName);
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
                    <Input type="radio" id="titleTypeText" name="titleType" value="text" defaultChecked={configForm.contents[0].title.titleType === "text"} onChange={ e => changeContents(0,"titleType","text")}/>
                    <Label htmlFor="titleTypeText">텍스트</Label>
                    <Input type="radio" id="titleTypeImage" name="titleType" value="image" defaultChecked={configForm.contents[0].title.titleType === "image"} onChange={ e => changeContents(0,"titleType","image")}/>
                    <Label htmlFor="titleTypeImage">이미지</Label>
                </dd>
            </dl>
            {
                configForm.contents[0].title.titleType === "image" &&
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
                configForm.contents[0].title.titleType === "text" &&
                <Fragment>
                    <dl className="fontFamily">
                        <dt>타이틀 글꼴</dt>
                        <dd>
                            <Dropdown isOpen={openFontFamily} toggle={toggleFontFamily}>
                                <DropdownToggle caret style={{fontFamily:`${configForm.contents[0].title.titleFontFamily}`}}>
                                    {convertFontName(configForm.contents[0].title.titleFontFamily)}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => changeContents(0,"titleFontFamily","Noto Sans KR")} style={{fontFamily:"Noto Sans KR"}}>Noto Sans KR</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"titleFontFamily","Nanum Gothic")} style={{fontFamily:"Nanum Gothic"}}>나눔 고딕</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"titleFontFamily","Sunflower")} style={{fontFamily:"Sunflower"}}>해바라기</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"titleFontFamily","Gugi")} style={{fontFamily:"Gugi"}}>구기</DropdownItem>
                                    <DropdownItem onClick={() => changeContents(0,"titleFontFamily","Dokdo")} style={{fontFamily:"Dokdo"}}>독도</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </dd>
                    </dl>
                    <dl className="color">
                        <dt>타이틀 글자색</dt>
                        <dd>
                            <label htmlFor="skillTitleColor" style={{backgroundColor:`${configForm.contents[0].title.titleColor}`}} /> 
                            <input type="color" id="skillTitleColor" value={configForm.contents[0].title.titleColor} onChange={e => changeContents(0,"titleColor",e.target.value)}/>
                        </dd>
                    </dl>
                    <dl className="textAlign">
                        <dt>타이틀 정렬</dt>
                        <dd>
                            <div className="alignButtonWrap">
                                <button className={configForm.contents[0].title.titleTextAlign === "left" ? "on" : ""} onClick={() => changeContents(0,"titleTextAlign","left")}><FontAwesomeIcon icon={faAlignLeft}/></button>
                                <button className={configForm.contents[0].title.titleTextAlign === "center" ? "on" : ""} onClick={() => changeContents(0,"titleTextAlign","center")}><FontAwesomeIcon icon={faAlignCenter}/></button>
                                <button className={configForm.contents[0].title.titleTextAlign === "right" ? "on" : ""} onClick={() => changeContents(0,"titleTextAlign","right")}><FontAwesomeIcon icon={faAlignRight}/></button>
                            </div> 
                        </dd>
                    </dl>
                    <dl className="fontSize">
                        <dt>타이틀 글자크기</dt>
                        <dd>
                            <span>{parseFloat(configForm.contents[0].title.titleFontSize)}</span>
                            <input type="range" min="0.1" max="6.0" step="0.1" value={configForm.contents[0].title.titleFontSize} onChange={e => changeContents(0,"titleFontSize",parseFloat(e.target.value))}/>
                        </dd>
                    </dl>
                    <dl className="title">
                        <dt>타이틀</dt>
                        <dd>
                            <Input type="textarea" defaultValue={convertBr(configForm.contents[0].title.title)} onChange={e => changeContents(0, "title",e.target.value)}></Input>
                        </dd>
                    </dl>
                </Fragment>
            }
        </div>
    )
}

export default TitleBlockConfig;