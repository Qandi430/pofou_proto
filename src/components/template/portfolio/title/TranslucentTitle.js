import React from 'react'

const TranslucentTitle = ({title,media}) => {
    return (
        <div className="mainImage01" style={{backgroundImage : `url(${media})`}}>
            <div className="titleWrap">
            <h3 
                className={`title`} 
                style={{
                    color : `${title.titleColor === null || title.titleColor === undefined ? "#333" : title.titleColor}`
                    ,textAlign:`${title.titleTextAlign === null || title.titleTextAlign === undefined ? "left" : title.titleTextAlign}`
                    ,fontFamily : `${title.titleFontFamily === null || title.titleFontFamily === undefined ? "Noto Sans KR" : title.titleFontFamily}`
                    , fontSize : `${title.titleFontSize === null || title.titleFontSize === undefined ? 3 : title.titleFontSize}rem`
                    ,fontWeight : `${title.titleFontWeight === null || title.titleFontWeight === undefined ? "bold" : title.titleFontWeight}`
                }} 
                dangerouslySetInnerHTML={{__html: title.title === null || title.title === undefined ? "Title" : title.title}}
            />
            </div>
        </div>
    )
}

export default TranslucentTitle
