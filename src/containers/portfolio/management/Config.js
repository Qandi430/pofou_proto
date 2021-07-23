import React,{useState} from 'react';
import ConfigHeader from '../../../components/portfolio/management/config/ConfigHeader';
import Block from '../../../components/template/portfolio/Block';
import WorkDetailModal from '../../../components/template/portfolio/WorkdDetailModal';
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
import AddBlockSideBar from '../../../components/portfolio/management/config/AddBlockSideBar';
import '../../../resources/scss/myPage/config.scss';
import ConfigBlockSideBar from '../../../components/portfolio/management/config/ConfigBlockSideBar';

const Config = () => {
    const [openWorkDetailModal,setOpenWorkDetailModal] = useState(false);
    const [addBlock,setAddBlock] = useState(null);
    const [data,setData] = useState({
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
                contents : [
                    {
                        index : 0,
                        type : "image",
                        name : "기본배경+타이틀",
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
                backgroundColor: "transparent",
                contents : [
                    {
                        index : 0,
                        type : "title",
                        id : "basicTitle",
                        name : "기본 타이틀",
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
                        type : "contents",
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
                        type : "contents",
                        id : "skillList",
                        name : "스킬 리스트",
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
    });
    const [configBlock,setConfigBlock] = useState(null);

    const selectedItem = {
        title : "꿈을꿔봐요",
        registrationDate : '6일전',
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

    const toggleWorkDetailModal = () => {
        setOpenWorkDetailModal(!openWorkDetailModal);
    }

    const toggleAddBlock = index => {
        if(typeof index === "number"){
            setAddBlock({
                index : index+1,
                id : "",
                name : "",
                category : "",
                paddingTop : 30,
                paddingBottom : 30,
                container : true,
            }); 
            document.body.classList.add('fixedBody');
        }else{
            setAddBlock(null);
            document.body.classList.remove('fixedBody');
        }
    }

    const addNewBlock = block => {
        addBlock["category"] = block.category;
        addBlock["contents"] = block.contents;
        if(block.grid !== undefined){
            addBlock["grid"] = block.grid;
        }
        data.blockList.forEach(
            block => {
                block.index  = block.index >= addBlock.index ? block.index + 1 : block.index
            }
        )
        data.blockList.splice(addBlock.index,0,addBlock);
        setAddBlock(null);
        document.body.classList.remove('fixedBody');
    }

    const selectConfigBlock = block => {
        if(block !== undefined){
            setConfigBlock(block);
        }else{
            setConfigBlock(null);
        }
    }

    const modifyBlock = block => {
        if(block !== null ){
            setConfigBlock(block);
            setData({
                ...data,
                blockList : 
                    data.blockList.map(
                        d => d.index === block.index ? block : d
                    )
            })
        }
    }

    return (
        <div className="config">
            <ConfigHeader />
            <div className="configBody">
                {
                    data.blockList.map(
                        block => 
                            <Block data={block} key={block.index} toggleWorkDetailModal={toggleWorkDetailModal} configMode toggleAddBlock={toggleAddBlock} selectConfigBlock={selectConfigBlock}/>
                    )
                }
                <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} item={selectedItem}/>
            </div>
            <AddBlockSideBar addBlock={addBlock} toggleAddBlock={toggleAddBlock} addNewBlock={addNewBlock}/>
            <ConfigBlockSideBar selectConfigBlock={selectConfigBlock} configBlock={configBlock} modifyBlock={modifyBlock}/>
        </div>
    )
}

export default Config;