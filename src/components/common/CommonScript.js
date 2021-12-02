import moment from 'moment';

const convertFontName = fontName => {
    switch(fontName){
        case "":
            return "선택된 폰트가 없습니다.";
        case "Noto Sans KR":
            return "Noto Sans KR";
        case "Nanum Gothic":
            return "나눔 고딕";
        case "Sunflower":
            return "해바라기";
        case "Gugi":
            return "구기";
        case "Dokdo":
            return "독도";
        default:
            return fontName;
    }
}

const convertEducation = (type,name) => {
    let returnValue = "";
    if(type === "educationType"){
        switch(name){
            case "highSchool":
                returnValue="고등학교";
                break;
            case "univercity":
                returnValue="대학교"
                break;
            default:
                returnValue="학사";
        }
    }else if(type === "degreeType"){
        switch(name){
            case "Bechelor":
                returnValue="학사";
                break;
            case "Associate":
                returnValue="전문학사";
                break;
            case "Master":
                returnValue="석사";
                break;
            case "Doctor":
                returnValue="박사";
                break;
            case "Certification":
                returnValue="수료";
                break;
            default :
                returnValue="";
        }
    }else if(type === "majorType"){
        switch(name){
            case "major":
                returnValue="전공";
                break;
            case "double":
                returnValue="복수전공";
                break;
            case "minor":
                returnValue= "부전공";
                break;
            case "linked":
                returnValue="연합전공";
                break;
            case "course":
                returnValue="코스";
                break;
            default:
                returnValue="선택";
        }
    }else if(type === "highScoolMajor"){
        switch(name){
            case "NatudalSciences":
                returnValue="이과";
                break;
            case "LiberalArts":
                returnValue="문과";
                break;
            case "Meister":
                returnValue="전문(실업)";
                break;
            case "ArtsAndPhysical":
                returnValue="예체능";
                break;
            default:
                returnValue="선택";
        }
    }else if(type === "graduatedType"){
        switch(name){
            case "graduate":
                returnValue="졸업";
                break;
            case "enrollment":
                returnValue="재학";
                break;
            case "semesterOff":
                returnValue="휴학";
                break;
            case "dropOut":
                returnValue="중퇴";
                break;
            default :
                returnValue="선택";
        }
    }
    return returnValue;
}

const getQuery = () => {
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

const getYearList = () => {
    let yearList = [];
    for(let i = 2021; i >= 1900; i--){
        yearList.push(i);
    }
    return yearList;
}

const getDayList = () => {
    let list = [];
    
    for(let i = 1; i<= 31; i++){
        list.push(i)
    }

    return list;
}

const getByteLength = (s,space) => {
    if(!space){
        s = s.replace(/(\s*)/g, "");
    }
    if (s === null || s.length === 0) {
        return 0;
    }
    var size = 0;

    for ( var i = 0; i < s.length; i++) {
        size += charByteSize(s.charAt(i));
    }

    return size;
}
const charByteSize = (ch) => {

    if (ch === null || ch.length === 0) {
        return 0;
    }

    var charCode = ch.charCodeAt(0);

    if (charCode <= 0x00007F) {
        return 1;
    } else if (charCode <= 0x0007FF) {
        return 2;
    } else if (charCode <= 0x00FFFF) {
        return 3;
    } else {
        return 4;
    }
}

const dateConvert = (date) => {
    if(date !== undefined){
        const now = new Date();
        const target = new Date(date);
        // console.log(now,target);
        let result = now - target;
        // console.log(result,result/1000,result/(1000 * 60),result/(1000 * 60 * 60),result/(1000*60*60*24));
        if(60>result/1000){
            return `${Math.floor(result/1000)}초 전`;
        }else if(60>result/(1000*60)){
            return `${Math.floor(result/(1000*60))}분 전`;
        }else if(24 > result/(1000*60*60)){
            return `${Math.floor(result/(1000*60*60))}시간 전`;
        }else if(7 > result/(1000*60*60*24)){
            return `${Math.floor(result/(1000*60*60*24))}일 전`;
        }else{
            return moment(date).format('YYYY.MM.DD');
        }
    }
};

const convertBr = text => {
    const result = text.replace(/<br\s*\/?>/mg,"\n");
    return result;
}

export {
    getYearList,
    convertFontName,
    convertEducation,
    getQuery,
    getDayList,
    getByteLength,
    dateConvert,
    convertBr,
}
