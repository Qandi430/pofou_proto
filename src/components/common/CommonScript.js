const getYearList = () => {
    let yearList = [];
    for(let i = 2021; i <= 1900; i--){
        yearList.push(i);
    }
    return yearList;
}

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

export {
    getYearList,
    convertFontName,
    convertEducation,
    getQuery,
}
