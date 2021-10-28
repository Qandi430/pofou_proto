import React,{Fragment} from 'react';
import ConfigHeader from '../../../components/portfolio/management/config/ConfigHeader';
import Block from '../../../components/template/portfolio/Block';
import AddBlockSideBar from '../../../components/portfolio/management/config/AddBlockSideBar';
import '../../../resources/scss/myPage/config.scss';
import ConfigBlockSideBar from '../../../components/portfolio/management/config/ConfigBlockSideBar';
import SortBlockModal from '../../../components/portfolio/management/config/SortBlockModal';
import { createPortfolioConsumer } from '../../../context/portfolioContext';
import ConfigNoticeModal from '../../../components/portfolio/management/config/ConfigNoticeModal';

const Config = ({portfolioData,resume,workList,toggleAddBlock,selectConfigBlock,selectWork}) => {
    return (
        <div className="config">
            {
                portfolioData === null || resume === null || workList === null ?
                <div className="empty"></div>
                :
                <Fragment>
                    <ConfigHeader/>
                    <div className="configBody" style={{fontFamily :`${portfolioData.fontFamily}`,backgroundColor:`${portfolioData.backgroundColor}`,}}>
                        {
                            portfolioData.blockList.map(
                                block => 
                                    <Block data={block} key={block.index} resume={resume} configMode toggleAddBlock={toggleAddBlock} selectConfigBlock={selectConfigBlock} workList={workList} selectWork={selectWork}/>
                            )
                        }
                        
                    </div>
                    <AddBlockSideBar/>
                    <ConfigBlockSideBar/>
                    <SortBlockModal/>
                    <ConfigNoticeModal/>
                </Fragment>
            }
            
        </div>
    )
}

export default createPortfolioConsumer(Config);