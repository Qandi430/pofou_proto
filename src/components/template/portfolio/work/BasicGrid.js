import React from 'react';

const BasicGrid = ({workList,grid, toggleWorkDetailModal}) => {
    return (
        <div className={`work basicGrid`}>
            {
                workList.map(
                    work => 
                    <div className={`item grid${grid}`} key={work.index} onClick={() => toggleWorkDetailModal()}>
                        <div className="itemInner" style={{backgroundImage: `url(${work.thumbnail})`}}>     
                            <div className="titleBox">{work.title}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BasicGrid;