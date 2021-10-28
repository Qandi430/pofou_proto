import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import { createPortfolioConsumer } from '../../../../context/portfolioContext';

const InfoBox = ({loginMember}) => {
    return (
        <div className="infoBox dashboardBox">
            <h3>{loginMember.name}님의 포트폴리오</h3>
            <h5>http://www.pofou.com/portfolio/{loginMember.url}</h5>
            <dl>
                <dt>총 방문자</dt>
                <dd>1000명</dd>
            </dl>
            <dl>
                <dt>오늘 방문자</dt>
                <dd>1000명</dd>
            </dl>
            <div className="btnBox">
                <Button tag={Link} to={`/portfolio/${loginMember.url}`} color="primary">포트폴리오 방문</Button>
                <Button tag={Link} to={`/portfolio/config/${loginMember.url}`} color="danger">포트폴리오 편집</Button>
            </div>
        </div>
    )
}

export default createPortfolioConsumer(InfoBox);
