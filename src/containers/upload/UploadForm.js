
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
import { getWorkDetailForUpdate, upload } from '../../server/work/WorkServer';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import iconImage from '../../resources/images/upload/icon_image.png';
import iconText from '../../resources/images/upload/icon_text.png';
import iconVideo from '../../resources/images/upload/icon_video.png';
import iconGrid from '../../resources/images/upload/icon_grid.png';
import iconAlign from '../../resources/images/upload/icon_align.png';
import iconBg from '../../resources/images/upload/icon_bg.png';
import iconMargin from '../../resources/images/upload/icon_margin.png';

const UploadForm = ({history,openSpinnerModal,toggleSpinnerModal,match}) => {
    const [uploadForm,setUploadForm] = useState({
        memberNumber : "",
        workNumber : "",
        title : "",
        backgroundColor : "#ffffff",
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
                alert("????????? ???????????????.");
                history.push("/");
            }else{
                const loginMember = jwtDecode(memberToken);
                if(match.params.workNumber !== undefined){
                    getWork(match.params.workNumber,loginMember.member)
                }else{
                    setUploadForm({
                        ...uploadForm,
                        memberNumber : loginMember.member.memberNumber
                    })
                }
            }
        }
    },[uploadForm,history,match]);
    

    const getWork = async(workNumber,loginMember) => {
        toggleSpinnerModal(true);
        const {data} = await getWorkDetailForUpdate(workNumber);
        if(data){
            if(data.memberNumber !== loginMember.memberNumber){
                alert("????????? ???????????? ????????? ??? ????????????.");
                history.push("/");    
            }else{
                setUploadForm(data);
            }
        }else{
            alert("????????? ???????????????.");
            history.push("/");
        }
        toggleSpinnerModal(false);
    }

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
        
        const newContents = uploadForm.contentsList.map(content => content.order === order ? {...content,[name]:value} : content);
        console.log(order,name,value,newContents);
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
            alert("????????? ????????? ????????? ?????????.");
            
            return false;
        }
        if(uploadForm.thumbnail === ""){
            alert("????????? ???????????? ????????? ?????????.");
            
            return false;
        }
        if(uploadForm.category1 === "" || uploadForm.category2 === "" ){
            alert("??????????????? ????????? ?????????.");
            
            return false;
        }
        if(uploadForm.contentsList.length <= 0){
            alert("1??? ????????? ???????????? ???????????????.");
            return false;
        }
        for(let i = 0; i<uploadForm.contentsList.length; i++){
            if(uploadForm.contentsList[i].contents === ""){
                alert("????????? ?????? ???????????? ???????????????.");
                return false;
            }
        }
        return true;
    }

    const submitUpload = async(form) => {
        if(!confirmUploadForm()) return;
        toggleSpinnerModal(true);
                
        uploadForm.title = form.title;
        uploadForm.thumbnail = form.thumbnail;
        uploadForm.category1 = form.category1;
        uploadForm.category2 = form.category2;
        uploadForm.tag = form.tag;
        uploadForm.status = "public";

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

    const submitPrivate = async (form) => {
        if(!confirmUploadForm()) return;
        toggleSpinnerModal(true);
        uploadForm.title = form.title;
        uploadForm.thumbnail = form.thumbnail;
        uploadForm.category1 = form.category1;
        uploadForm.category2 = form.category2;
        uploadForm.tag = form.tag;
        uploadForm.status = "private";

        
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
        toggleSpinnerModal(false);
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
                            <Input type="text" placeholder="????????? ????????? ??????????????????." value={uploadForm.title} onChange={ e => changeUploadForm("title",e.target.value)}/>
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
                                                                return <div key={index} className="contentsPreset">????????? ??????????????????.</div>
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
                                    <p>???????????? ???????????? ???????????? ???????????????.</p>
                                    <ul>
                                        <li>
                                            <button onClick={() => addContents("image")}><img src={iconImage} alt="" /></button>
                                            <p>?????????</p>
                                        </li>
                                        <li>
                                            <button onClick={() => addContents("text")}><img src={iconText} alt="" /></button>
                                            <p>?????????</p>
                                        </li>
                                        <li>
                                            <button onClick={() => addContents("video")}><img src={iconVideo} alt="" /></button>
                                            <p>?????????</p>
                                        </li>
                                        <li>
                                            <button onClick={() => addContents("grid")}><img src={iconGrid} alt="" /></button>
                                            <p>????????? ?????????</p>
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
                                        {/* <FontAwesomeIcon icon={faImages}/> */}
                                        <img src={iconImage} alt="" />
                                        ?????????
                                    </li>
                                    <li onClick={() => addContents("grid")}>
                                        {/* <FontAwesomeIcon icon={faTh}/> */}
                                        <img src={iconGrid} alt="" />
                                        ?????????<br />
                                        ?????????
                                    </li>
                                    <li onClick={() => addContents("text")}>
                                        {/* <FontAwesomeIcon icon={faKeyboard}/> */}
                                        <img src={iconText} alt="" />
                                        ?????????
                                    </li>
                                    <li onClick={() => addContents("video")}>
                                        {/* <FontAwesomeIcon icon={faVideo}/> */}
                                        <img src={iconVideo} alt="" />
                                        ?????????
                                    </li>
                                    <li onClick={toggleContentsSortModal}>
                                        {/* <FontAwesomeIcon icon={faImages}/> */}
                                        <img src={iconAlign} alt="" />
                                        ?????????<br />
                                        ??????
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="contentsSetting setting2">
                                <ul>
                                    <li onClick={toggleContentsSortModal}>
                                        <FontAwesomeIcon icon={faImages}/>
                                        ????????? ?????????
                                    </li>
                                    <li onClick={toggleContentsDetailModal}>
                                        <FontAwesomeIcon icon={faKeyboard}/>
                                        ?????? ?????? ??????
                                    </li>
                                </ul>
                            </div> */}
                            <div className="contentsSetting setting3">
                                <div className="background">
                                    <label htmlFor="contentsBackgroundColor">
                                        <div style={{backgroundColor:`${uploadForm.backgroundColor}`}}></div>
                                    </label>
                                    <p>
                                        ?????? ?????? 
                                    </p>
                                    <span>{uploadForm.backgroundColor}</span>
                                    <Input type="color"  id="contentsBackgroundColor" value={uploadForm.backgroundColor} onChange={e => changeUploadForm("backgroundColor",e.target.value)}/>
                                    {/* <dd>
                                        <label htmlFor="contentsBackgroundColor">
                                            <dl>
                                                <dt style={{backgroundColor:`${uploadForm.backgroundColor}`}}></dt>
                                                <dd>{uploadForm.backgroundColor}</dd>
                                            </dl>
                                        </label>
                                        <Input type="color"  id="contentsBackgroundColor" onChange={e => changeUploadForm("backgroundColor",e.target.value)}/>
                                    </dd> */}
                                </div>
                                <dl className="margin">
                                    <dt><img src={iconMargin} alt="" /> ????????? ?????? <span>{uploadForm.margin}px</span></dt>
                                    <dd>
                                        <Input type="range" value={uploadForm.margin} min="0" max="100" onChange={ e => changeUploadForm("margin",e.target.value)}/>
                                    </dd>
                                </dl>
                            </div>
                            <div className="btnBox">
                                <Button className="btnPreview">????????????</Button>
                                <Button className="btnUpload" onClick={toggleContentsDetailModal}>?????????</Button>
                                {/* <Button className="btnPrivate" onClick={submitPrivate}>???????????? ????????????</Button> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <PackmanLoader isOpen={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal}/>
            <ContentsSortModal isOpen={openContentsSortModal} toggle={toggleContentsSortModal} contentsList={uploadForm.contentsList} saveList={saveList}/>
            <ContentsDetailModal isOpen={openContentsDetailModal} toggle={toggleContentsDetailModal} uploadForm={uploadForm} changeUploadDetail={changeUploadDetail} toggleSpinnerModal={toggleSpinnerModal} submitUpload={submitUpload} submitPrivate={submitPrivate}/>
            <ResultModal result={uploadResult} closedResultModal={closedResultModal}/>
        </div>
    )
}

export default createCommonConsumer(UploadForm);