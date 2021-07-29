import React from 'react';
import SkillBar from 'react-skillbars';

const SkillList = ({grid,skill}) => {
    return(
        <div  className={`contents skillList grid${grid}`}>
            <div className="skilListWrap">
                <SkillBar colors={skill.colors}  skills={skill.list} height={20}/>
            </div>
        </div>
    )
}

export default SkillList;