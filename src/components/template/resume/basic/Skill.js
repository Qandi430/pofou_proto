import React from 'react'

const Skill = ({skillList}) => {
    return (
        <div className="skill contents">
            <div className="titleBox">
                <h5 className="title">보유기술</h5>
            </div>
            <div className="skillList flexTable">
                <div className="thead">
                    <div className="tr">
                        <div className="th">보유기술명/수준/상세내용</div>
                    </div>
                </div>
                <div className="tbody">
                    {
                        skillList.map(
                            (skill,index) => 
                                <div className="tr" key={index}>
                                    <div className="td">
                                        <h6 className="skillName">{skill.skillName}</h6>
                                        {skill.skillLevel !== null && skill.skillLevel !== "" ? <p className="skillLevel">{skill.skillLevel}</p> : ""}
                                        {skill.skillContent !== null && skill.skillContent !== "" ? <p className="skillContent">{skill.skillContent}</p> : ""}
                                    </div>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Skill
