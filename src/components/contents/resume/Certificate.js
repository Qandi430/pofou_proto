import React,{useState} from 'react'
import { FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap'
import ReactDatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import { getYear } from 'date-fns';

const _ = require("lodash");

const Certificate = ({formData,changeFormData}) => {
    const [openCertificateType,setOpenCertificateType] = useState(-1);
    const [openCertificatePassType,setOpenCertifiactePassType] = useState(-1);
    const [openCertificateGrade,setOpenCertificateGrade] = useState(-1);
    const [openCertificateLanguage,setOpenCertificateLanguage] = useState(-1);
    const toggleCertificateType = (index) => {
        if(index === openCertificateType){
            setOpenCertificateType(-1);
        }else{
            setOpenCertificateType(index);
        }
    }
    const toggleCertificatePassType = (index) => {
        if(index === openCertificatePassType){
            setOpenCertifiactePassType(-1);
        }else{
            setOpenCertifiactePassType(index);
        }
    }
    const toggleCertificateGrade = (index) => {
        if(index === openCertificateGrade){
            setOpenCertificateGrade(-1);
        }else{
            setOpenCertificateGrade(index);
        }
    }
    const toggleCertificateLanguage = (index) => {
        if(index === openCertificateLanguage){
            setOpenCertificateLanguage(-1);
        }else{
            setOpenCertificateLanguage(index);
        }
    }
    const changeCertificate = (index,name,value) => {
        let newList = formData.certificateList;
        if(name === "certificateType"){
            newList = newList.map((n,i) => i === index ? {
                certificateType : value,
                certificateLanguage : "",
                certificateName : "",
                certificateIssuer : "",
                certificatePassType : "",
                certificateDate : "",
                certificateScore : "",
                certificateGrade : "",
            } : n);
        }
        newList = newList.map((n,i) => i === index ? {...n,[name]:value} : n);
        
        changeFormData("certificateList",newList);
    }
    const deleteCertificate = (index) => {
        let newList = formData.certificateList;
        newList = newList.filter((n,i) => i !== index);
        changeFormData("certificateList",newList);
    }
    const addCertificate = (e) => {
        e.preventDefault();
        let newList = formData.certificateList;
        newList = newList.concat({
            cartificateType : "license",
            certificateLanguage : "",
            certificateName : "",
            certificateIssuer : "",
            certificatePassType : "",
            certificateDate : "",
            certificateScore : "",
            certificateGrade : "",
        });
        changeFormData("certificateList",newList);
    }
    return (
        <FormGroup className="certificate">
            <h6 className="formTitle">자격증/어학/수상내역</h6>
            <div className="certificateList">
                {
                    formData.certificateList.map(
                        (certificate,index) => 
                            <div className="listItem" key={index}>
                                {
                                    formData.certificateList.length > 1 &&
                                    <button className="btnDelete" onClick={() => deleteCertificate(index)}>삭제</button>
                                }
                                <FormGroup className="certificateType">
                                    <Label>항목선택</Label>
                                    <div className="inputBox">
                                        <Dropdown isOpen={openCertificateType === index} toggle={() => toggleCertificateType(index)}>
                                            <DropdownToggle caret>
                                                {
                                                    (() => {
                                                        switch(certificate.certificateType){
                                                            case "license":
                                                                return "자격증/면허증";
                                                            case "language":
                                                                return "어학시험";
                                                            case "awards":
                                                                return "수상내역/공모전";
                                                            default:
                                                                return "자격증/면허증";
                                                        }
                                                    })()
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => changeCertificate(index,"certificateType","license")}>자격증/면허증</DropdownItem>
                                                <DropdownItem onClick={() => changeCertificate(index,"certificateType","language")}>어학시험</DropdownItem>
                                                <DropdownItem onClick={() => changeCertificate(index,"certificateType","awards")}>수상내역/공모전</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </FormGroup>
                                {
                                    certificate.certificateType === "language" &&
                                    <FormGroup className="certificateLanguage">
                                        <Label>언어</Label>
                                        <div className="inputBox">
                                            <Dropdown isOpen={openCertificateLanguage === index} toggle={() => toggleCertificateLanguage(index)}>
                                                <DropdownToggle caret>
                                                    {
                                                        (() => {
                                                            switch(certificate.certificateLanguage){
                                                                case "English":
                                                                    return "영어";
                                                                case "Japanese":
                                                                    return "일본어";
                                                                case "Chinese":
                                                                    return "중국어";
                                                                case "German":
                                                                    return "독일어";
                                                                case "French":
                                                                    return "불어";
                                                                case "Spanish":
                                                                    return "스페인어";
                                                                case "Russian":
                                                                    return "러시아어";
                                                                case "Italian":
                                                                    return "이탈리아어";
                                                                case "Korean":
                                                                    return "한국어";
                                                                case "etc":
                                                                    return "기타";
                                                                default:
                                                                    return "언어선택";
                                                            }
                                                        })()
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","English")}>영어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Japanese")}>일본어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Chinese")}>중국어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","German")}>독일어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","French")}>불어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Spanish")}>스페인어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Russian")}>러시아어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Italian")}>이탈리아어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Korean")}>한국어</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","etc")}>기타</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </FormGroup>
                                }
                                <FormGroup className="certificateName">
                                    <Label>
                                        {certificate.certificateType === "awards" ? "수상명": certificate.certificateType === "language" ? "시험종류" : "자격증명"}
                                    </Label>
                                    <div className="inputBox">
                                        <Input 
                                            type="text" 
                                            name="certificateName" 
                                            value={certificate.certificateName} 
                                            onChange={e => changeCertificate(index,e.target.name,e.target.value)} 
                                            placeholder={certificate.certificateType === "awards" ? "수상명 입력": certificate.certificateType === "language" ? "시험종류 입력" : "자격증명 입력"}
                                        />
                                    </div>
                                </FormGroup>
                                {
                                    certificate.certificateType === "language" &&
                                    <FormGroup>
                                        <Label>점수</Label>
                                        <div className="inputBox">
                                            <Input type="text" name="certificateScore" value={certificate.certificateScore} placeholder="점수 입력" onChange={ e => changeCertificate(index,e.target.name,e.target.value)}/>
                                        </div>
                                    </FormGroup>
                                }
                                {
                                    certificate.certificateType === "language" &&
                                    <FormGroup>
                                        <Label>급수</Label>
                                        <div className="inputBox">
                                            <Dropdown isOpen={openCertificateGrade === index} toggle={() => toggleCertificateGrade(index)}>
                                                <DropdownToggle caret>
                                                    {certificate.certificateGrade === "" ? "급수선택" : certificate.certificateGrade}
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    modifiers={{
                                                        setMaxHeight : {
                                                            enabled : true,
                                                            order: 890,
                                                            fn : (data) => {
                                                                return{
                                                                    ...data,
                                                                    styles : {
                                                                        ...data.styles,
                                                                        overflow : 'auto',
                                                                        maxHeight : '300px'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","")}>급수선택</DropdownItem>
                                                    <DropdownItem disabled>숫자등급</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","1")}>1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","1+")}>1+</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","2-")}>2-</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","2")}>2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","2+")}>2+</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","2.5")}>2.5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3-")}>3-</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3")}>3</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3+")}>3+</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3.5")}>3.5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3 II")}>3 II</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","4-")}>4-</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","4")}>4</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","4+")}>4+</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","4.5")}>4.5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","4 II")}>4 II</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","5")}>5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","5+")}>5+</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","5.5")}>5.5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","5 II")}>5 II</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","6")}>6</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","6.5")}>6.5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","6 II")}>6 II</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","7")}>7</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","7.5")}>7.5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","7 II")}>7 II</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","8")}>8</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","8.5")}>8.5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","9")}>9</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","10")}>10</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","11")}>11</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","12")}>12</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","13")}>13</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","14")}>14</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","15")}>15</DropdownItem>
                                                    <DropdownItem disabled>한글등급</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","초(初)")}>초(初)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","중(中)")}>중(中)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","고(高)")}>고(高)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","상(上)")}>상(上)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","하(下)")}>하(下)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","특")}>특</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","특 II")}>특 II</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","준1")}>준1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","준2")}>준2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","준3")}>준3</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","준4")}>준4</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","준5")}>준5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","기초")}>기초</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","기본")}>기본</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","대사범")}>대사범</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","사범")}>사범</DropdownItem>
                                                    <DropdownItem disabled>알파벳등급</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","A")}>A</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","B")}>B</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","C")}>C</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","D")}>D</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","E")}>E</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","F")}>F</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","A1")}>A1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","A2")}>A2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","B1")}>B1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","B2")}>B2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","C1")}>C1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","C2")}>C2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","N1")}>N1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","N2")}>N2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","N3")}>N3</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","N4")}>N4</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","N5")}>N5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","1A")}>1A</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","1B")}>1B</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","1C")}>1C</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","2A")}>2A</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","2B")}>2B</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","2C")}>2C</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3A")}>3A</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3B")}>3B</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","3C")}>3C</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Grade A")}>Grade A</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Grade B")}>Grade B</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Grade C")}>Grade C</DropdownItem>
                                                    <DropdownItem disabled>OPIC</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Superior")}>Superior</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Advanced High")}>Advanced High</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Advanced Mid")}>Advanced Mid</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Advanced Low")}>Advanced Low</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Intermediate High")}>Intermediate High</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Intermediate Mid")}>Intermediate Mid</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Intermediate Low")}>Intermediate Low</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Novice High")}>Novice High</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Novice Mid")}>Novice Mid</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Novice Low")}>Novice Low</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Intermediate Mid1")}>Intermediate Mid1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Intermediate Mid2")}>Intermediate Mid2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","Intermediate Mid3")}>Intermediate Mid3</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </FormGroup>
                                }
                                {
                                    certificate.certificateType !== "language" &&
                                    <FormGroup className="certificateIssuer">
                                        <Label>
                                            {certificate.certificateType === "awards" ? "수여기관":"발행처/기관"}
                                        </Label>
                                        <div className="inputBox">
                                            <Input 
                                                type="text" 
                                                name="certificateIssuer" 
                                                value={certificate.certificateIssuer} 
                                                onChange={e => changeCertificate(index,e.target.name,e.target.value)} 
                                                placeholder={certificate.certificateType === "awards" ? "수여기관 입력":"발행처/기관 입력"}
                                            />
                                        </div>
                                    </FormGroup>
                                }
                                {
                                    certificate.certificateType !== "awards" &&
                                    <FormGroup className="certificatePassType">
                                        <Label>
                                            {certificate.certificateType === "language" ? "취득여부" : "합격구분"}
                                        </Label>
                                        <div className="inputBox">
                                            <Dropdown isOpen={openCertificatePassType === index} toggle={() => toggleCertificatePassType(index)}>
                                                <DropdownToggle caret>
                                                    {
                                                        (() => {
                                                            switch(certificate.certificatePassType){
                                                                case "1st":
                                                                    return "1차 합격";
                                                                case "2nd":
                                                                    return "2차 합격";
                                                                case "written":
                                                                    return "필기 합격";
                                                                case "practical":
                                                                    return "실기 합격";
                                                                case "final":
                                                                    return "최종 합격";
                                                                case "pass":
                                                                    return "취득 (pass)";
                                                                default:
                                                                    return certificate.certificateType === "language" ? "취득여부 선택" : "합격구분 선택" ;
                                                            }
                                                        })()
                                                    }
                                                </DropdownToggle>
                                                {
                                                    certificate.certificateType === "language" ?
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","")}>취득여부 선택</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","pass")}>취득 (PASS)</DropdownItem>
                                                    </DropdownMenu>
                                                    :
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","")}>합격구분 선택</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","1st")}>1차 합격</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","2nd")}>2차 합격</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","written")}>필기 합격</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","practical")}>실기 합격</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","final")}>최종 합격</DropdownItem>
                                                    </DropdownMenu>
                                                }
                                            </Dropdown>
                                        </div>
                                    </FormGroup>
                                }
                                <FormGroup className="certificateDate">
                                    <Label>
                                        {certificate.certificateType === "awards" ? "수상/공모일" : "취득일"}
                                    </Label>
                                    <div className="inputBox">
                                        <ReactDatePicker
                                            selected={certificate.certificateDate}
                                            onChange={(date) => changeCertificate(index,"certificateDate",date)}
                                            locale="ko"
                                            dateFormat="yyyyMM"
                                            placeholderText="YYYYMM"
                                            showMonthYearPicker
                                            
                                            maxDate={new Date()}
                                            className="form-control"
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
                                    </div>
                                </FormGroup>
                            </div>
                    )
                }
            </div>
            <button type="button" onClick={addCertificate}>자격증/어학/수상내역 추가 <FontAwesomeIcon icon={faPlus}/></button>
        </FormGroup>
    )
}

export default Certificate
