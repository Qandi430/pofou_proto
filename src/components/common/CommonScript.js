const getYearList = () => {
    let yearList = [];
    for(let i = 2021; i <= 1900; i--){
        yearList.push(i);
    }
    return yearList;
}


export {
    getYearList
}