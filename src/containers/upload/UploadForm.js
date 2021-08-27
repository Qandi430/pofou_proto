
import { faImages, faKeyboard,faTh, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Container, Input,Row,Col } from 'reactstrap';
import PackmanLoader from '../../components/common/PackmanLoader';
import Contents from '../../components/upload/Contents';
import ContentsSortModal from '../../components/upload/ContentsSortModal';
import GridDropzone from '../../components/upload/GridDropzone';
import ImageDropzone from '../../components/upload/ImageDropzone';
import VideoUpload from '../../components/upload/VideoUpload';
import {createCommonConsumer} from '../../context/commonContext';

const UploadForm = ({isLogin,history,loginMember,openSpinnerModal,toggleSpinnerModal}) => {
    const [uploadForm,setUploadForm] = useState({
        memberNumber : "",
        workNumber : "",
        title : "",
        backgroundColor : "",
        margin : "",
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

    useEffect(() => {
        if(isLogin){
            if(uploadForm.memberNumber !== loginMember.memberNumber){
                setUploadForm({
                    ...uploadForm,
                    memberNumber : loginMember.memberNumber
                })
            }
        }else{
            alert("잘못된 접근입니다.");
            history.push("/");
        }
    },[isLogin,loginMember,uploadForm,history]);

    const addContents = (type) => {
        let newCotents = {
            order : uploadForm.contentsList.length,
            type : type,
            contents : "",
            container : true,
        }
        setUploadForm({
            ...uploadForm,
            contentsList : uploadForm.contentsList.concat(newCotents)
        })
    };

    const saveContents = (order,name,value) => {
        // console.log(order,name,value)
        setUploadForm({
            ...uploadForm,
            contentsList : uploadForm.contentsList.map(content => content.order === order ? {...content,[name]:value} : content)
        }) 
    }

    const saveEtc = (order,value) => {
        console.log(order,value);
        return new Promise(() => {
            setUploadForm({
                ...uploadForm,
                contentsList : uploadForm.contentsList.map(content => content.order === order ? {...content,etc:value} : content)
            })
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
    
    return (
        <div>
            <Container>
                <Row>
                    <Col md={9} className="uploadForm">
                        <div className="titleBox">
                            <Input type="text" placeholder="콘텐츠 제목을 입력해주세요."/>
                        </div>
                        <div className="contentsBox">
                            {
                                uploadForm.contentsList.length > 0 ?
                                    uploadForm.contentsList.map(
                                        (contents,index) => 
                                            contents.contents === "" ?
                                                (() => {
                                                    switch(contents.type){
                                                        case "image":
                                                            return <ImageDropzone key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents}/>
                                                        case "video":
                                                            return <VideoUpload key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} saveEtc={saveEtc}/>
                                                        case "text":
                                                            return <Contents key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} removeContents={removeContents}/>
                                                        case "grid":
                                                            return <GridDropzone key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents}/>
                                                        default :
                                                            return <div key={index} className="contentsPreset">오류가 발생했습니다.</div>
                                                    }
                                                })()
                                                :
                                                <Contents key={contents.order} contents={contents} toggleSpinnerModal={toggleSpinnerModal} saveContents={saveContents} removeContents={removeContents}/>
                                    )
                                :
                                <div className="contentsPreset">
                                    <p>콘텐츠를 선택하여 업로드를 시작하세요.</p>
                                    <ul>
                                        <li>
                                            <button><FontAwesomeIcon icon={faImages}/></button>
                                            <p>이미지</p>
                                        </li>
                                        <li>
                                            <button><FontAwesomeIcon icon={faKeyboard}/></button>
                                            <p>텍스트</p>
                                        </li>
                                        <li>
                                            <button><FontAwesomeIcon icon={faVideo}/></button>
                                            <p>동영상</p>
                                        </li>
                                        <li>
                                            <button><FontAwesomeIcon icon={faTh}/></button>
                                            <p>이미지 그리드</p>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>    
                    </Col>
                    <Col md={3} className="uploadSideBar">
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
                                <li>
                                    <FontAwesomeIcon icon={faKeyboard}/>
                                    세부 정보 설정
                                </li>
                            </ul>
                        </div>
                        <div className="contentsSetting setting3">
                            <dl className="background">
                                <dt>배경색상 설정</dt>
                                <dd>
                                    <Input type="color"  id="contentsBackgroundColor"/>
                                    <label htmlFor="contentsBackgroundColor">#FFFFFF</label>
                                </dd>
                            </dl>
                            <dl className="margin">
                                <dt>콘텐츠 간격 설정</dt>
                                <dd>
                                    <Input type="range"/>
                                    <Input type="text"/>
                                </dd>
                            </dl>
                        </div>
                    </Col>
                </Row>
            </Container>
            <PackmanLoader isOpen={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal}/>
            <ContentsSortModal isOpen={openContentsSortModal} toggle={toggleContentsSortModal} contentsList={uploadForm.contentsList}/>
        </div>
    )
}

export default createCommonConsumer(UploadForm);