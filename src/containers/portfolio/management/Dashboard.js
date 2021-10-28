import React from 'react'
import InfoBox from '../../../components/portfolio/management/management/InfoBox';
import MessageBox from '../../../components/portfolio/management/management/MessageBox';
import VisitBox from '../../../components/portfolio/management/management/VisitBox';
import { createPortfolioConsumer } from '../../../context/portfolioContext'

const Dashboard = () => {
    return (
        <div className="dashboard">
            <InfoBox/>
            <MessageBox/>
            <VisitBox/>
        </div>
    )
}

export default createPortfolioConsumer(Dashboard); 
