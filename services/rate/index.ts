import express from 'express';
import {Rate, validateRate} from './controller/rate';
import {getRates} from '../../helper/rate';

const router = express.Router();

// مسیر GET برای دریافت تمام Rate‌های یک محصول
router.get('/rates/:productId', (req, res) => {
    const productId = req.params.productId;

    const rates = getRates(productId);

    res.json(rates);
});

// مسیر POST برای ایجاد یک Rate جدید
router.post('/rates', (req, res) => {
    const rate = req.body;

    const error = validateRate(rate);

    if (error) {
        res.status(400).json(error);
        return;
    }

    const db = MongoClient.connect('mongodb://localhost:27017/my_database');

    const ratesCollection = db.collection('rates');

    ratesCollection.insertOne(rate);

    db.close();

    res.status(201).json(rate);
});

export default router

