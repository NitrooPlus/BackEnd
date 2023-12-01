import {Comment} from '../services/comment/controller/comment';

export function getComments(productId: string): Comment[] {

    const db = MongoClient.connect('mongodb://localhost:27017/my_database');

    const commentsCollection = db.collection('comments');

    const comments = commentsCollection.find({productId});

    db.close();

    return comments.map((comment) => new Comment(comment.id, comment.customerProfileId, comment.productId, comment.comment));
}
