import React,{useState} from 'react';
import { Container } from 'reactstrap';
import CategorySelectModal from '../../../components/common/CategorySelectModal';
import WebAddressModal from '../../../components/common/WebAddressModal';
import { createArchiveConsumer } from '../../../context/archiveContext';
import { faFacebookF, faInstagram, faPinterestP, faTumblr, faTwitter, faVimeo, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArchiveProfile = ({archive,keywordList,editMode}) => {

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
            <div className="profileLeft">
                {
                    archive !== null && archive.profileImage !== null &&
                    <div className="profileImage">
                        {/* <img src={noProfile} alt="" /> */}
                        <img src={`https://storage.googleapis.com/pofou_repo/${archive.profileImage}`} alt="" />
                    </div>
                }
                <div className="profileInfo">
                    <h4 className="name">{archive.name}</h4>
                    <div className="category">
                        {
                            archive !== null && (archive.keyword1 !== "" && archive.keyword2 !== "" )?
                                <ul>
                                    {
                                        archive.keyword1 !== "" && <li>{archive.keyword1}</li>
                                    }
                                    {
                                        archive.keyword2 !== "" && <li>{archive.keyword2}</li>
                                    }
                                </ul>
                            :
                                // <button onClick={handleCategorySelectModal}>작업분야를 입력해주세요.</button>
                                ""
                                
                        }
                    </div>
                </div>
            </div>
            <div className="profileRight">
                <div className="snsList">
                    <ul>
                        {
                            archive !== null && archive.sns.homepage !== "" &&
                            <li className="hompage">
                                <a href={`http://${archive.sns.homepage}`} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faHome}/>
                                </a>
                            </li>
                        }
                        {
                            archive !== null && archive.sns.facebook !== "" &&
                            <li className="facebook">
                                <a href={archive.sns.facebook} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faFacebookF}/>
                                </a>
                            </li>
                        }
                        {
                            archive !== null && archive.sns.twitter !== "" &&
                            <li className="twitter">
                                <a href={archive.sns.twitter} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faTwitter}/>
                                </a>
                            </li>
                        }
                        {
                            archive !== null && archive.sns.pinterest !== "" &&
                            <li className="pinterest">
                                <a href={archive.sns.pinterest} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faPinterestP}/>
                                </a>
                            </li>
                        }
                        {
                            archive !== null && archive.sns.tumblr !== "" &&
                            <li className="tumblr">
                                <a href={archive.sns.tumblr} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faTumblr}/>
                                </a>
                            </li>
                        }
                        {
                            archive !== null && archive.sns.vimeo !== "" &&
                            <li className="vimeo">
                                <a href={archive.sns.vimeo} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faVimeo}/>
                                </a>
                            </li>
                        }
                        {
                            archive !== null && archive.sns.youtube !== "" &&
                            <li className="youtube">
                                <a href={archive.sns.youtube} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faYoutube}/>
                                </a>
                            </li>
                        }
                        {
                            archive !== null && archive.sns.instagram !== "" &&
                            <li className="instagram">
                                <a href={archive.sns.instagram} rel="noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </a>
                            </li>
                        }
                    </ul>
                </div>
                <div className="infoList">
                    <ul className="follow">
                        <li>팔로워 <span>0</span></li>
                        <li>팔로잉 <span>0</span></li>
                    </ul>
                    <ul className="archive">
                        <li>작업 <span>0</span></li>
                        <li>조회수 <span>0</span></li>
                    </ul>
                    <ul className="personal">
                        <li>좋아요 <span>0</span></li>
                        <li>컬렉션 <span>0</span></li>
                    </ul>
                </div>
            </div>
            <CategorySelectModal isOpen={openCategorySelectModal} toggle={handleCategorySelectModal} keywordList={keywordList} form={archive}/>
            <WebAddressModal isOpen={openWebAddressModal} toggle={handleWebAddressModal} form={archive.sns}/>
        </div>
    )
}

export default createArchiveConsumer(ArchiveProfile);