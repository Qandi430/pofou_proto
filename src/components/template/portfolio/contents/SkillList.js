import React from 'react';
import SkillBar from 'react-skillbars';

const SkillList = ({grid,skillList}) => {
    return(
        <div  className={`contents skillList grid${grid}`}>
            <div className="skilListWrap">
                <SkillBar  skills={skillList} height={20}/>
            </div>
        </div>
    )
}

export default SkillList;