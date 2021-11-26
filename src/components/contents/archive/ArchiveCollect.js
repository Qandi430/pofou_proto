import React from 'react';
import { createArchiveConsumer } from '../../../context/archiveContext';

const ArchiveCollect = ({show,archive}) => {
    return(
        <div className={`archiveCollect empty ${show}`}>
            아직 콜렉트 한 작품이 없습니다.
        </div>
    )
}

export default createArchiveConsumer(ArchiveCollect);