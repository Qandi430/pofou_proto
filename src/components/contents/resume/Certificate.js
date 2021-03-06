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
            <h6 className="formTitle">?????????/??????/????????????</h6>
            <div className="certificateList">
                {
                    formData.certificateList.map(
                        (certificate,index) => 
                            <div className="listItem" key={index}>
                                {
                                    formData.certificateList.length > 1 &&
                                    <button className="btnDelete" onClick={() => deleteCertificate(index)}>??????</button>
                                }
                                <FormGroup className="certificateType">
                                    <Label>????????????</Label>
                                    <div className="inputBox">
                                        <Dropdown isOpen={openCertificateType === index} toggle={() => toggleCertificateType(index)}>
                                            <DropdownToggle caret>
                                                {
                                                    (() => {
                                                        switch(certificate.certificateType){
                                                            case "license":
                                                                return "?????????/?????????";
                                                            case "language":
                                                                return "????????????";
                                                            case "awards":
                                                                return "????????????/?????????";
                                                            default:
                                                                return "?????????/?????????";
                                                        }
                                                    })()
                                                }
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => changeCertificate(index,"certificateType","license")}>?????????/?????????</DropdownItem>
                                                <DropdownItem onClick={() => changeCertificate(index,"certificateType","language")}>????????????</DropdownItem>
                                                <DropdownItem onClick={() => changeCertificate(index,"certificateType","awards")}>????????????/?????????</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </FormGroup>
                                {
                                    certificate.certificateType === "language" &&
                                    <FormGroup className="certificateLanguage">
                                        <Label>??????</Label>
                                        <div className="inputBox">
                                            <Dropdown isOpen={openCertificateLanguage === index} toggle={() => toggleCertificateLanguage(index)}>
                                                <DropdownToggle caret>
                                                    {
                                                        (() => {
                                                            switch(certificate.certificateLanguage){
                                                                case "English":
                                                                    return "??????";
                                                                case "Japanese":
                                                                    return "?????????";
                                                                case "Chinese":
                                                                    return "?????????";
                                                                case "German":
                                                                    return "?????????";
                                                                case "French":
                                                                    return "??????";
                                                                case "Spanish":
                                                                    return "????????????";
                                                                case "Russian":
                                                                    return "????????????";
                                                                case "Italian":
                                                                    return "???????????????";
                                                                case "Korean":
                                                                    return "?????????";
                                                                case "etc":
                                                                    return "??????";
                                                                default:
                                                                    return "????????????";
                                                            }
                                                        })()
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","English")}>??????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Japanese")}>?????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Chinese")}>?????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","German")}>?????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","French")}>??????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Spanish")}>????????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Russian")}>????????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Italian")}>???????????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","Korean")}>?????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateLanguage","etc")}>??????</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </FormGroup>
                                }
                                <FormGroup className="certificateName">
                                    <Label>
                                        {certificate.certificateType === "awards" ? "?????????": certificate.certificateType === "language" ? "????????????" : "????????????"}
                                    </Label>
                                    <div className="inputBox">
                                        <Input 
                                            type="text" 
                                            name="certificateName" 
                                            value={certificate.certificateName} 
                                            onChange={e => changeCertificate(index,e.target.name,e.target.value)} 
                                            placeholder={certificate.certificateType === "awards" ? "????????? ??????": certificate.certificateType === "language" ? "???????????? ??????" : "???????????? ??????"}
                                        />
                                    </div>
                                </FormGroup>
                                {
                                    certificate.certificateType === "language" &&
                                    <FormGroup>
                                        <Label>??????</Label>
                                        <div className="inputBox">
                                            <Input type="text" name="certificateScore" value={certificate.certificateScore} placeholder="?????? ??????" onChange={ e => changeCertificate(index,e.target.name,e.target.value)}/>
                                        </div>
                                    </FormGroup>
                                }
                                {
                                    certificate.certificateType === "language" &&
                                    <FormGroup>
                                        <Label>??????</Label>
                                        <div className="inputBox">
                                            <Dropdown isOpen={openCertificateGrade === index} toggle={() => toggleCertificateGrade(index)}>
                                                <DropdownToggle caret>
                                                    {certificate.certificateGrade === "" ? "????????????" : certificate.certificateGrade}
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
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","")}>????????????</DropdownItem>
                                                    <DropdownItem disabled>????????????</DropdownItem>
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
                                                    <DropdownItem disabled>????????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???(???)")}>???(???)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???(???)")}>???(???)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???(???)")}>???(???)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???(???)")}>???(???)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???(???)")}>???(???)</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???")}>???</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","??? II")}>??? II</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???1")}>???1</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???2")}>???2</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???3")}>???3</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???4")}>???4</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","???5")}>???5</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","??????")}>??????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","??????")}>??????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","?????????")}>?????????</DropdownItem>
                                                    <DropdownItem onClick={() => changeCertificate(index,"certificateGrade","??????")}>??????</DropdownItem>
                                                    <DropdownItem disabled>???????????????</DropdownItem>
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
                                            {certificate.certificateType === "awards" ? "????????????":"?????????/??????"}
                                        </Label>
                                        <div className="inputBox">
                                            <Input 
                                                type="text" 
                                                name="certificateIssuer" 
                                                value={certificate.certificateIssuer} 
                                                onChange={e => changeCertificate(index,e.target.name,e.target.value)} 
                                                placeholder={certificate.certificateType === "awards" ? "???????????? ??????":"?????????/?????? ??????"}
                                            />
                                        </div>
                                    </FormGroup>
                                }
                                {
                                    certificate.certificateType !== "awards" &&
                                    <FormGroup className="certificatePassType">
                                        <Label>
                                            {certificate.certificateType === "language" ? "????????????" : "????????????"}
                                        </Label>
                                        <div className="inputBox">
                                            <Dropdown isOpen={openCertificatePassType === index} toggle={() => toggleCertificatePassType(index)}>
                                                <DropdownToggle caret>
                                                    {
                                                        (() => {
                                                            switch(certificate.certificatePassType){
                                                                case "1st":
                                                                    return "1??? ??????";
                                                                case "2nd":
                                                                    return "2??? ??????";
                                                                case "written":
                                                                    return "?????? ??????";
                                                                case "practical":
                                                                    return "?????? ??????";
                                                                case "final":
                                                                    return "?????? ??????";
                                                                case "pass":
                                                                    return "?????? (pass)";
                                                                default:
                                                                    return certificate.certificateType === "language" ? "???????????? ??????" : "???????????? ??????" ;
                                                            }
                                                        })()
                                                    }
                                                </DropdownToggle>
                                                {
                                                    certificate.certificateType === "language" ?
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","")}>???????????? ??????</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","pass")}>?????? (PASS)</DropdownItem>
                                                    </DropdownMenu>
                                                    :
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","")}>???????????? ??????</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","1st")}>1??? ??????</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","2nd")}>2??? ??????</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","written")}>?????? ??????</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","practical")}>?????? ??????</DropdownItem>
                                                        <DropdownItem onClick={() => changeCertificate(index,"certificatePassType","final")}>?????? ??????</DropdownItem>
                                                    </DropdownMenu>
                                                }
                                            </Dropdown>
                                        </div>
                                    </FormGroup>
                                }
                                <FormGroup className="certificateDate">
                                    <Label>
                                        {certificate.certificateType === "awards" ? "??????/?????????" : "?????????"}
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
            <button type="button" onClick={addCertificate}>?????????/??????/???????????? ?????? <FontAwesomeIcon icon={faPlus}/></button>
        </FormGroup>
    )
}

export default Certificate
