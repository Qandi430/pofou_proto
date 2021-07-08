import { Modal,ModalBody,ModalFooter,Button,Input } from 'reactstrap';
import React,{useEffect, useState} from 'react';
import { ReactSortable } from 'react-sortablejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
const SkillConfigModal = ({isOpen,toggle,data,changeSkill}) => {

    const [skillForm,setSkillForm] = useState({
        skillList : [],
    });

    useEffect(() => {
        setSkillForm(data);
    },[isOpen,data]);

    const setList = newList => {
        setSkillForm({
            ...skillForm,
            skillList : newList
        })
    }

    const addListItem = () => {
        setSkillForm({
            ...skillForm,
            skillList : skillForm.skillList.concat({type : "",level : 0})
        })
    }

    const removeListItem = index => {
        setSkillForm({
            ...skillForm,
            skillList : skillForm.skillList.filter((s,i) => i !== index) 
        })
    }

    const changeListItem = (index,name,value) => {
        let item = skillForm.skillList[index];
        item[name] = value;
        skillForm.skillList[index] = item;
        setSkillForm({
            ...skillForm,
            skillList : skillForm.skillList
        })
    }

    const saveSkill = () => {

        for(let i = 0; i<skillForm.skillList.length; i++){
            if(skillForm.skillList[i].type === ""){
                alert("기술명을 입력해 주세요.");
                return false;
            }
            if(skillForm.skillList[i].level === "" || Number(skillForm.skillList[i].level) < 0 || Number(skillForm.skillList[i].level) > 100){
                alert("기술 점수는 0이상 100이하만 입력할 수 있습니다.");
                return false;
            }
        }

        changeSkill(skillForm);
        toggle();
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalBody>
                <ReactSortable list={skillForm.skillList} setList={ newList => setList(newList)}>
                {
                    skillForm.skillList.map(
                        (skill,index) => (
                            <li key={index} style={{display:"flex",alignItems:"center",marginTop:"10px"}}>
                                <span style={{cursor:"pointer"}}><FontAwesomeIcon icon={faBars}/></span>
                                <Input type="text" value={skill.type} onChange={e => changeListItem(index,"type",e.target.value)} style={{flex:"0 0 40%",marginLeft:"10px"}} placeholder="기술명 : 예)포토샵"/>
                                <Input type="number" min="0" max="100" value={skill.level} onChange={e => changeListItem(index,"level",e.target.value)} style={{flex:"0 0 40%",marginLeft:"10px"}} placeholder="점수 : 예)100"/>
                                <button onClick={() => removeListItem(index)} style={{marginLeft:"auto",backgroundColor:"transparent",color:"#ff0000"}}><FontAwesomeIcon icon={faTimes}/></button>
                            </li>
                        )
                    )
                }
                </ReactSortable>
            </ModalBody>
            <ModalFooter>
                <Button onClick={addListItem}>추가</Button>
                <Button onClick={saveSkill}>저장</Button>
                <Button onClick={toggle}>취소</Button>
            </ModalFooter>
        </Modal>
    )
}

export default SkillConfigModal;