import React,{useState,useEffect} from 'react';

const VideoContents = ({contents}) => {
    // const [iframe,setIframe] = useState("");
    const [thumbnail,setThumbnail] = useState("");
    useEffect(() => {
        if(contents !== null && contents !== undefined){
            const parser = JSON.parse(contents);
            // setIframe(parser.iframe);
            setThumbnail(parser.thumbnail);
        }
    },[contents])
    return(
        <div className={`videoWrapper`} dangerouslySetInnerHTML={{__html: thumbnail}}/>
    )
}

export default VideoContents;