import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { multiFileUpload, singleFileUpload } from '../../server/common/CommonServer';

const GridDropzone = ({contents,toggleSpinnerModal,saveContents}) => {

    const onDrop = useCallback( async acceptedFiles => {
        if(acceptedFiles.length > 10){
            alert("10개 이상의 파일이 업로드 되었습니다.");
        }else{
            uploadImage(acceptedFiles);
        }
    },[]);

    const uploadImage = async(files) => {
        toggleSpinnerModal(true);
        let form = new FormData();
        files.map(
            file => form.append('file',file)
        )
        const {data} = await multiFileUpload(form);
        if(data.result === "success"){
            let value = "<ul class='gridList'>";
            data.fileNameList.forEach(
                fileName => {
                    value += `<li><img src="https://storage.googleapis.com/pofou_repo/${fileName}" alt="" class="img-fluid"/></li>`
                }
            )
            value += "</ul>";
            saveContents(contents.order,"contents",value);
        }else{
            alert("파일 업로드에 실패하였습니다.");
        }
        toggleSpinnerModal(false);
    }
    
    const { getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div {...getRootProps({className:`dropzone contents imageDropzone`})}>
            <input {...getInputProps()}/>
            <button><FontAwesomeIcon icon={faTh}/></button>
            <h6>파일을 선택하여 이미지 그리드(최대 10장)를 시작하세요.</h6>
            <p>이미지 당 최대 10MB의 JPG,PNG,GIF 이미지 파일</p>
        </div>
    )
}

export default GridDropzone;