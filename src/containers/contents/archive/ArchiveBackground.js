import React, { Fragment } from 'react';
import { createArchiveConsumer } from '../../../context/archiveContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArchiveBackground = ({archive,editMode,changeBackgroundImage}) => {
    return(
        // <div className="archiveBackground" style={{backgroundColor:"#000000"}}>
        <div className="archiveBackground" style={ archive !== null && archive.backgroundImage !== null ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${archive.backgroundImage})`} : {backgroundColor:"#000000"}}>
            {
                editMode &&
                <Fragment>
                    <label htmlFor="archiveBgFile" className="addBg">
                        <span className="circle">
                            <FontAwesomeIcon icon={faPlus}/>
                        </span>
                        <h5>배경 사진 업로드</h5>
                        <p>권장 사이즈 2560 * 376px</p>
                    </label>
                    <input type="file" id="archiveBgFile" style={{display:"none"}} onChange={changeBackgroundImage}/>
                </Fragment>
            }
        </div>
    )
}

export default createArchiveConsumer(ArchiveBackground);