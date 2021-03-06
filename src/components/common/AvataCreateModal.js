import React, { useEffect, useRef, useState } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import { Modal, ModalBody, ModalFooter, ModalHeader,Button } from 'reactstrap';
import defaultImage from '../../resources/images/contents/resume/default_profile.png';
import { singleFileUpload } from '../../server/common/CommonServer';

const AvartaCreateModal = ({beforeImage,saveImage}) => {

    const [open,setOpen] = useState(false);
    const editRef = useRef(null);
    const toggle = () => {
        setOpen(!open);
    }
    const [editorConfig,setEditorConfig] = useState({
        image : defaultImage,
        width : 300,
        height : 300,
        border : 40,
        borderRadius : 200,
        color : [0, 0, 0, 0.6], // RGBA
        scale : 1.2,
        rotate: 0,
    })
    
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
                    allowZoomOut: false,
                    width : 300,
                    height : 300,
                    border : 40,
                    borderRadius : 200,
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
        const imgData = editRef.current.getImageScaledToCanvas().toDataURL();
        const blobBin = atob(imgData.split(",")[1]);    // base64 ????????? ?????????
        let array = [];
        for(let i = 0; i<blobBin.length; i++){
            array.push(blobBin.charCodeAt(i));
        }
        let file = new Blob([new Uint8Array(array)], {type: 'image/png',fileName:"profileImage"});	// Blob ??????
        file.name = "profileImage.png";
        file.lastModifiedDate = new Date();
        
        let form = new FormData();
        form.append("file",file);
        
        const {data : uploadResult} = await singleFileUpload(form);
        if(uploadResult.result === "success"){
            saveImage(uploadResult.fileName);
        }else{
            alert("?????? ???????????? ?????????????????????.");
        }
    }

    const scrollZoomInOut = (e) => {
        setEditorConfig({
            ...editorConfig,
            scale : Math.min(Math.max(1,editorConfig.scale + (e.deltaY * -0.01)),3) //scale 1~3
        });
    }

    return(
        <Modal isOpen={open} toggle={toggle} centered style={{width:"fit-content"}}>
            <ModalHeader>
                ?????????
            </ModalHeader>
            <ModalBody>
                {/* <img src={defaultImage} alt="" className="img-fluid"/> */}
                <ReactAvatarEditor
                    ref={editRef}
                    {...editorConfig}
                    onWheel={scrollZoomInOut}
                />
                {/* <FormGroup>
                    ??????
                    <input
                        name="scale"
                        type="range"
                        onChange={handleScale}
                        min={editorConfig.allowZoomOut ? '0.1' : '1'}
                        max="2"
                        step="0.01"
                        value={editorConfig.scale}
                    />
                </FormGroup> */}
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle} color="danger">??????</Button>
                <Button color="info" onClick={onClickSave}>??????</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AvartaCreateModal;