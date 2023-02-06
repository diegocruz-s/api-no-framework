class Tile {
    constructor({ id, name, image, url }){
        this.id = id
        this.name = name
        this.image = image 
        this.url = url
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
