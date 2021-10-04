import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';
import { getYear } from 'date-fns';

const _ = require("lodash");
const Career = ({formData,changeFormData}) => {
    
    const changeCareerType = (value) => {
        console.log(value);
        changeFormData("careerType",value);
    }

    const addCareer = (e) => {
        e.preventDefault();
        let newList = formData.careerList;
        newList = newList.concat({
            careerName : "",
            careerRole : "",
            careerStart : "",
            careerEnd : "",
            quit : true,
            careerContent : "",
        });
        
        changeFormData("careerList",newList);
    }

    const changeCareer = (index,name,value) => {
        let newList = formData.careerList;
        if(name === "quit"){
            if(value){
                newList = newList.map((c,i) => i === index ? {...c,careerEnd:new Date()} : c);
                
                document.getElementById(`careerEnd${index}`).readOnly = true;
            }else{
                document.getElementById(`careerEnd${index}`).readOnly = false;
            }
        }
        
        newList = newList.map((c,i) => i === index ? {...c,[name]:value} : c)
        
        
        changeFormData("careerList",newList);
    }

    const deleteCareer = (e,index) => {
        e.preventDefault();
        let newList = formData.careerList;
        newList = newList.filter((n,i) => i !== index);
        
        changeFormData("careerList",newList);
    }

    return (
        <FormGroup className="career">
            <h6 className="formTitle">
                경력사항
                {/* <button onClick={handleCareerAdditionalModal}>추가 +</button> */}
            </h6>
            <div className="careerType">
                <input type="radio" name="careerType" value="newcomer" id="careerNewcommer" onChange={e => changeCareerType(e.target.value)}/>
                <label htmlFor="careerNewcommer" className={`${formData.careerType === "newcomer" ? "on" : ""}`}>
                    신입
                </label>
                <input type="radio" name="careerType" value="experienced" id="careerExperienced" onChange={e => changeCareerType(e.target.value)}/>
                <label htmlFor="careerExperienced" className={`${formData.careerType === "experienced" ? "on" : ""}`}>
                    경력
                </label>
            </div>
            {
                formData.careerType === "experienced" &&
                <div className="careerList">
                    {
                        formData.careerList.map(
                            (career,index) => 
                                <div className="listItem" key={index}>
                                    {
                                        formData.careerList.length > 1 &&
                                        <button className="btnDelete" onClick={(e) => deleteCareer(e,index)}>삭제</button>
                                    }
                                    <FormGroup className="careerName">
                                        <Label>기업명</Label>
                                        <div className="inputBox">
                                            <Input type="text" name="careerName" value={career.careerName} onChange={ e => changeCareer(index,"careerName",e.target.value)} placeholder="예 : 포포유"/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="careerRole">
                                        <Label>역할</Label>
                                        <div className="inputBox">
                                            <Input type="text" name="careerRole" value={career.careerRole} onChange={ e => changeCareer(index,"careerRole",e.target.value)} placeholder="예 : UI디자이너, 프론트엔드 개발자"/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="careerPeriod">
                                        <Label>재직기간</Label>
                                        <div className="inputBox">
                                            <ReactDatePicker
                                                selected={career.careerStart}
                                                onChange={(date) => changeCareer(index,"careerStart",date)}
                                                locale="ko"
                                                dateFormat="yyyyMM"
                                                placeholderText="YYYYMM"
                                                showMonthYearPicker
                                                maxDate={career.careerEnd === "" ? new Date() : career.careerEnd}
                                                className="form-control"
                                                id={`careerStart${index}`}
                                                autoComplete="off"
                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    decreaseYear,
                                                    increaseYear,
                                                    prevYearButtonDisabled,
                                                    nextYearButtonDisabled,
                                                }) => (
                                                    <div className="datePickerHeader month">
                                                        <button type="button" className="btnPrev" onClick={decreaseYear} disabled={prevYearButtonDisabled}><FontAwesomeIcon icon={faChevronLeft}/></button>
                                                        <select
                                                            value={getYear(date)}
                                                            onChange={({ target: { value } }) => changeYear(value)}
                                                        >
                                                            {_.range(1950, getYear(new Date()) + 1, 1).map((option) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                            ))}
                                                        </select>
                    
                                                        <button onClick={increaseYear} type="button" className="btnNext" disabled={nextYearButtonDisabled}>
                                                            <FontAwesomeIcon icon={faChevronRight}/>
                                                        </button>
                                                    </div>
                                                )}
                                            />
                                            <label>
                                                -
                                            </label>    
                                            <ReactDatePicker
                                                selected={career.careerEnd}
                                                onChange={(date) => changeCareer(index,"careerEnd",date)}
                                                locale="ko"
                                                dateFormat="yyyyMM"
                                                placeholderText="YYYYMM"
                                                showMonthYearPicker
                                                minDate={career.careerStart}
                                                maxDate={new Date()}
                                                className="form-control"
                                                id={`careerEnd${index}`}
                                                autoComplete="off"
                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    decreaseYear,
                                                    increaseYear,
                                                    prevYearButtonDisabled,
                                                    nextYearButtonDisabled,
                                                }) => (
                                                    <div className="datePickerHeader month">
                                                        <button type="button" className="btnPrev" onClick={decreaseYear} disabled={prevYearButtonDisabled}><FontAwesomeIcon icon={faChevronLeft}/></button>
                                                        <select
                                                            value={getYear(date)}
                                                            onChange={({ target: { value } }) => changeYear(value)}
                                                        >
                                                            {_.range(1950, getYear(new Date()) + 1, 1).map((option) => (
                                                            <option key={option} value={option}>
                                                                {option}
                                                            </option>
                                                            ))}
                                                        </select>
                    
                                                        <button onClick={increaseYear} type="button" className="btnNext" disabled={nextYearButtonDisabled}>
                                                            <FontAwesomeIcon icon={faChevronRight}/>
                                                        </button>
                                                    </div>
                                                )}
                                            />
                                            <div className="periodTypeBox">
                                                <Input type="checkbox" name="careerPeriodType" id={`careerPeriodType${index}`} onChange={e => changeCareer(index,"quit",e.target.checked)}/>
                                                <Label style={{marginBottom:"0",marginLeft:"0.5em"}} htmlFor={`careerPeriodType${index}`}>재직중</Label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="careerContent">
                                        <Label>간단 설명</Label>
                                        <div className="inputBox">
                                            <Input type="textarea" defaultValue={career.careerContent} onChange={e => changeCareer(index,"careerContent",e.target.value)}/>
                                        </div>
                                    </FormGroup>
                                </div>
                        )
                    }
                </div>
            }
            {
                formData.careerType === "experienced" &&
                <button onClick={addCareer}>경력추가 <FontAwesomeIcon icon={faPlus}/></button>
            }
        </FormGroup>
    )
}

export default Career
