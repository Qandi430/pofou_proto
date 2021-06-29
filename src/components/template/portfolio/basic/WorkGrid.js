import React from 'react';
import {Container,Row,Col} from 'reactstrap';
import thumb1 from '../../../../resources/images/main/thumb01.gif';
import thumb2 from '../../../../resources/images/main/thumb02.jpeg';
import thumb3 from '../../../../resources/images/main/thumb03.jpeg';
import thumb4 from '../../../../resources/images/main/thumb04.jpeg';
import thumb5 from '../../../../resources/images/main/thumb05.jpeg';


const WorkGrid = ({toggleWorkDetailModal}) => {
    return(
        <div className="work grid">
            <Container>
                <h3 className="title">
                    WORK - Grid
                </h3>
                <Row>
                    <Col md="3" className="item">
                        <div className="itemWrap" style={{backgroundImage: `url(${thumb1})`}} onClick={toggleWorkDetailModal}>     
                            <div className="titleBox">Title</div>
                        </div>
                    </Col>
                    <Col md="3" className="item">
                        <div className="itemWrap" style={{backgroundImage: `url(${thumb2})`}} onClick={toggleWorkDetailModal}>     
                            
                            <div className="titleBox">Title</div>
                        </div>
                    </Col>
                    <Col md="3" className="item">
                        <div className="itemWrap" style={{backgroundImage: `url(${thumb3})`}} onClick={toggleWorkDetailModal}>     
                            
                            <div className="titleBox">Title</div>
                        </div>
                    </Col>
                    <Col md="3" className="item">
                        <div className="itemWrap" style={{backgroundImage: `url(${thumb4})`}} onClick={toggleWorkDetailModal}>     
                            
                            <div className="titleBox">Title</div>
                        </div>
                    </Col>
                    <Col md="3" className="item">
                        <div className="itemWrap" style={{backgroundImage: `url(${thumb5})`}}>     
                            <div className="titleBox">Title</div>
                        </div>
                    </Col>
                    
                </Row>
                
            </Container>
        </div>
    )
}

export default WorkGrid;