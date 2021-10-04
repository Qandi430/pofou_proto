import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef,useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

const Skill = ({formData,changeFormData}) => {
    const [detailForm,setDetailForm] = useState({
        skillName : "",
        skillLevel : 0,
        skillContent : "",
    });
    const [openSkillDetailModal,setOpenSkillDetailModal] = useState(-1);
    const skillRef = useRef();
    
    const selectSkill = (selected) => {        
        let newList = formData.skillList;
        newList = newList.concat({skillName : selected[0].label, skillLevel : 100, skillContent: "",});
        changeFormData("skillList",newList);
        skillRef.current.clear()
    }

    const toggleSkillDetailModal = (e,index) => {
        e.preventDefault();
        
        if(typeof index !== 'number' || openSkillDetailModal === index){
            setOpenSkillDetailModal(-1);
            setDetailForm({
                skillName : "",
                skillLevel : 0,
                skillContent : "",
            })
        }else{
            setDetailForm(formData.skillList.find((s,i) => index === i));
            setOpenSkillDetailModal(index);
        }
    };

    const saveSkillDetail = (form) => {
        let newList = formData.skillList;
        newList = newList.map((s,i) => i === openSkillDetailModal ? form : s);
        changeFormData("skillList",newList);
        setOpenSkillDetailModal(-1);
        setDetailForm({
            skillName : "",
            skillLevel : 0,
            skillContent : "",
        })
    }

    return (
        <FormGroup className="skill">
            <h6 className="formTitle">보유기술 및 능력</h6>
            <div className="skillContents">
                <FormGroup>
                    <Label>보유기술</Label>
                    <div className="inputBox">
                        <Typeahead
                            allowNew
                            id="skillFinder"
                            newSelectionPrefix="일치하는 보유기술이 없습니다. : "
                            options={[]}
                            placeholder="보유 기술 입력 (ex. 문서작성능력, 비지니스영어, 커뮤니케이션스킬, java등)"
                            style={{width:"100%"}}
                            flip
                            ref={skillRef}
                            onChange={(selected) => selectSkill(selected)}
                        />
                    </div>
                </FormGroup>
                {
                    formData.skillList.length > 0 &&
                    <div className="skillList">
                        {
                            formData.skillList.map(
                                (skill,index) => 
                                    <div className="listItem" key={index}>
                                        <div className="skillName">
                                            {skill.skillName}
                                        </div>
                                        <button onClick={(e) => toggleSkillDetailModal(e,index)}>상세내용 수정&middot;추가하기 <FontAwesomeIcon icon={faChevronRight}/></button>
                                    </div>
                            )
                        }
                    </div>
                }
            </div>
            <SkillDetailModal isOpen={openSkillDetailModal} toggle={toggleSkillDetailModal} form={detailForm} saveSkillDetail={saveSkillDetail}/>
        </FormGroup>
    )
}

const SkillDetailModal = ({isOpen,toggle,form,saveSkillDetail}) => {
    const [detailForm,setDetailForm] = useState({
        skillName : "",
        skillLevel : 0,
        skillContent : "",
    });

    useEffect(() => {
        setDetailForm(JSON.parse(JSON.stringify(form)))
    },[form]);
    
    const changeDetailForm = (name,value) => {
        setDetailForm({
            ...detailForm,
            [name] : value,
        })
    }

    return(
        <Modal isOpen={isOpen > -1} toggle={toggle} centered id="skillDetailModl">
            <ModalHeader>
                상세내용 수정&middot;추가
            </ModalHeader>
            <ModalBody>
                <dl>
                    <dt>보유기술</dt>
                    <dd>
                        <Input type="text" value={detailForm.skillName} readOnly/>
                    </dd>
                </dl>
                <dl>
                    <dt>수준</dt>
                    <dd>
                        <Input type="number" min="0" max="100" value={detailForm.skillLevel} onChange={(e) => changeDetailForm("skillLevel",e.target.value)}/>
                    </dd>
                </dl>
                <dl>
                    <dt>상세내용</dt>
                    <dd>
                        <Input type="textarea" defaultValue={detailForm.skillContent} onChange={(e) => changeDetailForm("skillContent",e.target.value)}/>
                    </dd>
                </dl>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>취소</Button>
                <Button color="info" onClick={ () => saveSkillDetail(detailForm)}>저장</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Skill
