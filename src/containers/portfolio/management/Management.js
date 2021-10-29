import React from 'react';
import { createPortfolioConsumer } from '../../../context/portfolioContext';
import Dashboard from './Dashboard';

import TemplateList from './TemplateList';

const Management = ({managementData}) => {
    return (
        <div className="management">
            {
                managementData !== null && managementData !== "" ? 
                <Dashboard/>
                :
                <TemplateList/>    
            }
            
        </div>
    )
}

export default createPortfolioConsumer(Management);