import React,{useState} from 'react';
import { Container } from 'reactstrap';
import CategorySelectModal from '../../../components/common/CategorySelectModal';
import WebAddressModal from '../../../components/common/WebAddressModal';
import noProfile from '../../../resources/images/contents/archive/noProfile.png'

const ArchiveProfile = () => {

    const [openCategorySelectModal, setOpenCategorySelectModal] = useState(false);
    const [openWebAddressModal,setOpenWebAddressModal] = useState(false);

    const handleCategorySelectModal = () => {
        setOpenCategorySelectModal(!openCategorySelectModal);
    }

    const handleWebAddressModal = () => {
        setOpenWebAddressModal(!openWebAddressModal);
    }

    return (
        <div className="archiveProfile">
            <Container>
                <div className="profileWrap">
                    <div className="profileImage">
                        <img src={noProfile} alt="" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="name">이승재</h4>
                        <div className="category">
                            <button onClick={handleCategorySelectModal}>작업분야를 입력해주세요.</button>
                        </div>
                        <ul className="follow">
                            <li>Followings 0</li>
                            <li>Followers 0</li>
                        </ul>
                        <ul className="archiveInfo">
                            <li>Works 0</li>
                            <li>Viewed 0</li>
                            <li>Linked 0</li>
                            <li>Collected 0</li>
                        </ul>
                        <div className="snsList">
                            <button onClick={handleWebAddressModal}>SNS주소를 입력해 주세요.</button>
                        </div>
                    </div>
                </div>
            </Container>
            <CategorySelectModal isOpen={openCategorySelectModal} toggle={handleCategorySelectModal}/>
            <WebAddressModal isOpen={openWebAddressModal} toggle={handleWebAddressModal}/>
        </div>
    )
}

export default ArchiveProfile;