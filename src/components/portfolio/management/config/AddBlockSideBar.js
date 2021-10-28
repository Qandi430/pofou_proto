import { faCheck, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect, useState} from 'react';
import BasicTitleImage from '../../../../resources/images/template/portfolio/block/title/basicTitle.jpg';
import BasicContentsImage from '../../../../resources/images/template/portfolio/block/contents/basicContents.jpg';
import BasicWorkImage from '../../../../resources/images/template/portfolio/block/work/basicWork.jpg';
import BasicContactImage from '../../../../resources/images/template/portfolio/block/contact/basicContact.jpg';
import thumb1 from '../../../../resources/images/main/thumb01.gif';
import thumb2 from '../../../../resources/images/main/thumb02.jpeg';
import thumb3 from '../../../../resources/images/main/thumb03.jpeg';
import thumb4 from '../../../../resources/images/main/thumb04.jpeg';
import thumb5 from '../../../../resources/images/main/thumb05.jpeg';
import defaultProfile from '../../../../resources/images/contents/resume/default_profile.png';
import Block from '../../../template/portfolio/Block';
import { createPortfolioConsumer } from '../../../../context/portfolioContext';

const BasicTitle  = React.lazy(() => import('../../../template/portfolio/title/BasicTitle'));

const AddBlockSideBar = ({addBlock,toggleAddBlock,addNewBlock}) => {
    const [currentCategory,setCurrentCategory] = useState({
        category : "title",
        blockList : [
            {id : "basicTitle",component:BasicTitle,image:BasicTitleImage}
        ],
    });
    const [selectedBlock,setSelectedBlock] = useState(null);
    const resume = {
        "resumeNumber": 6,
        "memberNumber": 1,
        "represent": true,
        "title": "이력서",
        name : "홍길동",
        "birthDate": "1990-04-29T15:00:00.000+00:00",
        "gender": "M",
        "phone": "",
        mobile : "01012345678",
        email : "honggildong@gmail.com",
        "zipCode": "05305",
        "baseAddress": "서울 강동구 구천면로62길 19",
        "detailAddress": "202호",
        "photo": "",
        "displayPhoto": true,
        "careerType": "experienced",
        "displayActivity": true,
        "displayPreferred": true,
        "displayCertificate": true,
        "displaySkill": true,
        "displayIntroduction": true,
        "registrationDate": null,
        "updateDate": null,
        "complete": false,
        "educationList": [
            {
                index : 0,
                educationType : "univercity",
                educationName : "율도국대학교",
                majorList : [
                    {
                        index : 0,
                        degreeType : "Associate",
                        majorType : "major",
                        majorName : "정의로운도둑과",
                    },
                    {
                        index : 1,
                        degreeType : "Associate",
                        majorType : "double",
                        majorName : "호부호형과",
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
                educationName : "활빈당고등학교",
                majorList : [
                    {
                        majorType : "LiberalArts",
                    }
                ],
                admissionYear : "2006",
                graduatedYear : "2009",
                graduatedType : "graduate",
                educationContent : "",
            }
        ],
        "careerList": [
            {
                "resumeNumber": null,
                "memberNumber": null,
                "careerName": "포포유",
                "careerRole": "개발자",
                "careerStart": "2021-03-31T15:00:00.000+00:00",
                "careerEnd": "2021-09-28T08:01:32.000+00:00",
                "quit": true,
                "careerContent": ""
            }
        ],
        "activityList": [
            {
                "resumeNumber": null,
                "memberNumber": null,
                "index": 0,
                "activityType": "overseas",
                "activityPlace": "호주",
                "activityStart": "2016-03-04T15:00:00.000+00:00",
                "activityEnd": "2016-12-22T15:00:00.000+00:00",
                "activityContent": "워킹홀리데이"
            }
        ],
        "certificateList": [
            {
                "resumeNumber": null,
                "memberNumber": null,
                "index": 0,
                "certificateType": "license",
                "certificateLanguage": "",
                "certificateName": "컴퓨터 그래픽스",
                "certificateIssuer": "한국산업인력공단",
                "certificatePassType": "final",
                "certificateDate": "2016-05-31T15:00:00.000+00:00",
                "certificateScore": null,
                "certificateGrade": ""
            }
        ],
        "preferred": {
            "resumeNumber": null,
            "memberNumber": null,
            "veteran": false,
            "militaryServiceStatus": "fulfilled"
        },
        "skillList": [
            {skillName : "Java", skillLevel : 85},
            {skillName : "Javascript", skillLevel : 80},
            {skillName : "React", skillLevel : 60},
            {skillName : "SQL", skillLevel : 70},
            {skillName : "Photoshop", skillLevel : 40},
            {skillName : "Illustrator", skillLevel : 30},
        ],
        "introductionList": [
            {
                "resumeNumber": null,
                "memberNumber": null,
                "order": 0,
                "title": "ㅅㄷㄴㅅ",
                "content": "ㅅㄷㄴㅅ"
            }
        ]
    };
    const [categoryList] = useState([
        {
            category : "title",
            blockList : [
                {
                    id : "basicTitle",
                    image:BasicTitleImage,
                    category : "title",
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index:0,
                            type : "title",
                            id : "basicTitle",
                            title: {
                                contentsIndex : 0,
                                titleType : "text",
                                titleFontSize : 3.0,
                                title : "Title",
                                titleColor : "#333333",
                                titleFontFamily : "Noto Sans KR",
                                titleFontWeight : "bold",
                                titleTextAlign : "left",
                                subTitle : "",
                                subTitleFontSize : 0,
                                subTitleColor: "",
                                subTitleFontFamily : "",
                                subTitleFontWeight : "",
                                subTitleTextAlign : "left",
                            },
                        },
                    ]
                }
            ],
        },
        {
            category : "contents",
            blockList : [
                {
                    id : "basicContents",
                    category : "contents",
                    image : BasicContentsImage,
                    backgroundColor: "transparent",
                    grid : 3,
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
                }
            ]
        },
        {
            category : "text",
        },
        {
            category : "work",
            blockList : [
                {
                    id : "basicWork",
                    image:BasicWorkImage,
                    category : "title",
                    grid : 4,
                    backgroundColor: "transparent",
                    contents : [
                        {
                            index : 0,
                            type : "work",
                            id : "basicGrid",
                        }
                    ]
                }
            ],
        },
        {
            category : "contact",
            blockList : [
                {
                    index : 6,
                    category : "contact",
                    image : BasicContactImage,
                    grid : 2,
                    backgroundColor: "transparent",
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
                }
            ],
        },
        {
            category : "image",
        },
        {
            category : "video",
        },
        {
            category : "slide",
        },
        {
            category : "contour",
        },
        {
            category : "etc",
        },
    ]);

    const workList= [
        {
            "workNumber": 5,
            "memberNumber": 40,
            "profileImage": "2021/08/27/0139420255.png",
            "name": "포포유",
            "email": "info@pofou.com",
            "keyword1": null,
            "keyword2": null,
            "title": "작업물",
            "backgroundColor": null,
            "margin": null,
            "thumbnail": "2021/08/31/0343510619.png",
            "category1": null,
            "category2": null,
            "tag": null,
            "copyright": null,
            "status": null,
            "viewCnt": 8,
            "registrationDate": null,
            "updateDate": null,
            "contentsList": null,
            "likeList": [
                {
                    "workNumber": 5,
                    "memberNumber": 1,
                    "registrationDate": "2021-09-29T09:56:13.000+00:00"
                }
            ],
            "commentList": null
        },
        {
            "workNumber": 4,
            "memberNumber": 1,
            "profileImage": "2021/08/23/0617470479.png",
            "name": "포포유",
            "email": "info@pofou.com",
            "keyword1": null,
            "keyword2": null,
            "title": "작업물",
            "backgroundColor": null,
            "margin": null,
            "thumbnail": "2021/08/31/0546350085.png",
            "category1": null,
            "category2": null,
            "tag": null,
            "copyright": null,
            "status": null,
            "viewCnt": 8,
            "registrationDate": null,
            "updateDate": null,
            "contentsList": null,
            "likeList": [
                {
                    "workNumber": 4,
                    "memberNumber": 1,
                    "registrationDate": "2021-09-29T09:32:57.000+00:00"
                }
            ],
            "commentList": null
        },
        {
            "workNumber": 3,
            "memberNumber": 1,
            "profileImage": "2021/08/23/0617470479.png",
            "name": "포포유",
            "email": "info@pofou.com",
            "keyword1": null,
            "keyword2": null,
            "title": "작업물",
            "backgroundColor": null,
            "margin": null,
            "thumbnail": "2021/08/31/0230090805.png",
            "category1": null,
            "category2": null,
            "tag": null,
            "copyright": null,
            "status": null,
            "viewCnt": 8,
            "registrationDate": null,
            "updateDate": null,
            "contentsList": null,
            "likeList": [
                {
                    "workNumber": 3,
                    "memberNumber": 1,
                    "registrationDate": "2021-09-02T01:43:05.000+00:00"
                }
            ],
            "commentList": null
        },
        {
            "workNumber": 2,
            "memberNumber": 1,
            "profileImage": "2021/08/23/0617470479.png",
            "name": "포포유",
            "email": "info@pofou.com",
            "keyword1": null,
            "keyword2": null,
            "title": "작업물",
            "backgroundColor": null,
            "margin": null,
            "thumbnail": "2021/08/31/1143390917.png",
            "category1": null,
            "category2": null,
            "tag": null,
            "copyright": null,
            "status": null,
            "viewCnt": 19,
            "registrationDate": null,
            "updateDate": null,
            "contentsList": null,
            "likeList": [
                {
                    "workNumber": 2,
                    "memberNumber": 1,
                    "registrationDate": "2021-09-22T14:34:50.000+00:00"
                }
            ],
            "commentList": null
        }
    ];

    useEffect(() => {
        if(addBlock === null){
            setCurrentCategory(categoryList.find(cate => cate.category === "title"));
            setSelectedBlock(null);
        }
    },[addBlock,categoryList]);

    const selectCategory = category => {
        setCurrentCategory(categoryList.find(cate => cate.category === category));
        setSelectedBlock(null);
    }

    const selectBlock = id => {
        setSelectedBlock(currentCategory.blockList.find(block => block.id === id));
    }

    return (
        <div className={`addBlockSideBar ${addBlock !== null ? "on" : ""}`}>
            <aside>
                <div className="categoryWrap">
                    <ul className="categoryList">
                        <li onClick={() => selectCategory("title")} className={`${currentCategory.category === "title" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            타이틀
                        </li>
                        <li onClick={() => selectCategory("contents")} className={`${currentCategory.category === "contents" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            컨텐츠
                        </li>
                        <li onClick={() => selectCategory("text")} className={`${currentCategory.category === "text" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            텍스트
                        </li>
                        <li onClick={() => selectCategory("work")} className={`${currentCategory.category === "work" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            작업물
                        </li>
                        <li onClick={() => selectCategory("contact")} className={`${currentCategory.category === "contact" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            컨택트
                        </li>
                        <li onClick={() => selectCategory("image")} className={`${currentCategory.category === "image" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            이미지
                        </li>
                        <li onClick={() => selectCategory("video")} className={`${currentCategory.category === "video" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            동영상
                        </li>
                        <li onClick={() => selectCategory("slide")} className={`${currentCategory.category === "slide" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            슬라이드쇼
                        </li>
                        <li onClick={() => selectCategory("contour")} className={`${currentCategory.category === "contour" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            구분선
                        </li>
                        <li onClick={() => selectCategory("etc")} className={`${currentCategory.category === "etc" ? "on" : ""}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                            기타
                        </li>
                    </ul>
                </div>
                <div className="blockWrap">
                    <ul className="blockList">
                        {
                            currentCategory.blockList === undefined || currentCategory.blockList.length < 1 ?
                            <li>준비된 블럭이 없습니다.</li>
                            :
                            currentCategory.blockList.map(
                                (block,index) => 
                                    <li key={index} onClick={() => selectBlock(block.id)}>
                                        <img src={block.image} alt="" />
                                    </li>
                            )
                        }
                    </ul>
                </div>
                <button className="btnClose" onClick={toggleAddBlock}><FontAwesomeIcon icon={faTimes}/></button>
            </aside>
            <div className="blockContents" style={{display : `${selectedBlock !== null ? "flex" : "none"}`}}>
                {
                    selectedBlock !== null  
                        && <Block resume={resume} data={selectedBlock} workList={workList}/>
                }        
                 <button onClick={() => addNewBlock(selectedBlock)}><FontAwesomeIcon icon={faCheck}/> 사용하기</button>       
            </div>
            <div className="addBlockBackdrop" onClick={toggleAddBlock}/>
        </div>
    )
}

export default createPortfolioConsumer(AddBlockSideBar);