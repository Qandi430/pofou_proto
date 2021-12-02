import React from 'react'
import DetailHeader from '../../components/contents/workDetail/DetailHeader';
import { createCommonConsumer } from '../../context/commonContext';

const WorkDetail = () => {
    return (
        <div className="workDetailWrap">
            <DetailHeader/>
        </div>
    )
}

export default createCommonConsumer(WorkDetail);
