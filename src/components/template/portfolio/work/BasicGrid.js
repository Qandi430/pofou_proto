import React from 'react';

const BasicGrid = ({workList,grid,contents,selectWork}) => {
    return (
        <div className={`work basicGrid`}>
            {
                workList.map(
                    (work,index) => 
                    <div className={`item grid${contents.grid}`} key={index} onClick={() => selectWork(work.workNumber)}>
                        <div className="itemInner" style={{backgroundImage: `url(https://storage.googleapis.com/pofou_repo/${work.thumbnail})`}}>     
                            <div className="titleBox">{work.title}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default BasicGrid;