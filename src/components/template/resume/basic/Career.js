import moment from 'moment';
import React from 'react'

const Career = ({resume}) => {
    return (
        <div className="career contents">
            <div className="titleBox">
                <h5 className="title">경력 {resume.careerType === "newcomer" && <span className="careerType">신입</span>}</h5>
            </div>
            {
                resume.careerType === "experienced"  &&
                <div className="careerList flexTable">
                    <div className="thead">
                        <div className="tr">
                            <div className="th careerName">기업명</div>
                            <div className="th careerPeriod">재직기간</div>
                            <div className="th careerRole">역할</div>
                            <div className="th careerContent">간단설명</div>
                        </div>
                    </div>
                    <div className="tbody">
                        {
                            resume.careerList.map(
                                (career,index) => 
                                    <div className="tr" key={index}>
                                        <div className="td careerName">{career.careerName}</div>
                                        <div className="td careerPeriod">
                                            {moment(career.careerStart).format("YYYY.MM")} ~ {career.quit ? moment(career.careerEnd).format("YYYY.MM") : "재직중"} 
                                        </div>
                                        <div className="td careerRole">{career.careerRole}</div>
                                        <div className="td careerContent" style={{justifyContent : `${career.careerContent === "" ? "center":"flex-start"}`}}>{career.careerContent === "" ? "-" :career.careerContent}</div>
                                    </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Career;
