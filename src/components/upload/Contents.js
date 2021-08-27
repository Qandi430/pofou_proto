import React,{Fragment, useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faLongArrowAltDown, faLongArrowAltUp, faPlusCircle, faTh, faTimes } from '@fortawesome/free-solid-svg-icons';
import { multiFileUpload, singleFileUpload } from '../../server/common/CommonServer';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import { ReactSortable } from 'react-sortablejs';
const Contents = ({contents,removeContents,saveContents,toggleSpinnerModal}) => {

    const [openChangeUrlModal,setOpenCahngeUrlModal] = useState(false);
    const [openGridEditModal,setGridEditModal] = useState(false);
    
    const toggleChangeUrlModal = () => {
        setOpenCahngeUrlModal(!openChangeUrlModal);
    }

    const toggleGridEditModal = () => {
        setGridEditModal(!openGridEditModal);
    }

    const changeContentsFile = async(e) => {
        let form = new FormData();
        form.append("file",e.target.files[0]);
        const {data} = await singleFileUpload(form);
        toggleSpinnerModal(true);
        if(data.result === "success"){
            saveContents(contents.order,"contents",`<img src="https://storage.googleapis.com/pofou_repo/${data.fileName}" alt="" className="img-fluid"/>`);
        }else{
            alert("파일 업로드에 실패하였습니다.");
        }
        toggleSpinnerModal(false);
    }

    return (
        <div className={`contents ${contents.type}`}>
            <div className="contentsController">
                {
                    contents.type === "image" &&
                    <label className="changeImage" htmlFor={`changeContentsFile${contents.order}`}>
                        <FontAwesomeIcon icon={faImage}/>
                        <div className="customTooltip">
                            이미지변경
                        </div>
                        <input type="file" id={`changeContentsFile${contents.order}`} style={{display:"none"}} onChange={changeContentsFile}/>
                    </label>
                }
                {
                    contents.type === "video" &&
                    <button className="changeUrl" onClick={toggleChangeUrlModal}>
                        <span>URL</span>
                        <div className="customTooltip">
                            URL 변경
                        </div>
                    </button>
                }
                {
                    contents.type === "grid" &&
                    <button className="changeGrid" onClick={toggleGridEditModal}>
                        <FontAwesomeIcon icon={faTh}/>
                        <div className="customTooltip">
                            그리드 편집
                        </div>
                    </button>
                }
                <button className="reOrderContents"><FontAwesomeIcon icon={faLongArrowAltUp}/>
                    <FontAwesomeIcon icon={faLongArrowAltDown}/>
                    <div className="customTooltip">
                        콘텐츠 재정렬
                    </div>
                </button>
                <button className="deleteContents" onClick={() => removeContents(contents.order)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                    <div className="customTooltip">
                        콘텐츠 삭제
                    </div>
                </button>
            </div>
            {
                contents.type === "text" ? <TextEditor contents={contents} saveContents={saveContents}/> : <div className={`${contents.type === "video" ? "videoWrapper" : ""}`} dangerouslySetInnerHTML={{__html: contents.contents }}/>
            }
            <ChangeUrlModal isOpen={openChangeUrlModal} toggle={toggleChangeUrlModal} saveContents={saveContents} contents={contents}/>
            <GridEditModal isOpen={openGridEditModal} toggle={toggleGridEditModal} saveContents={saveContents} contents={contents} toggleSpinnerModal={toggleSpinnerModal}/>
        </div>
    )
}

const ChangeUrlModal = ({isOpen,toggle,saveContents,contents}) => {

    const [url,setUrl] = useState("");

    useEffect(() => {
        if(!isOpen){
            setUrl("");
        }
    },[isOpen]);

    const changeUrl = (e) => {
        setUrl(e.target.value);
    }
    const submitChangeUrl = () => {
        const youtubeOption = 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen';
        const vimeoOption = 'frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen';
        let value = "";
        // https://www.youtube.com/watch?v=XvBRJeCPNDY
        // https://vimeo.com/584079874
        if(url.indexOf('youtube.com') > -1){
            const  id = url.split("v=")[1];
            value = `<iframe width="100%" src="https://www.youtube.com/embed/${id}" ${youtubeOption}></iframe>`;
        }else if(url.indexOf('vimeo.com') > -1){
            const id = url.split("/")[url.split("/").length -1];
            value = `<iframe width="100%" src="https://player.vimeo.com/video/${id}" ${vimeoOption}></iframe>`;
        }else{
            alert("https://를 포함한 전체 URL을 입력해주세요. (Youtube, Vimeo)");
            return;
        }
        saveContents(contents.order,"contents",value);
        toggle();
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader>
                동영상 URL 변경하기
            </ModalHeader>
            <ModalBody>
                <Input type="text" value={url} onChange={changeUrl} placeholder='https://를 포함한 전체 URL을 입력해주세요. (Youtube, Vimeo)'/>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>취소</Button>
                <Button color="info" onClick={submitChangeUrl}>변경</Button>
            </ModalFooter>
        </Modal>
    )
}

const TextEditor = ({contents,saveContents}) => {
    const editorRef = useRef(null);

    const setText = (newText) => {
        console.log(newText);
        saveContents(contents.order,"contents",newText);
    }
    return (
        <Fragment>
            <Editor
                apiKey='xnzor6w1w0gwbcvnoyzv4ihlra5dxheke89cg5itr0ob45kc'
                onInit={(evt, editor) => editorRef.current = editor}
                onEditorChange={(newText) => setText(newText)}
                init={{
                    placeholder : '여기에 텍스트 입력...',
                    menubar: false,
                    inline : true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'bold forecolor alignleft aligncenter alignright link fontsizeselect',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
        />
        </Fragment>
    )
}

const GridEditModal = ({isOpen,toggle,contents,saveContents,toggleSpinnerModal}) => {

    const [imageList,setImageList] = useState([]);

    useEffect(() => {
        if(isOpen){
            let newList = [];
            let newContents = JSON.parse(JSON.stringify(contents));
            let split1 = newContents.contents.split("src=");
            for(let i = 1; i<split1.length; i++){
                let split2 = split1[i].split('"');
                newList.push({index:i,value:String(split2[1])})
            }
            setImageList(newList);
        }else{
            setImageList([]);
        }
    },[isOpen]);

    const sortList = (newList) => {
        setImageList(newList)
    }

    const removeItem = (index) => {
        setImageList(
            imageList.filter(image => image.index !== index)
        )
    }

    const submitGridEdit = () => {
        let value = "<ul class='gridList'>";
        imageList.forEach(
            image => {
                value += `<li><img src="${image.value}" alt="" class="img-fluid"/></li>`
            }
        )
        value += "</ul>";
        saveContents(contents.order,"contents",value);
        toggle();
    }

    const uploadGridImage = async (e) => {
        if(e.target.files.length > 10){
            alert("10개 이상의 파일이 업로드 되었습니다.");
            return;
        }
        toggleSpinnerModal(true);
        let form = new FormData();
        for(let i = 0; i<e.target.files.length; i++){
            form.append('file',e.target.files[i])
        }
        
        const {data} = await multiFileUpload(form);
        if(data.result === "success"){
            let newList = [];
            data.fileNameList.forEach(
                (fileName,index) => {
                    newList.push({index:imageList.length + 1 + index,value:`https://storage.googleapis.com/pofou_repo/${fileName}`});
                }
            )
            setImageList(imageList.concat(newList));
        }else{
            alert("파일 업로드에 실패하였습니다.");
        }
        toggleSpinnerModal(false);
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} id="gridEditModal" centered size="xl">
            <ModalHeader>
                이미지 그리드 편집
                <label htmlFor="gridEditFileInput"><FontAwesomeIcon icon={faPlusCircle}/> 이미지 파일 추가</label>
                <input id="gridEditFileInput" multiple type="file" style={{display:"none"}} onChange={uploadGridImage}/>
            </ModalHeader>
            <ModalBody>
                <ReactSortable list={imageList} setList={newState => sortList(newState)} className="editList">
                    {
                        imageList.map(
                            image => 
                                <div className="listItem" key={image.index}>
                                    <img src={image.value} alt=""/>
                                    <button onClick={ () => {removeItem(image.index)}}><FontAwesomeIcon icon={faTimes}/></button>
                                </div>
                        )
                    }
                </ReactSortable>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>취소</Button>
                <Button color="info" onClick={submitGridEdit}>변경</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Contents;