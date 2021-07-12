import React,{useState} from 'react';
import Block from '../../../components/template/portfolio/Block';
import MainImage from '../../../resources/images/template/portfolio/basic/basicMainImage.jpg';

const Basic2 = () => {

    const [data] = useState({
        id : "",
        config : {
            backgroundColor : "#ebebeb",
            fontFamily : "Noto Sans KR",
        },
        blockList : [
            {
                index : 0,
                id : "",
                name : "",
                category : "image",
                grid : 1,
                contents : [
                    {
                        index : 0,
                        type : "image",
                        id : "mainImage01",
                        title : "Welcome to<br/>My Portfolio",
                        subTitle : "",
                        contents : "",
                        media : MainImage,
                    }
                ]
            },
            {
                index : 1,
                id : "",
                name : "",
                category : "contents",
                grid : 3,
                contents : [
                    
                ],
            }
        ],
    })

    return (
        <div className="portfolio" style={{fontFamily :`${data.config.fontFamily}`,backgroundColor:`${data.config.backgroundColor}`}}>
            {
                data.blockList.map(
                    block => 
                        <Block data={block} key={block.index}/>
                )
            }
        </div>
    )
}

export default Basic2;