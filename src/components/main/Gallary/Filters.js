import React from 'react';
import { createMainConsumer } from '../../../context/mainContext';

const Filters = ({keywordList,setCurrentList,currentCategory,currentOrder,setCurrentOrder}) => {
    return (
        <div className="filters">
            <ul className="">
                {/* <li className="on"><button>포포유 픽</button></li> */}
                <li className={currentOrder=== "date" ? "on" : ""}><button onClick={() => setCurrentOrder("date")}>최신순</button></li>
                <li className={currentOrder=== "like" ? "on" : ""}><button onClick={() => setCurrentOrder("like")}>추천순</button></li>
            </ul>
            <ul className="keywordFilters">
                <li className={currentCategory === "all" ? "on" : ""} onClick={() => setCurrentList("all")}><button>전체</button></li>
                {
                    keywordList !== null && keywordList !== undefined &&
                    keywordList.map(
                        keyword => 
                            <li className={currentCategory === keyword.code ? "on" : ""} key={keyword.code} onClick={() => setCurrentList(keyword.code)}>
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