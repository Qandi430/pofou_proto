import React from 'react';
import { Link } from 'react-router-dom';

const ResumeList = () => {
    return(
        <div className="resumeList">
            <div className="empty">
                등록된 이력서가 없습니다.
                <Link to="/resume/form">이력서 등록하기.</Link>
            </div>
        </div>
    )
}

export default ResumeList;