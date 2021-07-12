import React from 'react';
import { Route } from 'react-router-dom';

const MainImage01 = React.lazy(() => import('./image/MainImage01'));

const blockList = [
    {id : "mainImage01",component : MainImage01},
]

const Block = ({data}) => {
    console.log(data);
    return (
        <div className={`block ${data.category}`}>
            {
                data.contents.map(
                    contents => {
                        const obj = blockList.find(block => block.id === contents.id);
                        return <Route render={() => (<obj.component {...contents}/>)} key={contents.id}/>
                    }       
                )
            }
        </div>
    )
}

export default Block;