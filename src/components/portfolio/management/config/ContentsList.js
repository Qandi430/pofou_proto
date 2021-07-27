import React,{useState,useEffect} from 'react';
import BasicProfileImage from '../../../../resources/images/template/portfolio/block/contents/basicProfile.jpg';
import BasicHistoryImage from '../../../../resources/images/template/portfolio/block/contents/basicHistory.jpg';
import SkillListImage from '../../../../resources/images/template/portfolio/block/contents/skillList.jpg';
import BasicContactListImage from '../../../../resources/images/template/portfolio/block/contact/basicContactList.jpg';
import BasicContactFormImage from '../../../../resources/images/template/portfolio/block/contact/basicContactForm.jpg';
import ProfileImage from '../../../../resources/images/template/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const contentsList = [
    {   block : "contents",
        type : "profile",
        id : "basicProfile",
        image : BasicProfileImage,
        name : "기본 프로필",
        privacy : {
            displayName : true,
            displayBirthDate : true,
            displayGender : true,
            displayPhone : true,
            displayMobile : true,
            displayEmail : true,
            displayAddress : true,
            info : {
                profileImage : ProfileImage,
                name : "이승재",
                birthYear : "1990",
                birthMonth : "04",
                birthDay : "30",
                gender : "M",
                phone : "",
                mobile : "01064763871",
                email : "dltmdwo430@gmail.com",
                sns : "",
                address : "",
            }
        },
    },
    {
        block : "contents",
        type : "profile",
        id : "basicHistory",
        image : BasicHistoryImage,
        name : "기본 히스토리",
        educationList : [
            {
                index : 0,
                educationType : "univercity",
                educationName : "연성대학교",
                majorList : [
                    {
                        index : 0,
                        degreeType : "Associate",
                        majorType : "major",
                        majorName : "푸드스타일링",
                    },
                    {
                        index : 1,
                        degreeType : "Associate",
                        majorType : "double",
                        majorName : "호텔조리학과",
                    },
                ],
                highScoolMajor : "",
                admissionYear : "2012",
                graduatedYear : "2014",
                graduatedType : "graduate",
                educationContent : "",
            },
            {
                index : 1,
                educationType : "highSchool",
                educationName : "잠실고등학교",
                majorList : [
                    
                ],
                highScoolMajor : "Meister",
                admissionYear : "2006",
                graduatedYear : "2009",
                graduatedType : "graduate",
                educationContent : "",
            }
        ],
    },
    {
        block : "contents",
        type : "profile",
        id : "skillList",
        name : "스킬 리스트",
        image:SkillListImage,
        skillList : [
            {type : "괴력", level : 85},
            {type : "분신술", level : 80},
            {type : "소환술", level : 60},
            {type : "환술", level : 70},
            {type : "퇴마술", level : 40},
            {type : "변신술", level : 30},
        ],
    },
    {
        block : "contact",
        type : "contactList",
        id : "bscicContactList",
        name : "기본 연락처 리스트",
        image : BasicContactListImage
    },
    {
        block : "contact",
        type : "contactForm",
        id : "basicContactForm",
        name : "기본 연락처 폼",
        image : BasicContactFormImage
    },
];

const ContentsList = ({open,toggle,addContents}) => {

    const [currentList,setCurrentList] = useState(contentsList); 
    const [selectedContents,setSelectedContens] = useState(null);

    useEffect(() => {
        if(open !== ""){
            setCurrentList(
                contentsList.filter(
                    contents => 
                        contents.block === open
                )
            )
        }else{
            setCurrentList(contentsList);
        }
        setSelectedContens(null);
    }, [open]);

    const selectContents = contents => {
        setSelectedContens(contents);
    }

    const handleAddContents = () => {
        if(selectedContents === null){
            alert("컨텐츠를 선택해주세요");
            return false;
        }
        else{
            addContents(selectedContents);
        }
    }

    return (
        <div className={`contentsLsit ${open !== "" ? "open" : ""}`}>
            <div className="listHeader">
                <h5>
                    {
                        open === "" ? "" : open === "contents" ? "컨텐츠" : "컨택트"
                    }
                </h5>
                <button onClick={toggle}><FontAwesomeIcon icon={faLongArrowAltRight}/></button>
            </div>
            <ul>
                {
                    currentList.map(
                        (c,index) => 
                            <li className={`item ${selectedContents !== null && selectedContents.id === c.id ? "on" :""}`} key={index} onClick={() => selectContents(c)}>
                                <img src={c.image} alt="" />
                            </li>
                    )
                }
            </ul>
            <div className="listFooter">
                <button className="btnAdd" onClick={handleAddContents}>추가</button>
                <button className="btnCancel" onClick={toggle}>취소</button>
            </div>
        </div>
    )
}

export default ContentsList;