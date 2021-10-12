import MainImage from '../images/template/portfolio/basic/basicMainImage.jpg';
import ProfileImage from '../images/template/profile.jpg'
import thumb1 from '../images/main/thumb01.gif';
import thumb2 from '../images/main/thumb02.jpeg';
import thumb3 from '../images/main/thumb03.jpeg';
import thumb4 from '../images/main/thumb04.jpeg';
import thumb5 from '../images/main/thumb05.jpeg';

const dataList  = [
    {
        name : "basic",
        data : {
            id : "",
            config : {
                backgroundColor : "#ebebeb",
                fontFamily : "Noto Sans KR",
            },
            blockList : [
                {
                    index : 0,
                    id : "",
                    name : "",
                    category : "image",
                    grid : 1,
                    container : false,
                    paddingTop : 0,
                    paddingBottom : 0,
                    backgroundColor: "transparent",
                    backgroundImage : MainImage,
                    contents : [
                        {
                            index : 0,
                            type : "background_title",
                            name : "기본배경+타이틀",
                            id : "mainImage01",
                            title : "Welcome to<br/>My Portfolio",
                            subTitle : "",
                            contents : "",
                            media : MainImage,
                        },
                    ]
                },
                {
                    index : 1,
                    id : "",
                    name : "",
                    category : "title",
                    paddingTop : 100,
                    paddingBottom : 0,
                    container : true,
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index : 0,
                            type : "title",
                            id : "basicTitle",
                            name : "기본 타이틀",
                            titleType : "text",
                            title : "About",
                            subTitle : "",
                            contents : "",
                            media : "",
                            color : "#333333",
                            textAlign : "left",
                            fontFamily : "Noto Sans KR",
                            fontSize : 3.0,
                            fontWeighr : "bold",
                        }
                    ],
                },
                {
                    index : 2,
                    id : "",
                    name : "",
                    category : "contents",
                    grid : 3,
                    container : true,
                    paddingTop : 30,
                    paddingBottom : 0,
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index : 0,
                            type : "profile",
                            id : "basicProfile",
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
                            index : 1,
                            type : "histoty",
                            id : "basicHistory",
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
                            index : 2,
                            type : "skillList",
                            id : "skillList",
                            name : "스킬 리스트",
                            skill : {
                                colors: {
                                    "bar": "#3498db",
                                    "title": {
                                        "text": "#fff",
                                        "background": "#2980b9"
                                    }
                                },
                                list : [
                                    {type : "Java", level : 85},
                                    {type : "Javascript", level : 80},
                                    {type : "React", level : 60},
                                    {type : "SQL", level : 70},
                                    {type : "Photoshop", level : 40},
                                    {type : "Illustrator", level : 30},
                                ]
                            },
                        }
                    ],
                },
                {
                    index : 3,
                    id : "",
                    name : "",
                    category : "title",
                    paddingTop : 100,
                    paddingBottom : 0,
                    container : true,
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index : 0,
                            type : "title",
                            id : "basicTitle",
                            title : "Work",
                            subTitle : "",
                            contents : "",
                            media : "",
                            color : "#333333",
                            textAlign : "left",
                            fontFamilly : "Noto Sans KR",
                            fontSize : 3,
                            fontWeighr : "bold",
                        }
                    ],
                },
                {
                    index : 4,
                    id : "",
                    name : "",
                    category : "work",
                    paddingTop : 0,
                    paddingBottom : 0,
                    container : true,
                    grid : 4,
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index : 0,
                            type : "work",
                            id : "basicGrid",
                            name : "기본 그리드",
                            workList : [
                                {
                                    index : 0,
                                    title : "title1",
                                    thumbnail : thumb1,
                                },
                                {
                                    index : 1,
                                    title : "title2",
                                    thumbnail : thumb2,
                                },
                                {
                                    index : 2,
                                    title : "title3",
                                    thumbnail : thumb3,
                                },
                                {
                                    index : 3,
                                    title : "title4",
                                    thumbnail : thumb4,
                                },
                                {
                                    index : 4,
                                    title : "title5",
                                    thumbnail : thumb5,
                                },
                            ]
                        }
                    ],
                },
                {
                    index : 5,
                    id : "",
                    name : "",
                    category : "title",
                    paddingTop : 100,
                    paddingBottom : 0,
                    container : true,
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index : 0,
                            type : "title",
                            id : "basicTitle",
                            title : "Contact",
                            subTitle : "",
                            contents : "",
                            media : "",
                            color : "#333333",
                            textAlign : "left",
                            fontFamilly : "Noto Sans KR",
                            fontSize : 3,
                            fontWeighr : "bold",
                        }
                    ],
                },
                {
                    index : 6,
                    name : "",
                    category : "contact",
                    paddingTop : 30,
                    paddingBottom : 100,
                    container : true,
                    grid : 2,
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index : 0,
                            type : "contact",
                            id : "basicContactList",
                            name : "기본 연락처 리스트"
                        },
                        {
                            index : 1,
                            type : "contact",
                            id : "basicContactForm",
                            name : "기본 연락처 폼",
                        },
                    ],
                },
            ], 
        }
    }
]

const getDataByName = (name) => {
    return dataList.find( d => d.name === name).data;
}

export {
    getDataByName,
    
}