import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader,Button } from 'reactstrap';

const ImageSelectModal = ({isOpen,toggle,uploadForm,changeBeforeImage}) => {
    const [imageList,setImageList] = useState([]);
    const [selectedImage,setSelectedImage] = useState("");

    useEffect(() => {
        if(isOpen){
            let list = [];
            uploadForm.contentsList.forEach(
                contents => {
                    if(contents.type === "image"){
                        list.push(contents.contents.split('"')[1]);
                    }else if(contents.type === "grid"){
                        let split1 = contents.contents.split("src=");
                        for(let i = 1; i<split1.length; i++){
                            let split2 = split1[i].split('"');
                            list.push(split2[1])
                        }
                    }
                }
            )
            setImageList(list);
        }else{
            setImageList([]);
            setSelectedImage("");
        }
    },[isOpen,uploadForm]);

    const handleSelectImage = (image) => {
        setSelectedImage(image);
    }

    const submitSelectModal = () => {
        if(selectedImage === ""){
            alert("이미지를 선택해주세요.");
            return;
        }
        changeBeforeImage(selectedImage,true);
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg" id="imageSelectModal">
            <ModalHeader>
                작품내용 중 선택하기
            </ModalHeader>
            <ModalBody>
                <ul>
                    {
                        imageList.map(
                            (image,index) => 
                                <li key={index} className={`${selectedImage === image ? "on" : ""}`} onClick={() => handleSelectImage(image)}>
                                    <img src={`${image}`} alt=""/>
                                </li>
                        )
                    }
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>취소</Button>
                <Button color="info" onClick={submitSelectModal}>선택</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ImageSelectModal;