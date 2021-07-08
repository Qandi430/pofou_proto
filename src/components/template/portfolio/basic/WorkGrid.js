import React from 'react';
import {Container,Row,Col} from 'reactstrap';
import thumb1 from '../../../../resources/images/main/thumb01.gif';
import thumb2 from '../../../../resources/images/main/thumb02.jpeg';
import thumb3 from '../../../../resources/images/main/thumb03.jpeg';
import thumb4 from '../../../../resources/images/main/thumb04.jpeg';
import thumb5 from '../../../../resources/images/main/thumb05.jpeg';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WorkGrid = ({toggleWorkDetailModal,data,designMode,toggleTitleConfigModal}) => {
    return(
        <div className={`work grid ${designMode ? "designMode" : ""}`}>
            <Container>
                <h3 className={`title`} style={{color : `${data.title.color}`,textAlign:`${data.title.textAlign}`}}>
                    <span dangerouslySetInnerHTML={{__html: data.title.text }}/>
                    {
                        designMode &&
                        <button onClick={() => toggleTitleConfigModal("work")}>
                            <FontAwesomeIcon icon={faCog}/>
                        </button>
                    }
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