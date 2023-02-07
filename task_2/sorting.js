import {exclude} from "./exclude.mjs"
import {sort_by} from "./sort_by.mjs"

class Sorting {
    constructor(configObj) {
        try {
            if (typeof configObj !== 'object') throw TypeError('Params must be an object')
            this.dataObj = configObj.data
            this.conditionsObj = configObj.condition

            //Trying assign imported functions to class from "condition" params. But it's not working :)
            // Object.keys(this.conditionsObj.condition).forEach(conditionName => {
            //     console.log(typeof conditionName === 'function')
            //     this[`${conditionName}Fn`] = conditionName
            // })

            this.excludeFn = exclude
            this.sort_byFn = sort_by

        }catch (error){
            if (error.name !== 'TypeError') throw error
            console.log(error.message)

        }
    }

    run(){
        if (typeof this.conditionsObj !== 'object' || typeof this.dataObj !== 'object') return

        Object.keys(this.conditionsObj).forEach(conditionName => {
            let newObj
            try {
                newObj = this[`${conditionName}Fn`](this.conditionsObj[conditionName], this.dataObj)
            }catch (error){
                console.log(`Something wrong with module ${conditionName}`)
                console.log(error.message)
            }
            //Checking if something went wrong with the result of the module
            this.dataObj = typeof newObj === 'object' ? newObj : this.dataObj
        })
        return this.dataObj
    }
}

const configObj = {
    "data": [
        {"user": "mike@mail.com", "rating": 20, "disabled": false},
        {"user": "greg@mail.com", "rating": 14, "disabled": false},
        {"user": "john@mail.com", "rating": 25, "disabled": true}
    ],
    "condition": {
        "exclude": [{"disabled": true}],
        "sort_by": ["rating"]
    }
}

const app = new Sorting(configObj).run()
console.log(app)

