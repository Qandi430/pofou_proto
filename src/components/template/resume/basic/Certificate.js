import moment from 'moment'
import React from 'react'

const Certificate = ({certificateList}) => {
    return (
        <div className="certificate contents">
            <div className="titleBox">
                <h5 className="title">자격증/어학/수상내역</h5>
            </div>
            <div className="certificateList flexTable">
                <div className="thead">
                    <div className="tr">
                        <div className="th certificateDate">취득일/수상일</div>
                        <div className="th certificateType">구분</div>
                        <div className="th certificateName">자격/어학/수상명</div>
                        <div className="th certificatePlace">발행처/기관/언어</div>
                        <div className="th certificateResult">합격/점수</div>
                    </div>
                </div>
                <div className="tbody">
                    {
                        certificateList.map(
                            (certificate,index) => 
                                <div className="tr" key={index}>
                                    <div className="td certificateDate">{moment(certificate.certificateDate).format("YYYY.MM")}</div>
                                    <div className="td certificateType">{certificate.certificateType === "license" ? "자격증" : certificate.certificateType === "language" ? "어학시험" :"수상내역/공모전"}</div>
                                    <div className="td certificateName">{certificate.certificateName}</div>
                                    <div className="td certificatePlace">{certificate.certificateType === "language" ? certificate.certificateLanguage : certificate.certificateIssuer}</div>
                                    <div className="td certificateResult">
                                        {certificate.certificateScore !== null && `${certificate.certificateScore}/`}
                                        {certificate.certificateGrade !== "" && `${certificate.certificateGrade}/`}
                                        {(() => {
                                            switch(certificate.certificatePassType){
                                                case "1st":
                                                    return "1차 합격";
                                                case "2nd":
                                                    return "2차 합격";
                                                case "written":
                                                    return "필기 합격";
                                                case "practical":
                                                    return "실기 합격";
                                                case "final":
                                                    return "최종 합격";
                                                case "pass":
                                                    return "취득 (pass)";
                                                default:
                                                    return certificate.certificatePassType;
                                            }
                                        })()}
                                    </div>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Certificate
