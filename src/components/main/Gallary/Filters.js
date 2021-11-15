import React from 'react';
import { createMainConsumer } from '../../../context/mainContext';

const Filters = ({keywordList}) => {
    return (
        <div className="filters">
            <ul className="">
                <li className="on"><button>포포유 픽</button></li>
                <li><button>최신순</button></li>
                <li><button>추천순</button></li>
            </ul>
            <ul className="keywordFilters">
                <li className="on"><button>전체</button></li>
                {
                    keywordList !== null && keywordList !== undefined &&
                    keywordList.map(
                        keyword => 
                            <li key={keyword.code}>
                                <button>
                                    {keyword.kor}
                                </button>
                            </li>
                    )
                }
            </ul>
        </div>
    )
}

export default createMainConsumer(Filters);