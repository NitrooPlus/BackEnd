export class Comment {

    public id: string;
    public customerProfileId: string;
    public productId: string;
    public comment: string;

    constructor(id: string, customerProfileId: string, productId: string, comment: string) {
        this.id = id;
        this.customerProfileId = customerProfileId;
        this.productId = productId;
        this.comment = comment;
    }
}
