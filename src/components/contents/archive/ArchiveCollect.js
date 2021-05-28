import React from 'react';

const ArchiveCollect = ({show}) => {
    return(
        <div className={`archiveCollect empty ${show}`}>
            아직 콜렉트 한 작품이 없습니다.
        </div>
    )
}

export default ArchiveCollect;