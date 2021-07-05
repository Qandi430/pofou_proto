import React from 'react';
import { Link } from 'react-router-dom';

const DesignHeader = () => {
    return (
        <header className="designHeader">
            <div className="headerLeft">
                <button>메뉴 설정</button>
                <button>사이트 설정</button>
            </div>
            <div className="headerRight">
                <button>저장 하기</button>
                <Link to="/portfolio/management">편집 끝내기</Link>
            </div>
        </header>
    )
}

export default DesignHeader;