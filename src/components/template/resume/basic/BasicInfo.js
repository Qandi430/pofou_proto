import { faEnvelope, faHome, faMobileAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect,useState} from 'react';
import defaultImage from '../../../../resources/images/contents/resume/default_profile.png';

const BasicInfo = ({resume}) => {

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
        <div className="basicInfo">
            {
                resume.displayPhoto &&
                <div className="imageBox">
                    <img src={resume.photo !== "" ? `https://storage.googleapis.com/pofou_repo/${resume.photo}`:defaultImage} alt="" />
                </div>
            }
            <div className="infoBox">
                <ul>
                    <li className="basic">
                        <h6 className="name">{resume.name === "" ? "이름입력" : resume.name}</h6>
                        <p className="age">{birthYear}년 ({age}세/만 {international}세)</p>
                        <p className="gender">{resume.gender === "M" ? "남" :"여" }</p>
                    </li>
                    <li className="email"><div className="iconBox"><FontAwesomeIcon icon={faEnvelope}/></div> {resume.email === "" ? "-" : resume.email}</li>
                    <li className="mobile"><div className="iconBox"><FontAwesomeIcon icon={faMobileAlt}/></div> {resume.mobile === "" ? "-": resume.mobile}</li>
                    {
                        resume.phone !== "" &&
                        <li className="phone"><div className="iconBox"><FontAwesomeIcon icon={faPhoneAlt}/></div> {resume.phone === "" ? "-" : resume.phone}</li>
                    }
                    <li className="address"><div className="iconBox"><FontAwesomeIcon icon={faHome}/></div> {resume.zipCode === "" ? "-" : `(${resume.zipCode}) ${resume.baseAddress} ${resume.detailAddress}`} </li>
                </ul>
            </div>
        </div>
    )
}

export default BasicInfo
