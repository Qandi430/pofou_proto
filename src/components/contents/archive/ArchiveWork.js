import React from 'react';
import { Fragment } from 'react-is';
import { Link } from 'react-router-dom';
import { createArchiveConsumer } from '../../../context/archiveContext';
import WorkDetailModal from '../../common/WorkDetailModal';

const ArchiveWork = ({show,archive,selectWork,openWorkDetailModal,toggleWorkDetailModal,workDetail,loginMember}) => {
    return (
        <div className={`archiveWork ${archive.workList.length < 0 ? "empty" : ""} ${show}`}>
            {
                archive.workList.length > 0 ?
                <div className="workList">
                    {
                        archive.workList.map(
                            work => 
                                <div className="item" key={work.workNumber} onClick={() => selectWork(work.workNumber)}>
                                    <div className="thumbnail" style={{backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.thumbnail})`}}></div>
                                    <h6 className="title">{work.title}</h6>
                                </div>
                        )
                    }
                </div>
                :
                <Fragment>
                    아직 업로드한 작품이 없습니다.
                    <Link to="/upload">지금 등록해보세요</Link>
                </Fragment>
            }
            <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} workDetail={workDetail} loginMember={loginMember}/>
        </div>
    )
}

export default createArchiveConsumer(ArchiveWork);