import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ArchiveProfile from '../../containers/contents/archive/ArchiveProfile';
import ArchiveTab from '../../containers/contents/archive/ArchiveTab';
import '../../resources/scss/contents/archive.scss';

const Archive = () => {
    return (
        <div className="archive">
            <div className="archiveBackground" style={{backgroundColor:"#000000"}}>
                <label htmlFor="archiveBgFile" className="addBg">
                    <span className="circle">
                        <FontAwesomeIcon icon={faPlus}/>
                    </span>
                    <h5>배경 사진 업로드</h5>
                    <p>권장 사이즈 2560 * 376px</p>
                </label>
                <input type="file" id="archiveBgFile" style={{display:"none"}}/>
            </div>
            <ArchiveProfile/>
            <ArchiveTab/>
        </div>
    )
}

export default Archive;