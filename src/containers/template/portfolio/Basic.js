import React,{useState,useEffect} from 'react';
import Main from '../../../components/template/portfolio/basic/Main';
import About from '../../../components/template/portfolio/basic/About';
import WorkGrid from '../../../components/template/portfolio/basic/WorkGrid';
import Contact from '../../../components/template/portfolio/basic/Contact';
import '../../../resources/scss/template/portfolio/basic/basic.scss';
import WorkDetailModal from '../../../components/template/portfolio/basic/WorkdDetailModal';
import detail1 from '../../../resources/images/main/detail01.jpeg';
import detail2 from '../../../resources/images/main/detail02.jpeg';
import detail3 from '../../../resources/images/main/detail03.jpeg';
import profile from '../../../resources/images/main/profile.jpeg';

const Basic = ({design}) => {
    const [data, setData] = useState({
        main : {
            text : "Welcome to <br/> My Portfolio",
            color : "#ffffff",
            fontFamilly : "",
            textAlign : "left",
            image : "",
        },
        title: "이력서",
        name : "",
        birthYear : "",
        birthMonth : "",
        birthDay : "",
        gender : "",
        phone : "",
        mobile : "",
        email : "",
        sns : "",
        address : "",
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
        skillList : [
            {type : "Java", level : 85},
            {type : "Javascript", level : 80},
            {type : "React", level : 60},
            {type : "SQL", level : 70},
            {type : "Photoshop", level : 40},
            {type : "Illustrator", level : 30},
        ],
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
    })

const selectedItem = {
    title : "꿈을꿔봐요",
    registrationDate : '6일전',
    member : {
        name : "5unday",
        profile : profile,
    },
    categoryList : [
        '그래픽 디자인',
        '일러스트레이션'
    ],
    viewCnt : 312,
    like : 17,
    commentList : [

    ],
    contentList : [
        {
            content : `<img src='${detail1}'/>`,
        },
        {
            content : `<img src='${detail2}'/>`,
        },
        {
            content : `<img src='${detail3}'/>`,
        },
    ],
    hashtagList : [
        "어린이",
        "리플렛",
        "디자인",
        "일러스트",
        "그래픽",
        "꿈",
        "도형",
    ],
};

    const [openWorkDeatilModal, setOpenWorkDeatilModal] = useState(false);
    const [designMode, setDesignMode] = useState(false);

    useEffect(() => {
        setDesignMode(design);
    }, [design]);

    const toggleWorkDetailModal = () => {
        setOpenWorkDeatilModal(!openWorkDeatilModal);
    }

    const setTitleForm = form => {
        setData({
            ...data,
            main : form
        })
    }

    return (
        <div className="template portfolio basic">
            <Main designMode={designMode} data={data} setTitleForm={setTitleForm}/>
            <About data={data}/>
            <WorkGrid toggleWorkDetailModal={toggleWorkDetailModal}/>
            <Contact/>
            <WorkDetailModal isOpen={openWorkDeatilModal} toggle={toggleWorkDetailModal} item={selectedItem}/>
        </div>
    )
}

export default Basic;