class Tile {
    constructor({ id, name, image, url, userId }){
        this.id = id
        this.name = name
        this.image = image 
        this.url = url
        this.userId = userId
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
    Tile
}
