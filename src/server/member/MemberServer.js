import axios from 'axios';

const emailAuthentication = (email) => (
    axios.get("/member/emailAuthentication",{params : {email:email}})
);

const checkAuthNumber = (authNumber) => (
    axios.get("/member/checkAuthNumber",{params : {authNumber : authNumber}})
)

const register = (registerForm) => (
    axios.post("/member/register",registerForm)
);

export {
    emailAuthentication,
    checkAuthNumber,
    register,
}