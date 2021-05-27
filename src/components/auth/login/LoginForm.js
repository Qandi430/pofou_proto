import React,{ useState} from 'react';
import { Form, FormGroup, Label,Button } from 'reactstrap';
import { createCommonConsumer } from '../../../context/commonContext';

const LoginForm = ({history,isLogin,loginAction}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const chnageLoginForm = e => {
        switch(e.target.name){
            case "loginEmail":
                setEmail(e.target.value);
                break;
            case "loginPassword":
                setPassword(e.target.value);
                break;
            default :
                return;
        }
    }

    const submitLoginForm = e => { 
        e.preventDefault();
        if(email === ""){
            alert("이메일을 입력해 주세요.");
            return false;
        }
        if(password === ""){
            alert("비밀번호를 입력해 주세요.");
            return false;
        }

        loginAction(email,password);
    }

    return (
        <Form className="loginForm" onSubmit={submitLoginForm}>
            <FormGroup>
                <input className={email === "" ? '' : 'focus'} type="email" name="loginEmail" value={email} onChange={e => chnageLoginForm(e)}/>
                <Label>이메일 아이디</Label>
                <div className="line"></div>
            </FormGroup>
            <FormGroup>
                <input className={password === "" ? '' : 'focus'} type="password" name="loginPassword" value={password} onChange={e => chnageLoginForm(e)}/>
                <Label>패스워드</Label>
                <div className="line"></div>
            </FormGroup>
            <Button>로그인</Button>
        </Form>
    )
}

export default createCommonConsumer(LoginForm);