import React,{useState, useEffect} from 'react'


const DetailBody = ({data}) => {
    return (
        <div className="detailBody" style={{backgroundColor : `${data.backgroundColor}`}}>
            {
                data.contentsList.map(
                    contents => {
                        // const parser = JSON.parse(contents);
                        return contents.type !== "video" ?<div 
                                        key={contents.order} 
                                        className={`contents ${contents.type}`} 
                                        style={{margin:`${contents.order > 0 ? data.margin : 0}px 0`}}  
                                        dangerouslySetInnerHTML={{__html:contents.contents}}
                                /> : <VideoContents key={contents.order} order={contents.order} contents={contents.contents} margin={data.margin}/>
                    }
                        
                )
            }
        </div>
    )
}

const VideoContents = ({order,contents,margin}) =>{
    const [iframe,setIframe] = useState("");
    useEffect(() => {
        if(contents !== null && contents !== undefined){
            const parser = JSON.parse(contents);
            setIframe(parser.iframe);
        }
    },[contents])
    return(
        <div className="contents video" key={order} style={{margin:`${order > 0 ? margin : 0}px 0`}}  dangerouslySetInnerHTML={{__html: iframe}}/>
            
    )
}

export default DetailBody
