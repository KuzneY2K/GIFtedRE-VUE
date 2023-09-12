export class Gift {
    constructor(data) {
        this.createdAt = data.createdAt
        this.creatorId = data.creatorId
        this.id = data.id
        this.opened = data.opened
        this.message = data.tag
        this.gifUrl = data.url
    }
}