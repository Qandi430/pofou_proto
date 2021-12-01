import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'reactstrap';
import axios from 'axios';

const VideoUpload = ({contents,toggleSpinnerModal,saveContents,uploadForm}) => {

    const [videoUrl,setVideoUrl] = useState("");
    // <iframe width="640" height="360" src="https://player.vimeo.com/video/584079874?h=398353b162" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/XvBRJeCPNDY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    const submitVideo = async() => {
        toggleSpinnerModal(true);
        const youtubeOption = 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen';
        const vimeoOption = 'frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen';
        let iframe = "";
        let thumbnail = "";
        // https://www.youtube.com/watch?v=XvBRJeCPNDY
        // https://vimeo.com/584079874
        if(videoUrl.indexOf('youtube.com') > -1){
            const  id = videoUrl.split("v=")[1];
            iframe = `<iframe width="100%" src="https://www.youtube.com/embed/${id}" ${youtubeOption}></iframe>`;
            thumbnail =  `<img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt=""/>`;
        }else if(videoUrl.indexOf('vimeo.com') > -1){
            const id = videoUrl.split("/")[videoUrl.split("/").length -1];
            iframe = `<iframe width="100%" src="https://player.vimeo.com/video/${id}" ${vimeoOption}></iframe>`;
            await axios.get(`http://vimeo.com/api/v2/video/${id}.json`).then(
                res=>{
                    console.log(res.data[0].thumbnail_large);
                    thumbnail =  `<img src="${res.data[0].thumbnail_large}" alt=""/>`;
                }
            )
        }else{
            alert("https://를 포함한 전체 URL을 입력해주세요. (Youtube, Vimeo)");
            return;
        }
        saveContents(contents.order,"contents",JSON.stringify({iframe : iframe,thumbnail:thumbnail}));
        toggleSpinnerModal(false);
    }

    return(
        <div className="contents videoUpload" style={{margin:`${contents.order > 0 ? uploadForm.margin : 0}px 0`}}>
            <button><FontAwesomeIcon icon={faVideo}/></button>
            <h6>동영상 URL을 입력해주세요. (Youtube, Vimeo)</h6>
            <Input type="text" value={videoUrl} placeholder="https://를 포함한 전체 URL을 입력해주세요." onChange={e => setVideoUrl(e.target.value)}/>
            <button className="btnSubmit" onClick={submitVideo}>적용하기</button>
        </div>
    )
}

export default VideoUpload;