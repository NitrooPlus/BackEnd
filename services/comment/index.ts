import express from 'express';
import {Comment, validateComment} from './controller/comment';
import {getComments} from '../../helper/comment';

const router = express.Router();

// مسیر GET برای دریافت تمام Comment‌های یک محصول
router.get('/comments/:productId', (req, res) => {
    const productId = req.params.productId;

    const comments = getComments(productId);

    res.json(comments);
});

// مسیر POST برای ایجاد یک Comment جدید
router.post('/comments', (req, res) => {
    const comment = req.body;

    const error = validateComment(comment);

    if (error) {
        res.status(400).json(error);
        return;
    }

    const db = MongoClient.connect('mongodb://localhost:27017/my_database');

    const commentsCollection = db.collection('comments');

    commentsCollection.insertOne(comment);

    db.close();

    res.status(201).json(comment);
});

export default router
