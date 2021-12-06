import React,{Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { changeRepresent, deleteResume, getResumeByMemberNumber, getResumeDetailByResumeNumber } from '../../../server/resume/ResumeServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import represnetIcon from '../../../resources/images/contents/resume/represent_icon.png';
import plusButton from '../../../resources/images/contents/resume/plus_button.png';

const ResumeList = ({history,toggleSpinnerModal,openResumeDetailModal}) => {
    const [resumeList,setResumeList] = useState([]);
    const [openItemMenu,setOpenItemMenu] = useState(-1);
    
    useEffect(() => {
        const memberToken = cookie.load("memberToken");
        if(memberToken === undefined){
            console.log("is Not Login")
            history.push("/");
        }else{
            const loginMember = jwtDecode(memberToken);
            getResumeList(loginMember.member.memberNumber);
        }
        
    },[history]);

    const getResumeList = async(memberNumber) => {
        const {data : resumeList} = await getResumeByMemberNumber(memberNumber);
        setResumeList(resumeList);
    }

    const toggleItemMenu = (index) => {
        if(index === openItemMenu){
            setOpenItemMenu(-1);
        }else{
            setOpenItemMenu(index);
        }
    }

    const clickRepresent = async(memberNumber,resumeNumber) => {
        if(!resumeList.find(resume => resume.resumeNumber === resumeNumber).complete){
            alert("작성 중인 이력서는 대표 이력서로 선택할 수 없습니다.");
            return false;
        }
        if(window.confirm("대표 이력서를 변경하시겠습니까?")){
            toggleSpinnerModal(true);
            const {data : changeResult} = await changeRepresent(memberNumber,resumeNumber);
            if(changeResult){
                alert("대표 이력서가 변경되었습니다.");
                getResumeList(memberNumber);
                setOpenItemMenu(-1);
            }else{
                alert("대표 이력서가 변경에 실패하였습니다.");
            }
            toggleSpinnerModal(false);
        }
    }

    const clickDeleteResume = async(memberNumber,resumeNumber,represent) => {
        if(represent){
            alert("대표 이력서는 삭제 할수 없습니다.");
            return false;
        }
        if(window.confirm(`이력서를 삭제하시겠습니까?`)){
            toggleSpinnerModal(true);
            const {data : deleteResult} = await deleteResume(memberNumber,resumeNumber);
            if(deleteResult){
                alert("이력서가 삭제되었습니다.");
                getResumeList(memberNumber);
                setOpenItemMenu(-1);
            }else{
                alert("이력서 삭제에 실패하였습니다.");
            }
            toggleSpinnerModal(false);
        }
    }

    const handleResumeDetail = async (resumeNumber) => {
        toggleSpinnerModal(true);
        const {data : resume} = await getResumeDetailByResumeNumber(resumeNumber);
        console.log(resume);
        openResumeDetailModal(resume);
        toggleSpinnerModal(false);
    }


    return(
        <div className={`resumeList`}>
            {
                resumeList.length > 0 ? 
                    <Fragment>
                        <div className="listItem new" onClick={() => history.push(`/resume/form`)}>
                            <div className="icon">
                                <FontAwesomeIcon icon={faPlus}/>    
                            </div>
                            <h5>새 이력서 작성</h5>
                        </div>
                        {
                            resumeList.map(
                                (resume,index) => 
                                    <div className="listItem" key={index}>
                                        {
                                            resume.represent &&
                                            <div className="represent">
                                                <img src={represnetIcon} alt="" />
                                            </div>
                                        }
                                        <div className="itemInfo" onClick={() => handleResumeDetail(resume.resumeNumber)}>
                                            <h6 className="resumeTitle">{resume.title}</h6>
                                            <p className="updateDate">{moment(resume.updateDate).format('YYYY.MM.DD')}</p>    
                                            {/* {
                                                resume.represent &&
                                                <h3 className="represent">대표 이력서</h3>
                                            } */}
                                            <h6 className={`status ${resume.complete ? "complete" : ""}`}>
                                                {
                                                    resume.complete ? "작성완료" : "작성중"
                                                }
                                            </h6>
                                        </div>
                                        <div className="itemFooter">
                                            <button onClick={() => toggleItemMenu(index)}>
                                                <FontAwesomeIcon icon={faEllipsisV}/>
                                            </button>
                                        </div>
                                        <div className={`itemMenu ${openItemMenu === index ? "on" : ""}`}>
                                            <ul>
                                                <li onClick={() => clickRepresent(resume.memberNumber,resume.resumeNumber)}>대표이력서 변경</li>
                                                <li onClick={() => history.push(`/resume/form/${resume.resumeNumber}`)}>수정</li>
                                                <li onClick={() => clickDeleteResume(resume.memberNumber,resume.resumeNumber,resume.represent)}>삭제</li>
                                            </ul>
                                        </div>
                                    </div>
                            )
                        }
                    </Fragment>
                :
                <div className="empty">
                    <h2>아직 이력서가 없어요.</h2>
                    <Link to="/resume/form">
                        {/* <FontAwesomeIcon icon={faPlus}/> */}
                        <img src={plusButton} alt="" />
                    </Link>
                    <h6>첫 이력서를 작성해주세요.</h6>
                </div>
            }
        </div>
    )
}

export default ResumeList;