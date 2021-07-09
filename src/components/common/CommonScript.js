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


export {
    getYearList,
    convertFontName,
}