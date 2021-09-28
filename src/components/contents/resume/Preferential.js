import React, { useState } from 'react'
import { FormGroup,Label,Dropdown,DropdownToggle,DropdownItem,DropdownMenu } from 'reactstrap';

const Preferential = ({changeForm,formData}) => {

    const [openVeteran,setOpenVeteran] = useState(false);
    const [openMilitary,setOpenMilitary] = useState(false);

    const toggleVeteran = () => {
        setOpenVeteran(!openVeteran);
    }
    const toggleMilitary = () => {
        setOpenMilitary(!openMilitary);
    }
    const changePreferential = (name,value) => {
        changeForm("preferred",name,value);
    }

    return (
        <FormGroup className="preferred">
            <h6 className="formTitle">우대사항</h6>
            <div className="preferredContents">
                <FormGroup>
                    <Label>보훈대상</Label>
                    <div className="inputBox">
                        <Dropdown isOpen={openVeteran} toggle={toggleVeteran}>
                            <DropdownToggle caret>
                                {formData.preferred.veteran ? "대상" : "비대상"}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => changePreferential("veteran",false)}>비대상</DropdownItem>
                                <DropdownItem onClick={() => changePreferential("veteran",true)}>대상</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>병역대상</Label>
                    <div className="inputBox">
                        <Dropdown isOpen={openMilitary} toggle={toggleMilitary}>
                            <DropdownToggle caret>
                                {
                                    (() => {
                                        switch(formData.preferred.militaryServiceStatus){
                                            case "fulfilled":
                                                return "군필";
                                            case "unfulfilled":
                                                return "미필";
                                            case "exempted":
                                                return "면제";
                                            case "inService":
                                                return "복무중";
                                            default :
                                                return "대상아님";
                                        }
                                    })()
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => changePreferential("militaryServiceStatus","")}>대상아님</DropdownItem>
                                <DropdownItem onClick={() => changePreferential("militaryServiceStatus","fulfilled")}>군필</DropdownItem>
                                <DropdownItem onClick={() => changePreferential("militaryServiceStatus","unfulfilled")}>미필</DropdownItem>
                                <DropdownItem onClick={() => changePreferential("militaryServiceStatus","exempted")}>면제</DropdownItem>
                                <DropdownItem onClick={() => changePreferential("militaryServiceStatus","inService")}>복무중</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </FormGroup>
            </div>
        </FormGroup>
    )
}

export default Preferential;