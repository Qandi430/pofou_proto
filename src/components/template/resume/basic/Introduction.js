import React from 'react'

const Intorucation = ({introductionList}) => {
    return (
        <div className="introduction contents">
            <div className="titleBox">
                <h5 className="title">자기소개서</h5>
            </div>
            <div className="introductionList">
                {
                    introductionList.map(
                        (introduction) => 
                            <div className="listItem" key={introduction.order}>
                                <h6 className="title">[{introduction.title}]</h6>
                                <div className="content">{introduction.content}</div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}

export default Intorucation
