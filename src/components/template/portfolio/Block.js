import React from 'react';
import { Route } from 'react-router-dom';

const MainImage01 = React.lazy(() => import('./image/MainImage01'));
const BasicProfile = React.lazy(() => import('./contents/BasicProfile'));
const BasicHistory = React.lazy(() => import('./contents/BasicHistory'));
const SkillList = React.lazy(() => import('./contents/SkillList'));
const BasicTitle = React.lazy(() => import('./title/BasicTitle'));
const BasicGrid = React.lazy(() => import('./work/BasicGrid'));

const blockList = [
    {id : "mainImage01",component : MainImage01},
    {id : "basicProfile",component : BasicProfile},
    {id : "basicHistory", component : BasicHistory},
    {id : "skillList", component : SkillList},
    {id : "basicTitle", component : BasicTitle},
    {id : "basicGrid", component : BasicGrid},
]

const Block = ({data,toggleWorkDetailModal}) => {
    return (
        <div className={`block ${data.category} ${data.container ? "container" : ""}`} style={{paddingTop : `${data.paddingTop? `${data.paddingTop}px` : 0}`,paddingBottom : `${data.paddingBottom ? `${data.paddingBottom}px` : 0}`}}>
            {
                data.grid !== undefined && data.grid >1 ?
                    <div className="gridWrap">
                        {
                            data.contents.map(
                                contents => {
                                    const obj = blockList.find(block => block.id === contents.id);
                                    console.log(obj)
                                    return <Route render={() => (<obj.component {...contents} grid={data.grid} toggleWorkDetailModal={toggleWorkDetailModal}/>)} key={contents.id}/>
                                }       
                            )
                        }
                    </div>
                :
                data.contents.map(
                    contents => {
                        const obj = blockList.find(block => block.id === contents.id);
                        console.log(obj)
                        return <Route render={() => (<obj.component {...contents} grid={data.grid} toggleWorkDetailModal={toggleWorkDetailModal}/>)} key={contents.id}/>
                    }       
                )
            }
            
        </div>
    )
}

export default Block;