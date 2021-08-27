import { faImage, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { singleFileUpload } from '../../server/common/CommonServer';

const ImageContents = ({contents,toggleSpinnerModal,saveContents,removeContents}) => {

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

    return(
        <div className="contents">
            <div className="contentsController">
                <label className="changeImage" htmlFor={`changeContentsFile${contents.order}`}>
                    <FontAwesomeIcon icon={faImage}/>
                    <div className="customTooltip">
                        이미지변경
                    </div>
                    <input type="file" id={`changeContentsFile${contents.order}`} style={{display:"none"}} onChange={changeContentsFile}/>
                </label>
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
            <div dangerouslySetInnerHTML={{__html: contents.contents }}/>
        </div>
    )
}

export default ImageContents;