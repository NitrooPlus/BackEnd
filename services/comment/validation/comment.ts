import {Comment} from '../controller/comment';

export function validateComment(comment: Comment): Error | null {

    // نظر باید حداقل 10 کاراکتر باشد
    if (comment.comment.length < 10) {
        return {
            message: 'نظر باید حداقل 10 کاراکتر باشد',
            field: 'comment'
        };
    }

    return null;
}
