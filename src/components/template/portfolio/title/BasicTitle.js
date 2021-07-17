import React from 'react';

const BasicTitle = ({grid,title,color,textAlign,fontFamily,fontSize,fontWeight}) => {    
    return (
        <div className={`title basicTitle grid${grid === null || grid === undefined ? 1 : grid}`}>
            <h3 
                className={`title`} 
                style={{
                    color : `${color === null || color === undefined ? "#333" : color}`
                    ,textAlign:`${textAlign === null || textAlign === undefined ? "left" : textAlign}`
                    ,fontFamily : `${fontFamily === null || fontFamily === undefined ? "Noto Sans KR" : fontFamily}`
                    , fontSize : `${fontSize === null || fontSize === undefined ? 3 : fontSize}rem`
                    ,fontWeight : `${fontWeight === null || fontWeight === undefined ? "bold" : fontWeight}`
                }} 
                dangerouslySetInnerHTML={{__html: title === null || title === undefined ? "Title" : title}}
            />
        </div>
    )
}
export default BasicTitle;