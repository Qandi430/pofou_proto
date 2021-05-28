import React from 'react';

const ArchiveAbout = ({show}) => {
    return(
        <div className={`archiveAbout empty ${show}`}>
            <p>아직 이승재님의 자기소개가 없습니다.</p>
            <button>입력하기</button>
        </div>
    )
}

export default ArchiveAbout;