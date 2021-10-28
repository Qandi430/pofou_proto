import React, { useEffect, useState } from 'react';
import SkillBar from 'react-skillbars';

const SkillList = ({grid,skill,resume}) => {
    const [skillList,setSkillList] = useState(null);
    const [colors,setColors] = useState(null);
    useEffect(() => {
        if(skillList === null){
            let newList = [];
            // console.log(resume.skillList);
            resume.skillList.forEach(
                skill => newList.push({type:skill.skillName,level:skill.skillLevel})
            );
            setColors({
                "bar": skill.bar,
                "title": {
                    "text": skill.text,
                    "background": skill.background
                }
            })
            setSkillList(newList);
        }
    },[resume,skill,skillList])
    return(
        <div  className={`contents skillList grid${grid}`}>
            <div className="skilListWrap">
                {
                    skillList !== null &&
                    <SkillBar colors={{bar:skill.bar,title : {text : skill.text, background : skill.background}}}  skills={skillList} height={20}/>
                }
            </div>
        </div>
    )
}

export default SkillList;