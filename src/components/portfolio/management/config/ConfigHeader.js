import { faCopy, faEdit, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowsAltH, faArrowsAltV, faFillDrip, faPlus, faSort, faTh, faTrashAlt,faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment } from 'react';
import { createPortfolioConsumer } from '../../../../context/portfolioContext';
import { singleFileUpload } from '../../../../server/common/CommonServer';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { convertFontName } from '../../../common/CommonScript';
import btnSave from '../../../../resources/images/portfolio/btnSave.png';
import btnSaveOn from '../../../../resources/images/portfolio/btnSaveOn.png';
import btnReverse from '../../../../resources/images/portfolio/btnReverse.png';
import btnReverseOn from '../../../../resources/images/portfolio/btnReverseOn.png';
import btnClose from '../../../../resources/images/portfolio/btnClose.png';
import btnCloseOn from '../../../../resources/images/portfolio/btnCloseOn.png';

const ConfigHeader = ({modifyHistory,revertHistory,toggleNoticeModal,portfolioData,changeGlobalConfig,toggleSpinnerModal}) => {
    const [openHistoryBox,setOpenHistoryBox] = useState(false);
    const [openGlobalConfigBox,setOpenGlobalConfigBox] = useState(false);
    const [openGlobalConfig,setOpenGlobalConfig] = useState("");
    const [openFontFamily,setOpenFontFamily] = useState(false);
    const toggleGlobalConfig = (name) => {
        if(openGlobalConfig === name){
            setOpenGlobalConfig("");
        }else{
            setOpenGlobalConfig(name);
        }
    }

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
    },[openGlobalConfig,portfolioData]);

    const uploadBackgrounImage = async(e) => {
        toggleSpinnerModal(true);
        let form = new FormData();
        form.append("file",e.target.files[0]);
        const {data} = await singleFileUpload(form);
        
        toggleSpinnerModal(true);
        if(data.result === "success"){
            changeGlobalConfig("backgroundImage",data.fileName);
            // saveContents(contents.order,"contents",`<img src="https://storage.googleapis.com/pofou_repo/${data.fileName}" alt="" className="img-fluid"/>`);
        }else{
            alert("?????? ???????????? ?????????????????????.");
        }
        toggleSpinnerModal(false);
    }

    const toggleFontFamily = () => {
        setOpenFontFamily(!openFontFamily);
    }

    return(
        <header className="configHeader">
            <div className="headerLeft">
                <div className="btnGlobalConfig">
                    <button className="btnOpenGlobalConfig" onClick={() => setOpenGlobalConfigBox(!openGlobalConfigBox)}>?????? ??????</button>
                    <div className={`globalConfigBox ${openGlobalConfigBox ? "on" :""}`}>
                        <div className="configItem">
                            <h5 onClick={() => toggleGlobalConfig("background")}>??????</h5>
                            <div className={`panel ${openGlobalConfig === "background" ? "on" : ""}`}>
                                <div className="panelWrap">
                                    <dl className="color">
                                        <dt>??????</dt>
                                        <dd>
                                            <label htmlFor="globalBackgroundColor" style={
                                                    portfolioData !== null ?
                                                        portfolioData.backgroundColor === "" ?
                                                            {backgroundColor : "#ffffff"}
                                                            : {backgroundColor : `${portfolioData.backgroundColor}`}
                                                    : {backgroundColor : "#ffffff"}
                                                }> 
                                            </label>
                                            <input onChange={(e) => {console.log(e)}} type="color" id="globalBackgroundColor" value={portfolioData !== null && portfolioData.backgroundColor !== "" ? portfolioData.backgroundColor  : "#ffffff"} onChange={ e => changeGlobalConfig("backgroundColor",e.target.value)}/>
                                            <span>{portfolioData.backgroundColor}</span>
                                        </dd>
                                    </dl>
                                    <dl className="backgroundImage">
                                        <dt>?????????</dt>
                                        <dd>
                                            <label htmlFor="bgImage">
                                                <FontAwesomeIcon icon={faFolderOpen}/>
                                            </label>
                                            <input type="file" id="bgImage" onChange={uploadBackgrounImage}/>
                                            {
                                                portfolioData.backgroundImage !== "" &&
                                                <Fragment>
                                                    <div className="backgrounImagePreview">
                                                        <img src={`https://storage.googleapis.com/pofou_repo/${portfolioData.backgroundImage}`} alt="" />
                                                    </div>
                                                    <button className="btnRemoveBackgrounImage" onClick={() => changeGlobalConfig("backgroundImage","")}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </button>
                                                </Fragment>
                                            }
                                        </dd>
                                    </dl>
                                    {
                                        portfolioData.backgroundImage !== "" &&
                                        <Fragment>
                                            <dl>
                                                <dt>??????</dt>
                                                <dd>
                                                    <select name="backgrounPosition" id="backgroundPosition" value={portfolioData.backgroundPosition} onChange={ e => changeGlobalConfig("backgroundPosition",e.target.value)}>
                                                        <option value="left top">?????? ??????</option>
                                                        <option value="center top">?????? ??????</option>
                                                        <option value="right top">????????? ??????</option>
                                                        <option value="left center">?????? ??????</option>
                                                        <option value="center center">?????????</option>
                                                        <option value="right center">????????? ??????</option>
                                                        <option value="left bottom">?????? ??????</option>
                                                        <option value="center bottom">?????? ??????</option>
                                                        <option value="right bottom">????????? ??????</option>
                                                    </select>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>??????</dt>
                                                <dd>
                                                    <select name="backgroundRepeat" id="backgroundRepeat" value={portfolioData.backgroundRepeat} onChange={ e => changeGlobalConfig("backgroundRepeat",e.target.value)}>
                                                        <option value="repeat">??????</option>
                                                        <option value="repeat-x">?????????????????? ??????</option>
                                                        <option value="repeat-y">?????????????????? ??????</option>
                                                        <option value="no-repeat">????????????</option>
                                                    </select>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>??????</dt>
                                                <dd>
                                                    <select name="backgroundSize" id="backgroundSize" value={portfolioData.backgroundSize} onChange={ e => changeGlobalConfig("backgroundSize",e.target.value)}>
                                                        <option value="auto">?????? ???????????? ?????? ????????? ??????.</option>
                                                        <option value="corver">????????????</option>
                                                        <option value="contain">?????? ???????????? ?????? ????????????</option>
                                                    </select>
                                                </dd>
                                            </dl>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="configItem">
                            <h5 onClick={() => toggleGlobalConfig("font")}>?????? ??????</h5>
                            <div className={`panel ${openGlobalConfig === "font" ? "on" : ""}`} style={{overflow : `${openFontFamily ? "visible" :"hidden"}`}}>
                                <div className="panelWrap">
                                    <dl className="color">
                                        <dt>??????</dt>
                                        <dd>
                                            <label htmlFor="globalFontColor" style={
                                                    portfolioData !== null ?
                                                        portfolioData.color === "" ?
                                                            {backgroundColor : "#333333"}
                                                            : {backgroundColor : `${portfolioData.color}`}
                                                    : {backgroundColor : "#333333"}
                                                }> 
                                            </label>
                                            <input type="color" id="globalFontColor" value={portfolioData !== null && portfolioData.color !== "" ? portfolioData.color  : "#ffffff"} onChange={ e => changeGlobalConfig("color",e.target.value)}/>
                                            <span>{portfolioData.color === "" ? "#333333":portfolioData.color}</span>
                                        </dd>
                                    </dl>
                                    <dl className="fontFamily">
                                        <dt>?????????</dt>
                                        <dd>
                                            <Dropdown isOpen={openFontFamily} toggle={toggleFontFamily}>
                                                <DropdownToggle caret style={{fontFamily:`${portfolioData.fontFamily === "" ? "Noto Sans KR" : portfolioData.fontFamily }`}}>
                                                    {convertFontName(portfolioData.fontFamily === "" ? "Noto Sans KR" : portfolioData.fontFamily )}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Noto Sans KR")} style={{fontFamily:"Noto Sans KR"}}>Noto Sans KR</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Nanum Gothic")} style={{fontFamily:"Nanum Gothic"}}>?????? ??????</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Sunflower")} style={{fontFamily:"Sunflower"}}>????????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Gugi")} style={{fontFamily:"Gugi"}}>??????</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Dokdo")} style={{fontFamily:"Dokdo"}}>??????</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="headerRight">
                <button onMouseEnter={() => setOpenHistoryBox(true)} onMouseLeave={() => setOpenHistoryBox(false)}>
                    {/* ???????????? */}
                    <img src={btnReverse} alt=""  className='off'/>
                    <img src={btnReverseOn} alt="" className='on'/>
                    <HistoryBox openHistoryBox={openHistoryBox} modifyHistory={modifyHistory} revertHistory={revertHistory}/>        
                </button>
                <button onClick={() => toggleNoticeModal("update")}>
                    {/* ???????????? */}
                    <img src={btnSave} alt="" className='off'/>
                    <img src={btnSaveOn} alt="" className='on'/>
                </button>
                <button onClick={() => toggleNoticeModal("quit")}>
                    {/* ??????????????? */}
                    <img src={btnClose} alt=""  className='off'/>
                    <img src={btnCloseOn} alt="" className='on'/>
                </button>
            </div>
        </header>
    )
}

const HistoryBox = ({openHistoryBox,modifyHistory,revertHistory}) => {
    return(
        <div className={`historyBox ${openHistoryBox ? "on" : ""}`}>
            <ul>
                {
                    modifyHistory.length < 1 ? 
                    <li className="blank">????????? ????????? ????????????.</li>:
                    modifyHistory.map(
                        (history,index) => {
                            switch(history.history){
                                case "logStart":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ??????
                                        </li>
                                    )
                                case "globalBackgroundColor":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ????????? ??????
                                        </li>
                                    )
                                case "globalFontFamily":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ?????? ??????
                                        </li>
                                    )
                                case "globalBackgroundImage":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ??????????????? ??????
                                        </li>
                                    )
                                case "globalBackgroundPosition":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ?????? ?????? ??????
                                        </li>
                                    )
                                case "globalBackgroundRepeat":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ?????? ?????? ??????
                                        </li>
                                    )
                                case "globalBackgroundSize":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ?????? ?????? ??????
                                        </li>
                                    )
                                case "globalFontColor":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            ?????? ?????? ?????? ??????
                                        </li>
                                    )
                                case "addBlock":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            ????????? ?????????
                                        </li>
                                    )
                                case "addContents":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            ????????? ????????? ?????????
                                        </li>
                                    )
                                case "removeBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                            ????????? ?????????
                                        </li>
                                    )
                                case "copyBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faCopy}/>
                                            ????????? ?????????
                                        </li>
                                    )
                                case "sortBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faSort}/>
                                            ???????????? ?????????
                                        </li>
                                    )
                                case "paddingTop":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltV}/>
                                            ?????? ?????? ?????? ?????????
                                        </li>
                                    )
                                case "paddingBottom":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltV}/>
                                            ?????? ?????? ?????? ?????????
                                        </li>
                                    )
                                case "container":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltH}/>
                                            ?????? ?????? ?????? ?????????
                                        </li>
                                    )
                                case "backgroundColor":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faFillDrip}/>
                                            ????????? ?????????
                                        </li>
                                    )
                                case "sortContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faSort}/>
                                            ?????? ??? ????????? ?????? ?????????
                                        </li>
                                    )
                                case "removeContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                            ?????? ??? ????????? ?????????
                                        </li>
                                    )
                                case "grid":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTh}/>
                                            ????????? ????????? ?????? ?????? ?????????
                                        </li>
                                    )
                                case "modifyContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????????
                                        </li>
                                    )
                                case "titleContent":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????? ?????????
                                        </li>
                                    )
                                case "titleFontFamily":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????? ?????????
                                        </li>
                                    )
                                case "titleColor":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????? ?????????
                                        </li>
                                    )
                                case "titleTextAlign":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????? ?????????
                                        </li>
                                    )
                                case "subTitleContent":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ?????? ????????? ?????? ?????????
                                        </li>
                                    )
                                case "subTitleFontFamily":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ?????? ????????? ?????? ?????????
                                        </li>
                                    )
                                case "subTitleColor":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ?????? ????????? ?????? ?????????
                                        </li>
                                    )
                                case "subTitleTextAlign":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ?????? ????????? ?????? ?????????
                                        </li>
                                    )
                                case "displayPhoto":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ??????????????? ?????? ?????? ?????????
                                        </li>
                                    );
                                case "displayName":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????? ???????????? ?????????
                                        </li>
                                    );
                                case "displayBirthDate":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ???????????? ???????????? ?????????
                                        </li>
                                    );
                                case "displayPhone":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ???????????? ???????????? ?????????
                                        </li>
                                    );
                                case "displayAddress":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????? ???????????? ?????????
                                        </li>
                                    );
                                case "displayMobile":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????????????????? ???????????? ?????????
                                        </li>
                                    );
                                case "historyLink":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ???????????? ?????? ?????????
                                        </li>
                                    );
                                case "skillBackground":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ?????? ????????? ?????????
                                        </li>
                                    );
                                case "skillText":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ?????? ?????????
                                        </li>
                                    );
                                case "skillBar":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ?????? ??? ?????? ?????????
                                        </li>
                                    );
                                case "workGrid":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            ????????? ???????????? ?????????
                                        </li>
                                    );
                                
                                default:
                                    return(
                                        <li key={index}  onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>{history.history}</li>
                                    )
                            }
                        }
                    )
                }
            </ul>
        </div>
    )
}

export default createPortfolioConsumer(ConfigHeader);