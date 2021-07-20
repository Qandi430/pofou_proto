import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';

const MainImage01 = React.lazy(() => import('./image/MainImage01'));
const BasicProfile = React.lazy(() => import('./contents/BasicProfile'));
const BasicHistory = React.lazy(() => import('./contents/BasicHistory'));
const SkillList = React.lazy(() => import('./contents/SkillList'));
const BasicTitle = React.lazy(() => import('./title/BasicTitle'));
const BasicGrid = React.lazy(() => import('./work/BasicGrid'));
const BasicContactList = React.lazy(() => import('./contact/BasicContactList'));
const BasicContactForm = React.lazy(() => import('./contact/BasicContactForm'));

const blockList = [
    {id : "mainImage01",component : MainImage01},
    {id : "basicProfile",component : BasicProfile},
    {id : "basicHistory", component : BasicHistory},
    {id : "skillList", component : SkillList},
    {id : "basicTitle", component : BasicTitle},
    {id : "basicGrid", component : BasicGrid},
    {id : "basicContactList", component : BasicContactList},
    {id : "basicContactForm", component : BasicContactForm},
]

const Block = ({data,toggleWorkDetailModal,configMode,toggleAddBlock,selectConfigBlock}) => {
    const [style,setStyle] = useState({
        paddingTop : 0,
        paddingBottom : 0,
    });

    useEffect(() => {
        let newStyle = {};
        newStyle["paddingTop"] = data.paddingTop? `${data.paddingTop}px` : 0;
        newStyle["paddingBottom"] = data.paddingBottom? `${data.paddingBottom}px` : 0;
        newStyle["backgroundColor"] = data.backgroundColor ? data.backgroundColor : "transparent";
        if(data.backgroundImage !== null){
            newStyle["backgroundImage"] = `url(${data.backgroundImage})`;
        }
        setStyle(newStyle);
    },[data]);

    return (
        <div className={`block ${data.category} ${configMode ? "configMode" : ""}`} 
             style={style}>
            {
                data.grid !== undefined && data.grid >1 ?
                    data.container ? 
                        <Container>
                            <div className="gridWrap">
                                {
                                    data.contents.map(
                                        contents => {
                                            const obj = blockList.find(block => block.id === contents.id);
                                            return <Route render={() => (<obj.component {...contents} grid={data.grid} toggleWorkDetailModal={toggleWorkDetailModal}/>)} key={contents.id}/>
                                        }       
                                    )
                                }
                            </div>
                        </Container>
                        :
                        <div className="gridWrap">
                            {
                                data.contents.map(
                                    contents => {
                                        const obj = blockList.find(block => block.id === contents.id);
                                        return <Route render={() => (<obj.component {...contents} grid={data.grid} toggleWorkDetailModal={toggleWorkDetailModal}/>)} key={contents.id}/>
                                    }       
                                )
                            }
                        </div>
                :
                data.container ?
                    <Container>
                        {
                            data.contents.map(
                                contents => {
                                    const obj = blockList.find(block => block.id === contents.id);
                                    return <Route render={() => (<obj.component {...contents} grid={data.grid} toggleWorkDetailModal={toggleWorkDetailModal}/>)} key={contents.id}/>
                                }       
                            )        
                        }
                    </Container>
                    :        
                    data.contents.map(
                        contents => {
                            const obj = blockList.find(block => block.id === contents.id);
                            return <Route render={() => (<obj.component {...contents} grid={data.grid} toggleWorkDetailModal={toggleWorkDetailModal}/>)} key={contents.id}/>
                        }       
                    )
            }
            {
                configMode &&
                <button className="btnConfig" onClick={() => selectConfigBlock(data)}>
                    <FontAwesomeIcon icon={faCog}/>
                </button>
            }
            {
                configMode &&
                <button className="addBlock" onClick={() => toggleAddBlock(data.index)}>
                    <div className="icon"><FontAwesomeIcon icon={faPlus}/></div>
                </button>
            }
        </div>
    )
}

export default Block;