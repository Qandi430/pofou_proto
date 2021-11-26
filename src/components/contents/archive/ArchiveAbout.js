import React from 'react';
import { createArchiveConsumer } from '../../../context/archiveContext';

const ArchiveAbout = ({archive,show}) => {
    return(
        <div className={`archiveAbout empty ${show}`}>
            <p>아직 {archive.name}님의 자기소개가 없습니다.</p>
            <button>입력하기</button>
        </div>
    )
}

export default createArchiveConsumer(ArchiveAbout);