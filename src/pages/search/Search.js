import React from 'react'
import Gallary from '../../containers/main/Gallary';
import { createCommonConsumer } from '../../context/commonContext';
import { MainProvider } from '../../context/mainContext';

const Search = ({loginMember,history}) => {
    return (
        <MainProvider  loginMember={loginMember} history={history}>
            <div className="search">
                <Gallary/>
            </div>
        </MainProvider>
    )
}

export default createCommonConsumer(Search);
