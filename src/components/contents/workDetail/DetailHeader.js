import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

const DetailHeader = ({data,loginMember}) => {
    return (
        <div className="detailHeader">
            <h3 className="title">{data.title}</h3>
            <div className="category">
                {
                    data.category1 !== "" && <span>{data.category1}</span>
                }
                {
                    data.category2 !== "" && <span>{data.category2}</span>
                }
            </div>
            <div className="profile">
                <div className="profileImage" style={ data.profileImage !== null || data.profileImage !=="" ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${data.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                    {
                        data.profileImage !== null ?
                        "" : data.email === null ? "P" : data.email.split("")[0].toUpperCase()
                    }
                </div>
                <div className="name">{data.name}</div>
            </div>
            
            <div className="workInfo">
                <div className="likeCnt">
                    {
                        loginMember !== null && loginMember.memberNumber !== "" && data.likeList !== null && data.likeList !== undefined && data.likeList.find(like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>
                    }
                    <span>{data.likeList !== null && data.likeList !== undefined ? data.likeList.length : 0}</span>
                </div>
                <div className="viewCnt">
                    <h6>VIEW</h6>
                    {/* <FontAwesomeIcon icon={faEye}/> */}
                    <span>{data.viewCnt}</span>
                </div>
            </div>
        </div>
    )
}

export default DetailHeader
