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
        if(data){
            setWorkDetail(data);
            document.title = `${data.title} - 포포유`;
            document.querySelector('meta[property="og:title"]').setAttribute("content",`${data.title} - 포포유`);
            document.querySelector('meta[property="og:image"]').setAttribute("content",`https://storage.googleapis.com/pofou_repo/${data.thumbnail}`);
            document.querySelector('meta[property="og:description"]').setAttribute("content", `${data.tag}`);
            document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
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
