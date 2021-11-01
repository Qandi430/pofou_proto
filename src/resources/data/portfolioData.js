import MainImage from '../images/template/portfolio/basic/basicMainImage.jpg';

const dataList  = [
    {
        name : "basic",
        data : {
            portfolioNumber : "",
            resumeNumber : "",
            title : "",
            backgroundColor : "#ebebeb",
            fontFamily : "Noto Sans KR",
            backgroundImage : "",
            backgroundPosition : "",
            backgroundRepeat : "",
            backgroundSize : "",
            color : "",
            blockList : [
                {
                    index : 0,
                    id : "",
                    name : "",
                    category : "title",
                    grid : 1,
                    container : false,
                    paddingTop : 0,
                    paddingBottom : 0,
                    backgroundColor : "transparent",
                    backgroundImage : MainImage,
                    backgroundPosition : "center center",
                    backgroundRepeat : "norepeat",
                    backgroundSize : "cover",
                    contents : [
                        {
                            index : 0,
                            type : "title",
                            name : "반투명배경 타이틀",
                            id : "translucentTitle",
                            link : "",
                            title : {
                                contentsIndex : 0,
                                titleType : "text",
                                titleFontSize : 3.0,
                                title : "Welcome to<br/>My Portfolio",
                                titleColor : "#ffffff",
                                titleTextAlign : "left",
                                titleFontFamily : "",
                                titleFontWeight : "bold",
                                subTitle : "",
                                subTitleFontSize : 0,
                                subTitleColor: "",
                                subTitleFontFamily : "",
                                subTitleFontWeight : "",
                                subTitleTextAlign : "left",
                            },
                        }
                    ],
                },
                {
                    index : 1,
                    id : "",
                    name : "",
                    category : "title",
                    grid : 1,
                    container : true,
                    paddingTop : 100,
                    paddingBottom : 0,
                    backgroundColor : "transparent",
                    backgroundImage : "",
                    backgroundPosition : "center center",
                    backgroundRepeat : "norepeat",
                    backgroundSize : "cover",
                    contents : [
                        {
                            index : 0,
                            type : "title",
                            name : "기본 타이틀",
                            id : "basicTitle",
                            link : "",
                            title: {
                                contentsIndex : 0,
                                titleType : "text",
                                titleFontSize : 3.0,
                                title : "About",
                                titleColor : "",
                                titleFontFamily : "",
                                titleFontWeight : "bold",
                                titleTextAlign : "left",
                                subTitle : "",
                                subTitleFontSize : 0,
                                subTitleColor: "",
                                subTitleFontFamily : "",
                                subTitleFontWeight : "",
                                subTitleTextAlign : "left",
                            },
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
                    backgroundColor : "transparent",
                    backgroundImage : "",
                    backgroundPosition : "center center",
                    backgroundRepeat : "norepeat",
                    backgroundSize : "cover",
                    contents : [
                        {
                            index : 0,
                            type : "profile",
                            name : "기본 프로필",
                            id : "basicProfile",
                            link : "profile",
                            profile : {
                                contentsIndex : 0,
                                displayPhoto : true,
                                displayName : true,
                                displayBirthDate : true,
                                displayGender : true,
                                displayPhone : true,
                                displayMobile : true,
                                displayEmail : true,
                                displayAddress : true,
                            },
                        },
                        {
                            index : 1,
                            type : "history",
                            id : "basicHistory",
                            name : "기본 히스토리",
                            link : "education",  
                        },
                        {
                            index : 2,
                            type : "skillList",
                            id : "skillList",
                            name : "스킬 리스트",
                            skill : {
                                bar : "#3498db",
                                text : "#ffffff",
                                background : "#2980b9",
                            },  
                        },
                    ],
                },
                {
                    index : 3,
                    id : "",
                    name : "",
                    category : "title",
                    grid : 1,
                    container : true,
                    paddingTop : 100,
                    paddingBottom : 0,
                    backgroundColor : "transparent",
                    backgroundImage : "",
                    backgroundPosition : "center center",
                    backgroundRepeat : "norepeat",
                    backgroundSize : "cover",
                    contents : [
                        {
                            index : 0,
                            type : "title",
                            name : "기본 타이틀",
                            id : "basicTitle",
                            link : "",
                            title: {
                                contentsIndex : 0,
                                titleType : "text",
                                titleFontSize : 3.0,
                                title : "Work",
                                titleColor : "",
                                titleFontFamily : "",
                                titleFontWeight : "bold",
                                titleTextAlign : "left",
                                subTitle : "",
                                subTitleFontSize : 0,
                                subTitleColor: "",
                                subTitleFontFamily : "",
                                subTitleFontWeight : "",
                                subTitleTextAlign : "left",
                            },
                        }
                    ],
                },
                {
                    index : 4,
                    id : "",
                    name : "",
                    category : "work",
                    grid : 4,
                    container : true,
                    paddingTop : 0,
                    paddingBottom : 0,
                    backgroundColor : "transparent",
                    backgroundImage : "",
                    backgroundPosition : "center center",
                    backgroundRepeat : "norepeat",
                    backgroundSize : "cover",
                    contents : [
                        {
                            index : 0,
                            type : "work",
                            id : "basicGrid",
                            name : "기본 그리드",
                            link : "work",
                            grid : 4,
                        }
                    ],
                },
                {
                    index : 5,
                    id : "",
                    name : "",
                    category : "title",
                    grid : 1,
                    container : true,
                    paddingTop : 100,
                    paddingBottom : 0,
                    backgroundColor : "transparent",
                    backgroundImage : "",
                    backgroundPosition : "center center",
                    backgroundRepeat : "norepeat",
                    backgroundSize : "cover",
                    contents : [
                        {
                            index : 0,
                            type : "title",
                            name : "기본 타이틀",
                            id : "basicTitle",
                            link : "",
                            title: {
                                contentsIndex : 0,
                                titleType : "text",
                                titleFontSize : 3.0,
                                title : "Contact",
                                titleColor : "",
                                titleFontFamily : "",
                                titleFontWeight : "bold",
                                titleTextAlign : "left",
                                subTitle : "",
                                subTitleFontSize : 0,
                                subTitleColor: "",
                                subTitleFontFamily : "",
                                subTitleFontWeight : "",
                                subTitleTextAlign : "left",
                            },
                        }
                    ],
                },
                {
                    index : 6,
                    id : "",
                    name : "",
                    category : "contact",
                    grid : 2,
                    container : true,
                    paddingTop : 30,
                    paddingBottom : 0,
                    backgroundColor : "transparent",
                    backgroundImage : "",
                    backgroundPosition : "center center",
                    backgroundRepeat : "norepeat",
                    backgroundSize : "cover",
                    contents : [
                        {
                            index : 0,
                            type : "contact",
                            id : "basicContactList",
                            name : "기본 연락처 리스트",
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