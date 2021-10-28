import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import Basic from '../../../pages/template/portfolio/Portfolio';
import Block from '../../../components/template/portfolio/Block';
import { getDataByName } from '../../../resources/data/portfolioData';
const TemplatePreviewModal = ({isOpen,toggle}) => {

    const defaultResume = {
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

    const workList  = [
        {
            "workNumber": 5,
            "memberNumber": 40,
            "profileImage": "2021/08/27/0139420255.png",
            "name": "김준배",
            "email": "chunbae_father@junbae.com",
            "keyword1": null,
            "keyword2": null,
            "title": "맛-있는 COFFEE *^^*",
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
            "name": "이승재",
            "email": "dltmdwo430@gmail.com",
            "keyword1": null,
            "keyword2": null,
            "title": "리얼서버테스트",
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
            "name": "이승재",
            "email": "dltmdwo430@gmail.com",
            "keyword1": null,
            "keyword2": null,
            "title": "테스트2",
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
            "name": "이승재",
            "email": "dltmdwo430@gmail.com",
            "keyword1": null,
            "keyword2": null,
            "title": "테스트",
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

    const [data,setData] = useState(null);
    const toggleWorkDetailModal = () => {
        console.log("???");
    }
    useEffect(() => {
        if(isOpen === ""){
            setData(null);
            
        }else{
            console.log(defaultResume)
            setData(getDataByName(isOpen));
        }
    },[isOpen]);

    return (
        <Modal isOpen={isOpen !== ""} toggle={toggle} className="modal-fullscreen">
            <ModalHeader >Basic</ModalHeader>
            <ModalBody>
                {
                    data !== null &&
                    <div className="portfolio" style={{fontFamily :`${data.fontFamily}`,backgroundColor:`${data.backgroundColor}`}}>
                        {
                            data.blockList.map(
                                block => 
                                    <Block data={block} workList={workList} key={block.index} toggleWorkDetailModal={toggleWorkDetailModal} resume={defaultResume}/>
                            )
                        }
                        {/* <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} item={selectedItem}/> */}
                    </div>
                }
            
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>닫기</Button>
            </ModalFooter>
        </Modal>
        
    )
}

export default TemplatePreviewModal;