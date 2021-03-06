import React from 'react'
import { FormGroup, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getByteLength } from '../../common/CommonScript';

const Introduction = ({formData,changeFormData}) => {

    const changeIntroduction = (order,name,value) => {
        let newList = formData.introductionList;
        newList = newList.map(i => i.order === order ? {...i,[name]:value} : i);
        changeFormData("introductionList",newList);
    }

    const addIntroduction = (e) => {
        e.preventDefault();
        let newList = formData.introductionList;
        newList = newList.concat({title : "", content: "", order : newList.length});
        changeFormData("introductionList",newList);
    }

    const removeIntroduction = (e,order) => {
        e.preventDefault();
        let newList = [];
        for(let i = 0; i<formData.introductionList.length; i++){
            if(i !== order){
                if(i > order){
                    formData.introductionList[i].order = formData.introductionList[i].order-1;
                }
                newList.push(formData.introductionList[i]);    
            }
        }
        changeFormData("introductionList",newList);
    }

    const reOrderIntoroduction = (e,order,direction) => {
        e.preventDefault();
        let newList = [];
        let temp;
        for(let i = 0; i<formData.introductionList.length; i++){
            if(direction === "up"){
                if(i === order-1){
                    formData.introductionList[i].order = order;
                    temp = formData.introductionList[i];
                }else if(i === order){
                    formData.introductionList[i].order = order - 1;
                    newList.push(formData.introductionList[i]);
                    newList.push(temp);
                }else{
                    newList.push(formData.introductionList[i]);
                }
            }else{
                if(i === order){
                    formData.introductionList[i].order = order  + 1;
                    temp = formData.introductionList[i];
                }else if(i === order +1){
                    formData.introductionList[i].order = order;
                    newList.push(formData.introductionList[i]);
                    newList.push(temp);
                }else{
                    newList.push(formData.introductionList[i]);
                }
            }
            
        }
        
        changeFormData("introductionList",newList);
    }

    return (
        <FormGroup className="introduction">
            <h6 className="formTitle">???????????????</h6>
            <div className="introductionList">
                {
                    formData.introductionList.map(
                        (introduction) => 
                            <div className="listItem" key={introduction.order}>
                                <FormGroup>
                                    <div className="inputBox">
                                        <Input type="text" value={introduction.title} placeholder="???????????????" onChange={e => changeIntroduction(introduction.order,"title",e.target.value)}/>
                                        {
                                            formData.introductionList.length > 1 &&
                                            <div className="btnBox">
                                                {
                                                    introduction.order !== 0 &&
                                                    <button onClick={e => reOrderIntoroduction(e,introduction.order,"up")}>??? <FontAwesomeIcon icon={faCaretUp}/></button>
                                                }
                                                {
                                                    introduction.order !== formData.introductionList.length-1 &&
                                                    <button onClick={e => reOrderIntoroduction(e,introduction.order,"down")}>?????? <FontAwesomeIcon icon={faCaretDown}/></button>
                                                }
                                                <button onClick={e => removeIntroduction(e,introduction.order)}>??????</button>
                                            </div>
                                        }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="inputBox">
                                        <Input type="textarea" defaultValue={introduction.content} placeholder="???????????????" onChange={e => changeIntroduction(introduction.order,"content",e.target.value)}/>
                                    </div>
                                </FormGroup>
                                <div className="data">
                                    <h6>?????????</h6>
                                    <span className="count">(????????????) {introduction.content.length}??? / {(() => getByteLength(introduction.content,true))()}byte | (????????????) {introduction.content.replace(/(\s*)/g, "").length}??? / {(() => getByteLength(introduction.content,false))()}byte</span>
                                </div>
                            </div>
                    )
                }
            </div>
            <button onClick={addIntroduction}>??????????????? ?????? ?????? <FontAwesomeIcon icon={faPlus}/></button>
        </FormGroup>
    )
}

export default Introduction
