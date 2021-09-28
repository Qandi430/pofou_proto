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

const BasicTitle  = React.lazy(() => import('../../../template/portfolio/title/BasicTitle'));

const AddBlockSideBar = ({addBlock,toggleAddBlock,addNewBlock}) => {
    const [currentCategory,setCurrentCategory] = useState({
        category : "title",
        blockList : [
            {id : "basicTitle",component:BasicTitle,image:BasicTitleImage}
        ],
    });
    const [selectedBlock,setSelectedBlock] = useState(null);
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
                            type : "title",
                            id : "basicTitle",
                            title : "Title",
                            subTitle : "",
                            contents : "",
                            media : "",
                            color : "#333333",
                            textAlign : "left",
                            fontFamilly : "Noto Sans KR",
                            fontSize : 3,
                            fontWeighr : "bold",
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
                                    profileImage : defaultProfile,
                                    name : "홍길동",
                                    birthYear : "1990",
                                    birthMonth : "04",
                                    birthDay : "30",
                                    gender : "M",
                                    phone : "",
                                    mobile : "01012345678",
                                    email : "honggildong@gmail.com",
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
                        && <Block data={selectedBlock}/>
                }        
                 <button onClick={() => addNewBlock(selectedBlock)}><FontAwesomeIcon icon={faCheck}/> 사용하기</button>       
            </div>
            <div className="addBlockBackdrop" onClick={toggleAddBlock}/>
        </div>
    )
}

export default AddBlockSideBar;