import React from 'react';

const BasicTitle = ({grid,title,color,textAlign,fontFamily,fontSize,fontWeight}) => {
    return (
        <div className={`title basicTitle grid${grid}`}>
            <h3 className={`title`} style={{color : `${color}`,textAlign:`${textAlign}`,fontFamily : fontFamily, fontSize : `${fontSize}rem`,fontWeight : `${fontWeight}`}} dangerouslySetInnerHTML={{__html: title }}/>
        </div>
    )
}
export default BasicTitle;