import { faUserCog, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect, useState} from 'react';
import { Form, FormGroup,Input,Label } from 'reactstrap';
import { createCommonConsumer } from '../../context/commonContext';
import { getCategoryCodeList } from '../../server/common/CommonServer';
import { selectMemberType } from '../../server/member/MemberServer';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

const SelectMemberType = ({isLogin,loginMember,setMember,history}) => {

    const [memberTypeForm,setMemberTypeForm] = useState({
        memberNumber : "",
        memberType : "normal",
        name : "",
        mobile : "",
        gender : "N",
        keyword1 : "",
        keyword2 : "",
        newsSendYn : "",
        messageSendYn : "",
    });
    const [formStatus,setFormStatus] = useState({
        submitAble : false,
        alertMessage : "",
    });    

    const [keywordList,setKeywordList] = useState([]);

    useEffect(() => {
        initCategory();
    },[])

    useEffect(() => {
        if(memberTypeForm.memberNumber === ""){
            const memberToken = cookie.load("memberToken");
            if(memberToken === undefined){
                console.log("is Not Login")
                history.push("/");
            }else{
                const loginMember = jwtDecode(memberToken);
                if(loginMember.member.memberType !== "none"){
                    console.log("already select member type")
                    history.push("/");
                }else{
                    setMemberTypeForm({
                        ...memberTypeForm,
                        memberNumber : loginMember.member.memberNumber
                    })
                }
            }
        }
    },[history,memberTypeForm]);
    
    useEffect(() => {
        if(memberTypeForm.memberType === ""){
            setFormStatus({
                submitAble : false,
                alertMessage : "회원 타입을 선택해 주세요.",
            })
            return;
        }
        if(memberTypeForm.name === ""){
            setFormStatus({
                submitAble : false,
                alertMessage : "이름을 입력해 주세요.",
            })
            return;
        }
        if(memberTypeForm.gender === ""){
            setFormStatus({
                submitAble : false,
                alertMessage : "성별을 선택해 주세요.",
            })
            return;
        }
        if(memberTypeForm.keyword1 === "" && memberTypeForm.keyword2 === "" ){
            setFormStatus({
                submitAble : false,
                alertMessage : "한개 이상의 분야를 선택해 주세요.",
            })
            return;
        }
        if(memberTypeForm.memberType === "client"){
            if(memberTypeForm.mobile === ""){
                setFormStatus({
                    submitAble : false,
                    alertMessage : "휴대폰 번호를 입력해 주세요.",
                })
                return;
            }
        }else{
            memberTypeForm.mobile = "";
            memberTypeForm.messageSendYn = "N";
        }
        
        setFormStatus({
            submitAble : true,
            alertMessage : "",
        })
    },[memberTypeForm]);

    const initCategory = async () => {
        const {data} = await getCategoryCodeList();
        setKeywordList(data);
    }


    const changeMemberTypeForm = (name,value) => {
        if(name === "keyword"){
            if(memberTypeForm.keyword1 === ""){
                name = "keyword1";
            }else if(memberTypeForm.keyword1 === value){
                name = "keyword1";
                value = "";
            }else if(memberTypeForm.keyword2 === ""){
                name = "keyword2";
            }else if(memberTypeForm.keyword2 === value){
                name = "keyword2";
                value = "";
            }else{
                alert("최대 2개까지 설정 할 수 있습니다.")
                return false;
            }
        }
        setMemberTypeForm({
            ...memberTypeForm,
            [name] : value
        })
    };

    const submitSelectMemberForm = async (e) => {
        e.preventDefault();
        if(!formStatus.submitAble){
            alert(formStatus.alertMessage);
            return;
        }
        const {data} = await selectMemberType(memberTypeForm);
        if(data.result === "fail"){
            alert("저장에 실패하였습니다.");
        }else{
            await setMember(data.token);
            history.push("/");
        }
    }

    return(
        <div className="selectMemberTypeWrap">
            <div className="selectMemberTypeTitle">
                <h1 className="logo">POFOU</h1>
                <h2>
                    회원 타입을
                <b>선택해주세요.</b>
                </h2>
                <p>포포유 서비스를 이용을 위한 필수 단계입니다.</p>
            </div>
            <div className="selectMemberTypeForm">
                <div className="memberTypeTab">
                    <div className={`tabBtn normal ${memberTypeForm.memberType === "normal" ? "on" : ""}`} onClick={() => changeMemberTypeForm("memberType","normal")}>
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserEdit}/>
                        </div>
                        <div className="name">일반/창작자 회원</div>
                    </div>
                    <div className={`tabBtn client ${memberTypeForm.memberType === "client" ? "on" : ""}`} onClick={() => changeMemberTypeForm("memberType","client")}>
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserCog}/>
                        </div>
                        <div className="name">클라이언트 회원</div>
                    </div>
                </div>
                <div className="tabContents normal">
                    <p className="notice">
                        <b>노트폴리오의 일반/창작자 회원</b>은 작품 검색 및 수집, 작품 업로드, 클래스 수강 등의 서비스를 이용하실 수 있습니다.
                    </p>
                    <Form className="typeNormalForm">
                        <FormGroup>
                            <h5 className="inputTitle">사용자 이름</h5>
                            <div className="inputBox">
                                <input type="text" placeholder="사용자 이름을 입력해 주세요" value={memberTypeForm.name} onChange={e => changeMemberTypeForm("name",e.target.value)}/>    
                            </div>
                        </FormGroup>
                        {
                            memberTypeForm.memberType === "client" &&
                            <FormGroup>
                                <h5 className="inputTitle">휴대폰 번호</h5>
                                <div className="inputBox">
                                    <input type="text" placeholder="원활한 의뢰 과정을 위한 연락처 등록 및 본인인증" value={memberTypeForm.mobile} onChange={e => changeMemberTypeForm("mobile",e.target.value)}/>    
                                </div>
                            </FormGroup>
                        }
                        <FormGroup>
                            <h5 className="inputTitle">성별</h5>
                            <div className="inputBox">
                                <Input type="radio" id="genderM" name="gender" value="M" defaultChecked={memberTypeForm.gender === "M"} onChange={e => changeMemberTypeForm("gender",e.target.value)}/>
                                <Label htmlFor="genderM">남성</Label>
                                <Input type="radio" id="genderF" name="gender" value="F" defaultChecked={memberTypeForm.gender === "F"} onChange={e => changeMemberTypeForm("gender",e.target.value)}/>
                                <Label htmlFor="gnderF">여성</Label>
                                <Input type="radio" id="genderN" name="gender" value="N" defaultChecked={memberTypeForm.gender === "N"} onChange={e => changeMemberTypeForm("gender",e.target.value)}/>
                                <Label htmlFor="genderN">선택안함</Label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <h5 className="inputTitle">분야 선택(최대 2개 설정)</h5>
                            <div className="inputBox">
                                <ul>
                                    {
                                        keywordList.map(
                                            (keyword,index) => (
                                                <li className="customCheckbox" key={index}>
                                                    <input id={`category${index}`} type='checkbox' value={keyword.code} checked={memberTypeForm.keyword1 === keyword.code || memberTypeForm.keyword2 === keyword.code } onChange={e => changeMemberTypeForm("keyword",e.target.value)} />
                                                    <label htmlFor={`category${index}`}>
                                                        <span></span>
                                                        {keyword.kor}
                                                        <ins><i>{keyword.kor}</i></ins>
                                                    </label>
                                                </li>
                                            )
                                        )
                                    }
                                    {/* <li className="customCheckbox">
                                        <input id='category1' type='checkbox' value="Graphic Design" checked={memberTypeForm.keyword1 === "Graphic Design" || memberTypeForm.keyword2 === "Graphic Design" } onChange={e => changeMemberTypeForm("keyword",e.target.value)} />
                                        <label htmlFor='category1'>
                                            <span></span>
                                            그래픽 디자인
                                            <ins><i>그래픽 디자인</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category2' type='checkbox'  value="Branding/Edit" checked={memberTypeForm.keyword1 === "Branding/Edit" || memberTypeForm.keyword2 === "Branding/Edit" } onChange={e => changeMemberTypeForm("keyword",e.target.value)} />
                                        <label htmlFor='category2'>
                                            <span></span>
                                            브랜딩/편집
                                            <ins><i>브랜딩/편집</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category3' type='checkbox'  value="Video/Motion Graphic" checked={memberTypeForm.keyword1 === "Video/Motion Graphic" || memberTypeForm.keyword2 === "Video/Motion Graphic" } onChange={e => changeMemberTypeForm("keyword",e.target.value)}/>
                                        <label htmlFor='category3'>
                                            <span></span>
                                            영상/모션 그래픽
                                            <ins><i>영상/모션 그래픽</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category4' type='checkbox' value="UI/UX" checked={memberTypeForm.keyword1 === "UI/UX" || memberTypeForm.keyword2 === "UI/UX" } onChange={e => changeMemberTypeForm("keyword",e.target.value)}/>
                                        <label htmlFor='category4'>
                                            <span></span>
                                            UI/UX
                                            <ins><i>UI/UX</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category5' type='checkbox' value="Illustration" checked={memberTypeForm.keyword1 === "Illustration" || memberTypeForm.keyword2 === "Illustration" } onChange={e => changeMemberTypeForm("keyword",e.target.value)}/>
                                        <label htmlFor='category5'>
                                            <span></span>
                                            일러스트레이션
                                            <ins><i>일러스트레이션</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category6' type='checkbox' value="Digital Art" checked={memberTypeForm.keyword1 === "Digital Art" || memberTypeForm.keyword2 === "Digital Art" } onChange={e => changeMemberTypeForm("keyword",e.target.value)}/>
                                        <label htmlFor='category6'>
                                            <span></span>
                                            디지털 아트
                                            <ins><i>디지털 아트</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category7' type='checkbox' value="Typography" checked={memberTypeForm.keyword1 === "Typography" || memberTypeForm.keyword2 === "Typography" } onChange={e => changeMemberTypeForm("keyword",e.target.value)}/>
                                        <label htmlFor='category7'>
                                            <span></span>
                                            타이포그래피
                                            <ins><i>타이포그래피</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category8' type='checkbox' />
                                        <label htmlFor='category8'>
                                            <span></span>
                                            산업 디자인
                                            <ins><i>산업 디자인</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category9' type='checkbox' />
                                        <label htmlFor='category9'>
                                            <span></span>
                                            포토그래피
                                            <ins><i>포토그래피</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category10' type='checkbox' />
                                        <label htmlFor='category10'>
                                            <span></span>
                                            파인아트
                                            <ins><i>파인아트</i></ins>
                                        </label>
                                    </li>
                                    <li className="customCheckbox">
                                        <input id='category11' type='checkbox' />
                                        <label htmlFor='category11'>
                                            <span></span>
                                            공예
                                            <ins><i>공예</i></ins>
                                        </label>
                                    </li> */}
                                </ul>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
                <div className="btnBox">
                    <div className="smsSend">
                        <div className="inputBox">
                            <div className="customCheckbox">
                                <input id='newsSendYn' type='checkbox' checked={memberTypeForm.newsSendYn === "Y"} onChange={e => changeMemberTypeForm("newsSendYn",e.target.checked ? "Y":"N")} />
                                <label htmlFor='newsSendYn'>
                                    <span></span>
                                    최신 소식 및 작가/작품 소개를 메일로 받겠습니다.
                                    <ins><i>최신 소식 및 작가/작품 소개를 메일로 받겠습니다.</i></ins>
                                </label>
                            </div>
                        </div>
                        {
                            memberTypeForm.memberType === "client" &&
                            <div className="inputBox">
                                <div className="customCheckbox">
                                    <input id='messageSendYn' type='checkbox'  checked={memberTypeForm.messageSendYn === "Y"} onChange={e => changeMemberTypeForm("messageSendYn",e.target.checked ? "Y":"N")} />
                                    <label htmlFor='messageSendYn'>
                                        <span></span>
                                        읽지 않은 메시지를 이메일로 받아보겠습니다.
                                        <ins><i>읽지 않은 메시지를 이메일로 받아보겠습니다.</i></ins>
                                    </label>
                                </div>
                            </div>
                        }
                        <p>버튼을 클릭함으로써 노트폴리오의 <span>약관</span>과 <span>개인정보보호정책</span>에 동의합니다.</p>
                    </div>
                    <button onClick={submitSelectMemberForm} className={`${formStatus.submitAble ? "able" : "disable"}`}>계정 생성 완료</button>
                </div>
            </div>
        </div>
    );
}

export default createCommonConsumer(SelectMemberType);