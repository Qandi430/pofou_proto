import React from 'react'

const Preferential = ({preferred}) => {
    return (
        <div className="preferential contents">
            <div className="titleBox">
                <h5 className="title">우대사항</h5>
            </div>
            <div className="preferred flexTable">
                <div className="tbody">
                    <div className="tr">
                        <div className="th">보훈대상</div>
                        <div className="td">{preferred.veteran ? "대상" : "비대상"}</div>
                    </div>
                    <div className="tr">
                        <div className="th">병역대상</div>
                        <div className="td">
                            {
                                (() => {
                                    switch(preferred.militaryServiceStatus){
                                        case "fulfilled":
                                            return "군필";
                                        case "unfulfilled":
                                            return "미필";
                                        case "exempted":
                                            return "면제";
                                        case "inService":
                                            return "복무중";
                                        default :
                                            return "대상아님";
                                    }
                                })()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preferential
