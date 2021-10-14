import moment from 'moment';
import React,{useState, useEffect} from 'react';
import defaultImage from '../../../../resources/images/contents/resume/default_profile.png'

const BasicProfile = ({privacy,grid,resume}) => {

    const [birthYear,setBirthYear] = useState(0);
    const [age,setAge] = useState(0);
    const [international,setInternational] = useState(0);

    useEffect(() => {
        if(resume.birthDate === ""){
            setBirthYear("-");
            setAge("-");
            setInternational("-")
        }else{
            const today = new Date();
            const birthDate = new Date(resume.birthDate);
            const tempAge = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            setBirthYear(birthDate.getFullYear());
            setAge(tempAge + 1);
            setInternational(m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? tempAge -1 : tempAge)
        }
    }, [resume]);

    return (
        <div  className={`contents basicProfile grid${grid}`}>
            <div className="profileImage" style={{position:"relative"}}>
                {
                    resume.displayPhoto &&
                    <img src={resume.photo !== "" ? `https://storage.googleapis.com/pofou_repo/${resume.photo}`:defaultImage} alt="" className="img-fluid"/>
                }    
            </div>
            <div className="privacyList">
                {
                    privacy.info.name !== "" && privacy.displayName &&
                    <dl className="name">
                        <dt>이름</dt>
                        <dd>{resume.name}</dd>
                    </dl>
                }
                {
                    resume.birthDate !== "" && privacy.displayBirthDate &&
                    <dl className="name">
                        <dt>생년월일</dt>
                        <dd>{`${moment(new Date(resume.birthDate !== "" ? resume.birthDate : "")).format("YYYY.MM.DD")}`} (만 {international}세)</dd>
                    </dl>
                }
                {
                    resume.gender !== "" && privacy.displayGender &&
                    <dl className="name">
                        <dt>성별</dt>
                        <dd>{resume.gender === "M" ? "남" : "여"}</dd>
                    </dl>
                }
                {
                    privacy.displayPhone &&
                    <dl className="name">
                        <dt>전화번호</dt>
                        <dd>{resume.phone}</dd>
                    </dl>
                }
                {
                    privacy.displayMobile &&
                    <dl className="name">
                        <dt>휴대전화번호</dt>
                        <dd>{resume.mobile}</dd>
                    </dl>
                }
                {
                    privacy.displayEmail &&
                    <dl className="name">
                        <dt>이메일</dt>
                        <dd>{resume.email}</dd>
                    </dl>
                }
                {
                    privacy.displayAddress &&
                    <dl className="name">
                        <dt>주소</dt>
                        <dd>{resume.baseAddress} {resume.detailAddress}</dd>
                    </dl>
                }
            </div>
        </div>
    )
}

export default BasicProfile;