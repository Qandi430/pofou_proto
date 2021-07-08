import React,{useState} from 'react';
import Basic from '../../../containers/template/portfolio/Basic';

const Portfolio = () => {

    const [data, setData] = useState({
        main : {
            title : {
                text : "Welcome to <br/> My Portfolio",
                color : "#ffffff",
                fontFamilly : "",
                textAlign : "left",
                image : "",
            }
        },
        about : {
            title : {
                text : "About",
                color : "#333333",
                fontFamilly : "",
                textAlign : "left",
                image : "",
            },
            privacy : {
                displayName : true,
                displayBirthDate : true,
                displayGender : true,
                displayPhone : true,
                displayMobile : true,
                displayEmail : true,
                displayAddress : true,
                info : {
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
            skill : {
                skillList : [
                    {type : "Java", level : 85},
                    {type : "Javascript", level : 80},
                    {type : "React", level : 60},
                    {type : "SQL", level : 70},
                    {type : "Photoshop", level : 40},
                    {type : "Illustrator", level : 30},
                ],
            },
        },
        certificateList : [],
        carrerList : [],
        languageList: [],
        awardsList : [],
        abroadsList : [],
        preferred : {
            veteran : "",
            disabledWhether : "",
            militaryServiceStatus : "",
            militaryStartYear : "",
            militaryStartMonth : "",
            militaryEndYear : "",
            militaryEndMonth : "",
            mos : "",
            militaryClasses : "",
        },
        experienceList : [],
        work : {
            title : {
                text : "WORK - Grid",
                color : "#333333",
                fontFamilly : "",
                textAlign : "left",
                image : "",
            },
        },
        contact : {
            title : {
                text : "CONTACT",
                color : "#333333",
                fontFamilly : "",
                textAlign : "left",
                image : "",
            },
        },
    });

    return(
        <div className="portfolio">
            <Basic data={data} />
        </div>
    )
}

export default Portfolio;