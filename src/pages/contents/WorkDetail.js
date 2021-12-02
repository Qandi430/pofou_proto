import React, { useEffect, useState } from 'react'
import PackmanLoader from '../../components/common/PackmanLoader';
import WorkDetailContainer from '../../containers/contents/workDetail/WorkDetailContainer';
import { createCommonConsumer } from '../../context/commonContext';
import { getWorkDetailByWorkNumberAndUrl } from '../../server/work/WorkServer';


const WorkDetail = ({match,history,toggleSpinnerModal,openSpinnerModal}) => {
    const [workDetail,setWorkDetail] = useState(null);

    useEffect(() => {
        getWorkDetail(match.params.workNumber,match.params.url);
    },[match]);

    const getWorkDetail = async(workNumber,url) => {
        toggleSpinnerModal(true);
        const {data} = await getWorkDetailByWorkNumberAndUrl(workNumber,url);
        console.log(data);
        if(data){
            setWorkDetail(data);
        }else{
            alert("잘못된 접근입니다.");
            history.push("/")
        }
        
        toggleSpinnerModal(false);
    }

    return (
        <div className="workDetailWrap">
            <div>
                {
                    workDetail !== null && <WorkDetailContainer workDetail={workDetail}/>
                }
            </div>
            <PackmanLoader isOpen={openSpinnerModal}/>
        </div>
    )
}

export default createCommonConsumer(WorkDetail);
