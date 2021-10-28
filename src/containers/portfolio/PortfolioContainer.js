import React, { Fragment, useEffect, useState } from 'react'
import Block from '../../components/template/portfolio/Block';

import { createPortfolioConsumer } from '../../context/portfolioContext';

const PortfolioContainer = ({match,getPortfolio,portfolioData,resume,workList,selectWork}) => {
    const [url,setUrl] = useState("");
    
    useEffect(() => {
        if(match.params.url !== undefined && match.params.url !== url){
            setUrl(match.params.url);
            getPortfolio(match.params.url);
        }
    },[match,url]);

    return (
        <Fragment>
            {
                portfolioData !== null && resume !== null && workList !== null &&
                <div className="portfolioInner" style={{fontFamily :`${portfolioData.fontFamily}`,backgroundColor:`${portfolioData.backgroundColor}`,}}>
                    {
                        portfolioData.blockList.map(
                            block => 
                                <Block data={block} key={block.index} resume={resume} workList={workList} selectWork={selectWork}/>
                        )
                    }
                </div>
            }
        </Fragment>
    )
}

export default createPortfolioConsumer(PortfolioContainer);
