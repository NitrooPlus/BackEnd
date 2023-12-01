import {Rate} from '../services/rate/controller/rate';

export function getRates(productId: string): Rate[] {

    const db = MongoClient.connect('mongodb://localhost:27017/my_database');

    const ratesCollection = db.collection('rates');

    const rates = ratesCollection.find({productId});

    db.close();

    return rates.map((rate) => new Rate(rate.id, rate.customerProfileId, rate.productId, rate.rate));
}
