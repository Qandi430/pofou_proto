import { faChevronRight, faFolderOpen, faPlus, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse, Input } from 'reactstrap';
import React,{useEffect, useState} from 'react';
import transparentImage from '../../../../resources/images/common/transparent.png';
import { ReactSortable } from 'react-sortablejs';
import ContentsList from './ContentsList';

const ConfigBlockSideBar = ({configBlock,selectConfigBlock,modifyBlock}) => {

    const [currentTab,setCurrentTab] = useState("basic");
    const [openBasicStyle,setBasicStyle] = useState("");
    const [selectedContent,setSelectedContent] = useState(null);
    const [configForm,setConfigForm] = useState(null);
    const [openContentsList,setOpenContentsList] = useState("");

    useEffect(() => {
        if(configBlock !== null){
            setConfigForm(configBlock);
        }else{
            setConfigForm(null);
            setOpenContentsList("");
        }
        
    },[configBlock]);
    
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
    const selectContent = index => {
        if(selectedContent !== null && selectedContent.index === index){
            setSelectedContent(null);
        }else{
            setSelectedContent(configForm.contents.find(c => c.index === index));
        }
    }

    const changeFormData = (name,value) => {
        const newForm = ({
            ...configForm,
            [name] : value,
        })

        modifyBlock(newForm);
    }

    const sortContents = newList => {
        const newForm = ({
            ...configForm,
            contents : newList
        })
        modifyBlock(newForm);
    }

    const removeContent = () => {
        if(selectedContent === null){
            alert("선택된 컨텐츠가 없습니다.");
            return false;
        }
        const newForm = ({
            ...configForm,
            contents : configForm.contents.filter(c => c.index !== selectedContent.index)
        })
        modifyBlock(newForm);
    }

    const toggleContentsList = category => {
        if(typeof category !== "string"){
            setOpenContentsList("");
        }else{
            setOpenContentsList(category);
        }
    }

    const addContents = contents => {
        
        contents["index"] = configForm.contents.length;
        const newForm = ({
            ...configForm,
            contents : configForm.contents.concat(contents),
        })

        modifyBlock(newForm);
        setOpenContentsList("");
    }

    return (
        <div className={`configBlockSideBar ${configBlock !== null ? "on" : ""}`}>
            <div className="blockInfo">
                <div className="blockTitle">
                    <h6>블럭설정</h6>
                    <p>
                        {
                            configForm !== null &&
                            (
                                () => {
                                    switch(configForm.category){
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
                        {
                            ((configBlock !== null && configForm !== null) && (configForm.category === "contents" || configForm.category === "contact")) &&
                            <div className="gridBlock">
                                <dl className="contentsGrid">
                                    <dt>컨텐츠 가로 개수</dt>
                                    <dd>
                                        <span>{configForm !== null && configForm.grid}</span>
                                        <input type="range" min="1" max="6" value={configForm !== null && configForm.grid} onChange={e => changeFormData("grid",e.target.value)}/>
                                    </dd>
                                </dl>
                                <dl className="contentsList">
                                    <dt>컨텐츠 리스트 <button onClick={removeContent}><FontAwesomeIcon icon={faTrashAlt}/></button></dt>
                                    <dd>
                                        <ReactSortable className="sortBox" list={configForm.contents} setList={list => sortContents(list)}>
                                            {
                                                configForm.contents.map(
                                                    content=>
                                                        <div className={`content ${selectedContent !== null && selectedContent.index === content.index ? "on" : ""}`} onClick={() => selectContent(content.index)} key={content.index} style={{flex: `0 0 ${100/configBlock.grid}%`}}>
                                                            <div className="item">
                                                                {content.index+1}
                                                            </div>
                                                        </div>
                                                )
                                            }
                                        </ReactSortable>
                                        <button onClick={() => toggleContentsList(configForm !== null ? configForm.category : "")}><FontAwesomeIcon icon={faPlus}/> 추가</button>
                                    </dd>
                                </dl>
                            </div>
                        }
                        <div className="basicStyle">
                            <div className="padding">
                                <h5 onClick={() => toggleBasicStyle("padding")}>여백 <FontAwesomeIcon icon={faChevronRight}/></h5>
                                <div className={`panel ${openBasicStyle === "padding" ? "on":""}`}>
                                    <div className="panelWrap">
                                        <dl>
                                            <dt>상</dt>
                                            <dd>
                                                <span>{configForm !== null && configForm.paddingTop}</span>
                                                <input type="range" min="0" max="100" value={configForm !== null && configForm.paddingTop} onChange={e => changeFormData("paddingTop",e.target.value)}/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>하</dt>
                                            <dd>
                                                <span>{configForm !== null && configForm.paddingBottom}</span>
                                                <input type="range" min="0" max="100" value={configForm !== null && configForm.paddingBottom} onChange={e => changeFormData("paddingBottom",e.target.value)}/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>좌우여백</dt>
                                            <dd>
                                                <input className="tgl tgl-light" id="container" type="checkbox" checked={configForm !== null && configForm.container} onChange={ e => changeFormData("container",e.target.checked)}/>
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
                                                    configForm !== null ?
                                                    configForm.backgroundImage !== null && configForm.backgroundImage !== undefined ? 
                                                        {backgroundColor : "#0f0"}
                                                        : configForm.backgroundColor === "transparent" ?
                                                            {backgroundImage : `url(${transparentImage})`}
                                                        :
                                                            {backgroundColor : `${configForm.backgroundColor}`}
                                                    : {backgroundColor : "#f00"}
                                                }> 
                                                </label>
                                                <input type="color" id="blockBgColor" value={configForm !== null && configForm.backgroundColor !== "transparent" ? configForm.backgroundColor : "#ff0000"} onChange={e => changeFormData("backgroundColor",e.target.value)}/>
                                                <div className="customCheckbox">
                                                    <input id='bgTransparent' type='checkbox' checked={configForm !== null && configForm.backgroundColor === "transparent"} onChange={e => changeFormData("backgroundColor",`${e.target.checked ? "transparent" : "#ff0000"}`)}/>
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
            <ContentsList open={openContentsList} toggle={toggleContentsList} addContents={addContents}/>
        </div>
    )
}

export default ConfigBlockSideBar;