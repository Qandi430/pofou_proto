import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {Row,Container,Col,Button} from 'reactstrap';
import Basic from '../../../resources/images/template/basic.png'
import TemplatePreviewModal from './TemplatePreviewModal';

const TemplateList = () => {

    const [openTemplatePreview, setOpenTemplatePreview] = useState(false);

    const toggleTemplatePreview = () => {
        setOpenTemplatePreview(!openTemplatePreview);
    }

    return (
        <div className="templateList">
            <Container>
                <div className="titleBox">
                    <h3 className="title">포트폴리오 개설</h3>
                    <p>포트폴리오에 사용할 템플릿을 선택해 주세요.</p>
                </div>
                <Row className="list">
                    <Col md="4" className="item">
                        <div className="itemWrap">
                            <div className="imageWrap">
                                <div className="btnWrap">
                                    <Button className="btnCreate" tag={Link} to="/portfolio/design">개설하기</Button>
                                    <Button className="btnPreview" onClick={toggleTemplatePreview}>미리보기</Button>
                                </div>
                                <img src={Basic} alt="" />
                            </div>
                            <p>#기본#깔끔</p>
                            <h5>Basic</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
            <TemplatePreviewModal isOpen={openTemplatePreview} toggle={toggleTemplatePreview}/>
        </div>
    )
}

export default TemplateList;