class Calc {

    constructor(config = null) {
        //Convert to meters
        this.switchToM = {
            ft: val => val * 0.3048,
            cm: val => val * 0.01,
            in: val => val * 0.0254,
            m: val => val
        }
        //Convert from meters
        this.switchFromM = {
            ft: val => val * 3.28084,
            cm: val => val * 100,
            in: val => val * 39.3701,
            m: val => val
        }
        if (config) {
            this.loadConfig(config)
        }
        return this
    }

    loadConfig(config) {
        try {
            //If browser
            if (typeof globalThis.window == 'object') {
                fetch(config)
                    .then(response => {
                        return response.json();
                    })
                    .then(jsonData => this.applyConfig(jsonData));
                return
            }
            //if Node.js
            if (typeof globalThis.global == 'object'){
                this.applyConfig(require(config))
                return
            }
            throw ("Cannot identify environment to load config")
        } catch (error){
            console.log(`Error: ${error}`)
        }
    }

    applyConfig(jsonData){
        //Adding functions to switchToM and switchFromM objects from config file
        Object.keys(jsonData).forEach(key => {
            this.switchToM[key] = val => val * jsonData[key].toM
            this.switchFromM[key] = val => val * jsonData[key].fromM
        })
    }

    //input Obj(value,unit), convert_to
    makeConvert({value, unit}, convert_to) {
        try {
            return this.switchFromM[convert_to](this.switchToM[unit](value))
        } catch (error) {
            console.log('Error: Unable to complete calculations')
            if (error instanceof TypeError) {
                const unit = []
                Object.keys(this.switchToM).forEach(key => {
                    unit.push(key)
                })
                console.log(`"unit" can be ${unit.join()}`)
            }
        }
    }

    makeResponse(convertedValue, unit){
        const responseObj={
            unit: unit,
            value: Math.round(convertedValue * 100) / 100
        }
        return responseObj
    }

    run(jsonObj){
        try {
            const convertedVal = this.makeConvert(jsonObj.distance,jsonObj.convert_to)
            return convertedVal !== undefined ? this.makeResponse(convertedVal, jsonObj.convert_to): 'Error'
        }catch (error){
            console.log(`Error: ${error.message}`)
        }
    }

}

const app = new Calc("./config.json").run({"distance": {"unit": "in", "value": 12}, "convert_to": "cm"})
console.log(app)

