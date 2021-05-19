
import { faImages, faKeyboard,faTh, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Input,Row,Col } from 'reactstrap';

const UploadForm = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col md={9} className="uploadForm">
                        <div className="titleBox">
                            <Input type="text" placeholder="콘텐츠 제목을 입력해주세요."/>
                        </div>
                        <div className="contentsBox">
                            <div className="contentsPreset">
                                <p>콘텐츠를 선택하여 업로드를 시작하세요.</p>
                                <ul>
                                    <li>
                                        <button><FontAwesomeIcon icon={faImages}/></button>
                                        <p>이미지</p>
                                    </li>
                                    <li>
                                        <button><FontAwesomeIcon icon={faKeyboard}/></button>
                                        <p>텍스트</p>
                                    </li>
                                    <li>
                                        <button><FontAwesomeIcon icon={faVideo}/></button>
                                        <p>동영상</p>
                                    </li>
                                    <li>
                                        <button><FontAwesomeIcon icon={faTh}/></button>
                                        <p>이미지 그리드</p>
                                    </li>
                                </ul>
                            </div>
                        </div>    
                    </Col>
                    <Col md={3} className="uploadSideBar">
                        <div className="contentsSetting setting1">
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faImages}/>
                                    이미지 추가
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faKeyboard}/>
                                    텍스트 추가
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faVideo}/>
                                    동영상 추가
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faTh}/>
                                    이미지 그리드 추가
                                </li>
                            </ul>
                        </div>
                        <div className="contentsSetting setting2">
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faImages}/>
                                    콘텐츠 재정렬
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faKeyboard}/>
                                    세부 정보 설정
                                </li>
                            </ul>
                        </div>
                        <div className="contentsSetting setting3">
                            <dl className="background">
                                <dt>배경색상 설정</dt>
                                <dd>
                                    <Input type="color"  id="contentsBackgroundColor"/>
                                    <label htmlFor="contentsBackgroundColor">#FFFFFF</label>
                                </dd>
                            </dl>
                            <dl className="margin">
                                <dt>콘텐츠 간격 설정</dt>
                                <dd>
                                    <Input type="range"/>
                                    <Input type="text"/>
                                </dd>
                            </dl>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default UploadForm;