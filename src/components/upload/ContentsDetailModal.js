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
            category2 : uploadForm.category2, 
            tagList : uploadForm.tag === "" ? [] : uploadForm.tag.split(","),
            copyright : uploadForm.copyright,
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
                alert("?????? 2????????? ?????? ??? ??? ????????????.")
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

    const submitContentsDetail = async (type) => {
        let form = {};
        form["title"] = detailForm.title;
        form["thumbnail"] = detailForm.thumbnail;
        form["category1"] = detailForm.category1;
        form["category2"] = detailForm.category2;
        form["tag"] = "";
        detailForm.tagList.forEach(
            (tag,index) => form["tag"] +=  index === detailForm.tagList.length -1 ? `${tag}` : `${tag},`
        )
        form["copyright"] = detailForm.copyright;
        // await changeUploadDetail(form);
        if(type === "cancel"){
            changeUploadDetail(form);
        }else if(type === "private"){
            submitPrivate(form);
        }else if(type === "upload"){
            submitUpload(form);
        }
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
            alert("?????? ???????????? ?????????????????????.");
        }
        document.getElementById("gifInput").value = "";
        toggleSpinnerModal(false);
    }

    return (
        <Modal isOpen={isOpen} toggle={() => submitContentsDetail("cancel")} centered size="xl" id="contentsDetailModal">
            <ModalHeader>????????? ????????????</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="3" className="imageForm">
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">????????? ?????????<span>(??????)</span></h5>
                            </div>
                            <div className="inputBox">
                                <div className={`imageBox ${uploadForm.thumbnail === "" ? "empty" :""}`}>
                                    {detailForm.thumbnail !== "" && <img src={`https://storage.googleapis.com/pofou_repo/${detailForm.thumbnail}`} alt=""/>}
                                </div>
                                <div className="btnBox">
                                    {/* <button onClick={toggleImageSelectModal}>
                                    
                                        <FontAwesomeIcon icon={faImage}/>
                                        <p>????????? ??????</p>
                                    </button> */}
                                    <label htmlFor="thumbnailInput">
                                        <FontAwesomeIcon icon={faUpload}/>
                                        <p>?????? ?????????</p>
                                        <input type="file" style={{display:"none"}} id="thumbnailInput" onChange={changeBeforeImage} accept="image/jpg, image/jpeg, image/png"/>
                                    </label>
                                    <label htmlFor="gifInput">
                                        <FontAwesomeIcon icon={faPhotoVideo}/>
                                        <p>GIF??? ?????????</p>
                                        <input type="file" style={{display:"none"}} id="gifInput" onChange={uploadGif} accept="image/gif"/>
                                    </label>
                                </div>
                                <p>????????? ????????? ?????? ???????????? 380x380 ?????????</p>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col className="lineBox">
                        <div className="line"/>
                    </Col>
                    <Col md="8" className="detailForm">
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">????????? ?????? <span>(??????)</span></h5>
                            </div>
                            <div className="inputBox">
                                <Input type="text" placeholder="????????? ????????? ???????????????." value={detailForm.title} onChange={e => changeDetailForm("title",e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="titleBox">
                                <h5 className="formTitle">????????? ???????????? <span>(??????)</span></h5>
                                <p>????????? ??????????????? ?????? 2????????? ???????????? ??? ????????????.</p>
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
                                <h5 className="formTitle">????????? ??????</h5>
                            </div>
                            <div className="inputBox">
                                <Input id="tagInput" placeholder="Tab, Enter??? ???????????? ??????????????????." onKeyDown={addTag}/>
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
                                <h5 className="formTitle">????????? (CCL)</h5>
                            </div>
                            <div className="inputBox">
                                <select onChange={e => changeDetailForm("copyright",e.target.value)}>
                                    <option value="">CCL ?????? ??????</option>
                                    <option value="BY">???????????????</option>
                                    <option value="BY-NC">???????????????-?????????</option>
                                    <option value="BY-ND">???????????????-????????????</option>
                                    <option value="BY-SA">???????????????-????????????????????????</option>
                                    <option value="BY-NC-SA">???????????????-?????????-????????????????????????</option>
                                    <option value="BY-NC-ND">???????????????-?????????-????????????</option>
                                </select>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => submitContentsDetail("cancel")}>??????</Button>
                <Button color="warning" onClick={() => submitContentsDetail("private")}>???????????? ??????</Button>
                <Button color="info" onClick={() => submitContentsDetail("upload")}>??????</Button>
            </ModalFooter>
            <ThumbnailCreateModal beforeImage={beforeImage} saveImage={changeThumbnailImage} changeBeforeImage={changeBeforeImage}/>
            <ImageSelectModal isOpen={openImageSelectModal} toggle={toggleImageSelectModal} uploadForm={uploadForm} changeBeforeImage={changeBeforeImage}/>
        </Modal>
    )
}


export default ContentsDetailModal;