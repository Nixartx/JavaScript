export function exclude(paramsArr, dataArr) {
    const filteredDataArr = dataArr.filter(obj => {
        let marker = 0
        paramsArr.forEach(paramObj => {
            Object.keys(paramObj).forEach(paramName => {
               if (obj[paramName]===paramObj[paramName]){
                   marker ++
               }
            })
        })
        return marker !== paramsArr.length
    })
    return filteredDataArr
}

