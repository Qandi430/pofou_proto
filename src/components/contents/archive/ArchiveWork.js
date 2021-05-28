import React from 'react';
import { Link } from 'react-router-dom';

const ArchiveWork = ({show}) => {
    return (
        <div className={`archiveWork empty ${show}`}>
            아직 업로드한 작품이 없습니다.
            <Link to="/upload">지금 등록해보세요</Link>
        </div>
    )
}

export default ArchiveWork;