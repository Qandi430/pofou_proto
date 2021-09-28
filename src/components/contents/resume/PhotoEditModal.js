import React,{useState,useRef,useEffect} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import ReactAvatarEditor from 'react-avatar-editor';
import defaultImage from '../../../resources/images/contents/resume/default_profile.png';
import { singleFileUpload } from '../../../server/common/CommonServer';

const PhotoEditModal = ({beforeImage,saveImage,toggleSpinnerModal,closePhotoEditModal}) => {
    const [open,setOpen] = useState(false);
    const editRef = useRef(null);
    
    const [editorConfig,setEditorConfig] = useState({
        image : defaultImage,
        width : 195,
        height : 260,
        border : 40,
        borderRadius : 0,
        color : [0, 0, 0, 0.6], // RGBA
        scale : 1.2,
        rotate: 0,
    });

    useEffect(() => {
        if(beforeImage){
            setOpen(true);
            if(beforeImage !== editorConfig.image){
                setEditorConfig({
                    ...editorConfig,
                    image : beforeImage,
                });
            }
        }else{
            setOpen(false);
            if(editorConfig.image !== defaultImage){
                setEditorConfig({
                    image : defaultImage,
                    width : 195,
                    height : 260,
                    border : 40,
                    borderRadius : 0,
                    color : [0, 0, 0, 0.6], // RGBA
                    scale : 1.2,
                    rotate: 0,
                })
            }
        }
    },[beforeImage,editorConfig]);

    const onClickSave = async() => {
        // console.log(editRef,editRef.current.getImageScaledToCanvas(),editRef.current.getImageScaledToCanvas().toDataURL(),editRef.current.getImageScaledToCanvas().toBlob());
        // saveImage(editRef.current.getImageScaledToCanvas().toDataURL());
        toggleSpinnerModal(true);
        const imgData = editRef.current.getImageScaledToCanvas().toDataURL();
        const blobBin = atob(imgData.split(",")[1]);    // base64 데이터 디코딩
        let array = [];
        for(let i = 0; i<blobBin.length; i++){
            array.push(blobBin.charCodeAt(i));
        }
        let file = new Blob([new Uint8Array(array)], {type: 'image/png',fileName:"profileImage"});	// Blob 생성
        file.name = "profileImage.png";
        file.lastModifiedDate = new Date();
        
        let form = new FormData();
        form.append("file",file);
        
        const {data : uploadResult} = await singleFileUpload(form);
        if(uploadResult.result === "success"){
            saveImage("photo",uploadResult.fileName);
        }else{
            alert("파일 업로드에 실패하였습니다.");
        }
        closePhotoEditModal();
        toggleSpinnerModal(false);
    }

    const scrollZoomInOut = (e) => {
        setEditorConfig({
            ...editorConfig,
            scale : Math.min(Math.max(1,editorConfig.scale + (e.deltaY * -0.01)),3) //scale 1~3
        });
    }

    return (
        <Modal isOpen={open} toggle={closePhotoEditModal} centered style={{width:"fit-content"}}>
            <ModalHeader>
                콘텐츠 썸네일 자르기
            </ModalHeader>
            <ModalBody>
                <ReactAvatarEditor
                    ref={editRef}
                    {...editorConfig}
                    onWheel={scrollZoomInOut}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={closePhotoEditModal} color="danger">취소</Button>
                <Button color="info" onClick={onClickSave}>저장</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PhotoEditModal
