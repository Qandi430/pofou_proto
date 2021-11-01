import React from 'react';

const Filters = () => {
    return (
        <div className="filters">
            <ul>
                <li><button>포포유 픽</button></li>
                <li><button>최신순</button></li>
                <li><button>추천순</button></li>
                <li className="line">|</li>
                <li><button>전체기간</button></li>
                <li><button>전체분야</button></li>
            </ul>    
        </div>
    )
}

export default Filters;