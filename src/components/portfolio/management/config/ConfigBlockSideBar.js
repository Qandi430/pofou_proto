import { faCopy, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowsAltV, faChevronRight, faFolderOpen,  faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect, useState} from 'react';
import transparentImage from '../../../../resources/images/common/transparent.png';
import ContentsList from './ContentsList';
import DetailItem from './DetailItem';
import GridBlockConfig from './GridBlockConfig';
import ImageBlockConfig from './ImageBlockConfig';
import TitleBlockConfig from './TitleBlockConfig';

const ConfigBlockSideBar = ({configBlock,selectConfigBlock,modifyBlock,copyBlock,removeBlock,toggleSortBlockModal,saveHistory}) => {

    const [currentTab,setCurrentTab] = useState(["basic"]);
    const [openBasicStyle,setBasicStyle] = useState("");
    const [configForm,setConfigForm] = useState(null);
    const [openContentsList,setOpenContentsList] = useState("");
    const [openDetailItemList,setOpenDetailItemList] = useState([]);
    const [timer,setTimer] = useState(0);
    useEffect(() => {
        if(configBlock !== null){
            setConfigForm(configBlock);
        }else{
            setConfigForm(null);
            setCurrentTab(["basic"]);
            setOpenContentsList("");
        }
    },[configBlock]);
    
    useEffect(() => {
        setTimeout(() => {
            const panelList = document.getElementsByClassName('panel');
            for(let i = 0; i< panelList.length; i++){
                if(panelList[i].classList.contains("on")){
                    let height = panelList[i].scrollHeight;
                    let childPanel = panelList[i].getElementsByClassName("panel");
                    for(let j = 0; j < childPanel.length; j ++){
                        if(childPanel[j].classList.contains("on")) height += childPanel[j].scrollHeight;
                    }
                    panelList[i].style.maxHeight = height + "px";
                }else{
                    panelList[i].style.maxHeight = null;
                }
            }
        }, 100);
    },[configBlock,currentTab,openBasicStyle,openDetailItemList]);


    const toggleTab = name =>{
        if(currentTab.indexOf(name) > -1){
            setCurrentTab(
                currentTab.filter(tab => tab !== name)
            )
        }else{
            setCurrentTab(
                currentTab.concat(name)
            )
        }
    }
    
    const toggleBasicStyle = name => {
        if(name === openBasicStyle){
            setBasicStyle("");
        }else{
            setBasicStyle(name);
        }
    }

    const changeFormData = (name,value) => {
        
        const newForm = {
            ...configForm,
            [name] : value,
        }

        modifyBlock(newForm);
        saveHistory(name);
    }

    const toggleContentsList = category => {
        if(typeof category !== "string"){
            setOpenContentsList("");
        }else{
            setOpenContentsList(category);
        }
    }

    const addContents = contents => {
        let newContents = JSON.parse(JSON.stringify(contents));
        newContents["index"] = configForm.contents.length;
        const newForm = {
            ...configForm,
            contents : configForm.contents.concat(newContents),
        }
        modifyBlock(newForm);
        setOpenContentsList("");
        saveHistory("addContents");
    }

    const toggleOpenDetailItem = index => {
        if(openDetailItemList.indexOf(index) > -1){
            setOpenDetailItemList(
                openDetailItemList.filter(item => item !== index)
            )
        }else{
            setOpenDetailItemList(
                openDetailItemList.concat(index)
            )
        }
    }

    const modifyContents = (contents) => {
        const newForm = {
            ...configForm,
            contents : configForm.contents.map(
                c => c.index === contents.index ? contents : c
            )
        }
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
            </div>
            <div className="configBox">
                <div className="tabContents basicTab">
                    <h5 onClick={() => toggleTab("basic")}>기본설정</h5>
                    <div className={`panel panelParent ${currentTab.indexOf("basic")  > -1 ? "on" : ""}`}>
                        {
                            ((configBlock !== null && configForm !== null) && (configForm.category === "contents" || configForm.category === "contact")) &&
                            <GridBlockConfig configForm={configForm} toggleContentsList={toggleContentsList} modifyBlock={modifyBlock} saveHistory={saveHistory}/>
                        }
                        {
                            ((configBlock !== null && configForm !== null) && (configForm.category === "title")) &&
                            <TitleBlockConfig configForm={configForm} modifyBlock={modifyBlock}/>
                        }
                        {
                            ((configBlock !== null && configForm !== null) && (configForm.category === "image")) &&
                            <ImageBlockConfig configForm={configForm} modifyBlock={modifyBlock}/>
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
                                                        {backgroundColor : "#fff"}
                                                        : configForm.backgroundColor === "transparent" ?
                                                            {backgroundImage : `url(${transparentImage})`}
                                                        :
                                                            {backgroundColor : `${configForm.backgroundColor}`}
                                                    : {backgroundColor : "#fff"}
                                                }> 
                                                </label>
                                                <input type="color" id="blockBgColor" value={configForm !== null && configForm.backgroundColor !== "transparent" ? configForm.backgroundColor : "#ff0000"} onChange={e => changeFormData("backgroundColor",e.target.value)}/>
                                                <div className="customCheckbox">
                                                    <input id='bgTransparent' type='checkbox' checked={configForm !== null && configForm.backgroundColor === "transparent"} onChange={e => changeFormData("backgroundColor",`${e.target.checked ? "transparent" : "#ffffff"}`)}/>
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
                            {/* <div className="blockInfo">
                                <h5 onClick={() => toggleBasicStyle("blockInfo")}>블럭 이름 <FontAwesomeIcon icon={faChevronRight}/></h5>
                                <div className={`panel ${openBasicStyle === "blockInfo" ? "on":""}`}>
                                    블럭이름 필요 있을까?
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="tabContents detailTab">
                    <h5 onClick={() => toggleTab("detail")}>세부설정</h5>
                    <div className={`panel panelParent ${currentTab.indexOf("detail")  > -1  ? "on" : ""}`}>
                        {
                            configForm !== null &&
                                configForm.contents.map(
                                    contents => <DetailItem saveHistory={saveHistory} key={contents.index} contents={contents} openDetailItemList={openDetailItemList} toggleOpenDetailItem={toggleOpenDetailItem} modifyContents={modifyContents}/>
                                )
                        }
                    </div>
                </div>
                <div className="tabContents effectTab">
                    <h5 onClick={() => toggleTab("effect")}>효과</h5>
                    <div className={`panel panelParent ${currentTab.indexOf("effect")  > -1  ? "on" : ""}`}>
                        Effect
                    </div>
                </div>
            </div>
            <ContentsList open={openContentsList} toggle={toggleContentsList} addContents={addContents}/>
            <div className="blockFooter">
                <button onClick={toggleSortBlockModal}>
                    <FontAwesomeIcon icon={faArrowsAltV}/>
                    블럭이동
                </button>
                <button onClick={copyBlock}>
                    <FontAwesomeIcon icon={faCopy}/>
                    블럭복제
                </button>
                <button onClick={removeBlock}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                    블럭삭제
                </button>
            </div>
        </div>
    )
}

export default ConfigBlockSideBar;