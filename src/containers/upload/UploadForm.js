
import { faImages, faKeyboard,faPlus,faSearch,faTh, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react';
import { Container, Input,Row,Col, Button } from 'reactstrap';
import PackmanLoader from '../../components/common/PackmanLoader';
import Contents from '../../components/upload/Contents';
import ContentsDetailModal from '../../components/upload/ContentsDetailModal';
import ContentsSortModal from '../../components/upload/ContentsSortModal';
import GridDropzone from '../../components/upload/GridDropzone';
import ImageDropzone from '../../components/upload/ImageDropzone';
import ResultModal from '../../components/upload/ResultModal';
import VideoUpload from '../../components/upload/VideoUpload';
import {createCommonConsumer} from '../../context/commonContext';
import { upload } from '../../server/work/WorkServer';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

const UploadForm = ({isLogin,history,loginMember,openSpinnerModal,toggleSpinnerModal}) => {
    const [uploadForm,setUploadForm] = useState({
        memberNumber : "",
        workNumber : "",
        title : "",
        backgroundColor : "#FFFFFF",
        margin : 0,
        thumbnail : "",
        category1 : "",
        category2 : "",
        tag : "",
        copyright : "",
        status : "",
        contentsList : [
            
        ],
    });
    const [openContentsSortModal,setOpenContentsSortModal] = useState(false);
    const [openContentsDetailModal, setOpenContentsDetailModal] = useState(false);
    const [uploadResult,setUploadResult] = useState("");
    const [openAddButton,setOpenAddButton] = useState(-1);
    
    useEffect(() => {
        if(uploadForm.memberNumber === ""){
            const memberToken = cookie.load("memberToken");
            if(memberToken === undefined){
                alert("잘못된 접근입니다.");
                history.push("/");
            }else{
                const loginMember = jwtDecode(memberToken);
                setUploadForm({
                    ...uploadForm,
                    memberNumber : loginMember.member.memberNumber
                })
            }
        }
    },[uploadForm,history]);

    const addContents = async (type,order) => {
        
        let newContents = {
            order : uploadForm.contentsList.length,
            type : type,
            contents : "",
            container : true,
        }
        if(order === undefined){
            await setUploadForm({
                ...uploadForm,
                contentsList : uploadForm.contentsList.concat(newContents)
            });
        }else{
            let newList = JSON.parse(JSON.stringify(uploadForm.contentsList));
            newContents.order = order + 1;
            newList.forEach(
                contents => {
                    contents.order = contents.order >= newContents.order ? contents.order +1 : contents.order 
                }
            );
            
            newList.splice(newContents.order,0,newContents);
            await  setUploadForm({
                ...uploadForm,
                contentsList : newList
            });
            setOpenAddButton(-1);
        };
        window.scrollTo({top:document.getElementsByClassName("contents")[order === undefined ? uploadForm.contentsList.length : order+1].offsetTop, behavior:"smooth"});
    };

    const changeUploadForm = (name,value) => {
        setUploadForm({
            ...uploadForm,
            [name] : value,
        })
    }

    const saveContents = (order,name,value) => {
        // console.log(order,name,value)
        setUploadForm({
            ...uploadForm,
            contentsList : uploadForm.contentsList.map(content => content.order === order ? {...content,[name]:value} : content)
        }) 
    }

    const removeContents = (order) => {
        uploadForm.contentsList = uploadForm.contentsList.filter(contents => contents.order !== order);
        setUploadForm({
            ...uploadForm,
            contentsList : uploadForm.contentsList.map((contents,index) => ({...contents,order: index}))
        })
    }

    const toggleContentsSortModal = () => {
        setOpenContentsSortModal(!openContentsSortModal);
    }

    const saveList = (list) => {
        setUploadForm({
            ...uploadForm,
            contentsList : list,
        });
        
    }

    const toggleContentsDetailModal = () => {
        setOpenContentsDetailModal(!openContentsDetailModal)
    }

    const changeUploadDetail = (form) => {
        setUploadForm({
            ...uploadForm,
            title : form.title,
            thumbnail : form.thumbnail,
            category1 : form.category1,
            category2 : form.category2,
            tag : form.tag,
        })
        toggleContentsDetailModal();
    }

    const confirmUploadForm = () => {
        if(uploadForm.title === ""){
            alert("콘텐츠 제목을 입력해 주세요.");
            toggleContentsDetailModal();
            return false;
        }
        if(uploadForm.thumbnail === ""){
            alert("썸네일 이미지를 등록해 주세요.");
            toggleContentsDetailModal();
            return false;
        }
        if(uploadForm.category1 === "" || uploadForm.category2 === "" ){
            alert("카테고리를 선택해 주세요.");
            toggleContentsDetailModal();
            return false;
        }
        if(uploadForm.contentsList.length <= 0){
            alert("1개 이상의 컨텐츠가 필요합니다.");
            return false;
        }
        for(let i = 0; i<uploadForm.contentsList.length; i++){
            if(uploadForm.contentsList[i].contents === ""){
                alert("내용이 없는 컨텐츠가 존재합니다.");
                return false;
            }
        }
        return true;
    }

    const submitUpload = async() => {
        if(!confirmUploadForm()) return;
        toggleSpinnerModal(true);
        setUploadForm({
            ...uploadForm,
            status : "public"
        })
        const {data : uploadResult} = await upload(uploadForm);
        if(uploadResult.result){
            setUploadForm({
                ...uploadForm,
                workNumber : uploadResult.workNumber
            });
            setUploadResult("success");
        }else{
            setUploadResult("success");
        }
        toggleSpinnerModal(false);
    }

    const submitPrivate = async () => {
        if(!confirmUploadForm()) return;
        toggleSpinnerModal(true);
        setUploadForm({
            ...uploadForm,
            status : "private"
        })
        console.log("private",uploadForm);
        toggleSpinnerModal(false);
        const {data : uploadResult} = await upload(uploadForm);
        if(uploadResult.result){
            setUploadForm({
                ...uploadForm,
                workNumber : uploadResult.workNumber
            });
            setUploadResult("success");
        }else{
            setUploadResult("fail");    
        }
    }

    const closedResultModal = () => {
        setUploadResult("")
    }

    const toggleAddButton = (index) => {
        if(openAddButton === index){
            setOpenAddButton(-1);
        }else{
            setOpenAddButton(index);
        }
    }
    
    return (
        <div>
            <Container>
                <Row>
                    <Col md={10} className="uploadForm">
                        <div className="titleBox">
                            <Input type="text" placeholder="콘텐츠 제목을 입력해주세요." value={uploadForm.title} onChange={ e => changeUploadForm("title",e.target.value)}/>
                        </div>
                        <div className="contentsBox" style={{backgroundColor:`${uploadForm.backgroundColor}`}}>
                            {
                                uploadForm.contentsList.length > 0 ?
                                    uploadForm.contentsList.map(
                                        (contents,index) => 
                                            <Fragment key={index}>
                                                {
                                                    contents.contents === "" ?
                                                    (() => {
                                                        switch(contents.type){
                                                            case "image":
                                                                return (
                                                                    <ImageDropzone key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} uploadForm={uploadForm}/>
                                                                )
                                                            case "video":
                                                                return <VideoUpload key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} uploadForm={uploadForm}/>
                                                            case "text":
                                                                return <Contents key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} removeContents={removeContents} uploadForm={uploadForm}/>
                                                            case "grid":
                                                                return <GridDropzone key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} uploadForm={uploadForm}/>
                                                            case "dummy":
                                                                return "";
                                                            default :
                                                                return <div key={index} className="contentsPreset">오류가 발생했습니다.</div>
                                                        }
                                                    })()
                                                    :
                                                    <Contents key={contents.order} uploadForm={uploadForm} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} removeContents={removeContents} toggleContentsSortModal={toggleContentsSortModal}/>
                                                }
                                                <div className={`addContentsBox ${openAddButton === contents.order ? "on" : ""}`}>
                                                    <Button className="btnAddContents" onClick={() => toggleAddButton(contents.order)}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </Button>
                                                    <Button onClick={() => addContents("image",contents.order)}>
                                                        <FontAwesomeIcon icon={faImages}/>
                                                    </Button>
                                                    <Button onClick={() => addContents("text",contents.order)}>
                                                        <FontAwesomeIcon icon={faKeyboard}/>
                                                    </Button>
                                                    <Button onClick={() => addContents("video",contents.order)}>
                                                        <FontAwesomeIcon icon={faVideo}/>
                                                    </Button>
                                                    <Button onClick={() => addContents("grid",contents.order)}>
                                                        <FontAwesomeIcon icon={faTh}/>
                                                    </Button>
                                                </div>
                                            </Fragment>
                                            
                                    )
                                :
                                <div className="contentsPreset">
                                    <p>콘텐츠를 선택하여 업로드를 시작하세요.</p>
                                    <ul>
                                        <li>
                                            <button onClick={() => addContents("image")}><FontAwesomeIcon icon={faImages}/></button>
                                            <p>이미지</p>
                                        </li>
                                        <li>
                                            <button onClick={() => addContents("text")}><FontAwesomeIcon icon={faKeyboard}/></button>
                                            <p>텍스트</p>
                                        </li>
                                        <li>
                                            <button onClick={() => addContents("video")}><FontAwesomeIcon icon={faVideo}/></button>
                                            <p>동영상</p>
                                        </li>
                                        <li>
                                            <button onClick={() => addContents("grid")}><FontAwesomeIcon icon={faTh}/></button>
                                            <p>이미지 그리드</p>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>    
                    </Col>
                    <Col md={2} className="uploadSideBarWrap">
                        <div className="uploadSideBar">
                            <div className="contentsSetting setting1">
                                <ul>
                                    <li onClick={() => addContents("image")}>
                                        <FontAwesomeIcon icon={faImages}/>
                                        이미지 추가
                                    </li>
                                    <li onClick={() => addContents("text")}>
                                        <FontAwesomeIcon icon={faKeyboard}/>
                                        텍스트 추가
                                    </li>
                                    <li onClick={() => addContents("video")}>
                                        <FontAwesomeIcon icon={faVideo}/>
                                        동영상 추가
                                    </li>
                                    <li onClick={() => addContents("grid")}>
                                        <FontAwesomeIcon icon={faTh}/>
                                        이미지 그리드 추가
                                    </li>
                                </ul>
                            </div>
                            <div className="contentsSetting setting2">
                                <ul>
                                    <li onClick={toggleContentsSortModal}>
                                        <FontAwesomeIcon icon={faImages}/>
                                        콘텐츠 재정렬
                                    </li>
                                    <li onClick={toggleContentsDetailModal}>
                                        <FontAwesomeIcon icon={faKeyboard}/>
                                        세부 정보 설정
                                    </li>
                                </ul>
                            </div>
                            <div className="contentsSetting setting3">
                                <dl className="background">
                                    <dt>배경색상 설정</dt>
                                    <dd>
                                        <label htmlFor="contentsBackgroundColor">
                                            <dl>
                                                <dt style={{backgroundColor:`${uploadForm.backgroundColor}`}}></dt>
                                                <dd>{uploadForm.backgroundColor}</dd>
                                            </dl>
                                        </label>
                                        <Input type="color"  id="contentsBackgroundColor" onChange={e => changeUploadForm("backgroundColor",e.target.value)}/>
                                    </dd>
                                </dl>
                                <dl className="margin">
                                    <dt>콘텐츠 간격 설정</dt>
                                    <dd>
                                        <Input type="range" value={uploadForm.margin} min="0" max="100" onChange={ e => changeUploadForm("margin",e.target.value)}/>
                                        <span>{uploadForm.margin}px</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="btnBox">
                                <Button className="btnUpload" onClick={submitUpload}>업로드</Button>
                                <Button className="btnPrivate" onClick={submitPrivate}>비공개로 임시저장</Button>
                                <Button className="btnPreview"><FontAwesomeIcon icon={faSearch}/> 화면 미리보기</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <PackmanLoader isOpen={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal}/>
            <ContentsSortModal isOpen={openContentsSortModal} toggle={toggleContentsSortModal} contentsList={uploadForm.contentsList} saveList={saveList}/>
            <ContentsDetailModal isOpen={openContentsDetailModal} toggle={toggleContentsDetailModal} uploadForm={uploadForm} changeUploadDetail={changeUploadDetail} toggleSpinnerModal={toggleSpinnerModal}/>
            <ResultModal result={uploadResult} closedResultModal={closedResultModal}/>
        </div>
    )
}

export default createCommonConsumer(UploadForm);