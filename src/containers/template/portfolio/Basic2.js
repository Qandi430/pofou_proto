import React,{useState} from 'react';
import Block from '../../../components/template/portfolio/Block';

import MainImage from '../../../resources/images/template/portfolio/basic/basicMainImage.jpg';
import ProfileImage from '../../../resources/images/template/profile.jpg'
import thumb1 from '../../../resources/images/main/thumb01.gif';
import thumb2 from '../../../resources/images/main/thumb02.jpeg';
import thumb3 from '../../../resources/images/main/thumb03.jpeg';
import thumb4 from '../../../resources/images/main/thumb04.jpeg';
import thumb5 from '../../../resources/images/main/thumb05.jpeg';
import detail1 from '../../../resources/images/main/detail01.jpeg';
import detail2 from '../../../resources/images/main/detail02.jpeg';
import detail3 from '../../../resources/images/main/detail03.jpeg';

const Basic2 = () => {

    const [data] = useState({
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
                contents : [
                    {
                        index : 0,
                        type : "image",
                        id : "mainImage01",
                        title : "Welcome to<br/>My Portfolio",
                        subTitle : "",
                        contents : "",
                        media : MainImage,
                    }
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
                contents : [
                    {
                        index : 0,
                        type : "title",
                        id : "basicTitle",
                        title : "About",
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
                index : 2,
                id : "",
                name : "",
                category : "contents",
                grid : 3,
                container : true,
                paddingTop : 30,
                paddingBottom : 0,
                contents : [
                    {
                        index : 0,
                        type : "contents",
                        id : "basicProfile",
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
                                name : "?????????",
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
                        type : "contents",
                        id : "basicHistory",
                        educationList : [
                            {
                                index : 0,
                                educationType : "univercity",
                                educationName : "???????????????",
                                majorList : [
                                    {
                                        index : 0,
                                        degreeType : "Associate",
                                        majorType : "major",
                                        majorName : "??????????????????",
                                    },
                                    {
                                        index : 1,
                                        degreeType : "Associate",
                                        majorType : "double",
                                        majorName : "??????????????????",
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
                                educationName : "??????????????????",
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
                        type : "contents",
                        id : "skillList",
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
                contents : [
                    {
                        index : 0,
                        type : "work",
                        id : "basicGrid",
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
                contents : [
                    {
                        index : 0,
                        type : "contact",
                        id : "basicContactList",
                    },
                    {
                        index : 1,
                        type : "contact",
                        id : "basicContactForm",
                    },
                ],
            },
        ], 
    });

    const selectedItem = {
        title : "???????????????",
        registrationDate : '6??????',
        categoryList : [
            '????????? ?????????',
            '?????????????????????'
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
            "?????????",
            "?????????",
            "?????????",
            "????????????",
            "?????????",
            "???",
            "??????",
        ],
    };

    const [openWorkDetailModal,setOpenWorkDetailModal] = useState(false);
    const toggleWorkDetailModal = () => {
        setOpenWorkDetailModal(!openWorkDetailModal);
    }

    return (
        <div className="portfolio" style={{fontFamily :`${data.config.fontFamily}`,backgroundColor:`${data.config.backgroundColor}`}}>
            {
                data.blockList.map(
                    block => 
                        <Block data={block} key={block.index} toggleWorkDetailModal={toggleWorkDetailModal}/>
                )
            }
            
        </div>
    )
}

export default Basic2;