import React from 'react';

const ArchiveLike = ({show}) => {
    return (
        <div className={`archiveLike empty ${show}`}>
            아직 Like 한 작품이 없습니다.
        </div>
    )
}

export default ArchiveLike;