import React,{useState} from 'react';
import CategorySelectModal from '../../components/common/CategorySelectModal';
import WebAddressModal from '../../components/common/WebAddressModal';
import AccountForm from '../../components/myPage/profile/AccountForm';
import ProfileForm from '../../components/myPage/profile/ProfileForm';

const Profile = () => {

    const [currentTab, setCurrentTab] = useState("profile");
    const [openCategorySelectModal,setOpenCategorySelectModal] = useState(false);
    const [openWebAddressModal,setOpenWebAddressModal] = useState(false);
    const [profileForm,setProfileForm] = useState({
        "name" : "",
        "gender" : "",
        "birthYear" : "",
        "birthMonth" : "",
        "birthDay" : "",
        "mobile" : "",
        "categoryList" : [],
        "webAddress" : {
            "web" : "",
            "facebook" : "",
            "twitter" : "",
            "" : ""
        }
    });

    const handleCurrentTab = tabName => {
        setCurrentTab(tabName);
    }

    const changeProfileForm = (name,value) => {
        setProfileForm({
            ...profileForm,
            [name] : value
        })
    }

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

    return (
        <div className="profile">
            <div className="profileTab">
                <h2 className="pageTitle">개인정보설정</h2>
                <ul className="tabList">
                    <li className={currentTab === "profile" ? "on" : ""} onClick={() => handleCurrentTab("profile")}>프로필</li>
                    <li className={currentTab === "account" ? "on" : ""} onClick={() => handleCurrentTab("account")}>계정</li>
                    {/* <li className={currentTab === "alarm" ? "on" : ""} onClick={() => handleCurrentTab("alarm")}>알림</li> */}
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
                                return <ProfileForm profileForm={profileForm} changeProfileForm={changeProfileForm} handleCategorySelectModal={handleCategorySelectModal} handleWebAddressModal={handleWebAddressModal}/>;
                        }
                    })()
                }
            </div>
            <CategorySelectModal isOpen={openCategorySelectModal} toggle={handleCategorySelectModal}/>
            <WebAddressModal isOpen={openWebAddressModal} toggle={handleWebAddressModal}/>
        </div>
    )
}

export default Profile;