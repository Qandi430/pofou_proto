import React, { useEffect, useState } from 'react';
import SkillBar from 'react-skillbars';

const SkillList = ({grid,skill,resume}) => {
    const [skillList,setSkillList] = useState(null);
    useEffect(() => {
        if(skillList === null){
            let newList = [];
            // console.log(resume.skillList);
            resume.skillList.forEach(
                skill => newList.push({type:skill.skillName,level:skill.skillLevel})
            );
            console.log(newList);
            setSkillList(newList);
        }
    },[resume])
    return(
        <div  className={`contents skillList grid${grid}`}>
            <div className="skilListWrap">
                {
                    skillList !== null &&
                    <SkillBar colors={skill.colors}  skills={skillList} height={20}/>
                }
            </div>
        </div>
    )
}

export default SkillList;