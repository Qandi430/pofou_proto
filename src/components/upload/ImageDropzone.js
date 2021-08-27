import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { singleFileUpload } from '../../server/common/CommonServer';

const ImageDropzone = ({toggleSpinnerModal,contents,saveContents}) => {

    const onDrop = useCallback( async acceptedFiles => {
        if(acceptedFiles.length > 1){
            alert("1개 이상의 파일이 업로드 되었습니다.");
        }else{
            uploadImage(acceptedFiles);
        }
    },[]);

    const uploadImage = async(files) => {
        toggleSpinnerModal(true);
        let form = new FormData();
        form.append("file",files[0]);
        const {data} = await singleFileUpload(form);
        if(data.result === "success"){
            saveContents(contents.order,"contents",`<img src="https://storage.googleapis.com/pofou_repo/${data.fileName}" alt="" class="img-fluid"/>`);
        }else{
            alert("파일 업로드에 실패하였습니다.");
        }
        toggleSpinnerModal(false);
    }
    
    const { getRootProps, getInputProps} = useDropzone({onDrop});


    return(
        <div {...getRootProps({className:`dropzone contents imageDropzone`})}>
            <input {...getInputProps()}/>
            <button><FontAwesomeIcon icon={faImages}/></button>
            <h6>파일을 여기로 드래그 또는 파일을 선택해 주세요.</h6>
            <p>최대 10MB의 JPG,PNG,GIF 이미지 파일</p>
        </div>
    )   
}

export default ImageDropzone;