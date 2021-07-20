import { faChevronRight, faFolderOpen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, Input } from 'reactstrap';
import React,{useEffect, useState} from 'react';
import transparentImage from '../../../../resources/images/common/transparent.png';

const ConfigBlockSideBar = ({configBlock,selectConfigBlock,modifyData}) => {

    const [currentTab,setCurrentTab] = useState("basic");
    const [openBasicStyle,setBasicStyle] = useState("");

    useEffect(() => {
        const panelList = document.getElementsByClassName('panel');
        
        for(let i = 0; i< panelList.length; i++){
            if(panelList[i].classList.contains("on")){
                console.log(panelList[i]);
                panelList[i].style.maxHeight = panelList[i].scrollHeight + "px";
            }else{
                panelList[i].style.maxHeight = null;
            }
        }
    },[openBasicStyle]);


    const toggleTab = name =>{
        if(currentTab === name){
            setCurrentTab("")
        }else{
            setCurrentTab(name);
        }
    }
    const toggleBasicStyle = name => {
        if(name === openBasicStyle){
            setBasicStyle("");
        }else{
            setBasicStyle(name);
        }
    }
    return (
        <div className={`configBlockSideBar ${configBlock !== null ? "on" : ""}`}>
            <div className="blockInfo">
                <div className="blockTitle">
                    <h6>블럭설정</h6>
                    <p>
                        {
                            configBlock !== null &&
                            (
                                () => {
                                    switch(configBlock.category){
                                        case "title" :
                                            return "타이틀";
                                        case "contents" :
                                            return "컨텐츠";
                                        case "text" :
                                            return "텍스트";
                                        case "work" :
                                            return "작업물";
                                        case "contact" :
                                            return "컨택트";
                                        case "image" :
                                            return "이미지";
                                        case "video" :
                                            return "동영상";
                                        case "slide" :
                                            return "슬라이드 쇼";
                                        case "contour" :
                                            return "구분선";
                                        default :
                                            return "기타";
                                    }
                                }
                            )()
                        }
                    </p>
                    <button onClick={() => selectConfigBlock(null)}><FontAwesomeIcon icon={faTimes}/></button>
                </div>
                <div className="configTab">
                    <ul>
                        <li onClick={() => toggleTab("basic")}>기본설정</li>
                        <li onClick={() => toggleTab("detail")}>세부설정</li>
                        <li onClick={() => toggleTab("effect")}>효과</li>
                    </ul>
                    
                </div>
            </div>
            <div className="configBox">
                    <div className={`basicTab ${currentTab === "basic" ? "on" : ""}`}>
                        <div className="basicStyle">
                            <div className="padding">
                                <h5 onClick={() => toggleBasicStyle("padding")}>여백 <FontAwesomeIcon icon={faChevronRight}/></h5>
                                <div className={`panel ${openBasicStyle === "padding" ? "on":""}`}>
                                    <div className="panelWrap">
                                        <dl>
                                            <dt>상</dt>
                                            <dd>
                                                <span>{configBlock !== null && configBlock.paddingTop}</span>
                                                <input type="range" min="0" max="100" value={configBlock !== null && configBlock.paddingTop} onChange={e => modifyData("paddingTop",e.target.value)}/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>하</dt>
                                            <dd>
                                                <span>{configBlock !== null && configBlock.paddingBottom}</span>
                                                <input type="range" min="0" max="100" value={configBlock !== null && configBlock.paddingBottom} onChange={e => modifyData("paddingBottom",e.target.value)}/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>좌우여백</dt>
                                            <dd>
                                                <input className="tgl tgl-light" id="container" type="checkbox" checked={configBlock !== null && configBlock.container} onChange={ e => modifyData("container",e.target.checked)}/>
                                                <label className="tgl-btn small" htmlFor="container"></label>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="background">
                                <h5 onClick={() => toggleBasicStyle("background")}>배경 <FontAwesomeIcon icon={faChevronRight}/></h5>
                                <div className={`panel ${openBasicStyle === "background" ? "on":""}`}>
                                    <div className="panelWrap">
                                        <dl className="color">
                                            <dt>컬러</dt>
                                            <dd>
                                                <label htmlFor="blockBgColor" style={
                                                    configBlock !== null ?
                                                        configBlock.backgroundImage !== null && configBlock.backgroundImage !== undefined ? 
                                                        {backgroundColor : "#0f0"}
                                                        : configBlock.backgroundColor === "transparent" ?
                                                            {backgroundImage : `url(${transparentImage})`}
                                                        :
                                                            {backgroundColor : `${configBlock.backgroundColor}`}
                                                    : {backgroundColor : "#f00"}
                                                }> 
                                                </label>
                                                <input type="color" id="blockBgColor" value={configBlock !== null && configBlock.backgroundColor !== "transparent" ? configBlock.backgroundColor : "#ff0000"} onChange={e => modifyData("backgroundColor",e.target.value)}/>
                                                <div className="customCheckbox">
                                                    <input id='bgTransparent' type='checkbox' checked={configBlock !== null && configBlock.backgroundColor === "transparent"} onChange={e => modifyData("backgroundColor",`${e.target.checked ? "transparent" : "#ff0000"}`)}/>
                                                    <label htmlFor='bgTransparent'>
                                                        <span></span>
                                                        투명
                                                        <ins><i>투명</i></ins>
                                                    </label>
                                                </div>
                                            </dd>
                                        </dl>
                                        <dl className="image">
                                            <dt>이미지</dt>
                                            <dd>
                                                <label htmlFor="bgImage">
                                                    <FontAwesomeIcon icon={faFolderOpen}/>
                                                </label>
                                                <input type="file" id="bgImage" />
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="blockInfo">
                                <h5 onClick={() => toggleBasicStyle("blockInfo")}>블럭 이름 <FontAwesomeIcon icon={faChevronRight}/></h5>
                                <div className={`panel ${openBasicStyle === "blockInfo" ? "on":""}`}>
                                    블럭이름 필요 있을까?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`detailTab ${currentTab === "detail" ? "on" : ""}`}>
                        Detail
                    </div>
                    <div className={`effectTab ${currentTab === "effect" ? "on" : ""}`}>
                        Effect
                    </div>
            </div>
        </div>
    )
}

export default ConfigBlockSideBar;