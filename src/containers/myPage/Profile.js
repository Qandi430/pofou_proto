import React,{useEffect, useState} from 'react';
import AvartaCreateModal from '../../components/common/AvataCreateModal';
import CategorySelectModal from '../../components/common/CategorySelectModal';
import WebAddressModal from '../../components/common/WebAddressModal';
import AccountForm from '../../components/myPage/profile/AccountForm';
import ProfileForm from '../../components/myPage/profile/ProfileForm';
import { createCommonConsumer } from '../../context/commonContext';
import { getCategoryCodeList } from '../../server/common/CommonServer';
import { checkUrl, updateProfile } from '../../server/member/MemberServer';

const Profile = ({isLogin,loginMember,history,setMember}) => {

    const [currentTab, setCurrentTab] = useState("profile");
    const [openCategorySelectModal,setOpenCategorySelectModal] = useState(false);
    const [openWebAddressModal,setOpenWebAddressModal] = useState(false);
    const [openAvatarCreateModal,setOpenAvatarCreateModal] = useState(false);
    const [beforeImage,setBeforeImage] = useState(null);
    const [profileForm,setProfileForm] = useState({
        email : "",
        memberType : "",
        name : "",
        gender : "N",
        mobile : "",
        profileImage : null,
        newsSendYn : "",
        messageSendYn : "",
        keyword1 : "",
        keyword2 : "",
        birthYear : "",
        birthMonth : "",
        birthDay : "",
        sns : {
            homepage : "",
            facebook : "",
            twitter : "",
            instagram : "",
            tumblr : "",
            vimeo : "",
            youtube : "",
            pinterest : "",
        }
    });
    useEffect(() => {
        initCategory();
    },[]);

    const [keywordList,setKeywordList] = useState([]);

    const initCategory = async () => {
        const {data} = await getCategoryCodeList();
        setKeywordList(data);
    }

    useEffect(() => {
        if(!isLogin){
            history.push("/");
            return;
        }
        let newProfileForm = JSON.parse(JSON.stringify(loginMember));

        let birthDate;

        if(newProfileForm.birthDate === null){
            birthDate = new Date();
        }else{
            birthDate = new Date(newProfileForm.birthDate);
        }
        console.log(birthDate.getFullYear(),birthDate.getMonth(),birthDate.getDate());
        newProfileForm["birthYear"] = birthDate.getFullYear();
        newProfileForm["birthMonth"] = birthDate.getMonth() + 1;
        newProfileForm["birthDay"] = birthDate.getDate();
        newProfileForm["urlStatus"] = newProfileForm.urlStatus !== "" ? "pass":"";
        setProfileForm(newProfileForm);
    },[history,isLogin,loginMember])

    const handleCurrentTab = tabName => {
        setCurrentTab(tabName);
    }

    const changeProfileForm = (name,value) => {
        if(name === "keyword"){
            if(profileForm.keyword1 === ""){
                name = "keyword1";
            }else if(profileForm.keyword1 === value){
                name = "keyword1";
                value = "";
            }else if(profileForm.keyword2 === ""){
                name = "keyword2";
            }else if(profileForm.keyword2 === value){
                name = "keyword2";
                value = "";
            }else{
                alert("?????? 2????????? ?????? ??? ??? ????????????.")
                return false;
            }
        }
        setProfileForm({
            ...profileForm,
            [name] : value
        })
    };

    const handleCategorySelectModal = (e) => {
        if(e !== undefined){
            e.preventDefault();
        }
        setOpenCategorySelectModal(!openCategorySelectModal);
    }

    const handleWebAddressModal = (e) => {
        if(e !== undefined){
            e.preventDefault();
        }
        setOpenWebAddressModal(!openWebAddressModal);
    }

    const blurOnUrl = async (url) => {
        console.log(url)
        let urlStatus = "";
        const urlRegexp = /[0-9a-zA-Z_-]{4,16}$/; 
        if(profileForm.url === url){
            urlStatus = "pass";
        }else{
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
        }

        setProfileForm({
            ...profileForm,
            urlStatus : urlStatus
        })
    };

    const toggleAvatarCreateModal = () => {
        setOpenAvatarCreateModal(!openAvatarCreateModal);
    }

    const changeBeforeImage = (e) => {
        console.log(e,e.target.files[0]);
        setBeforeImage(e.target.files[0])
    }

    const changeProfileImage = (image) => {
        setProfileForm({
            ...profileForm,
            profileImage : image
        })
        setBeforeImage(null);
    }

    const changeSns = (snsForm) => {
        setProfileForm({
            ...profileForm,
            sns : snsForm
        })
    }

    const saveProfile = async(e) => {
        e.preventDefault();
        if(profileForm.name === ""){
            alert("????????? ??????????????????.");
            return false;
        }
        if(profileForm.gender === ""){
            alert("????????? ????????? ?????????.");
            return false;
        }
        if(profileForm.url === ""){
            alert("URL??? ??????????????????.");
            return false;
        }

        if(profileForm.urlStatus !== "pass"){
            alert("????????? URL??? ????????? ?????????.");
            return;
        }

        if(profileForm.keyword1 === "" && profileForm.keyword2 === "" ){
            alert("?????? ????????? ????????? ????????? ?????????.")
            return;
        }

        profileForm.birthDate = new Date(`${profileForm.birthYear}-${profileForm.birthMonth}-${profileForm.birthDay}`);
        console.log(profileForm)


        const {data} = await updateProfile(profileForm);
        
        if(data.result === "fail"){
            alert("????????? ?????????????????????.");
        }else{
            // alert("?????????????????????");
            await setMember(data.token);
            // history.push("/");
            alert("?????????????????????");
        }
    }

    return (
        <div className="profile">
            <div className="profileTab">
                <ul className="tabList">
                    <li className={currentTab === "profile" ? "on" : ""} onClick={() => handleCurrentTab("profile")}>?????????</li>
                    <li className={currentTab === "account" ? "on" : ""} onClick={() => handleCurrentTab("account")}>??????</li>
                    {/* <li className={currentTab === "alarm" ? "on" : ""} onClick={() => handleCurrentTab("alarm")}>??????</li> */}
                </ul>
            </div>
            <div className="tabContents">
                {
                    (() => {
                        switch(currentTab){
                            case "account":
                                return <AccountForm/>;
                            case "alarm" :
                                return "alarm";
                            default :
                                return <ProfileForm saveProfile={saveProfile} changeBeforeImage={changeBeforeImage} profileForm={profileForm} toggleAvatarCreateModal={toggleAvatarCreateModal} changeProfileForm={changeProfileForm} handleCategorySelectModal={handleCategorySelectModal} handleWebAddressModal={handleWebAddressModal} keywordList={keywordList} blurOnUrl={blurOnUrl}/>;
                        }
                    })()
                }
            </div>
            <CategorySelectModal isOpen={openCategorySelectModal} toggle={handleCategorySelectModal} keywordList={keywordList} form={profileForm} changeForm={changeProfileForm}/>
            <WebAddressModal isOpen={openWebAddressModal} toggle={handleWebAddressModal} form={profileForm.sns} changeSns={changeSns}/>
            <AvartaCreateModal beforeImage={beforeImage} saveImage={changeProfileImage}/>
        </div>
    )
}

export default createCommonConsumer(Profile);