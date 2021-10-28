import React, { Fragment } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { createPortfolioConsumer } from '../../../../context/portfolioContext'

const ConfigNoticeModal = ({openNoticeModal,toggleNoticeModal,loginMember,modifyHistory,clickUpdateButton,clickQuitButton}) => {
    return (
        <Modal isOpen={openNoticeModal !== ""} toggle={toggleNoticeModal} centered id="configNoticeModal">
            <ModalBody>
                {
                    openNoticeModal === "update" &&
                    <div className="updateNotice">
                        <h2>안내</h2>
                        {
                            modifyHistory.length > 1 ?
                            <Fragment>
                                <p>현재 편집하신 내용이 다음 주소에 적용됩니다.</p>
                                <h6>http://pofou.com/portfolio/{loginMember.url}</h6>
                                <hr />
                                <p>포트폴리오를 저장 하시겠습니까?</p>
                            </Fragment>
                            :
                            <Fragment>
                                <p style={{color:"#f00"}}>변경된 내용이 없습니다.</p>
                            </Fragment>
                        }
                        
                    </div>
                }
                {
                    openNoticeModal === "quit" &&
                    <div className="quitNotice">
                        <h2>안내</h2>
                        <p>편집을 끝내시면 이전페이지로 돌아가게 됩니다.</p>
                        {
                            modifyHistory.length > 1 &&
                            <p style={{color:"#f00"}}>저장되지 않은 내용은 모두 삭제됩니다.</p>
                        }
                        <hr />
                        <p>편집을 끝내시겠습니까?</p>
                    </div>
                }
            </ModalBody>
            <ModalFooter>
                {
                    openNoticeModal === "update" && modifyHistory.length > 1 &&
                    <Button onClick={clickUpdateButton} outline color="primary">저장</Button>
                }
                {
                    openNoticeModal === "quit" &&
                    <Button onClick={clickQuitButton} outline color="primary">편집 끝내기</Button>
                }
                
                <Button onClick={toggleNoticeModal} outline color="danger">취소</Button>
            </ModalFooter>
        </Modal>
    )
}

export default createPortfolioConsumer(ConfigNoticeModal); 
