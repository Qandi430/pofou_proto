import React,{useState} from 'react';
import DesignHeader from '../../../components/portfolio/management/design/DesignHeader';
import TitleConfigModal from '../../../components/template/portfolio/basic/TitleConfigModal';
import SkillConfigModal from '../../../components/template/portfolio/basic/SkillConfigModal';
import PrivacyConfigModal from '../../../components/template/portfolio/basic/PrivacyConfigModal';
import AllConfigModal from '../../../components/portfolio/management/design/AllConfigModal';

const Basic = React.lazy(() => import('../../../containers/template/portfolio/Basic'));

const Design = () => {

    const [data, setData] = useState({
        config : {
            backgroundColor: "#ebebeb",
            fontFamily : "Noto Sans KR",
        },
        main : {
            setting : {
                display : true,
            },
            title : {
                text : "Welcome to <br/> My Portfolio",
                color : "#ffffff",
                fontFamilly : "",
                textAlign : "left",
                image : "",
            }
        },
        about : {
            setting : {
                display : true,
            },
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
            setting : {
                display : true,
            },
            title : {
                text : "WORK - Grid",
                color : "#333333",
                fontFamilly : "",
                textAlign : "left",
                image : "",
            },
        },
        contact : {
            setting : {
                display : true,
            },
            title : {
                text : "CONTACT",
                color : "#333333",
                fontFamilly : "",
                textAlign : "left",
                image : "",
            },
        },
    });

    const [titleConfigTarget,setTitleConfigTarget] = useState("");
    const [openSkillConfigModal,setOpenSkillConfigModal] = useState(false);
    const [openPrivacyConfigModal,setOpenPrivacyConfigModal] = useState(false);
    const [openAllConfigModal,setOpenAllConfigModal] = useState(false);

    const setTitleForm = form => {
        setData({
            ...data,
            main : form
        })
    }

    const toggleTitleConfigModal = (type) => {
        if(typeof type !== "string"){
            setTitleConfigTarget("");
        }else{
            
            setTitleConfigTarget(type);
        }
    }

    const changeTitle = (target,form) => {
        form["text"] = form["text"].replace(/\n/g, '<br/>');
        let newData = data;
        newData[target].title = form
        setData(newData)
    }

    const toggleSkillConfigModal = () => {
        setOpenSkillConfigModal(!openSkillConfigModal);
    }

    const changeSkill = (form) => {
        setData({
            ...data,
            about :{
                ...data.about,
                skill : form
            }
        })
    }

    const togglePrivacyConfigModal = () => {
        setOpenPrivacyConfigModal(!openPrivacyConfigModal);
    }

    const changePrivacy = (form) => {
        console.log(form)
        setData({
            ...data,
            about : {
                ...data.about,
                privacy : form
            }
        })
    }

    const setPageDisplay = (pageName) => {

        console.log(pageName)

        setData({
            ...data,
            [pageName] : {
                ...data[pageName],
                setting : {
                    ...data[pageName].setting,
                    display : !data[pageName].setting.display
                }
            }
        })
    }

    const toggleAllConfigModal = () => {
        setOpenAllConfigModal(!openAllConfigModal);
    }

    const changeConfig = configForm => {
        setData({
            ...data,
            config : configForm
        })
    }
    
    return (
        <div className="design">
            <DesignHeader data={data} setPageDisplay={setPageDisplay} toggleAllConfigModal={toggleAllConfigModal}/>
            <div className="designBody">
                <Basic design data={data} setTitleForm={setTitleForm} toggleTitleConfigModal={toggleTitleConfigModal} toggleSkillConfigModal={toggleSkillConfigModal} togglePrivacyConfigModal={togglePrivacyConfigModal}/>
            </div>
            <TitleConfigModal data={data} isOpen={titleConfigTarget !== ""} toggle={toggleTitleConfigModal} target={titleConfigTarget} changeTitle={changeTitle}/>
            <SkillConfigModal isOpen={openSkillConfigModal} toggle={toggleSkillConfigModal} data={data.about.skill} changeSkill={changeSkill}/>
            <PrivacyConfigModal isOpen={openPrivacyConfigModal} toggle={togglePrivacyConfigModal} data={data.about.privacy} changePrivacy={changePrivacy}/>
            <AllConfigModal isOpen={openAllConfigModal} toggle={toggleAllConfigModal} data={data.config} changeConfig={changeConfig}/>
        </div>
    )
}

export default Design;