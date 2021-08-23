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

const login = (email,password) => (
    axios.post("/member/login",{"email":email,"password":password})
);

const logout = () => (
    axios.get("/member/logout")
)

const selectMemberType = (selectMemberTypeForm) => (
    axios.put("/member/setMemberType",selectMemberTypeForm)
)

const checkUrl = (url) => (
    axios.get("/member/checkUrl",{params:{url:url}})
)

const updateProfile = (form) => (
    axios.put("/member/updateProfile",form)
)

export {
    emailAuthentication,
    checkAuthNumber,
    register,
    login,
    logout,
    selectMemberType,
    checkUrl,
    updateProfile,
}