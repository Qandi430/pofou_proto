import { faUserCog, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect, useState} from 'react';
import { Form, FormGroup,Input,Label,Dropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
import { createCommonConsumer } from '../../context/commonContext';
import { getCategoryCodeList } from '../../server/common/CommonServer';
import { checkUrl, selectMemberType } from '../../server/member/MemberServer';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

const SelectMemberType = ({isLogin,loginMember,setMember,history}) => {

    const [memberTypeForm,setMemberTypeForm] = useState({
        memberNumber : "",
        memberType : "normal",
        name : "",
        mobile : "",
        url : "",
        urlStatus : "irregular",
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

    const [urlPrepend,setUrlPrepend] = useState("pofou.com/archive/");
    const [openUrlPrepend,setOpenUrlPrepend] = useState(false);

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
        
        if(memberTypeForm.url ===""){
            setFormStatus({
                submitAble: false,
                alertMessage : "URL을 입력해 주세요.",
            })
        }

        if(memberTypeForm.urlStatus !== "pass"){
            setFormStatus({
                submitAble : false,
                alertMessage : "정확한 URL을 입력해 주세요.",
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
            [name] : value,
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
    
    const blurOnUrl = async (url) => {
        console.log(url)
        let urlStatus = "";
        const urlRegexp = /[0-9a-zA-Z_-]{4,16}$/; 
        
        if(urlRegexp.test(url)){
            const {data} = await checkUrl(url);
            console.log(data);
            if(data){
                urlStatus = "pass";
            }else{
                urlStatus = "duplicate";
            }
        }else{
            urlStatus = "irregular";
        }

        setMemberTypeForm({
            ...memberTypeForm,
            urlStatus : urlStatus
        })
    }

    const toggleUrlPrepend = () => {
        setOpenUrlPrepend(!openUrlPrepend)
    }

    const changeUrlPrepend = (prepend) => {
        console.log(prepend)
        setUrlPrepend(prepend)
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
                            <h5 className="inputTitle">개인 URL</h5>
                            <div className="inputBox">
                                <dl>
                                    <dt>
                                    <Dropdown isOpen={openUrlPrepend} toggle={toggleUrlPrepend}>
                                        <DropdownToggle caret>{urlPrepend}</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => changeUrlPrepend("/pofou.com/archive")}>/pofou.com/archive</DropdownItem>
                                            <DropdownItem onClick={() => changeUrlPrepend("/pofou.com/resume")}>/pofou.com/resume</DropdownItem>
                                            <DropdownItem onClick={() => changeUrlPrepend("/pofou.com/portfolio")}>/pofou.com/portfolio</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    </dt>
                                    <dd>
                                        <input type="text" placeholder="영문,숫자,대시,언더바(최소 4자, 최대20자)" value={memberTypeForm.url} onChange={e => changeMemberTypeForm("url",e.target.value)} onBlur={e => blurOnUrl(e.target.value)}/>
                                    </dd>
                                </dl>
                                <p style={{display:`${memberTypeForm.url !== "" && memberTypeForm.urlStatus !== "pass" ? "block" : "none"}`}}>
                                    {memberTypeForm.urlStatus === "irregular" ? "영문, 숫자, 대시, 언더바만 사용하여 4자 이상 20자 이내로 입력해주세요." : memberTypeForm.urlStatus === "duplicate" ? "이미 사용중인 URL입니다." : ""}
                                </p>
                            </div>
                        </FormGroup>
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