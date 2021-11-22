import React, { useEffect, useState } from 'react'
import { createMainConsumer } from '../../../context/mainContext';
import { useLocation } from 'react-router-dom';
import { getQuery } from '../../common/CommonScript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchBox = ({history,workList,cleanWorkList,setWorkListBySearchText}) => {
    const [searchKeyword,setSearchKeyword] = useState("");
    const [currentSearchKeyword,setCurrentSearchKeyword] = useState("");
    let location = useLocation();
    const changeSearchText = (e) => {
        setSearchKeyword(e.target.value);
    }
    const submitSearchText = async (e) => {
        e.preventDefault();
        if(searchKeyword.length === 0){
            alert("검색어를 입력해 주세요.");
            return;
        }
        await cleanWorkList();
        history.push(`/search?searchKeyword=${searchKeyword}`);
        setWorkListBySearchText(searchKeyword);
    }
    useEffect(() => {
        let query = getQuery();
        if(query.searchKeyword !== undefined && query.searchKeyword !== currentSearchKeyword){
            setCurrentSearchKeyword(query.searchKeyword);
        }
        
    },[location,currentSearchKeyword]);

    return (
        <div className="searchBox">
            <div className="inputBox">
                <form onSubmit={submitSearchText}>
                    <button>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                    <input type="text" size={searchKeyword.length === 0 ? 1 : searchKeyword.length+2} name="searchText" onChange={changeSearchText} spellCheck={false} contentEditable/>
                </form>
            </div>
            <div className="resultBox">
                <h3>'<span>{currentSearchKeyword}</span>'에 대한 검색결과가 {workList.length}건이 있습니다.</h3>
            </div>
        </div>
    )
}

export default createMainConsumer(SearchBox);
