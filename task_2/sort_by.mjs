export function sort_by(paramsArr, dataArr) {
    paramsArr.forEach(param => {
        dataArr.sort((prev,next)=>{
            //(b.name<a.name) - (a.name<b.name) || (b.id<a.id) - (a.id<b.id) #for multi sorting
            return (next[param]<prev[param]) - (prev[param]<next[param])
        })
    })
    return dataArr
}

