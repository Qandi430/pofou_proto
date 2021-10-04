import React, {useState} from 'react';
import ReactDatePicker from 'react-datepicker';
import { FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getMonth, getYear } from 'date-fns';
// import {range} from 'react-lodash';
const _ = require("lodash");
// registerLocale("ko", ko);
const Activity = ({formData,changeFormData}) => {
    const [openActivityType,setOpenActivityType] = useState(-1);
    const toggleActivityType = (index) => {
        if(index === openActivityType){
            setOpenActivityType(-1);
        }else{
            setOpenActivityType(index);
        }
    }
    const changeActivity = (index,name,value) => {
        let newList = formData.activityList;
        newList = newList.map((n,i) => i === index ? {...n,[name]:value} : n);
        changeFormData("activityList",newList);
    }

    const addActivity = (e) => {
        e.preventDefault();
        let newList = formData.activityList;
        newList = newList.concat({
            activityType : "",
            activityPlace : "",
            activityStart : "",
            activityEnd : "",
            activityContent:  "",
        });
        changeFormData("activityList",newList);
    }

    const deleteActivity = (index) => {
        let newList = formData.activityList;
        newList = newList.filter((n,i) => i !== index);
        changeFormData("activityList",newList);
    }

    const years = _.range(1950, getYear(new Date()) + 1, 1);
    const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']; 

    return(
        <FormGroup className="activity">
            <h6 className="formTitle">대외활동</h6>
            <div className="activityList">
                {
                    formData.activityList.map(
                        (activity,index) => 
                            <div className="listItem" key={index}>
                                {
                                    formData.activityList.length > 1 &&
                                    <button className="btnDelete" onClick={() => deleteActivity(index)}>삭제</button>
                                }
                                <FormGroup className="activityType">
                                    <Label>활동구분</Label>
                                    <div className="inputBox">
                                        <Dropdown isOpen={openActivityType === index} toggle={() => toggleActivityType(index)}>
                                            <DropdownToggle caret>
                                                {
                                                    (
                                                        () => {
                                                            switch(activity.activityType){
                                                                case "school":
                                                                    return "교내활동";
                                                                case "intern":
                                                                    return "인턴";
                                                                case "volunteer":
                                                                    return "자원봉사";
                                                                case "club":
                                                                    return "동아리";
                                                                case "partTime":
                                                                    return "아르바이트";
                                                                case "social":
                                                                    return "사회활동";
                                                                case "overseas":
                                                                    return "해외연수";
                                                                case "education":
                                                                    return "교육이수내역";
                                                                default:
                                                                    return "활동구분 선택";
                                                            }
                                                        }
                                                    )()
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","")}>활동구분 선택</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","school")}>교내활동</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","intern")}>인턴</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","volunteer")}>자원봉사</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","club")}>동아리</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","partTime")}>아르바이트</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","social")}>사회활동</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","overseas")}>해외연수</DropdownItem>
                                                <DropdownItem onClick={() => changeActivity(index,"activityType","education")}>교육이수내역</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </FormGroup>
                                <FormGroup className="activityPlace">
                                    <Label>기관/장소</Label>
                                    <div className="inputBox">
                                        <Input type="text" name="activityPlace" value={activity.activityPlace} placeholder="기관/장소 입력" onChange={ e => changeActivity(index,"activityPlace",e.target.value)}/>
                                    </div>
                                </FormGroup>
                                <FormGroup className="activityPeriod">
                                    <Label>활동기간</Label>
                                    <div className="inputBox">
                                        <ReactDatePicker
                                            locale="ko"
                                            dateFormat="yyyy.MM.dd"
                                            placeholderText="YYYY.MM.DD"
                                            className="form-control"
                                            selected={activity.activityStart}
                                            maxDate={activity.activityEnd === "" ? new Date() : activity.activityEnd}
                                            onChange={ date => changeActivity(index,"activityStart",date)}
                                            renderCustomHeader={({
                                                date,
                                                changeYear,
                                                changeMonth,
                                                decreaseMonth,
                                                increaseMonth,
                                                prevMonthButtonDisabled,
                                                nextMonthButtonDisabled,
                                            }) => (
                                                <div className="datePickerHeader fullDay">
                                                    <button type="button" className="btnPrev" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}><FontAwesomeIcon icon={faChevronLeft}/></button>
                                                    <select
                                                        value={getYear(date)}
                                                        onChange={({ target: { value } }) => changeYear(value)}
                                                    >
                                                        {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                        ))}
                                                    </select>
                
                                                    <select
                                                        value={months[getMonth(date)]}
                                                        onChange={({ target: { value } }) =>
                                                        changeMonth(months.indexOf(value))
                                                        }
                                                    >
                                                        {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                        ))}
                                                    </select>
                
                                                    <button onClick={increaseMonth} type="button" className="btnNext" disabled={nextMonthButtonDisabled}>
                                                        <FontAwesomeIcon icon={faChevronRight}/>
                                                    </button>
                                                </div>
                                            )}
                                        />
                                        <label>~</label>
                                        <ReactDatePicker
                                            locale="ko"
                                            dateFormat="yyyy.MM.dd"
                                            placeholderText="YYYY.MM.DD"
                                            className="form-control"
                                            selected={activity.activityEnd}
                                            minDate={activity.activityStart}
                                            maxDate={new Date()}
                                            onChange={ date => changeActivity(index,"activityEnd",date)}
                                            renderCustomHeader={({
                                                date,
                                                changeYear,
                                                changeMonth,
                                                decreaseMonth,
                                                increaseMonth,
                                                prevMonthButtonDisabled,
                                                nextMonthButtonDisabled,
                                            }) => (
                                                <div className="datePickerHeader fullDay">
                                                    <button type="button" className="btnPrev" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}><FontAwesomeIcon icon={faChevronLeft}/></button>
                                                    <select
                                                        value={getYear(date)}
                                                        onChange={({ target: { value } }) => changeYear(value)}
                                                    >
                                                        {years.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                        ))}
                                                    </select>
                
                                                    <select
                                                        value={months[getMonth(date)]}
                                                        onChange={({ target: { value } }) =>
                                                        changeMonth(months.indexOf(value))
                                                        }
                                                    >
                                                        {months.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                        ))}
                                                    </select>
                
                                                    <button onClick={increaseMonth} type="button" className="btnNext" disabled={nextMonthButtonDisabled}>
                                                        <FontAwesomeIcon icon={faChevronRight}/>
                                                    </button>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup className="activityContent">
                                    <Label>활동내용</Label>
                                    <div className="inputBox">
                                        <Input type="textarea" defaultValue={activity.activityContent} onChange={e => changeActivity(index,"activityContent",e.target.value)}/>
                                    </div>
                                </FormGroup>
                            </div>
                    )
                }
            </div>
            <button onClick={addActivity}>대외활동 추가 <FontAwesomeIcon icon={faPlus}/></button>
        </FormGroup>
    )
}

export default Activity;