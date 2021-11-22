import React from 'react'
import SearchBox from '../../components/main/Search/SearchBox';
import Gallary from '../../containers/main/Gallary';
import { createCommonConsumer } from '../../context/commonContext';
import { MainProvider } from '../../context/mainContext';
import '../../resources/scss/search/search.scss';

const Search = ({loginMember,history}) => {
    return (
        <MainProvider  loginMember={loginMember} history={history}>
            <div className="search">
                <SearchBox history={history}/>
                <Gallary/>
            </div>
        </MainProvider>
    )
}

export default createCommonConsumer(Search);
