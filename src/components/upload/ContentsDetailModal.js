import { faImage, faPhotoVideo, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect,useState} from 'react';
import { Col, Input, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row,Button } from 'reactstrap';
import { getCategoryCodeList, singleFileUpload } from '../../server/common/CommonServer';
import AvartaCreateModal from '../common/AvataCreateModal';
import ImageSelectModal from './ImageSelectModal';
import ThumbnailCreateModal from './ThumbnailCreateModal';


const ContentsDetailModal = ({isOpen,toggle,uploadForm,changeUploadDetail,toggleSpinnerModal,submitUpload,submitPrivate}) => {
    const [detailForm,setDetailForm] = useState({
       title : "",
       thumbnail : "",
       category1 : "",
       category2 : "", 
       tagList : [],
       copyright : "",
    });
    const [keywordList,setKeywordList] = useState([]);
    const [beforeImage,setBeforeImage] = useState(null);
    const [openImageSelectModal,setOpenImageSelectModal] = useState(false);

    useEffect(() => {
        initCategory();
    },[]);

    useEffect(() => {
        setDetailForm({
            title : uploadForm.title,
            thumbnail : uploadForm.thumbnail,
            category1 : uploadForm.category1,
            category2 : uploadForm, 
            tagList : [],
            copyright : "",
        })
    },[uploadForm])

    const initCategory = async () => {
        const {data} = await getCategoryCodeList();;
        setKeywordList(data);
    };

    const changeDetailForm = (name,value) => {
        if(name === "category"){
            if(detailForm.category1 === ""){
                name = "category1";
            }else if(detailForm.category1 === value){
                name = "category1";
                value = "";
            }else if(detailForm.category2 === ""){
                name = "category2";
            }else if(detailForm.category2 === value){
                name = "category2";
                value = "";
            }else{
                alert("최대 2개까지 설정 할 수 있습니다.")
                return false;
            }
        }
        setDetailForm({
            ...detailForm,
            [name] : value
        })
    };

    const addTag = (e) => {
        if(e.key === "Enter" || e.key === "Tab"){
            e.preventDefault();
            setDetailForm({
                ...detailForm,
                tagList : detailForm.tagList.concat(e.target.value)
            })
            document.getElementById("tagInput").value = "";
        }
    }

    const removeTag = (index) => {
        setDetailForm({
            ...detailForm,
            tagList : detailForm.tagList.filter((tag,i) => i !== index)
        })
    }

    const changeBeforeImage = (e,file) => {
        if(file !== undefined){
            setBeforeImage(e);
            // console.log(e);
        }else{
            setBeforeImage(e.target.files[0])
        }    
    }

    const changeThumbnailImage = (image) => {
        setDetailForm({
            ...detailForm,
            thumbnail : image
        })
        setBeforeImage(null);
        setOpenImageSelectModal(false);
    }

    const toggleImageSelectModal = () => {
        setOpenImageSelectModal(!openImageSelectModal)
    }

    const submitContentsDetail = () => {
        let form = {};
        form["title"] = detailForm.title;
        form["thumbnail"] = detailForm.thumbnail;
        form["category1"] = detailForm.category1;
        form["category2"] = detailForm.category2;
        form["tag"] = "";
        console.log(detailForm.tagList,JSON.stringify(detailForm.tagList));
        detailForm.tagList.forEach(
            (tag,index) => form["tag"] +=  index === detailForm.tagList.length -1 ? `${tag}` : `${tag},`
        )
        form["copyright"] = detailForm.copyright;
        changeUploadDetail(form);
    }

    const uploadGif = async(e) => {
        console.log(e);
        toggleSpinnerModal(true);
        let form = new FormData();
        form.append("file",e.target.files[0]);
        const {data} = await singleFileUpload(form);
        if(data.result === "success"){
            changeThumbnailImage(data.fileName);
        }else{
            alert("파일 업로드에 실패하였습니다.");
        }
        document.getElementById("gifInput").value = "";
        toggleSpinnerModal(false);
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="xl" id="contentsDetailModal">
            <ModalHeader>콘텐츠 세부설정</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="3" className="imageForm">
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">콘텐츠 썸네일<span>(필수)</span></h5>
                            </div>
                            <div className="inputBox">
                                <div className={`imageBox ${uploadForm.thumbnail === "" ? "empty" :""}`}>
                                    {detailForm.thumbnail !== "" && <img src={`https://storage.googleapis.com/pofou_repo/${detailForm.thumbnail}`} alt=""/>}
                                </div>
                                <div className="btnBox">
                                    {/* <button onClick={toggleImageSelectModal}>
                                    
                                        <FontAwesomeIcon icon={faImage}/>
                                        <p>내용중 선택</p>
                                    </button> */}
                                    <label htmlFor="thumbnailInput">
                                        <FontAwesomeIcon icon={faUpload}/>
                                        <p>새로 업로드</p>
                                        <input type="file" style={{display:"none"}} id="thumbnailInput" onChange={changeBeforeImage} accept="image/jpg, image/jpeg, image/png"/>
                                    </label>
                                    <label htmlFor="gifInput">
                                        <FontAwesomeIcon icon={faPhotoVideo}/>
                                        <p>GIF로 업로드</p>
                                        <input type="file" style={{display:"none"}} id="gifInput" onChange={uploadGif} accept="image/gif"/>
                                    </label>
                                </div>
                                <p>콘텐츠 썸네일 권장 사이즈는 380x380 입니다</p>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col className="lineBox">
                        <div className="line"/>
                    </Col>
                    <Col md="8" className="detailForm">
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">콘텐츠 제목 <span>(필수)</span></h5>
                            </div>
                            <div className="inputBox">
                                <Input type="text" placeholder="콘텐츠 제목을 입력하세요." value={detailForm.title} onChange={e => changeDetailForm("title",e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">콘텐츠 카테고리 <span>(필수)</span></h5>
                                <p>콘텐츠 카테고리는 최대 2개까지 선택하실 수 있습니다.</p>
                            </div>
                            <div className="inputBox">
                                <ul className="categoryList">
                                    {
                                        (uploadForm !== null && uploadForm !== undefined )&&
                                        keywordList.map(
                                            (keyword,index) => (
                                                <li className="customCheckbox" key={index}>
                                                    <input id={`category${index}`} type='checkbox' value={keyword.code} checked={detailForm.category1 === keyword.code || detailForm.category2 === keyword.code } onChange={e => changeDetailForm("category",e.target.value)} />
                                                    <label htmlFor={`category${index}`}>
                                                        <span></span>
                                                        {keyword.kor}
                                                        <ins><i>{keyword.kor}</i></ins>
                                                    </label>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">콘텐츠 태그</h5>
                            </div>
                            <div className="inputBox">
                                <Input id="tagInput" placeholder="Tab, Enter로 구분하여 입력해주세요." onKeyDown={addTag}/>
                                <ul className="tagList">
                                    {
                                        detailForm.tagList.map(
                                            (tag,index) => <li key={index}>{tag} <button onClick={() => removeTag(index)}><FontAwesomeIcon icon={faTimes}/></button></li>
                                        )
                                    }
                                </ul>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">저작권 (CCL)</h5>
                            </div>
                            <div className="inputBox">
                                <select onChange={e => changeDetailForm("copyright",e.target.value)}>
                                    <option value="">CCL 표시 안함</option>
                                    <option value="BY">저작자표시</option>
                                    <option value="BY-NC">저작자표시-비영리</option>
                                    <option value="BY-ND">저작자표시-변경금지</option>
                                    <option value="BY-SA">저작자표시-동일조건변경허락</option>
                                    <option value="BY-NC-SA">저작자표시-비영리-동일조건변경허락</option>
                                    <option value="BY-NC-ND">저작자표시-비영리-변경금지</option>
                                </select>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>취소</Button>
                <Button color="warning" onClick={submitPrivate}>비공개로 저장</Button>
                <Button color="info" onClick={submitUpload}>저장</Button>
            </ModalFooter>
            <ThumbnailCreateModal beforeImage={beforeImage} saveImage={changeThumbnailImage} changeBeforeImage={changeBeforeImage}/>
            <ImageSelectModal isOpen={openImageSelectModal} toggle={toggleImageSelectModal} uploadForm={uploadForm} changeBeforeImage={changeBeforeImage}/>
        </Modal>
    )
}


export default ContentsDetailModal;