import { faCopy, faEdit, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowsAltH, faArrowsAltV, faFillDrip, faPlus, faSort, faTh, faTrashAlt,faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment } from 'react';
import { createPortfolioConsumer } from '../../../../context/portfolioContext';
import { singleFileUpload } from '../../../../server/common/CommonServer';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { convertFontName } from '../../../common/CommonScript';

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
            alert("파일 업로드에 실패하였습니다.");
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
                    <button className="btnOpenGlobalConfig" onClick={() => setOpenGlobalConfigBox(!openGlobalConfigBox)}>포트폴리오 기본 설정</button>
                    <div className={`globalConfigBox ${openGlobalConfigBox ? "on" :""}`}>
                        <div className="configItem">
                            <h5 onClick={() => toggleGlobalConfig("background")}>배경</h5>
                            <div className={`panel ${openGlobalConfig === "background" ? "on" : ""}`}>
                                <div className="panelWrap">
                                    <dl className="color">
                                        <dt>컬러</dt>
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
                                        <dt>이미지</dt>
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
                                                <dt>위치</dt>
                                                <dd>
                                                    <select name="backgrounPosition" id="backgroundPosition" value={portfolioData.backgroundPosition} onChange={ e => changeGlobalConfig("backgroundPosition",e.target.value)}>
                                                        <option value="left top">왼쪽 상단</option>
                                                        <option value="center top">중앙 상단</option>
                                                        <option value="right top">오른쪽 상단</option>
                                                        <option value="left center">왼쪽 중앙</option>
                                                        <option value="center center">정중앙</option>
                                                        <option value="right center">오른쪽 중앙</option>
                                                        <option value="left bottom">왼쪽 하단</option>
                                                        <option value="center bottom">중앙 하단</option>
                                                        <option value="right bottom">오른쪽 하단</option>
                                                    </select>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>반복</dt>
                                                <dd>
                                                    <select name="backgroundRepeat" id="backgroundRepeat" value={portfolioData.backgroundRepeat} onChange={ e => changeGlobalConfig("backgroundRepeat",e.target.value)}>
                                                        <option value="repeat">반복</option>
                                                        <option value="repeat-x">가로방향으로 반복</option>
                                                        <option value="repeat-y">세로방향으로 반복</option>
                                                        <option value="no-repeat">반복없음</option>
                                                    </select>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>크기</dt>
                                                <dd>
                                                    <select name="backgroundSize" id="backgroundSize" value={portfolioData.backgroundSize} onChange={ e => changeGlobalConfig("backgroundSize",e.target.value)}>
                                                        <option value="auto">배경 이미지의 원본 크기를 유지.</option>
                                                        <option value="corver">영역전체</option>
                                                        <option value="contain">비율 유지한체 영역 크기만큼</option>
                                                    </select>
                                                </dd>
                                            </dl>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="configItem">
                            <h5 onClick={() => toggleGlobalConfig("font")}>기본 폰트</h5>
                            <div className={`panel ${openGlobalConfig === "font" ? "on" : ""}`} style={{overflow : `${openFontFamily ? "visible" :"hidden"}`}}>
                                <div className="panelWrap">
                                    <dl className="color">
                                        <dt>컬러</dt>
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
                                        <dt>폰트명</dt>
                                        <dd>
                                            <Dropdown isOpen={openFontFamily} toggle={toggleFontFamily}>
                                                <DropdownToggle caret style={{fontFamily:`${portfolioData.fontFamily === "" ? "Noto Sans KR" : portfolioData.fontFamily }`}}>
                                                    {convertFontName(portfolioData.fontFamily === "" ? "Noto Sans KR" : portfolioData.fontFamily )}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Noto Sans KR")} style={{fontFamily:"Noto Sans KR"}}>Noto Sans KR</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Nanum Gothic")} style={{fontFamily:"Nanum Gothic"}}>나눔 고딕</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Sunflower")} style={{fontFamily:"Sunflower"}}>해바라기</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Gugi")} style={{fontFamily:"Gugi"}}>구기</DropdownItem>
                                                    <DropdownItem onClick={() => changeGlobalConfig("fontFamily","Dokdo")} style={{fontFamily:"Dokdo"}}>독도</DropdownItem>
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
                    되돌리기
                    <HistoryBox openHistoryBox={openHistoryBox} modifyHistory={modifyHistory} revertHistory={revertHistory}/>        
                </button>
                <button onClick={() => toggleNoticeModal("update")}>저장하기</button>
                <button onClick={() => toggleNoticeModal("quit")}>편집끝내기</button>
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
                    <li className="blank">수정된 기록이 없습니다.</li>:
                    modifyHistory.map(
                        (history,index) => {
                            switch(history.history){
                                case "logStart":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            로그 시작
                                        </li>
                                    )
                                case "globalBackgroundColor":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            기본 배경색 변경
                                        </li>
                                    )
                                case "globalFontFamily":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            기본 폰트 변경
                                        </li>
                                    )
                                case "globalBackgroundImage":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            기본 배경이미지 변경
                                        </li>
                                    )
                                case "globalBackgroundPosition":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            기본 배경 위치 변경
                                        </li>
                                    )
                                case "globalBackgroundRepeat":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            기본 배경 반복 변경
                                        </li>
                                    )
                                case "globalBackgroundSize":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            기본 배경 크기 변경
                                        </li>
                                    )
                                case "globalFontColor":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            기본 폰트 컬러 변경
                                        </li>
                                    )
                                case "addBlock":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            블럭이 추가됨
                                        </li>
                                    )
                                case "addContents":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            블럭에 컨텐츠 추가됨
                                        </li>
                                    )
                                case "removeBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                            블럭이 삭제됨
                                        </li>
                                    )
                                case "copyBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faCopy}/>
                                            블럭이 복제됨
                                        </li>
                                    )
                                case "sortBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faSort}/>
                                            블럭순서 변경됨
                                        </li>
                                    )
                                case "paddingTop":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltV}/>
                                            블럭 상단 여백 변경됨
                                        </li>
                                    )
                                case "paddingBottom":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltV}/>
                                            블럭 하단 여백 변경됨
                                        </li>
                                    )
                                case "container":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltH}/>
                                            블럭 좌우 여백 변경됨
                                        </li>
                                    )
                                case "backgroundColor":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faFillDrip}/>
                                            배경색 변경됨
                                        </li>
                                    )
                                case "sortContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faSort}/>
                                            블럭 내 컨텐츠 순서 변경됨
                                        </li>
                                    )
                                case "removeContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                            블럭 내 컨텐츠 삭제됨
                                        </li>
                                    )
                                case "grid":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTh}/>
                                            블럭내 컨텐츠 가로 개수 변경됨
                                        </li>
                                    )
                                case "modifyContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            컨텐츠 수정됨
                                        </li>
                                    )
                                case "titleContent":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            타이틀 내용 수정됨
                                        </li>
                                    )
                                case "titleFontFamily":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            타이틀 폰트 변경됨
                                        </li>
                                    )
                                case "titleColor":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            타이틀 컬러 변경됨
                                        </li>
                                    )
                                case "titleTextAlign":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            타이틀 정렬 변경됨
                                        </li>
                                    )
                                case "subTitleContent":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            서브 타이틀 내용 수정됨
                                        </li>
                                    )
                                case "subTitleFontFamily":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            서브 타이틀 폰트 변경됨
                                        </li>
                                    )
                                case "subTitleColor":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            서브 타이틀 컬러 변경됨
                                        </li>
                                    )
                                case "subTitleTextAlign":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            서브 타이틀 정렬 변경됨
                                        </li>
                                    )
                                case "displayPhoto":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            프로필사진 노출 여부 변경됨
                                        </li>
                                    );
                                case "displayName":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            프로필 이름 노출여부 변경됨
                                        </li>
                                    );
                                case "displayBirthDate":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            프로필 생년월일 노출여부 변경됨
                                        </li>
                                    );
                                case "displayPhone":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            프로필 전화번호 노출여부 변경됨
                                        </li>
                                    );
                                case "displayAddress":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            프로필 주소 노출여부 변경됨
                                        </li>
                                    );
                                case "displayMobile":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            프로필 휴대전화번호 노출여부 변경됨
                                        </li>
                                    );
                                case "historyLink":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            히스토리 링크 변경됨
                                        </li>
                                    );
                                case "skillBackground":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            스킬 배경색 변경됨
                                        </li>
                                    );
                                case "skillText":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            스킬명 색상 변경됨
                                        </li>
                                    );
                                case "skillBar":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            스킬 바 색상 변경됨
                                        </li>
                                    );
                                case "workGrid":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            작업물 가로개수 변경됨
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