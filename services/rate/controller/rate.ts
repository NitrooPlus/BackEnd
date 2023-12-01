export class Rate {

    public id: string;
    public customerProfileId: string;
    public productId: string;
    public rate: number;

    constructor(id: string, customerProfileId: string, productId: string, rate: number) {
        this.id = id;
        this.customerProfileId = customerProfileId;
        this.productId = productId;
        this.rate = rate;
    }
}
