const baseObj = [
    {
        "index":1,
        "question":"What is your marital status?",
        "answers": {
            "Single": 2,
            "Married": 3
        }
    },
    {
        "index":2,
        "question":"Are you planning on getting married next year?",
        "answers": {
            "Yes": null,
            "No": null
        }
    },
    {
        "index":3,
        "question":"How long have you been married?",
        "answers": {
            "Less than a year": null,
            "More than a year": 4
        }
    },
    {
        "index":4,
        "question":"Have you celebrated your one year anniversary?",
        "answers": {
            "Yes": null,
            "No": null
        }
    }
]

function recursion(baseObj, curObj, path = 1){
    Object.keys(curObj.answers).forEach(answer => {
        console.log(`${path} - ${curObj.question} : ${answer}`)
        const nextObj = baseObj.find(obj => obj['index'] === curObj.answers[answer])
        curObj.answers[answer]=nextObj
        if (typeof nextObj === 'object') {
            recursion(baseObj, nextObj, ++path)
        }
    })
    return curObj
}

const nextObj = baseObj.find(obj => obj['index'] === 1)
const assembledObj = recursion(baseObj, nextObj)
console.log(assembledObj)

