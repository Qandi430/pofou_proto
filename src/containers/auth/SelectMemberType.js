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
                alertMessage : "?????? ????????? ????????? ?????????.",
            })
            return;
        }
        if(memberTypeForm.name === ""){
            setFormStatus({
                submitAble : false,
                alertMessage : "????????? ????????? ?????????.",
            })
            return;
        }
        if(memberTypeForm.gender === ""){
            setFormStatus({
                submitAble : false,
                alertMessage : "????????? ????????? ?????????.",
            })
            return;
        }
        
        if(memberTypeForm.url ===""){
            setFormStatus({
                submitAble: false,
                alertMessage : "URL??? ????????? ?????????.",
            })
        }

        if(memberTypeForm.urlStatus !== "pass"){
            setFormStatus({
                submitAble : false,
                alertMessage : "????????? URL??? ????????? ?????????.",
            })
            return;
        }

        if(memberTypeForm.keyword1 === "" && memberTypeForm.keyword2 === "" ){
            setFormStatus({
                submitAble : false,
                alertMessage : "?????? ????????? ????????? ????????? ?????????.",
            })
            return;
        }
        if(memberTypeForm.memberType === "client"){
            if(memberTypeForm.mobile === ""){
                setFormStatus({
                    submitAble : false,
                    alertMessage : "????????? ????????? ????????? ?????????.",
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
                alert("?????? 2????????? ?????? ??? ??? ????????????.")
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
            alert("????????? ?????????????????????.");
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
                    ?????? ?????????
                <b>??????????????????.</b>
                </h2>
                <p>????????? ???????????? ????????? ?????? ?????? ???????????????.</p>
            </div>
            <div className="selectMemberTypeForm">
                <div className="memberTypeTab">
                    <div className={`tabBtn normal ${memberTypeForm.memberType === "normal" ? "on" : ""}`} onClick={() => changeMemberTypeForm("memberType","normal")}>
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserEdit}/>
                        </div>
                        <div className="name">??????/????????? ??????</div>
                    </div>
                    <div className={`tabBtn client ${memberTypeForm.memberType === "client" ? "on" : ""}`} onClick={() => changeMemberTypeForm("memberType","client")}>
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserCog}/>
                        </div>
                        <div className="name">??????????????? ??????</div>
                    </div>
                </div>
                <div className="tabContents normal">
                    <p className="notice">
                        <b>?????????????????? ??????/????????? ??????</b>??? ?????? ?????? ??? ??????, ?????? ?????????, ????????? ?????? ?????? ???????????? ???????????? ??? ????????????.
                    </p>
                    <Form className="typeNormalForm">
                        <FormGroup>
                            <h5 className="inputTitle">????????? ??????</h5>
                            <div className="inputBox">
                                <input type="text" placeholder="????????? ????????? ????????? ?????????" value={memberTypeForm.name} onChange={e => changeMemberTypeForm("name",e.target.value)}/>    
                            </div>
                        </FormGroup>
                        {
                            memberTypeForm.memberType === "client" &&
                            <FormGroup>
                                <h5 className="inputTitle">????????? ??????</h5>
                                <div className="inputBox">
                                    <input type="text" placeholder="????????? ?????? ????????? ?????? ????????? ?????? ??? ????????????" value={memberTypeForm.mobile} onChange={e => changeMemberTypeForm("mobile",e.target.value)}/>    
                                </div>
                            </FormGroup>
                        }
                        <FormGroup>
                            <h5 className="inputTitle">?????? URL</h5>
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
                                        <input type="text" placeholder="??????,??????,??????,?????????(?????? 4???, ??????20???)" value={memberTypeForm.url} onChange={e => changeMemberTypeForm("url",e.target.value)} onBlur={e => blurOnUrl(e.target.value)}/>
                                    </dd>
                                </dl>
                                <p style={{display:`${memberTypeForm.url !== "" && memberTypeForm.urlStatus !== "pass" ? "block" : "none"}`}}>
                                    {memberTypeForm.urlStatus === "irregular" ? "??????, ??????, ??????, ???????????? ???????????? 4??? ?????? 20??? ????????? ??????????????????." : memberTypeForm.urlStatus === "duplicate" ? "?????? ???????????? URL?????????." : ""}
                                </p>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <h5 className="inputTitle">??????</h5>
                            <div className="inputBox">
                                <Input type="radio" id="genderM" name="gender" value="M" defaultChecked={memberTypeForm.gender === "M"} onChange={e => changeMemberTypeForm("gender",e.target.value)}/>
                                <Label htmlFor="genderM">??????</Label>
                                <Input type="radio" id="genderF" name="gender" value="F" defaultChecked={memberTypeForm.gender === "F"} onChange={e => changeMemberTypeForm("gender",e.target.value)}/>
                                <Label htmlFor="gnderF">??????</Label>
                                <Input type="radio" id="genderN" name="gender" value="N" defaultChecked={memberTypeForm.gender === "N"} onChange={e => changeMemberTypeForm("gender",e.target.value)}/>
                                <Label htmlFor="genderN">????????????</Label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <h5 className="inputTitle">?????? ??????(?????? 2??? ??????)</h5>
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
                                    ?????? ?????? ??? ??????/?????? ????????? ????????? ???????????????.
                                    <ins><i>?????? ?????? ??? ??????/?????? ????????? ????????? ???????????????.</i></ins>
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
                                        ?????? ?????? ???????????? ???????????? ?????????????????????.
                                        <ins><i>?????? ?????? ???????????? ???????????? ?????????????????????.</i></ins>
                                    </label>
                                </div>
                            </div>
                        }
                        <p>????????? ?????????????????? ?????????????????? <span>??????</span>??? <span>????????????????????????</span>??? ???????????????.</p>
                    </div>
                    <button onClick={submitSelectMemberForm} className={`${formStatus.submitAble ? "able" : "disable"}`}>?????? ?????? ??????</button>
                </div>
            </div>
        </div>
    );
}

export default createCommonConsumer(SelectMemberType);