import React,{useState} from 'react';
import Block from '../../../components/template/portfolio/Block';
import MainImage from '../../../resources/images/template/portfolio/basic/basicMainImage.jpg';
import ProfileImage from '../../../resources/images/template/profile.jpg'

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
                        type : "contents",
                        id : "basicHistory",
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
                        type : "contents",
                        id : "skillList",
                        skillList : [
                            {type : "Java", level : 85},
                            {type : "Javascript", level : 80},
                            {type : "React", level : 60},
                            {type : "SQL", level : 70},
                            {type : "Photoshop", level : 40},
                            {type : "Illustrator", level : 30},
                        ],
                    }
                ],
            }
        ],
    })

    return (
        <div className="portfolio" style={{fontFamily :`${data.config.fontFamily}`,backgroundColor:`${data.config.backgroundColor}`}}>
            {
                data.blockList.map(
                    block => 
                        <Block data={block} key={block.index}/>
                )
            }
        </div>
    )
}

export default Basic2;