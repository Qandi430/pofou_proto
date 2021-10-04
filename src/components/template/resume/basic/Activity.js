import moment from 'moment'
import React from 'react'

const Activity = ({activityList}) => {
    return (
        <div className="activity contents">
            <div className="titleBox">
                <h5 className="title">대외활동</h5>
            </div>
            <div className="activityList flexTable">
                <div className="thead">
                    <div className="tr">
                        <div className="th activityPeriod">기간</div>
                        <div className="th activityType">구분</div>
                        <div className="th activityPlace">기관/장소</div>
                        <div className="th activityContent">내용</div>
                    </div>
                </div>
                <div className="tbody">
                    {
                        activityList.map(
                            (activity,index) => 
                                <div className="tr" key={index}>
                                    <div className="td activityPeriod">{moment(activity.activityStart).format("YYYY.MM.DD")} ~ {moment(activity.activityEnd).format("YYYY.MM.DD")}</div>
                                    <div className="td activityType">
                                        {(() => {
                                            switch(activity.activityType){
                                                case "school":
                                                    return "교내활동";
                                                case "intern":
                                                    return "인턴";
                                                case "volunteer":
                                                    return "자원봉사";
                                                case "club":
                                                    return "동아리";
                                                case "partTime":
                                                    return "아르바이트";
                                                case "social":
                                                    return "사회활동";
                                                case "overseas":
                                                    return "해외연수";
                                                case "education":
                                                    return "교육이수내역";
                                                default:
                                                    return activity.activityType;
                                            }
                                        })()}
                                    </div>
                                    <div className="td activityPlace">{activity.activityPlace}</div>
                                    <div className="td activityContent" style={{justifyContent : `${activity.activityContent === "" ? "center":"flex-start"}`}}>{activity.activityContent === "" ? "-" : activity.activityContent}</div>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Activity
