class User {
    constructor({ id, name, password, email }){
        this.id = id
        this.name = name
        this.password = password 
        this.email = email
    }

    isValid() {
        const thisProperties = Object.getOwnPropertyNames(this)

        const validDatas = thisProperties.map(property => (
            !!this[property] ? null : `${property} is not defined`
        )).filter(data => data !== null)
        
        if(validDatas.length > 0) {
            return {
                valid: false,
                error: validDatas
            }
        }

        return {
            valid: true,
            error: null
        }
        
    }

}

export {
    User
}